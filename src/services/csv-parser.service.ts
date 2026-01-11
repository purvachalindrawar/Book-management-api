import { Book } from '../models/book.interface';

export interface CsvParseResult {
    successCount: number;
    errors: string[];
}

export class CsvParserService {
    public parseAndValidate(buffer: Buffer): { validBooks: Omit<Book, 'id'>[]; errors: string[] } {
        const content = buffer.toString('utf-8');
        // Split by newlines, handling CRLF and LF, filtering empty lines
        const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
        const validBooks: Omit<Book, 'id'>[] = [];
        const errors: string[] = [];

        if (lines.length < 2) {
            return { validBooks: [], errors: ['CSV file is empty or missing data rows'] };
        }

        // Regex to match CSV fields, handling quotes:
        // Matches either:
        // 1. Quoted string: "..." (capturing group 2)
        // 2. Non-quoted string: anything except , (capturing group 3)
        const csvRegex = /(?:,|^)(?:"([^"]*)"|([^",]*))/g;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const matches: string[] = [];
            let match;

            // Reset lastIndex because we are using the 'g' flag
            csvRegex.lastIndex = 0;

            while ((match = csvRegex.exec(line)) !== null) {
                // If group 1 matches (quoted), use it. Otherwise use group 2 (unquoted).
                // We use unescape logic for double quotes if needed, but simple manual parsing usually assumes standard CSV
                let value = match[1] !== undefined ? match[1] : match[2];
                matches.push(value ? value.trim() : '');
            }

            // The regex might generate an empty match at the end due to the way split works vs match
            // We expect Title, Author, Year.
            // Note: The regex approach above captures the leading comma in the full match, 
            // so we need to be careful.

            // Alternative Cleaner Manual Parse (Character Scan) is often safer than Regex for CSV
            const columns = this.parseLine(line);

            if (columns.length < 3) {
                errors.push(`Row ${i + 1}: Invalid format. Expected 3 columns (Title, Author, Year)`);
                continue;
            }

            const title = columns[0];
            const author = columns[1];
            const yearStr = columns[2];
            const publishedYear = parseInt(yearStr, 10);

            if (!title || !author) {
                errors.push(`Row ${i + 1}: Missing title or author`);
                continue;
            }

            if (isNaN(publishedYear)) {
                errors.push(`Row ${i + 1}: Invalid publishedYear '${yearStr}'`);
                continue;
            }

            validBooks.push({ title, author, publishedYear });
        }

        return { validBooks, errors };
    }

    // Helper for robust line parsing
    private parseLine(text: string): string[] {
        const results: string[] = [];
        let entry: string = '';
        let inQuote: boolean = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if (char === '"') {
                // Toggle quote state
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                // Comma outside quotes is a separator
                results.push(entry.trim());
                entry = '';
            } else {
                // Add character to current entry
                entry += char;
            }
        }
        results.push(entry.trim()); // Push the last entry
        return results;
    }
}
