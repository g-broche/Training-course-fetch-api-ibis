export const StringService = {
    formatLineBreaksfromApiString(rawText) {
        const normalized = rawText.replace(/\r\n|\r/g, '\n');

        return normalized
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.trim())
            .join('<br><br>');
    }
}