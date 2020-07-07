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

import { User } from "src/user/user.entity";
import { Board } from "src/board/board.entity";

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

	@RelationId((user: User) => user.createdProjects)
	public creatorId: string;

	@ManyToOne(type => User)
	public creator: User;

	@RelationId((user: User) => user.projects)
	public userIds: string[];

	@ManyToMany(type => User)
	public users: User[];

	@OneToMany(type => Board, board => board.project)
	public boards: Board[];
}
