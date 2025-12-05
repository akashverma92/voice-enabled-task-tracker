import * as chrono from 'chrono-node';

export const useVoiceParser = () => {
    const parseVoiceInput = (text) => {
        if (!text) return null;

        const lowerText = text.toLowerCase();
        let priority = 'Medium';
        let status = 'To Do';

        // Priority Parsing
        if (/\b(urgent|high|critical|asap)\b/.test(lowerText)) {
            priority = 'High';
        } else if (/\b(low|minor)\b/.test(lowerText)) {
            priority = 'Low';
        }

        // Date Parsing using chrono-node
        const parsedDate = chrono.parseDate(text);
        let dueDate = '';
        if (parsedDate) {
            // Format to YYYY-MM-DD
            const year = parsedDate.getFullYear();
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const day = String(parsedDate.getDate()).padStart(2, '0');
            dueDate = `${year}-${month}-${day}`;
        }

        // Title Extraction
        const title = text.charAt(0).toUpperCase() + text.slice(1);

        return {
            title,
            description: `Voice transcript: "${text}"`,
            status,
            priority,
            dueDate
        };
    };

    return { parseVoiceInput };
};
