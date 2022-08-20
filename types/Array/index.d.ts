export declare global {
    interface Array<T> {
        unique: Array<T>;
        valid: Array<T>;
        trueItems: Array<T>;
        falseItems: Array<T>;

        shuffle(): Array<T>;
        shuffled: Array<T>;

        insert(index: number, ...values: any[]): Array<T>;
        pushIn(index: number, ...values: any[]): Array<T>;

        removeIndex(index: number): Array<T>;
        removeIndexes(...indexes: number[]): Array<T>;
        remove(...items: any[]): Array<T>;

        /**
         * Removes and returns the elements of an array that meet the condition specified in a callback function.
         * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
         */
        removeFilter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];

        /**
         * Returns the value of the first element in the array where predicate is true, and undefined
         * otherwise.
         * @param predicate find calls predicate once for each element of the array, in ascending
         * order, until it finds one where predicate returns true. If such an element is found, find
         * immediately returns that element value. Otherwise, find returns undefined.
         * @param thisArg If provided, it will be used as the this value for each invocation of
         * predicate. If it is not provided, undefined is used instead.
         */
        removeFind(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;

        swapIndexes(i: number, j: number): Array<T>;
        swap(item1: T, item2: T): Array<T>;
        swapFind(predicate1: (value: T, index: number, array: T[]) => unknown, predicate2: (value: T, index: number, array: T[]) => unknown): Array<T>;

        randomIndex: number;
        random: T;

        copyBasic(): Array<T>;
        copyJSON(): Array<T>;

        /**
         * Converts all items to an integer.
         * @param radix A value between 2 and 36 that specifies the base of the number in `string`.
         * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
         * All other strings are considered decimal.
         */
        toIntR(radix?: number): Array<number>;

        /** Converts all items to an integer. */
        toInt: Array<number>;

        /** Returns the first item. */
        first: T;

        /** Returns the last item. */
        last: T;

        /** Returns the depth of the array. */
        depth: number;

        /**
         * Returns a new array with all sub-array elements concatenated into it recursively up to the
         * infinit depth.
         */
        straight: FlatArray<T, number>[];

        chunk(chunkSize: number): Array<Array<T>>;
        chunkCenter(chunkSize: number): Array<Array<T>>;
    }
    interface ArrayConstructor {
        /** Creates an array and fills it. */
        create(count: number, fillValue?: any): Array<typeof fillValue>;

        /**
         * Creates an array and calls a defined callback function on each element of this array, and returns an array that contains the results.
         * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        createMap<U>(count: number, callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];

        merge(...arrays: any[]): Array<any>;

        withNumbers(to: number): Array<number>;
        withNumbers(start: number, end: number): Array<number>;

        getDepth(array: Array<any>): number;
    }
}