/**
 * Test cases to pass:
 * 1. Skeleton function to be accessible through test
 * 2. Correction: numbers = "" i.e string length is 0
 * 3. Correction: numbers = "1" i.e string length is 1 should return the number
 */

export function add(numbers: string): number {
    // for length of string is 1
    if (numbers.length === 1) return Number(numbers);

    // for length of string is 0
    if (numbers.length === 0) return 0;

    // default return 0
    return 0;
}
