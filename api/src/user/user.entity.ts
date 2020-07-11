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

import { Project } from "../project/project.entity";
import { Comment } from "../comment/comment.entity";
import { Task } from "../task/task.entity";

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

	@RelationId((user: User) => user.projects)
	public projectsIds: string[];

	@ManyToMany(() => Project, project => project.users)
	@JoinTable()
	public projects: Project[];

	@OneToMany(() => Project, project => project.creator)
	public createdProjects: Project[];

	@OneToMany(() => Comment, comment => comment.user)
	public comments: Comment[];

	@OneToMany(() => Task, task => task.creator)
	public createdTasks: Task[];

	@RelationId((user: User) => user.tasks)
	public taskIds: string[];

	@ManyToMany(() => Task, task => task.executors)
	@JoinTable()
	public tasks: Task[];
}
