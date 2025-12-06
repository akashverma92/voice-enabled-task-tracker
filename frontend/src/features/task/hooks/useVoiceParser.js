import * as chrono from 'chrono-node';

export const useVoiceParser = () => {
    const parseVoiceInput = (text) => {
        if (!text) return null;

        let cleanText = text;
        let priority = 'Medium';
        let status = 'To Do';
        let dueDate = '';

        // 1. Parse and Extract Date
        // We use chrono.parse to get the text that was matched so we can remove it
        const dateResults = chrono.parse(text);
        if (dateResults.length > 0) {
            const result = dateResults[0];
            const parsedDate = result.start.date();

            // Format to YYYY-MM-DD
            const year = parsedDate.getFullYear();
            const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
            const day = String(parsedDate.getDate()).padStart(2, '0');
            dueDate = `${year}-${month}-${day}`;

            // Remove the date text from the original string
            // We replace with empty string, handling potential "due" or "by" prefixes
            cleanText = cleanText.replace(result.text, '');
        } else {
            // Fallback for "7 12 2025" format if chrono misses it
            const dateRegex = /(\d{1,2})[\s/-](\d{1,2})[\s/-](\d{4})/;
            const match = cleanText.match(dateRegex);
            if (match) {
                const [fullMatch, d, m, y] = match;
                // Assume DD MM YYYY for this specific fallback
                const dateObj = new Date(y, m - 1, d);
                if (!isNaN(dateObj.getTime())) {
                    const year = dateObj.getFullYear();
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    dueDate = `${year}-${month}-${day}`;
                    cleanText = cleanText.replace(fullMatch, '');
                }
            }
        }

        // 2. Parse and Extract Priority
        const priorityPatterns = {
            High: /\b(urgent|high|critical|asap|important)\b/i,
            Low: /\b(low|minor|trivial)\b/i
        };

        if (priorityPatterns.High.test(cleanText)) {
            priority = 'High';
            cleanText = cleanText.replace(priorityPatterns.High, '');
        } else if (priorityPatterns.Low.test(cleanText)) {
            priority = 'Low';
            cleanText = cleanText.replace(priorityPatterns.Low, '');
        }

        // 3. Parse and Extract Status
        const statusPatterns = {
            'In Progress': /\b(in progress|doing|working on|ongoing)\b/i,
            'Done': /\b(done|completed|finished)\b/i,
            'To Do': /\b(to do|pending|later)\b/i
        };

        if (statusPatterns['In Progress'].test(cleanText)) {
            status = 'In Progress';
            cleanText = cleanText.replace(statusPatterns['In Progress'], '');
        } else if (statusPatterns['Done'].test(cleanText)) {
            status = 'Done';
            cleanText = cleanText.replace(statusPatterns['Done'], '');
        } else if (statusPatterns['To Do'].test(cleanText)) {
            status = 'To Do';
            cleanText = cleanText.replace(statusPatterns['To Do'], '');
        }

        // 4. Cleanup Title
        // First, remove specific command prefixes at the start of the sentence
        const commandPrefixes = /^(create|add|make|new|remind me to|set status|mark as)\s+(a|an)?\s*(task|todo|entry)?\s*(to|that|about)?\s*/i;
        cleanText = cleanText.replace(commandPrefixes, '');

        // Remove common filler words that might remain elsewhere or were part of the structure
        // We be careful not to remove "the" if it's part of "Review the PR", but "task" is often filler
        cleanText = cleanText
            .replace(/\b(priority|due|by|on|before|status)\b/gi, '')
            .replace(/\s+/g, ' ') // Collapse multiple spaces
            .trim();

        // Capitalize first letter
        const title = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);

        // If title is empty (e.g. user just said "tomorrow"), fallback to original text or generic
        const finalTitle = title || "New Task";

        return {
            title: finalTitle,
            description: `Voice transcript: "${text}"`,
            status,
            priority,
            dueDate
        };
    };

    return { parseVoiceInput };
};
