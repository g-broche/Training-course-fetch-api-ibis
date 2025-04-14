/**
 * String formatter
 */
export const StringService = {
    /**
     * modifies the text provided by the api to append line skip in a more consistent manner through br
     * @param {*} rawText
     * @returns text with line jump replaced by br tags
     */
    formatLineBreaksfromApiString(rawText) {
        const normalized = rawText.replace(/\r\n|\r/g, '\n');

        return normalized
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.trim())
            .join('<br><br>');
    }
}