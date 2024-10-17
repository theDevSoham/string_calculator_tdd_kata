import { add } from "..";

test("empty string to return 0", () => {
    expect(add("")).toBe(0);
});

test("string with length 1 returns the number", () => {
    expect(add("1")).toBe(1);
});

test("sum 1 + 5 returns 6", () => {
    expect(add("1,5")).toBe(6);
});

test("decimal addition: sum 5.12 + 6.1342 + 7.63 returns 18.8842", () => {
    expect(add("5.12, 6.1342, 7.63")).toBe(5.12 + 6.1342 + 7.63);
});
