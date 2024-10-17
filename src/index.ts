import Decimal from "decimal.js";

/**
 * Test cases to pass:
 * 0. Skeleton function to be accessible through test
 * 1. Correction: numbers = "" i.e string length is 0
 * 2. Correction: numbers = "1" i.e string length is 1 should return the number
 * 3. Correction: numbers = "1,5" i.e return should be 6
 * 6. Correction: numbers = "0.1, 0.2, 0.3,... upto 1000" i.e very large amount of data should return 100
 * 7. Correction: numbers = "1\n2,3" i.e detect new line delimiter
 * 9. Correction: numbers = "//;\n1;2" i.e override ',' with ;
 * 10. Correction: numbers = "//:\n1:2:4:5:-6:8" i.e negative number should throw error
 * 12. Correction: numbers = "//:\n1:-2:3:4:-5:-6:7:8:-5:-9:-6" i.e error shouldn't contain repeated numbers and should be sorted in asc.
 */

export function add(numbers: string): number {
    // for length of string is 0
    if (numbers.length === 0) return 0;
    // for length of string is 1
    else if (numbers.length === 1) return Number(numbers);
    // for string length greater than 1
    else {
        // save default separator
        let separator = ",";

        // extract separator
        if (numbers.startsWith("//")) separator = numbers.slice(2, 3);

        /**
         * numbers having custom separator will strip the numbers string from delimiter implementation
         * numbers that doesn't have custom delimiter will be assigned without any operation
         */
        const formattedNumbers = numbers.startsWith("//")
            ? numbers.slice(3)
            : numbers;

        // define custom regexp for custom separator
        const regexp: RegExp = new RegExp(`[\\n${separator}]+`, "g");

        // extract all numbers from string with split and create a numbers array
        const numArray = formattedNumbers
            .split(regexp) // replace with dynamic regexp
            // added str length check as empty str cannot be handled by decimal.js
            .map((str) => new Decimal(str.length > 0 ? str.trim() : 0))
            .filter((num) => !num.isNaN());

        // check for negative numbers, sort them, and throw errors
        const negativeArr = numArray
            .filter((num) => num.lessThan(0))
            .map((num) => num.toNumber())
            .sort((a, b) => a - b); // sorting in asc. order

        if (negativeArr.length > 0) {
            console.log([...new Set(negativeArr)], negativeArr);
            throw new Error(
                `negative numbers not allowed <${[...new Set(negativeArr)].join(",")}>`, // Set maks the values unique
            );
        }

        // iterate over the array to get the addition of all the numbers
        const result = numArray.reduce(
            (acc, curr) => acc.plus(curr),
            new Decimal(0),
        );

        // return result as number
        return result.toNumber();
    }

    // removed default return as it's not needed anymore
}
