import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
	OneToMany,
	RelationId,
} from "typeorm";

import { Project } from "src/project/project.entity";
import { Comment } from "src/comment/comment.entity";
import { Task } from "src/task/task.entity";

export enum Role {
	USER = "USER",
	ADMIN = "ADMIN",
	SUPER_ADMIN = "SUPE_ADMIN",
}

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@Column({
		unique: true,
	})
	public login: string;

	@Column()
	public password: string;

	@Column({
		type: "enum",
		enum: Role,
		default: Role.USER,
	})
	public role: string;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@Column({
		default: true,
	})
	public isActive: boolean;

	@RelationId((project: Project) => project.users)
	public projectIds: string[];

	@ManyToMany(type => Project)
	@JoinTable()
	public projects: Project[];

	@OneToMany(type => Project, project => project.creator)
	public createdProjects: Project[];

	@OneToMany(type => Comment, comment => comment.user)
	public comments: Comment[];

	@OneToMany(type => Task, task => task.creator)
	public createdTasks: Task[];

	@RelationId((task: Task) => task.executors)
	public taskIds: string[];

	@ManyToMany(type => Task)
	@JoinTable()
	public tasks: Task[];
}
