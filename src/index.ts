/**
 * Test cases to pass:
 * 1. Skeleton function to be accessible through test
 * 2. Correction: numbers = "" i.e string length is 0
 * 3. Correction: numbers = "1" i.e string length is 1 should return the number
 * 4. Correction: numbers = "1,5" i.e return should be 6
 */

export function add(numbers: string): number {
    // for length of string is 0
    if (numbers.length === 0) return 0;
    // for length of string is 1
    else if (numbers.length === 1) return Number(numbers);
    // for string length greater than 1
    else {
        // extract all numbers from string with split and create a numbers array
        const numArray = numbers.split(",").map((str) => Number(str));
		// iterate over the array to get the addition of all the numbers
        return numArray.reduce((acc, curr) => acc + curr, 0);
    }

	// removed default return as it's not needed anymore
}
