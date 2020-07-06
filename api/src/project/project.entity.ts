import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	OneToMany,
	ManyToOne,
} from "typeorm";
import { User } from "src/user/user.entity";

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

	@ManyToOne(type => User, user => user.createdProjects)
	public creator: User;

	@ManyToMany(type => User, user => user.projects)
	public users: User[];
}
