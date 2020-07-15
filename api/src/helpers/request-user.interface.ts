import { Request } from "express";

import { IJwt } from "../auth/jwt.interface";

export interface RequestUser extends Request {
    user?: IJwt;
}