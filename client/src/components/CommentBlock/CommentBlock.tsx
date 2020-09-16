import { Form, Formik } from "formik";
import React from "react";
import Comment from "../Comment/Comment";
import TextArea from "../TextArea";

const CommentBlock = () => {
	let CommentList = new Array(4).fill(2);

	const handleSubmit = (value: any, FormikProps: any) => {
		console.log(value);
		FormikProps.resetForm();
	};

	return (
		<div className="comment-block">
			<h4>Comments</h4>
			<div className="comment-block__list">
				{CommentList.map((ell, i) => (
					<div key={i} className="comment-block__list-item">
						<Comment />
					</div>
				))}
			</div>
			<div className="comment-block__form-wrapper">
				<Formik initialValues={{ comment: "" }} onSubmit={handleSubmit}>
					{({ handleChange, values }) => (
						<Form>
							<div className="comment-block__form">
								<TextArea
									name="comment"
									onChange={handleChange}
									value={values.comment}
									resize="none"
									className="comment-block__form-input"
									placeholder="Add comment ..."
									rows={
										values.comment.length < 18
											? 1
											: values.comment.length < 41
											? 2
											: 3
									}
								/>
								<button type="submit" className="comment-block__sent-btn btn">
									Sent
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default CommentBlock;
