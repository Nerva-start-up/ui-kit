import { compile } from "@tailwindcss/node";
import fs from "node:fs";
const css = fs.readFileSync("./input.css", "utf8");
const { build } = await compile(css, { base: process.cwd(), onDependency: () => {} });
const out = build([...fs.readFileSync("./test.html", "utf8").matchAll(/class="([^"]+)"/g)].flatMap(m => m[1].split(" ")));
console.log(out);
