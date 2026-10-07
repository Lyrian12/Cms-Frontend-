export const initialEntries = [
  {
    id: 1,
    title: "The weight of unspoken words",
    slug: "weight-of-unspoken-words",
    status: "Published",
    modified: "Oct 12, 2023",
    author: "Mara Ellis",
    excerpt:
      "On the things we carry quietly, and the relief of finally setting them down.",
    body: "Some things take up no room at all, and yet they make a home inside us. A thought left unsaid. A letter never sent. We learn to carry them so gracefully that even we forget their weight.",
  },
  {
    id: 2,
    title: "Morning light in an empty studio",
    slug: "morning-light-empty-studio",
    status: "Published",
    modified: "Oct 01, 2023",
    author: "Jonah Park",
    excerpt:
      "A quiet study of first light, familiar tools, and beginning again.",
    body: "At half past six the studio belongs to the light. It moves slowly across the workbench, finding every mark left by yesterday.",
  },
  {
    id: 3,
    title: "Draft: If we don't tell people how we feel",
    slug: "if-we-dont-tell-people-how-we-feel",
    status: "Draft",
    modified: "2 hours ago",
    author: "Mara Ellis",
    excerpt: "A few notes on the small courage of being understood.",
    body: "There is a particular kind of distance that grows in the space between what we mean and what we say.",
  },
  {
    id: 4,
    title: "On the permanence of graphite",
    slug: "permanence-of-graphite",
    status: "Published",
    modified: "Sep 28, 2023",
    author: "Nico Alvarez",
    excerpt: "What a pencil knows about mistakes, memory, and making a mark.",
    body: "Graphite can be erased, but never entirely. A faint impression remains, a small record of the first attempt.",
  },
  {
    id: 5,
    title: "A list of things I forget to say",
    slug: "things-i-forget-to-say",
    status: "Draft",
    modified: "Sep 24, 2023",
    author: "Mara Ellis",
    excerpt: "Notes from the margins of ordinary conversations.",
    body: "Thank you for waiting. I noticed. I remember. I should have said all of this sooner.",
  },
  {
    id: 6,
    title: "The texture of digital paper",
    slug: "texture-of-digital-paper",
    status: "Published",
    modified: "Sep 15, 2023",
    author: "Jonah Park",
    excerpt: "A notebook is a place, not just a surface.",
    body: "We keep making new kinds of paper because the old feeling matters: the pause before a page, the trace of a hand.",
  },
];

export function createEntry() {
  return {
    id: Date.now(),
    title: "A new thought, taking shape",
    slug: "a-new-thought-taking-shape",
    status: "Draft",
    modified: "Just now",
    author: "Mara Ellis",
    excerpt: "",
    body: "",
  };
}

export function getVisibleEntries(entries, query, filter, sort) {
  const normalizedQuery = query.toLowerCase().trim();
  const matchingEntries = entries.filter((entry) => {
    const matchesQuery = `${entry.title} ${entry.author}`
      .toLowerCase()
      .includes(normalizedQuery);
    const matchesFilter = filter === "All entries" || entry.status === filter;

    return matchesQuery && matchesFilter;
  });

  return sort === "Oldest first"
    ? [...matchingEntries].reverse()
    : matchingEntries;
}

export function getPublishedEntries(entries) {
  return entries.filter((entry) => entry.status === "Published");
}

export function updateEntry(entries, entryId, field, value) {
  return entries.map((entry) =>
    entry.id === entryId ? { ...entry, [field]: value } : entry,
  );
}

export function countWords(text) {
  const trimmedText = text.trim();
  return trimmedText ? trimmedText.split(/\s+/).length : 0;
}
