import { ParseEnumPipe } from "./parse-enum.pipe";
import { Role } from "src/user/user.entity";

describe("ParseEnumPipe", () => {
	it("should be defined", () => {
		expect(new ParseEnumPipe(Role)).toBeDefined();
	});
});
