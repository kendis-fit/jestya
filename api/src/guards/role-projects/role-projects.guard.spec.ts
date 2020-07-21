import { Role } from "../../user/user.entity";
import { RoleProjectsGuard } from "./role-projects.guard";

describe("RoleProjectsGuard", () => {
	it("should be defined", () => {
		expect(new RoleProjectsGuard([Role.USER])).toBeDefined();
	});
});
