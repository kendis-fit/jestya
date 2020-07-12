import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

import config from "../.config";
import { User } from "./user/user.entity";
import { Task } from "./task/task.entity";
import { Board } from "./board/board.entity";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";
import { Project } from "./project/project.entity";
import { BoardModule } from "./board/board.module";
import { Comment } from "./comment/comment.entity";
import { ProjectModule } from "./project/project.module";
import { Component } from "./component/component.entity";
import { CommentModule } from "./comment/comment.module";
import { ComponentModule } from "./component/component.module";

export const REDIS_SERVICE = "REDIS_SERVICE";

@Module({
	imports: [
		UserModule,
		ProjectModule,
		BoardModule,
		TaskModule,
		ComponentModule,
		CommentModule,
		ConfigModule.forRoot({
			load: [config[process.env.NODE_ENV || "development"]],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				type: "postgres",
				host: config.get<string>("database.host"),
				port: config.get<number>("database.port"),
				username: config.get<string>("database.username"),
				password: config.get<string>("database.password"),
				database: config.get<string>("database.database"),
				entities: [User, Project, Board, Task, Component, Comment],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		ClientsModule.registerAsync([
			{
				name: REDIS_SERVICE,
				imports: [ConfigModule],
				useFactory: (config: ConfigService) => ({
					transport: Transport.REDIS,
					options: {
						url: config.get<string>("redis.url"),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
})
export class AppModule {}
