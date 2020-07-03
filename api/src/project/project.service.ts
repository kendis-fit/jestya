import { Model } from "mongoose";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";

import { IProject } from "./project.interface";
import { PROJECT_MODEL } from "./project.providers";

@Injectable()
export class ProjectService {
	constructor(@Inject(PROJECT_MODEL) private readonly projects: Model<IProject>) {}
}
