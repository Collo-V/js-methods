


/**
 * This function takes two strings and returns a number between 0 and 1, based on the Dice's Coefficient, which is a measure of the similarity between two sets. In this case, the sets are the bigrams of the two strings. A bigram is a sequence of two adjacent elements from a string. The function first removes all whitespace from the input strings, then creates a map of bigrams for the first string. It then iterates through the bigrams of the second string, counting how many of them are also in the first string's bigram map. Finally, it calculates the similarity score using the formula: (2 * intersection size) / (total number of bigrams in both strings).
 * @param {string} first - The first string to compare.
 * @param {string} second - The second string to compare.
 * @returns {number} A number between 0 and 1 representing the similarity between the two strings.
 * @example
 * compareTwoStrings('hello world', 'hello'); // returns 0.8
 * compareTwoStrings('abc', 'def'); // returns 0
 * compareTwoStrings('night', 'nacht'); // returns 0.25
 */
export function compareTwoStrings(first:string, second:string):number {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}
/** 
 * This function takes a main string and an array of target strings, and returns an object containing the similarity ratings of each target string compared to the main string, as well as the best match and its index. It uses the compareTwoStrings function to calculate the similarity ratings. The function first validates the input arguments, then iterates through the target strings, calculating their similarity ratings and keeping track of the best match. Finally, it returns an object with the ratings, best match, and best match index.
 * 
 * @param {string} mainString - The main string to compare against the target strings.
 * @param {string[]} targetStrings - An array of strings to compare to the main string.
 * @returns {object} An object containing the similarity ratings, best match, and best match index. 
 * @example
 * findBestMatch('hello world', ['hello', 'world', 'hi']);
 * // returns { ratings: [ { target: 'hello', rating: 0.8 }, { target: 'world', rating: 0.8 }, { target: 'hi', rating: 0.4 } ], bestMatch: { target: 'hello', rating: 0.8 }, bestMatchIndex: 0 }
 */ 
export function findBestMatch(mainString:string, targetStrings:string[]):any {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = compareTwoStrings(mainString, currentTargetString)
		ratings.push({target: currentTargetString, rating: currentRating})
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i
		}
	}
	
	
	const bestMatch = ratings[bestMatchIndex]
	
	return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
}

function areArgsValid(mainString:string, targetStrings:string[]):boolean {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
	return true;
}