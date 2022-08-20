export declare global {
    interface String {
        escapeUnicode(): string;
        escapeRegExp(): string;
        unicodeEscaped: string;
        regExpEscaped: string;
        getBetweenAll(...args: string[]): string;
        getBetween(...args: string[]): string;
        padCenter(maxLength: number, fillString = " "): string;
        replaceAll(searchValue: string, replaceValue: string): string;
        replaceAllWithArray(searchValue: string, replaceArray = ['']): string;
        format(): string;
        reverse(): string;
        reversed: string;
        replaceEnd(): string;

        /**
         * Converts this string to an integer.
         * @param radix A value between 2 and 36 that specifies the base of the number in `string`.
         * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
         * All other strings are considered decimal.
         */
        toIntR(radix?: number): number;

        /** Converts this string to an integer. */
        toInt: number;
    }
}