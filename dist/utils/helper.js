"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.wirteJsonSync = exports.readJsonSync = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const readJsonSync = (relPath) => {
    const p = path_1.default.resolve(process.cwd(), relPath);
    const raw = fs_1.default.readFileSync(p, "utf-8");
};
exports.readJsonSync = readJsonSync;
const wirteJsonSync = (relPath, data) => {
    const p = path_1.default.resolve(process.cwd(), relPath);
    fs_1.default.writeFileSync(p, JSON.stringify(data, null, 2));
};
exports.wirteJsonSync = wirteJsonSync;
const generateId = (arr) => {
    const max = arr.reduce((m, x) => (x.id > m ? x.id : m), 0);
    return max + 1;
};
exports.generateId = generateId;
