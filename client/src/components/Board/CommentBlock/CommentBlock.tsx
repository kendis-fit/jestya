import React from "react";

const CommentBlock = () => {
	return (
		<div className="comment-block">
			<h4>Comments</h4>
			<div className="comment-block__list">
				<div className="comment-block__comment">
					
					<div className="comment-block__author">
						<img
							src="https://lh6.googleusercontent.com/-DZ6EuthbgMU/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJP2VizNjggQLqy6LJBJPbSau1iing/photo.jpg"
							alt=""
							className="comment-block__author-avatar"
						/>
					</div>
                    <div className="comment-block__comment-bubble">
						<p className="comment-block__author-name">Ivan Step</p>
						<p className="comment-block__text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
							esse repudiandae accusantium modi similique libero vitae, hic error
							excepturi voluptates!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentBlock;
