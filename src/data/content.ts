// Every string shown on the page lives here. All copy is original, written for the
// fictional product "puff" (a little cloud for loose thoughts). Nothing here is taken
// or paraphrased from nudgy.run. Sub-page links point to "#".

export const site = {
  brand: "puff",
  title: "puff: catch the thought, let it float back",
  description: "An unofficial design study. puff is a fictional product.",
};

export const nav = {
  links: [
    { label: "How it works", href: "#what" },
    { label: "Benchmarks", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Privacy", href: "#privacy" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Get puff for Mac", href: "#" },
  floatingCta: "get it for mac",
};

export const hero = {
  titleLine1: "catch the thought,",
  titleLine2: "let it float back.",
  sub: "puff is a little cloud for loose thoughts on your Mac and iPhone. Toss one in, and it drifts back when it's useful.",
  primary: { label: "get it for mac", href: "#" },
  secondary: { label: "join the iphone list", href: "#invite" },
  micro: "Free during the beta. Needs macOS 15.",
  aside: "ooh, good one.",
  notes: [
    { title: "Plant the basil", time: "Sat 9 AM", body: "the sunny windowsill, not the porch." },
    { title: "Return the jacket", time: "Mon 5 PM", body: "receipt is in the glovebox." },
  ],
  phone: {
    date: "may 12",
    rings: [
      { value: "6", label: "Thoughts" },
      { value: "2", label: "Floating" },
      { value: "1", label: "Let go" },
    ],
    status: "light breeze",
    statusSub: "6 thoughts today",
    pause: "quiet mode",
    ask: "jot something",
    listTitle: "floating back",
    list: [
      { title: "Text Sam about Saturday", time: "6:00 PM", body: "You thought of it during lunch." },
      { title: "Gift for Mom", time: "Fri", body: "The speckled planter from the market." },
    ],
  },
  /** The looping notification cards (DESIGN-REFS §7.4). */
  cards: [
    { kind: "answer", question: "what was that café song?", answer: "“Blue Hour” by The Lantern Club.", action: "nice" },
    {
      kind: "listen",
      label: "jotting",
      sub: "keep talking…",
      title: "Saved: gift idea for Mom.",
      body: "A ceramic planter, the speckled one.",
    },
    {
      kind: "work",
      label: "tidying your week…",
      done: "week tidied",
      title: "Thursday, a bit lighter",
      body: "Two thoughts drifted to Friday.",
    },
    {
      kind: "suggest",
      label: "float this back at 6 pm?",
      done: "floats back · 6:00 pm",
      title: "Text Sam about Saturday",
      body: "It came up while you were making lunch.",
      yes: "sure",
      no: "later",
    },
  ] as const,
};

export const what = {
  eyebrow: "how it works",
  title: [{ text: "it catches. it holds." }, { text: "it returns.", tone: "soft" as const }],
  sub: "Three small jobs, done gently, so your head has a little more room.",
  previewLabel: "mock screen",
};

export type StoryStep = {
  index: string;
  label: string;
  title: string;
  tagline: string;
  body: string;
  screen: "today" | "lock" | "forecast" | "letgo";
};

type MacCopy = {
  label: string;
  title: string;
  tagline: string;
  body: string;
  notch: { status: string; statusSub: string; title: string; body: string; yes: string; no: string };
};

export const story: { steps: StoryStep[]; end: { word: string; line1: string; line2: string }; mac: MacCopy } = {
  steps: [
    {
      index: "1 / 4",
      label: "toss it in",
      title: "a drawer for loose thoughts.",
      tagline: "say it, type it, or snap it.",
      body: "Half an idea on a walk, a worry at 2 a.m., the name of a song from a café. puff takes it however it arrives and tucks it somewhere sensible.",
      screen: "today",
    },
    {
      index: "2 / 4",
      label: "drifts back",
      title: "back when it helps.",
      tagline: "not on a timer, on a hunch.",
      body: "Thoughts float back to your Lock Screen when they're likely to matter: the gift idea the week of a birthday, the packing list the night before a trip.",
      screen: "lock",
    },
    {
      index: "3 / 4",
      label: "sunday mornings",
      title: "your inner forecast.",
      tagline: "a weekly look at the weather in your head.",
      body: "Once a week puff sketches what's been on your mind: what's sunny, what's stormy, what keeps blowing back. Tap any part to clear it.",
      screen: "forecast",
    },
    {
      index: "4 / 4",
      label: "let it go",
      title: "or let it drift off.",
      tagline: "not every thought needs keeping.",
      body: "Swipe a thought away and puff lets it go for good. Clearing out is part of the point, so it never nags about the ones you dropped.",
      screen: "letgo",
    },
  ],
  end: { word: "puff", line1: "catch the thought.", line2: "let it float back." },
  mac: {
    label: "on the mac, too",
    title: "it floats by your notch.",
    tagline: "jot without leaving what you're doing.",
    body: "On a MacBook, puff waits beside the notch. Hover, type or talk and the thought lands without a window opening. Everything syncs to your phone only if you want it to.",
    notch: {
      status: "puff is here",
      statusSub: "press ⌥ space to jot",
      title: "Call the plumber",
      body: "You've mentioned the drip twice this week.",
      yes: "Float back tomorrow",
      no: "Let go",
    },
  },
};

export const screens = {
  today: {
    title: "Today",
    date: "Tuesday, May 12",
    upcoming: "drifting back soon",
    items: [
      { title: "Plant the basil", time: "sat 9:00 am", quote: "“basil on the sunny sill”" },
      { title: "Return the jacket", time: "mon 5:00 pm", quote: "“receipt's in the glovebox”" },
    ],
    dayTitle: "caught today",
    day: [
      { title: "Gift for Mom", time: "9:12 am" },
      { title: "That café song", time: "12:05 pm" },
      { title: "Plumber, again", time: "3:40 pm" },
      { title: "Trip packing", time: "6:30 pm" },
    ],
    footer: "6 thoughts",
    footerLink: "See all",
    ask: "Jot",
  },
  lock: {
    time: "9:41",
    date: "Tuesday, May 12",
    card: { label: "floating back", question: "Mom's birthday is Friday", answer: "You saved: the speckled planter.", open: "open", ok: "got it" },
  },
  forecast: {
    title: "this week's forecast",
    stats: "23 thoughts · 4 let go · mostly sunny",
    sharpTitle: "sunny",
    sharpBody: "the trip, the garden, Friday dinner",
    legend: ["Sunny", "Cloudy", "Stormy"],
    days: ["M", "T", "W", "T", "F", "S", "S"],
    recurringTitle: "keeps blowing back",
    recurring: [
      { title: "The leaky faucet.", quote: "mentioned 3 times" },
      { title: "Learning to bake bread.", quote: "mentioned twice" },
    ],
  },
  letgo: {
    title: "floating",
    items: [
      { title: "Text Sam about Saturday", time: "6:00 PM", body: "It came up while you were making lunch.", hint: "floats back tonight", action: "Keep it" },
      { title: "Maybe learn the ukulele?", time: "Sun", body: "Swiped away, gone for good.", gone: true },
    ],
    tabs: ["today", "forecast"],
  },
};

export const board = {
  eyebrow: "new: the shelf",
  title: "room for the keepers.",
  body: "Some thoughts come with things attached: a photo of a lamp, a recipe link, a voice memo from the car. Tap the cloud, pick one of seven ways in, and it sits on your shelf, grouped by what it's about. Ask for it later in your own words.",
  chat: {
    question: "where's that lamp I saved?",
    answer: "the brass desk lamp, sunday afternoon. you kept a review with it, too.",
  },
  fine: "Shelf items stay on your devices unless you turn on sync. Photo locations are stripped when they're added, and removing an item removes it everywhere.",
  fineLink: { label: "more on privacy ›", href: "#privacy" },
  hintOpen: "pick a way in.",
  hintClosed: "tap the cloud.",
  toggleOpen: "Tuck the options away",
  toggleClosed: "Show the options",
  shelfTitle: "your shelf",
  shelfMeta: "home 2 · wishlist 2 · food 1 · trips 1 · papers 1",
  ways: [
    { id: "camera", label: "camera", icon: "camera", color: "#ff453a", ink: "#fff", hint: "snap it. it lands on the shelf." },
    { id: "voice", label: "speak", icon: "mic", color: "#ffcc00", ink: "#0b0d12", hint: "talk it out. kept word for word." },
    { id: "photos", label: "photos", icon: "photos", color: "#34c759", ink: "#fff", hint: "pull something from your photos." },
    { id: "write", label: "write", icon: "pencil", color: "#111317", ink: "#fff", hint: "a quick line of text." },
    { id: "ask", label: "ask", icon: "ask", color: "#0a84ff", ink: "#fff", hint: "ask about anything on the shelf." },
    { id: "link", label: "link", icon: "link", color: "#af52de", ink: "#fff", hint: "paste a link to keep." },
    { id: "files", label: "files", icon: "folder", color: "#ff9500", ink: "#fff", hint: "drop in a file or a PDF." },
  ],
  items: [
    { id: "lamp", source: "photos", kind: "image", art: "lamp", caption: "brass desk lamp", tone: "#e9e3d3", ratio: "4 / 5" },
    { id: "thermos", source: "write", kind: "note", text: "for dad: the green thermos at the hardware store" },
    { id: "guide", source: "link", kind: "image", art: "lamps", caption: "Desk lamps, a buyer's guide", sub: "a design blog", tone: "#f1ede4", ratio: "4 / 3" },
    { id: "noodles", source: "voice", kind: "voice", text: "“the noodle place next to the bike shop”", sub: "a voice memo, kept word for word" },
    { id: "swatch", source: "camera", kind: "image", art: "swatch", caption: "paint swatches", tone: "#ffffff", ratio: "4 / 3" },
    { id: "pasta", source: "photos", kind: "image", art: "pasta", caption: "lemon pasta, weeknight version", tone: "#f3e6d2", ratio: "4 / 3" },
    { id: "lease", source: "files", kind: "file", caption: "lease renewal.pdf", sub: "6 pages" },
  ],
  drawnTag: "sketch",
} as const;

export const accounts = {
  eyebrow: "your calendars",
  title: "it reads the week ahead.",
  linePre: "it only looks. changes",
  lineCircled: "stay yours",
  linePost: ".",
  chips: ["Home calendar", "Work calendar", "Family, shared", "Reminders"],
  card: {
    meta: "Work calendar · Thursday",
    title: "Thursday looks packed",
    body: "Three thoughts drifted into the same afternoon. Want to spread them out?",
    action: "spread them out",
  },
};

export const manifesto = {
  first: "a thought you lose is a thought you have to think twice.",
  second: "puff holds onto yours until you're ready for it, and lets the rest drift away.",
  /** Mascots appear after this word index (counted across both sentences). */
  insertAfter: 13,
};

export const waitlist = {
  eyebrow: "the beta",
  title: "come float with us.",
  body: "We're opening the beta a few clouds at a time. Drop your email and we'll write when there's room for you.",
  label: "your email",
  placeholder: "you@example.com",
  button: "count me in",
  note: "Used for one invite email, nothing else. (This is a design study, so nothing is actually sent.)",
  invalid: "That doesn't look like an email yet.",
  thanksTitle: "you're in the queue.",
  thanksBody: "This is a demo, so your email stayed in this browser tab and went nowhere.",
  again: "use another email",
};

export const privacy = {
  eyebrow: "how it treats you",
  title: [{ text: "small, quiet," }, { text: "and yours.", tone: "soft" as const }],
  cards: [
    {
      mood: "happy",
      title: "it lives on your devices.",
      body: "Thoughts are stored on your phone and Mac. Sync between them is optional and end-to-end encrypted.",
    },
    {
      mood: "smile",
      title: "no ads, no feed.",
      body: "There's nothing to scroll and nobody to impress. puff earns its keep by staying out of the way.",
    },
    {
      mood: "wow",
      title: "take it all with you.",
      body: "Every thought, photo and memo exports as plain files in one tap, whenever you like.",
    },
    {
      mood: "sleepy",
      title: "quiet by default.",
      body: "No streaks, no badges, no buzzing. A thought floats back once, then waits patiently.",
    },
  ],
  improve: {
    eyebrow: "only if you want",
    title: "share a cloud.",
    body: "Start a shared cloud for a trip or a household. Everyone in it sees the same thoughts, and anyone can let one go. Your other clouds stay private.",
    saidLabel: "you jotted",
    said: "“we need a new shower curtain”",
    keptLabel: "shared with",
    keptParts: ["", "Home", " · you and ", "Jordan", ""],
    linePre: "only",
    lineCircled: "who you add",
    linePost: ". leave whenever you like.",
  },
  forget: {
    eyebrow: "a fresh start",
    title: "clear the sky.",
    body: "Hold the cloud for three seconds to clear out anything older than a month. puff shows you what will go first, and nothing leaves until you confirm.",
    saidLabel: "you said",
    said: "“puff, clear out the old stuff”",
    card: { meta: "clearing older thoughts…", title: "clear the sky?", body: "38 thoughts · 4 photos · before April", action: "clear it" },
    lineCircled: "clear skies",
    linePost: ", just like that.",
  },
  finePre: "The full details live in the",
  fineLink: { label: "privacy policy", href: "#" },
  finePost: ".",
};

export const faq = {
  eyebrow: "questions",
  title: [{ text: "asked and answered." }],
  items: [
    {
      q: "Is puff a real app?",
      a: "No. puff is fictional, invented for an unofficial design study. Nothing on this page is for sale, and the form doesn't send anything anywhere.",
    },
    {
      q: "What counts as a loose thought?",
      a: "Anything you'd otherwise carry around in your head: an idea, a worry, a name, a thing to buy, a question to look up later.",
    },
    {
      q: "How does it know when to float one back?",
      a: "It looks at dates, places and words in the thought itself, plus your calendars if you connect them. You can always nudge it to a specific time instead.",
    },
    {
      q: "Does it work offline?",
      a: "Yes. Catching and storing thoughts happens on the device. Sync waits until you're back online.",
    },
    {
      q: "Can I share a cloud with someone?",
      a: "Shared clouds are made for that. Invite someone by email, and either of you can leave at any time.",
    },
    {
      q: "Can I get everything out again?",
      a: "One tap exports every thought, photo and memo as plain files you can open anywhere.",
    },
    {
      q: "Is there a dark mode?",
      a: "There is, and the cloud changes color with the time of day.",
    },
    {
      q: "What does the beta cost?",
      a: "Nothing. If puff were real, a paid plan would come later and the beta would stay free for early testers.",
    },
    {
      q: "How do invites work?",
      a: "Leave your email in the form above. Invites go out in small batches as there's room.",
    },
  ],
  moreTitle: "Still curious? See",
  moreLinks: [
    { label: "Benchmarks", href: "#" },
    { label: "Pricing", href: "#" },
  ],
};

export const closing = {
  title: [{ text: "catch the thought." }, { text: "let it float back.", tone: "soft" as const }],
  sub: "On the Mac today. iPhone soon.",
  primary: { label: "get it for mac", href: "#" },
  secondary: { label: "join the iphone list", href: "#invite" },
  micro: "Free during the beta. Needs macOS 15.",
};

export const footer = {
  blurb: "A little cloud for loose thoughts, on your Mac and iPhone.",
  feedbackPre: "Say hi at",
  feedbackLink: { label: "hello@puff.example", href: "#" },
  feedbackMid: "or leave a note on the",
  feedbackBoard: { label: "idea board", href: "#" },
  columns: [
    {
      title: "puff",
      links: [
        { label: "How it works", href: "#what" },
        { label: "Benchmarks", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Privacy", href: "#privacy" },
        { label: "FAQ", href: "#faq" },
        { label: "Idea board", href: "#" },
      ],
    },
    {
      title: "Get started",
      links: [
        { label: "Get it for Mac", href: "#" },
        { label: "Join the iPhone list", href: "#invite" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
  ],
  copyright: "© 2026 puff, a fictional product.",
  disclaimer: "Unofficial design study of nudgy.run. Not affiliated.",
};
