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

	@RelationId((user: User) => user.comments)
	public userId: string;

	@ManyToOne(type => User)
	public user: User;

	@RelationId((task: Task) => task.comments)
	public taskId: string;

	@ManyToOne(type => Task, task => task.comments)
	public task: Task;
}
