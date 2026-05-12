const flavorQuestionByGenre = {
  comedy: {
    key: "flavor",
    prompt: "What kind of comedy are you after?",
    options: [
      { value: "witty", label: "Witty", hint: "Sharp writing and clever dialogue." },
      { value: "raunchy", label: "Raunchy", hint: "Messier, edgier, adults-only laughs." },
      { value: "dumb-fun", label: "Dumb fun", hint: "Big, goofy, low-pressure laughs." },
      { value: "heartfelt", label: "Heartfelt", hint: "Funny, but still warm." },
      { value: "chaotic", label: "Chaotic", hint: "A little unhinged in a good way." }
    ]
  },
  drama: {
    key: "flavor",
    prompt: "What kind of drama sounds right?",
    options: [
      { value: "emotional", label: "Emotional", hint: "Character pain, connection, and payoff." },
      { value: "prestige", label: "Prestige", hint: "Polished, acclaimed, and beautifully made." },
      { value: "tense", label: "Tense", hint: "Pressure, conflict, and edge." },
      { value: "hopeful", label: "Hopeful", hint: "Still dramatic, but not crushing." }
    ]
  },
  action: {
    key: "flavor",
    prompt: "What kind of action-thriller energy do you want?",
    options: [
      { value: "adrenaline", label: "Adrenaline", hint: "Fast, urgent, and gripping." },
      { value: "slick", label: "Slick", hint: "Cool, stylish, and confident." },
      { value: "gritty", label: "Gritty", hint: "Dark stakes and harder edges." },
      { value: "fun", label: "Fun", hint: "Big entertainment over bleakness." }
    ]
  },
  mystery: {
    key: "flavor",
    prompt: "What kind of mystery or sci-fi pull do you want?",
    options: [
      { value: "mind-bending", label: "Mind-bending", hint: "Big ideas and puzzle-box plotting." },
      { value: "twisty", label: "Twisty", hint: "Constant reveals and turns." },
      { value: "creepy", label: "Creepy", hint: "Uneasy, eerie, or unsettling." },
      { value: "epic", label: "Epic", hint: "Large-scale worldbuilding and scope." }
    ]
  },
  romance: {
    key: "flavor",
    prompt: "What kind of romance vibe sounds best?",
    options: [
      { value: "swoony", label: "Swoony", hint: "Big feelings, chemistry, and yearning." },
      { value: "sweet", label: "Sweet", hint: "Tender, sincere, and warm." },
      { value: "messy", label: "Messy", hint: "Complicated people and dramatic feelings." },
      { value: "cozy", label: "Cozy", hint: "Soft, easy, and comforting." }
    ]
  },
  reality: {
    key: "flavor",
    prompt: "What kind of unscripted watch are we in the mood for?",
    options: [
      { value: "cozy", label: "Cozy", hint: "Relaxed and comforting." },
      { value: "chaotic", label: "Chaotic", hint: "Big personalities and social drama." },
      { value: "heartfelt", label: "Heartfelt", hint: "Warm and genuinely human." },
      { value: "high-stakes", label: "High-stakes", hint: "Competition, pressure, and momentum." }
    ]
  }
};

const comedyBlendQuestion = {
  key: "comedyBlend",
  prompt: "Should we keep comedy-dramas in the mix?",
  options: [
    { value: "either", label: "Either is fine", hint: "Keep pure comedies and dramedies both alive." },
    { value: "pure-comedy", label: "Mostly laughs", hint: "Filter toward straighter comedies." },
    { value: "dramedy", label: "Open to dramedy", hint: "Let emotional or dramatic comedies rise." }
  ]
};

const baseQuestions = [
  {
    key: "genre",
    prompt: "What mood are we in for tonight?",
    options: [
      { value: "comedy", label: "Comedy", hint: "Jokes first, stress later." },
      { value: "drama", label: "Drama", hint: "Character-driven and emotional." },
      { value: "action", label: "Action / Thriller", hint: "Momentum, danger, and cliff-hangers." },
      { value: "mystery", label: "Mystery / Sci-Fi", hint: "Puzzles, twists, or high-concept worlds." },
      { value: "romance", label: "Romance / Warmth", hint: "Connection, comfort, and feelings." },
      { value: "reality", label: "Reality / Docuseries", hint: "Something unscripted." }
    ]
  },
  {
    key: "releaseWindow",
    prompt: "How recent should the show be?",
    options: [
      { value: "1", label: "Last year", hint: "Freshest possible." },
      { value: "5", label: "Last 5 years", hint: "Modern but not brand-new only." },
      { value: "10", label: "Last 10 years", hint: "Recent era picks." },
      { value: "20", label: "Last 20 years", hint: "Anything from the streaming age." },
      { value: "any", label: "Any era", hint: "Don’t rule out older classics." }
    ]
  },
  {
    key: "episodeLength",
    prompt: "How long should a typical episode feel?",
    options: [
      { value: "short", label: "Short", hint: "About 20-30 minutes." },
      { value: "standard", label: "Standard", hint: "About 30-50 minutes." },
      { value: "long", label: "Long", hint: "Often 50+ minutes." },
      { value: "any", label: "Any length", hint: "Length doesn’t matter tonight." }
    ]
  },
  {
    key: "commitment",
    prompt: "How big of a commitment are you up for?",
    options: [
      { value: "short", label: "Quick binge", hint: "Limited series or one short season." },
      { value: "medium", label: "A few seasons", hint: "Some runway, not a forever project." },
      { value: "long", label: "Long haul", hint: "Give us a world to live in." },
      { value: "any", label: "No preference", hint: "Let the best show win." }
    ]
  },
  {
    key: "language",
    prompt: "Subtitles tonight?",
    options: [
      { value: "english", label: "English only", hint: "Keep it effortless." },
      { value: "non-english", label: "Open to international shows", hint: "Subtitles are totally fine." },
      { value: "any", label: "Either works", hint: "No language preference." }
    ]
  },
  {
    key: "category",
    prompt: "What kind of format sounds best?",
    options: [
      { value: "scripted", label: "Scripted series", hint: "Fiction first." },
      { value: "reality", label: "Reality / competition", hint: "Social, easy, and unscripted." },
      { value: "docuseries", label: "Docuseries", hint: "Real stories with momentum." },
      { value: "animation", label: "Animation / anime", hint: "Stylized worlds or animated storytelling." },
      { value: "any", label: "Any format", hint: "Let the answers drive it." }
    ]
  },
  {
    key: "intensity",
    prompt: "How intense should this get?",
    options: [
      { value: "low", label: "Low intensity", hint: "Easygoing or cozy." },
      { value: "medium", label: "Moderate", hint: "Some stakes, nothing brutal." },
      { value: "high", label: "High intensity", hint: "Grip us immediately." },
      { value: "any", label: "No preference", hint: "Intensity isn’t the key factor." }
    ]
  },
  {
    key: "maturity",
    prompt: "How adult should the content be?",
    options: [
      { value: "general", label: "Keep it accessible", hint: "Great for mixed company." },
      { value: "teen", label: "Teen and up", hint: "Some edge is fine." },
      { value: "adult", label: "Adults only is fine", hint: "No need to filter." },
      { value: "any", label: "No preference", hint: "Whatever fits best." }
    ]
  },
  {
    key: "popularity",
    prompt: "Do you want a huge hit or something less obvious?",
    options: [
      { value: "mainstream", label: "Big crowd-pleaser", hint: "Popular and easy to recommend." },
      { value: "prestige", label: "Critically acclaimed", hint: "Sharp craft and strong reviews." },
      { value: "cult", label: "A little more hidden", hint: "Great pick that not everyone starts with." },
      { value: "fresh", label: "Something newer", hint: "Try a fresher title." },
      { value: "any", label: "Surprise me", hint: "Best match wins." }
    ]
  }
];

const state = {
  questionIndex: 0,
  answers: {},
  rerollOffset: 0,
  rankedResults: []
};

const questionNumber = document.querySelector("#question-number");
const questionText = document.querySelector("#question-text");
const questionSubtext = document.querySelector("#question-subtext");
const optionsContainer = document.querySelector("#options");
const progressFill = document.querySelector("#progress-fill");
const backButton = document.querySelector("#back-button");
const restartButton = document.querySelector("#restart-button");
const resultsSection = document.querySelector("#results");
const summaryContainer = document.querySelector("#answer-summary");
const cardsContainer = document.querySelector("#recommendation-cards");
const resultsRestartButton = document.querySelector("#results-restart-button");
const rerollButton = document.querySelector("#reroll-button");

const releaseYearNow = new Date().getFullYear();
const fallbackPosterSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffbf47" />
        <stop offset="55%" stop-color="#ff5a36" />
        <stop offset="100%" stop-color="#7fd9ff" />
      </linearGradient>
    </defs>
    <rect width="1200" height="750" rx="40" fill="url(#g)" />
    <circle cx="250" cy="180" r="120" fill="rgba(255,255,255,0.18)" />
    <circle cx="1020" cy="620" r="170" fill="rgba(255,255,255,0.14)" />
    <text x="80" y="610" fill="#fff7ef" font-family="Arial, sans-serif" font-size="82" font-weight="700">
      Netflix Night Pick
    </text>
  </svg>
`);
const questionSubtextByKey = {
  genre: "Start broad. We’ll get more specific fast.",
  flavor: "This is where the vibe gets more precise.",
  releaseWindow: "Fresh obsession or older favorite energy?",
  episodeLength: "Be honest about your attention span tonight.",
  commitment: "Are we flirting with a show or starting a relationship?",
  language: "Subtitles can either open the world or feel like homework.",
  category: "Same mood, different format.",
  comedyBlend: "This decides whether dramedies stay invited.",
  intensity: "Couch comfort or edge-of-seat chaos?",
  maturity: "A quick content-level gut check.",
  popularity: "Beloved hit, critic darling, or sneaky gem?"
};

function getActiveQuestions() {
  const selectedGenre = state.answers.genre;
  const flavorQuestion = flavorQuestionByGenre[selectedGenre];

  if (!flavorQuestion) {
    return baseQuestions;
  }

  if (selectedGenre === "comedy") {
    return [
      baseQuestions[0],
      flavorQuestion,
      ...baseQuestions.slice(1, 6),
      comedyBlendQuestion,
      ...baseQuestions.slice(7)
    ];
  }

  return [baseQuestions[0], flavorQuestion, ...baseQuestions.slice(1)];
}

function renderQuestion() {
  const activeQuestions = getActiveQuestions();
  const currentQuestion = activeQuestions[state.questionIndex];
  questionNumber.textContent = String(state.questionIndex + 1);
  questionText.textContent = currentQuestion.prompt;
  questionSubtext.textContent =
    questionSubtextByKey[currentQuestion.key] || "Pick the answer that feels most like tonight.";
  progressFill.style.width = `${((state.questionIndex + 1) / activeQuestions.length) * 100}%`;
  backButton.disabled = state.questionIndex === 0;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.innerHTML = `<strong>${option.label}</strong><span>${option.hint}</span>`;
    button.addEventListener("click", () => selectAnswer(currentQuestion.key, option.value));
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(key, value) {
  if (key === "genre" && state.answers.genre !== value) {
    delete state.answers.flavor;
    delete state.answers.comedyBlend;
  }

  state.answers[key] = value;
  state.rerollOffset = 0;
  state.rankedResults = [];
  const activeQuestions = getActiveQuestions();

  if (state.questionIndex < activeQuestions.length - 1) {
    state.questionIndex += 1;
    renderQuestion();
    return;
  }

  renderResults();
}

function getShowMetadata(show) {
  return (window.SHOW_METADATA && window.SHOW_METADATA[show.title]) || {};
}

function answerMatches(show, key, value) {
  if (value === "any") {
    return true;
  }

  if (key === "genre") {
    if (value === "reality") {
      return show.category === "reality" || show.category === "docuseries";
    }

    return show.genres.includes(value);
  }

  if (key === "flavor") {
    return (show.moods || []).includes(value);
  }

  if (key === "comedyBlend") {
    if (!show.genres.includes("comedy")) {
      return false;
    }

    if (value === "either") {
      return true;
    }

    if (value === "pure-comedy") {
      return !show.genres.includes("drama");
    }

    if (value === "dramedy") {
      return show.genres.includes("drama");
    }
  }

  if (key === "releaseWindow") {
    return releaseYearNow - show.releaseYear <= Number(value);
  }

  if (key === "language") {
    if (value === "non-english") {
      return show.language === "non-english";
    }

    return show.language === "english";
  }

  if (key === "maturity") {
    const order = ["general", "teen", "adult"];
    return order.indexOf(show.maturity) <= order.indexOf(value);
  }

  return show[key] === value;
}

function scoreShow(show) {
  let score = 0;
  const reasons = [];

  Object.entries(state.answers).forEach(([key, value]) => {
    if (value === "any") {
      score += 1;
      return;
    }

    const matched = answerMatches(show, key, value);
    if (matched) {
      score += 8;
      reasons.push(buildReason(key, value, show));
    } else {
      score -= key === "genre" || key === "category" ? 7 : 3;
    }
  });

  if (show.popularity === "prestige") {
    score += 1.5;
  }

  if (show.releaseYear >= releaseYearNow - 2) {
    score += 0.75;
  }

  return {
    ...show,
    score,
    reasons: reasons.filter(Boolean)
  };
}

function buildReason(key, value, show) {
  const labels = {
    genre: `matches your ${value} mood`,
    flavor: `${value} vibe matches`,
    comedyBlend:
      value === "pure-comedy"
        ? "leans more pure comedy"
        : value === "dramedy"
          ? "strong comedy-drama fit"
          : "works as comedy or dramedy",
    releaseWindow: `released in ${show.releaseYear}`,
    episodeLength: `${show.episodeLength} episode length`,
    commitment: `${show.commitment} commitment level`,
    language: show.language === "non-english" ? "great international option" : "easy English-language pick",
    category: `${show.category} format`,
    intensity: `${show.intensity} intensity level`,
    maturity: `${show.maturity} content fit`,
    popularity: `${show.popularity} profile`
  };

  return labels[key];
}

function renderResults() {
  if (state.rankedResults.length === 0) {
    state.rerollOffset = 0;
    state.rankedResults = window.NETFLIX_SHOWS.map(scoreShow).sort(
      (left, right) => right.score - left.score
    );
  }

  const ranked = getVisibleRecommendations();

  summaryContainer.innerHTML = "";
  Object.entries(state.answers).forEach(([key, value]) => {
    if (value === "any") {
      return;
    }

    const pill = document.createElement("div");
    pill.className = "answer-pill";
    pill.textContent = `${humanizeKey(key)}: ${humanizeValue(value)}`;
    summaryContainer.appendChild(pill);
  });

  cardsContainer.innerHTML = "";
  ranked.forEach((show, index) => {
    const metadata = getShowMetadata(show);
    const card = document.createElement("article");
    card.className = "show-card";

    const uniqueReasons = [...new Set(show.reasons)].slice(0, 4);
    const chips = uniqueReasons
      .map((reason) => `<span class="match-chip">${reason}</span>`)
      .join("");
    const poster = metadata.image || `data:image/svg+xml;charset=UTF-8,${fallbackPosterSvg}`;
    const summary = metadata.summary || show.pitch;
    const scoreLabel = metadata.rottenTomatoesLabel || "Rotten Tomatoes";
    const scoreMarkup = metadata.rottenTomatoesScore
      ? `<span class="score-pill">${scoreLabel} <strong>${metadata.rottenTomatoesScore}%</strong></span>`
      : `<span class="score-pill">Rotten Tomatoes <strong>N/A</strong></span>`;
    const linkMarkup = metadata.rottenTomatoesUrl
      ? `<a class="score-pill score-link" href="${metadata.rottenTomatoesUrl}" target="_blank" rel="noreferrer">View RT page</a>`
      : "";

    card.innerHTML = `
      <img class="show-poster" src="${poster}" alt="Poster for ${show.title}" loading="lazy" />
      <span class="show-rank">Pick ${index + 1}</span>
      <div>
        <h3>${show.title}</h3>
        <p class="show-meta">${show.releaseYear} • ${show.genres.slice(0, 3).join(" / ")}</p>
      </div>
      <div class="show-score-row">
        ${scoreMarkup}
        ${linkMarkup}
      </div>
      <p class="show-summary">${summary}</p>
      <div class="match-list">${chips}</div>
    `;

    cardsContainer.appendChild(card);
  });

  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getVisibleRecommendations() {
  if (state.rankedResults.length <= 3) {
    rerollButton.disabled = true;
    return state.rankedResults.slice(0, 3);
  }

  const offset = state.rerollOffset % state.rankedResults.length;
  let visible = state.rankedResults.slice(offset, offset + 3);

  if (visible.length < 3) {
    visible = [...visible, ...state.rankedResults.slice(0, 3 - visible.length)];
  }

  rerollButton.disabled = false;
  return visible;
}

function rerollRecommendations() {
  if (state.rankedResults.length <= 3) {
    return;
  }

  state.rerollOffset = (state.rerollOffset + 3) % state.rankedResults.length;
  renderResults();
}

function humanizeKey(key) {
  const labels = {
    genre: "Mood",
    flavor: "Flavor",
    comedyBlend: "Comedy style",
    releaseWindow: "Release window",
    episodeLength: "Episode length",
    commitment: "Commitment",
    language: "Language",
    category: "Format",
    intensity: "Intensity",
    maturity: "Content level",
    popularity: "Recommendation style"
  };

  return labels[key] || key;
}

function humanizeValue(value) {
  const labels = {
    short: "short",
    standard: "standard",
    long: "long",
    witty: "witty",
    raunchy: "raunchy",
    "dumb-fun": "dumb fun",
    heartfelt: "heartfelt",
    chaotic: "chaotic",
    either: "either",
    "pure-comedy": "mostly laughs",
    dramedy: "comedy-drama",
    emotional: "emotional",
    tense: "tense",
    hopeful: "hopeful",
    adrenaline: "adrenaline-heavy",
    slick: "slick",
    gritty: "gritty",
    "mind-bending": "mind-bending",
    twisty: "twisty",
    creepy: "creepy",
    epic: "epic",
    swoony: "swoony",
    sweet: "sweet",
    messy: "messy",
    cozy: "cozy",
    "high-stakes": "high-stakes",
    general: "accessible",
    teen: "teen+",
    adult: "adult",
    prestige: "critically acclaimed",
    mainstream: "big crowd-pleaser",
    cult: "less obvious",
    fresh: "newer"
  };

  return labels[value] || value;
}

function restartQuiz() {
  state.questionIndex = 0;
  state.answers = {};
  state.rerollOffset = 0;
  state.rankedResults = [];
  resultsSection.classList.add("hidden");
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

backButton.addEventListener("click", () => {
  if (state.questionIndex === 0) {
    return;
  }

  state.questionIndex -= 1;
  renderQuestion();
});

restartButton.addEventListener("click", restartQuiz);
resultsRestartButton.addEventListener("click", restartQuiz);
rerollButton.addEventListener("click", rerollRecommendations);

renderQuestion();
