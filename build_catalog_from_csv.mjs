#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outputPath = "./data/catalog.generated.js"] = process.argv;

if (!inputPath) {
  console.error("Usage: node scripts/build_catalog_from_csv.mjs <titles.csv> [output.js]");
  process.exit(1);
}

const csvText = fs.readFileSync(inputPath, "utf8");
const records = parseCsv(csvText);

const shows = records
  .filter((row) => {
    const type = (row.show_type || row.type || "").toLowerCase();
    return type === "show" || type === "tv show";
  })
  .map(mapRowToShow)
  .filter(Boolean)
  .sort((left, right) => left.title.localeCompare(right.title));

const output = `window.NETFLIX_SHOWS = ${JSON.stringify(shows, null, 2)};\n`;
fs.writeFileSync(outputPath, output);

console.log(`Wrote ${shows.length} TV shows to ${path.resolve(outputPath)}`);

function parseCsv(text) {
  const rows = [];
  const headers = [];
  let cell = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      row.push(cell);
      cell = "";

      if (headers.length === 0) {
        headers.push(...row);
      } else if (row.some((value) => value.trim() !== "")) {
        const record = {};
        headers.forEach((header, headerIndex) => {
          record[header] = row[headerIndex] || "";
        });
        rows.push(record);
      }

      row = [];
      continue;
    }

    cell += char;
  }

  if (cell || row.length) {
    row.push(cell);
    if (headers.length === 0) {
      headers.push(...row);
    } else {
      const record = {};
      headers.forEach((header, headerIndex) => {
        record[header] = row[headerIndex] || "";
      });
      rows.push(record);
    }
  }

  return rows;
}

function mapRowToShow(row) {
  const title = row.title?.trim();
  if (!title) {
    return null;
  }

  const releaseYear = Number(row.release_year || row.releaseYear || 0);
  const runtime = Number(row.runtime || 0);
  const seasons = Number(row.seasons || 0);
  const genres = parseArrayish(row.genres || row.listed_in);
  const countries = parseArrayish(row.production_countries || row.country);
  const description = (row.description || "").trim();
  const maturitySource = (row.age_certification || row.rating || "").toUpperCase();
  const language = inferLanguage(countries);

  return {
    title,
    releaseYear,
    genres: mapGenres(genres),
    moods: inferMoods(description, genres),
    category: inferCategory(genres),
    language,
    episodeLength: inferEpisodeLength(runtime),
    commitment: inferCommitment(seasons),
    tone: inferTone(description, genres),
    intensity: inferIntensity(description, genres),
    maturity: inferMaturity(maturitySource),
    popularity: inferPopularity(row),
    pitch: description || `${title} is included from the imported Netflix TV catalog.`
  };
}

function parseArrayish(rawValue = "") {
  const cleaned = rawValue
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .replace(/'/g, "")
    .trim();

  if (!cleaned) {
    return [];
  }

  return cleaned
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function mapGenres(genres) {
  const mapped = new Set();

  genres.forEach((genre) => {
    if (genre.includes("comedy")) mapped.add("comedy");
    if (genre.includes("drama")) mapped.add("drama");
    if (genre.includes("thriller") || genre.includes("crime")) mapped.add("thriller");
    if (genre.includes("action")) mapped.add("action");
    if (genre.includes("science fiction") || genre.includes("fantasy")) mapped.add("sci-fi");
    if (genre.includes("mystery")) mapped.add("mystery");
    if (genre.includes("romance")) mapped.add("romance");
    if (genre.includes("documentation") || genre.includes("documentary")) mapped.add("docuseries");
    if (genre.includes("reality")) mapped.add("reality");
    if (genre.includes("animation") || genre.includes("anime")) mapped.add("animation");
  });

  return mapped.size ? [...mapped] : ["drama"];
}

function inferCategory(genres) {
  const joined = genres.join(" ");
  if (joined.includes("reality")) return "reality";
  if (joined.includes("documentation") || joined.includes("documentary")) return "docuseries";
  if (joined.includes("animation") || joined.includes("anime")) return "animation";
  return "scripted";
}

function inferLanguage(countries) {
  const primarilyEnglish = countries.some((country) =>
    ["us", "gb", "au", "ca", "ie", "nz"].includes(country)
  );
  return primarilyEnglish ? "english" : "non-english";
}

function inferEpisodeLength(runtime) {
  if (!runtime || runtime <= 30) return "short";
  if (runtime <= 50) return "standard";
  return "long";
}

function inferCommitment(seasons) {
  if (!seasons || seasons <= 1) return "short";
  if (seasons <= 3) return "medium";
  return "long";
}

function inferTone(description, genres) {
  const text = `${description} ${genres.join(" ")}`.toLowerCase();
  if (/(horror|murder|killer|crime|violent|dark|war)/.test(text)) return "dark";
  if (/(comedy|romance|family|friendship|bake|dating)/.test(text)) return "light";
  return "balanced";
}

function inferIntensity(description, genres) {
  const text = `${description} ${genres.join(" ")}`.toLowerCase();
  if (/(war|deadly|battle|murder|crime|danger|survival|violent|serial)/.test(text)) return "high";
  if (/(comedy|family|dating|bake|comfort)/.test(text)) return "low";
  return "medium";
}

function inferMaturity(certification) {
  if (["TV-MA", "R", "NC-17"].includes(certification)) return "adult";
  if (["TV-14", "PG-13", "TV-PG"].includes(certification)) return "teen";
  return "general";
}

function inferPopularity(row) {
  const imdbScore = Number(row.imdb_score || 0);
  const tmdbPopularity = Number(row.tmdb_popularity || 0);
  const releaseYear = Number(row.release_year || 0);
  const currentYear = new Date().getFullYear();

  if (releaseYear >= currentYear - 2) return "fresh";
  if (imdbScore >= 8 || Number(row.tmdb_score || 0) >= 8) return "prestige";
  if (tmdbPopularity >= 25) return "mainstream";
  return "cult";
}

function inferMoods(description, genres) {
  const text = `${description} ${genres.join(" ")}`.toLowerCase();
  const moods = [];

  if (/(funny|comedy|hilarious)/.test(text)) moods.push("fun");
  if (/(love|romance|relationship)/.test(text)) moods.push("sweet");
  if (/(murder|crime|thriller|survival|danger)/.test(text)) moods.push("tense");
  if (/(future|science fiction|time|mystery)/.test(text)) moods.push("mind-bending");
  if (/(family|friendship|heartwarming)/.test(text)) moods.push("comfort");

  return moods.length ? moods.slice(0, 2) : ["engaging"];
}
