import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";

import { Task } from "src/task/task.entity";
import { User } from "src/user/user.entity";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public content: string;

	@CreateDateColumn()
	public createdAt: Date;

	@ManyToOne(type => User, user => user.comments)
	public user: User;

	@ManyToOne(type => Task, task => task.comments)
	public task: Task;
}
