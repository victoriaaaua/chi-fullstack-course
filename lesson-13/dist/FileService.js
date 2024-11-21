"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const fs_1 = __importDefault(require("fs"));
const FILE_PATH = './files/users.json';
class FileService {
    static readFile() {
        try {
            const data = fs_1.default.readFileSync(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error("Error reading file:", error);
        }
    }
    static writeFile(users) {
        try {
            fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(users));
        }
        catch (error) {
            console.error("Error writing file:", error);
        }
    }
}
exports.FileService = FileService;
