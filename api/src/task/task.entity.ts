import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
	OneToMany,
	RelationId,
} from "typeorm";

import { User } from "../user/user.entity";
import { Board } from "../board/board.entity";
import { Comment } from "../comment/comment.entity";
import { Component } from "../component/component.entity";

export enum Priority {
	LOWEST = "LOWEST",
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	HIGH = "HIGH",
	HIGHEST = "HIGHEST",
}

@Entity()
export class Task {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@Column({
		nullable: true,
	})
	public description!: string;

	@Column({
		type: "enum",
		enum: [Priority.LOWEST, Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.HIGHEST],
		default: Priority.MEDIUM,
	})
	public priority: Priority;

	@Column({
		default: true,
	})
	public isActual: boolean;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@RelationId((task: Task) => task.board)
	public boardId: string;

	@ManyToOne(() => Board, board => board.tasks)
	public board: Board;

	@RelationId((task: Task) => task.components)
	public componentIds: string[];

	@ManyToMany(() => Component, component => component.tasks)
	public components: Component[];

	@OneToMany(() => Comment, comment => comment.task)
	public comments: Comment[];

	@RelationId((user: Task) => user.creator)
	public creatorId: string;

	@ManyToOne(() => User, user => user.createdTasks)
	public creator: User;

	@RelationId((task: Task) => task.executors)
	public userIds: string[];

	@ManyToMany(() => User, user => user.tasks)
	public executors: User[];
}
