import { mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as docgen from "react-docgen-typescript";

const COMPONENTS_DIR = "src/components";
const OUT_FILE = "docs/components.json";

function collectFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
    } else if (entry.endsWith(".tsx") && !entry.includes(".stories.")) {
      files.push(full);
    }
  }
  return files;
}

const parser = docgen.withCustomConfig("./tsconfig.json", {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => !prop.parent?.fileName.includes("node_modules"),
});

const files = collectFiles(COMPONENTS_DIR);
const docs = parser.parse(files);

const manifest = docs
  .filter((c) => Object.keys(c.props).length > 0 || c.description)
  .map((c) => ({
    name: c.displayName,
    description: c.description || null,
    props: Object.fromEntries(
      Object.entries(c.props).map(([propName, p]) => [
        propName,
        {
          type:
            p.type.name === "enum" && p.type.value
              ? p.type.value.map((v: { value: string }) => v.value).join(" | ")
              : p.type.name,
          required: p.required,
          default: p.defaultValue?.value ?? null,
          description: p.description || null,
        },
      ])
    ),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

mkdirSync("docs", { recursive: true });
writeFileSync(OUT_FILE, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated docs for ${manifest.length} components → ${OUT_FILE}`);
