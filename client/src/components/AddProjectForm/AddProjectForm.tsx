import { object, string } from "yup";
import { Formik, Form } from "formik";
import React, { useState } from "react";

import resource from "../../api/resource";
import { IAddProject, IProject } from "../../api/project";

const schema = object().shape({
    name: string()
        .min(6)
        .required(),
    description: string()
        .notRequired()
});

const initialValues: IAddProject = {
    name: "",
    description: ""
}

export interface IAddProjectForm {
    addProject: (project: IProject) => void;
    onSubmit?: (error?: Error) => void;
}

const AddProjectForm = (props: IAddProjectForm) => {
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: IAddProject) => {
        setLoading(true);
        try {
            const newProject = await resource.projects.create(values);
            props.addProject({ ...newProject, ...values, isArchive: false });
            props.onSubmit?.()
        } finally {
            setLoading(false);
            const projectsDOM = document.querySelector(".projects");
            if (projectsDOM) {
                projectsDOM.scrollTo(0, projectsDOM.scrollHeight);
            }
        }
    }

    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
            {
                (({ values, errors, touched, handleChange }) => (
                    <Form>
                        <div className="add-project-form-item_wrapper">
                            <label htmlFor="project.name" className="form-label">Name</label>
                            <input placeholder="Required field" name="name" onChange={handleChange} type="text" className={`form-control ${errors.name ? "form-control.isInvalid" : ""}`} id="project.name" value={values.name} />
                            <div className={`${errors.name && touched.name ? "text-danger" : ""}`}>
                                {errors.name && touched.name ? errors.name : " "}
                            </div>
                        </div>
                        <div className="add-project-form-item_wrapper">
                            <label htmlFor="project.description" className="form-label">Description</label>
                            <textarea placeholder="This field is optional" name="description" onChange={handleChange} className={`form-control ${errors.name ? "form-control.isInvalid" : ""}`} id="project.description" value={values.description} />
                            <div className={`${errors.name ? "text-danger" : ""}`}>
                                {errors.description && touched.description ? errors.description : " "}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                            {
                                loading ?
                                <>
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </>
                                : <span>Create project</span>
                            }</button>
                        </div>
                    </Form>
                ))
            }
        </Formik>
    );
}

export default AddProjectForm;
