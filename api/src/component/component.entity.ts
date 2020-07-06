import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";

import { Task } from "src/task/task.entity";

@Entity()
export class Component {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@CreateDateColumn()
	public createdAt: Date;

	@ManyToMany(type => Task, task => task.components)
	@JoinTable()
	public tasks: Task[];
}
