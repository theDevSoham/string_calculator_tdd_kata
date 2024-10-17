import { add } from "..";

// empty string test
test("empty string to return 0", () => {
    expect(add("")).toBe(0);
});

// length 1 test
test("string with length 1 returns the number", () => {
    expect(add("1")).toBe(1);
});

// integer sum test
test("sum 1 + 5 returns 6", () => {
    expect(add("1,5")).toBe(6);
});

// long integers sum test
test("sum large number of integers returns correct result", () => {
    const input = Array.from({ length: 1000 }, (_, i) => i + 1).join(","); // "1,2,3,...,1000"
    const expectedSum = (1000 * (1000 + 1)) / 2; // Sum of first 1000 natural numbers: n(n+1)/2

    expect(add(input)).toBe(expectedSum);
});

// decimal sum test
test("decimal addition: sum 5.12 + 6.1342 + 7.63 returns 18.8842", () => {
    expect(add("5.12, 6.1342, 7.63")).toBe(5.12 + 6.1342 + 7.63);
});

// double float decimal test
test("large decimal addition: sum multiple decimal values should have correct floating-point precision", () => {
    const input = Array.from({ length: 1000 }, (_, i) => (i + 1) * 0.1).join(
        ",",
    ); // 0.1, 0.2, 0.3, ..., 100 (1000th term)

    /**
     *  Sum of first n terms of series is: (n/2) * (a1 + an)
     *  a1 = first term = 0.1
     *  an = last term = 0.1 * 1000 = 100
     *  n = 1000
     * */
    const expectedSum = (1000 / 2) * (0.1 + 100);

    expect(add(input)).toBe(expectedSum);
});

// support new lines
test("\\n supported in string", () => {
    expect(add("1\n2,3")).toBe(1 + 2 + 3);
});

// support abrupt spaces
test("'1,3, 5,4 ' that is space before 5 should be supported", () => {
    expect(add("1,3, 5,4")).toBe(1 + 3 + 5 + 4);
});

// support custom delimiter
test("custom delimiter: address custom delimiter using format //[delimiter]\\n[numbers…]", () => {
    expect(add("//;\n1;2")).toBe(1 + 2);
});

// exception on negative numbers
test("throw error 'negative numbers not allowed <negative_number>' on encountering negative numbers", () => {
    // wrapped in a function expression to detect throw using toThrow which uses catch block to test throw
    expect(() => add("//:\n1:2:4:5:-6:8")).toThrow(
        "negative numbers not allowed <-6>",
    );
});

// exception on multiple negative numbers
test("throw error 'negative numbers not allowed <negative_number>' on encountering multiple negative numbers", () => {
    // wrapped in a function expression to detect throw using toThrow which uses catch block to test throw
    expect(() => add("//:\n1:-1:2:-2:3:-3")).toThrow(
        "negative numbers not allowed <-1,-2,-3>",
    );
});

// exception on multiple same negative numbers should avoid repetition
test("same negative numbers should not repeat in error message and should be sorted from asc to desc", () => {
    // wrapped in a function expression to detect throw using toThrow which uses catch block to test throw
    expect(() => add("//:\n1,2,-3,4,-6,7, -7,-3,5,2,-3")).toThrow(
        "negative numbers not allowed <-7,-6,-3>",
    );
});
