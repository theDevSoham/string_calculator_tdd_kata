import Decimal from "decimal.js";

/**
 * Test cases to pass:
 * 1. Skeleton function to be accessible through test
 * 2. Correction: numbers = "" i.e string length is 0
 * 3. Correction: numbers = "1" i.e string length is 1 should return the number
 * 4. Correction: numbers = "1,5" i.e return should be 6
 * 5. Correction: numbers = "0.1, 0.2, 0.3,... upto 1000" i.e very large amount of data should return 100
 * 6. Correction: numbers = "1\n2,3" i.e detect new line delimiter
 */

export function add(numbers: string): number {
    // for length of string is 0
    if (numbers.length === 0) return 0;
    // for length of string is 1
    else if (numbers.length === 1) return Number(numbers);
    // for string length greater than 1
    else {
        // extract all numbers from string with split and create a numbers array
        const numArray = numbers
            .split(/[\n, ]+/) // replace ',' with regular expression, split by ',', '\n' or ' '
            .map((str) => new Decimal(str.trim()));

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
