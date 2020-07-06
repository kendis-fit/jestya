import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";

import { Project } from "src/project/project.entity";
import { Task } from "src/task/task.entity";

@Entity()
export class Board {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@Column({
		nullable: true,
	})
	public description!: string;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@ManyToOne(type => Project, project => project.boards)
	public project: Project;

	@OneToMany(type => Task, task => task.board)
	public tasks: Task[];
}
