import { Role } from "../../user/user.entity";
import { ParseEnumPipe } from "./parse-enum.pipe";

describe("ParseEnumPipe", () => {
	it("should be defined", () => {
		expect(new ParseEnumPipe(Role)).toBeDefined();
	});
});
