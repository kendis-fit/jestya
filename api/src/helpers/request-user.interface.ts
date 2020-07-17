import { Request } from "express";

import { IJwt } from "../strategies/jwt/jwt.interface";

export interface RequestUser extends Request {
    user?: IJwt;
}