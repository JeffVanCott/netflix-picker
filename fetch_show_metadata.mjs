#!/usr/bin/env node

import fs from "node:fs";
import vm from "node:vm";

const seedPath = new URL("../data/catalog.seed.js", import.meta.url);
const outputPath = new URL("../data/show-metadata.js", import.meta.url);

const rtSlugOverrides = {
  "3 Body Problem": "3_body_problem",
  "Arcane": "arcane_league_of_legends",
  "Blue Eye Samurai": "blue_eye_samurai",
  "Drive to Survive": "formula_1_drive_to_survive",
  "Formula 1: Drive to Survive": "formula_1_drive_to_survive",
  "Gilmore Girls": "gilmore_girls",
  "Is It Cake?": "is_it_cake",
  "Love on the Spectrum U.S.": "love_on_the_spectrum_us",
  "Midnight Mass": "midnight_mass",
  "Money Heist": "money_heist",
  "ONE PIECE": "one_piece_2023",
  "Physical: 100": "physical_100",
  "Russian Doll": "russian_doll",
  "Sex Education": "sex_education",
  "Selling Sunset": "selling_sunset",
  "Squid Game": "squid_game",
  "Stranger Things": "stranger_things",
  "Sweet Magnolias": "sweet_magnolias",
  "Sweet Tooth": "sweet_tooth",
  "The Crown": "the_crown",
  "The Diplomat": "the_diplomat",
  "The Gentlemen": "the_gentlemen_2024",
  "The Great British Baking Show": "the_great_british_baking_show",
  "The Lincoln Lawyer": "the_lincoln_lawyer",
  "The Night Agent": "the_night_agent",
  "The Queen's Gambit": "the_queens_gambit",
  "The Umbrella Academy": "the_umbrella_academy",
  "When Life Gives You Tangerines": "when_life_gives_you_tangerines",
  "Young Sheldon": "young_sheldon"
};

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(seedPath, "utf8"), sandbox);
const shows = sandbox.window.NETFLIX_SHOWS || [];

const metadata = {};
const misses = [];

for (const show of shows) {
  const title = show.title;
  const [tvMaze, rt] = await Promise.all([fetchTvMazeMetadata(show), fetchRottenTomatoesMetadata(show)]);

  metadata[title] = {
    image: tvMaze.image || rt.image || "",
    summary: tvMaze.summary || rt.summary || show.pitch || "",
    rottenTomatoesScore: rt.score || "",
    rottenTomatoesLabel: rt.label || "",
    rottenTomatoesUrl: rt.url || ""
  };

  if (!rt.score) {
    misses.push(title);
  }
}

fs.writeFileSync(outputPath, `window.SHOW_METADATA = ${JSON.stringify(metadata, null, 2)};\n`);

console.log(`Wrote metadata for ${shows.length} shows to ${outputPath.pathname}`);
if (misses.length > 0) {
  console.log(`Missing Rotten Tomatoes scores for ${misses.length} shows:`);
  console.log(misses.join(", "));
}

async function fetchTvMazeMetadata(show) {
  const response = await fetch(
    `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(show.title)}`,
    {
      headers: {
        "user-agent": "Codex Netflix TV Picker"
      }
    }
  );

  if (!response.ok) {
    return {};
  }

  const results = await response.json();
  const normalizedTitle = normalize(show.title);
  const matched =
    results.find(({ show: candidate }) => normalize(candidate.name) === normalizedTitle) ||
    results.find(({ show: candidate }) => normalize(candidate.name).includes(normalizedTitle)) ||
    results[0];

  if (!matched?.show) {
    return {};
  }

  return {
    image: matched.show.image?.original || matched.show.image?.medium || "",
    summary: stripTags(matched.show.summary || "")
  };
}

async function fetchRottenTomatoesMetadata(show) {
  const candidates = [
    rtSlugOverrides[show.title],
    slugify(show.title),
    `${slugify(show.title)}_${show.releaseYear}`
  ].filter(Boolean);

  for (const slug of candidates) {
    const url = `https://www.rottentomatoes.com/tv/${slug}`;
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 Codex Metadata Fetcher"
      }
    });

    if (!response.ok) {
      continue;
    }

    const html = await response.text();
    const parsed = parseRottenTomatoesPage(html);

    if (!parsed.title || !titlesLookRelated(show.title, parsed.title)) {
      continue;
    }

    return {
      ...parsed,
      url
    };
  }

  return {};
}

function parseRottenTomatoesPage(html) {
  const criticScoreMatch = html.match(/"criticsScore":\{[^}]*"score":"(\d+)"/);
  const audienceScoreMatch = html.match(/"audienceScore":\{[^}]*"score":"(\d+)"/);
  const synopsisMatch = html.match(/data-qa="synopsis-value">([^<]+)</);
  const titleMatch = html.match(/<title>([^<|]+)\s*\|\s*Rotten Tomatoes<\/title>/);
  const imageMatch = html.match(/"primaryImageUrl":"([^"]+)"/);
  const criticScore = criticScoreMatch?.[1] || "";
  const audienceScore = audienceScoreMatch?.[1] || "";

  return {
    score: criticScore || audienceScore,
    label: criticScore ? "Tomatometer" : audienceScore ? "RT Audience" : "",
    summary: synopsisMatch ? decodeHtml(synopsisMatch[1]) : "",
    title: titleMatch ? decodeHtml(titleMatch[1].trim()) : "",
    image: imageMatch?.[1]?.replaceAll("\\u002F", "/") || ""
  };
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[.'!?]/g, "")
    .replace(/[:]/g, " ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalize(input) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[.'!?]/g, "")
    .replace(/[:]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titlesLookRelated(left, right) {
  const a = normalize(left);
  const b = normalize(right);
  return a === b || a.includes(b) || b.includes(a);
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
