import { add } from "..";

test("empty string to return 0", () => {
    expect(add("")).toBe(0);
});
