import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, RelationId } from "typeorm";

import { Task } from "src/task/task.entity";

@Entity()
export class Component {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@CreateDateColumn()
	public createdAt: Date;

	@RelationId((task: Task) => task.components)
	public taskIds: string[];

	@ManyToMany(type => Task)
	@JoinTable()
	public tasks: Task[];
}
