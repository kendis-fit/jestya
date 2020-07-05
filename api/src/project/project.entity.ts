import { BelongsToMany, Table, BelongsTo, Model, Column, DataType, ForeignKey } from "sequelize-typescript";

import { User, ProjectUser } from "src/user/user.entity";

@Table({ tableName: "projects" })
export class Project extends Model<Project> {
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
		allowNull: true,
	})
	public description!: string;

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

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID,
	})
	public creatorId: string;

	@BelongsTo(() => User)
	public creator: User;

	@BelongsToMany(() => User, () => ProjectUser)
	public users: User[];
}
