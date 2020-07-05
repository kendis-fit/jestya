import { Table, Model, Column, DataType, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Project } from "src/project/project.entity";

export enum Role {
	USER = "USER",
	ADMIN = "ADMIN",
	SUPER_ADMIN = "SUPE_ADMIN",
}

@Table({ tableName: "users" })
export class User extends Model<User> {
	@Column({
		type: DataType.UUID,
		primaryKey: true,
		defaultValue: DataType.UUIDV4,
	})
	public id: string;

	@Column({
		type: DataType.STRING,
	})
	public name: string;

	@Column({
		type: DataType.STRING,
		unique: true,
	})
	public login: string;

	@Column({
		type: DataType.STRING,
	})
	public password: string;

	@Column({
		type: DataType.ENUM(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
		defaultValue: Role.USER,
	})
	public role: string;

	@Column({
		type: DataType.DATE,
	})
	public createdAt: Date;

	@Column({
		type: DataType.DATE,
	})
	public updatedAt: Date;

	@Column({
		type: DataType.DATE,
	})
	public deletedAt: Date;

	@BelongsToMany(() => Project, () => ProjectUser)
	public projects: Project[];
}

@Table
export class ProjectUser extends Model<ProjectUser> {
	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID,
	})
	public userId: string;

	@ForeignKey(() => Project)
	@Column({
		type: DataType.UUID,
	})
	public projectId: string;
}
