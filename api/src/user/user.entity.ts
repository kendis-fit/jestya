import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
	OneToMany,
} from "typeorm";
import { Project } from "src/project/project.entity";

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

	@Column()
	public isActive: boolean;

	@ManyToMany(type => Project, project => project.users)
	@JoinTable()
	public projects: Project[];

	@OneToMany(type => Project, project => project.creator)
	public createdProjects: Project[];
}
