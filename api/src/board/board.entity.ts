import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	RelationId,
	ManyToMany,
} from "typeorm";

import { Project } from "src/project/project.entity";
import { Task } from "src/task/task.entity";

@Entity()
export class Board {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column({
		unique: true,
	})
	public name: string;

	@Column({
		nullable: true,
	})
	public description!: string;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@RelationId((project: Project) => project.boards)
	public projectIds: string[];

	@ManyToMany(type => Project)
	public projects: Project[];

	@OneToMany(type => Task, task => task.board)
	public tasks: Task[];
}
