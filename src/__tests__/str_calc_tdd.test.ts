import { add } from "..";

test("empty string to return 0", () => {
    expect(add("")).toBe(0);
});

test("string with length 1 returns the number", () => {
    expect(add("1")).toBe(1);
});
