import { Injectable, Inject } from "@nestjs/common";
import { RedisClient } from "redis";
import { REDIS } from "./database.providers";

@Injectable()
export class DatabaseService {
	constructor(
		@Inject(REDIS)
		private readonly redis: RedisClient
	) {}

	public async get<T>(key: string): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this.redis.get(key, (err, data) => {
				if (err) reject(err);
				else {
					const parseData: T = JSON.parse(data);
					resolve(parseData);
				}
			});
		});
	}

	public async set<T>(key: string, value: T): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.redis.set(key, JSON.stringify(value), err => {
				if (err) reject(err);
				else resolve();
			});
		});
	}

	public async addToArray<T>(key: string, value: T): Promise<void> {
		const data: T[] = await this.get<T[]>(key);
		data.push(value);
		await this.set<T[]>(key, data);
	}
}
