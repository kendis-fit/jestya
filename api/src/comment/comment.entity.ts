import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, RelationId } from "typeorm";

import { Task } from "../task/task.entity";
import { User } from "../user/user.entity";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public content: string;

	@CreateDateColumn()
	public createdAt: Date;

	@RelationId((comment: Comment) => comment.user)
	public userId: string;

	@ManyToOne(() => User, user => user.comments)
	public user: User;

	@RelationId((comment: Comment) => comment.task)
	public taskId: string;

	@ManyToOne(() => Task, task => task.comments)
	public task: Task;
}
