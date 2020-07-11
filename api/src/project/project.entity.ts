import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	ManyToOne,
	RelationId,
	OneToMany,
} from "typeorm";

import { User } from "../user/user.entity";
import { Board } from "../board/board.entity";

@Entity()
export class Project {
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

	@Column({
		nullable: true,
	})
	public finishedAt!: Date;

	@RelationId((project: Project) => project.creator)
	public creatorId: string;

	@ManyToOne(() => User, user => user.createdProjects)
	public creator: User;

	@RelationId((project: Project) => project.users)
	public userIds: string[];

	@ManyToMany(() => User, user => user.projects)
	public users: User[];

	@OneToMany(() => Board, board => board.project)
	public boards: Board[];
}
