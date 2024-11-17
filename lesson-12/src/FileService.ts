import fs from 'fs';
import { User } from './interfaces/User';

const FILE_PATH = './files/users.json';

export class FileService {
    static readFile() {
        try {
            const data = fs.readFileSync(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }

    static writeFile(users: User[]) {
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(users));
        } catch (error) {
            console.error("Error writing file:", error);
        }
    }
}
