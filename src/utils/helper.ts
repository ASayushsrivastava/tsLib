import path from "path";
import fs from "fs";

export const readJsonSync = (relPath: string) => {
  const p = path.resolve(process.cwd(), relPath);
  const raw = fs.readFileSync(p, "utf-8");
};

export const wirteJsonSync = (relPath: string, data: any) => {
  const p = path.resolve(process.cwd(), relPath);
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
};

export const generateId = (arr: { id: number }[]) => {
  const max = arr.reduce((m, x) => (x.id > m ? x.id : m), 0);
  return max + 1;
};
