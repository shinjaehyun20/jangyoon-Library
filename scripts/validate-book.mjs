import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const bookPath = path.join(root, "src", "data", "books", "north-wind-and-the-sun.json");

const raw = await fs.readFile(bookPath, "utf8");
const book = JSON.parse(raw);

const errors = [];

if (!book.metadata) {
  errors.push("metadata is required");
}

if (!Array.isArray(book.scenes)) {
  errors.push("scenes must be an array");
}

if (book.scenes.length < 14 || book.scenes.length > 16) {
  errors.push(`scene count must be between 14 and 16, got ${book.scenes.length}`);
}

for (const [index, scene] of book.scenes.entries()) {
  if (!scene.id) {
    errors.push(`scene ${index + 1}: id is required`);
  }

  if (!Array.isArray(scene.kr) || scene.kr.length === 0) {
    errors.push(`scene ${scene.id}: KR copy is required`);
  }

  if (!Array.isArray(scene.en) || scene.en.length === 0) {
    errors.push(`scene ${scene.id}: EN copy is required`);
  }

  if (!Array.isArray(scene.learningPoints) || scene.learningPoints.length === 0) {
    errors.push(`scene ${scene.id}: learningPoints are required`);
  }

  const paletteKeys = ["skyTop", "skyBottom", "hill", "accent", "cloud", "sun"];
  for (const key of paletteKeys) {
    if (!scene.palette?.[key]) {
      errors.push(`scene ${scene.id}: palette.${key} is required`);
    }
  }
}

if (errors.length > 0) {
  console.error("Content validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Content validation passed for "${book.metadata.titleKr}" with ${book.scenes.length} scenes.`);
