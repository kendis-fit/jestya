import { JwtProjectsGuard } from "./jwt-projects.guard";

describe("JwtProjectsGuard", () => {
	it("should be defined", () => {
		expect(new JwtProjectsGuard()).toBeDefined();
	});
});
