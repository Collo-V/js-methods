export const cleanLink = (link:string):string=>{
    return link.replace(/[ +^%!.,]/g,'-').toLowerCase()
}
/**
 * Encode a path (no protocol/domain) by replacing every character
 * that is not alphanumeric, '-'or '_' with the pattern --{unicodeCode}--.
 * Example: "&a b" -> "/a--32--b"
 *
 * Note: This is a simple reversible scheme. If the original path already
 * contains substrings matching --{digits}--, decoding will treat them as encoded
 * sequences. Avoid using that exact pattern in original paths or escape them beforehand.
 * 
 * @param path The original path string to encode.
 * @return The encoded path string with special characters replaced by their unicode code points.
 */
export const encodeURLPath = (path: string): string =>{
    path = path.replace(/ /g, '-')
    return path.replace(/[^A-Za-z0-9\-_]/g, (ch) => `--${ch.codePointAt(0)!}--`);
}
    

/**
 * Decode a path previously encoded with encodeURLPath.
 * It replaces occurrences of --{unicodeCode}-- back to the original characters.
 * 
 * @param cleaned The encoded path string to decode.
 * @returns The original path string with encoded sequences replaced by their characters.
 */
export const decodeURLPath = (cleaned: string): string =>
    cleaned.replace(/--(\d+)--/g, (_match, digits) => {
        const code = Number(digits);
        if (!Number.isFinite(code)) return _match;
        try {
            return String.fromCodePoint(code);
        } catch {
            return _match;
        }
    });