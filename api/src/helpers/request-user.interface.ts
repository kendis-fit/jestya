import { Request } from "express";

import { IJwt } from "../strategies/jwt.interface";

export interface RequestUser extends Request {
    user?: IJwt;
}