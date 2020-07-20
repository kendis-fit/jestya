import { JwtTasksGuard } from "./jwt-tasks.guard";

describe("JwtTasksGuard", () => {
	it("should be defined", () => {
		expect(new JwtTasksGuard()).toBeDefined();
	});
});
