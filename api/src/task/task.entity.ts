import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
	OneToMany,
} from "typeorm";

import { Board } from "src/board/board.entity";
import { Comment } from "src/comment/comment.entity";
import { Component } from "src/component/component.entity";

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
	public priority: string;

	@Column({
		default: true,
	})
	public isActual: boolean;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@ManyToOne(type => Board, board => board.tasks)
	public board: Board;

	@ManyToMany(type => Component, component => component.tasks)
	public components: Component[];

	@OneToMany(type => Comment, comment => comment.task)
	public comments: Comment[];
}
