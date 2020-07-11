import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, RelationId } from "typeorm";

import { Task } from "../task/task.entity";

@Entity()
export class Component {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@CreateDateColumn()
	public createdAt: Date;

	@RelationId((component: Component) => component.tasks)
	public taskIds: string[];

	@ManyToMany(() => Task, task => task.components)
	@JoinTable()
	public tasks: Task[];
}
