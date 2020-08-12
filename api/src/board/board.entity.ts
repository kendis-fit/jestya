import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	RelationId,
	ManyToOne,
} from "typeorm";

import { Project } from "../project/project.entity";
import { Task } from "../task/task.entity";

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

	@RelationId((board: Board) => board.project)
	public projectId: string;

	@ManyToOne(type => Project, project => project.boards)
	public project: Project;

	@OneToMany(type => Task, task => task.board)
	public tasks: Task[];

	@Column({
		default: "indigo",
	})
	public color: string;

	@Column({
		default: "add_alert",
	})
	public icon: string;

	@Column({
		default: 0,
	})
	public position: number;
}
