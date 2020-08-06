import React, { ReactNode } from "react";

export interface IContent {
    title: string;
    logo?: boolean;
    children?: ReactNode;
}

const Content = (props: IContent) => {
    return(
        <div className="content">
			<div className="content__container">
                {
                    props.logo ? <h2 className="content__title">Jestya</h2> : null
                }
                <h3 className="text-center card-title">{props.title}</h3>
                {props.children}
            </div>
        </div>
    );
}

export default Content;
