import { useMemo, useState } from "react";
import {
  createEntry,
  getPublishedEntries,
  getVisibleEntries,
  initialEntries,
  updateEntry,
} from "../domain/entries.js";

export function useEntries() {
  const [entries, setEntries] = useState(initialEntries);
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All entries");
  const [sort, setSort] = useState("Recent first");
  const [saved, setSaved] = useState(false);

  const currentEntry =
    entries.find((entry) => entry.id === selectedId) ?? entries[0];
  const visibleEntries = useMemo(
    () => getVisibleEntries(entries, query, filter, sort),
    [entries, filter, query, sort],
  );
  const publishedEntries = useMemo(
    () => getPublishedEntries(entries),
    [entries],
  );

  function updateCurrentEntry(field, value) {
    setEntries((currentEntries) =>
      updateEntry(currentEntries, selectedId, field, value),
    );
    setSaved(false);
  }

  function addEntry() {
    const entry = createEntry();

    setEntries((currentEntries) => [entry, ...currentEntries]);
    setSelectedId(entry.id);
    setSaved(false);

    return entry;
  }

  function markSaved() {
    setEntries((currentEntries) =>
      updateEntry(currentEntries, selectedId, "modified", "Just now"),
    );
    setSaved(true);
  }

  function publishCurrentEntry() {
    setEntries((currentEntries) =>
      updateEntry(currentEntries, selectedId, "status", "Published"),
    );
    setSaved(true);
  }

  return {
    addEntry,
    currentEntry,
    entries,
    filter,
    markSaved,
    publishCurrentEntry,
    publishedEntries,
    query,
    saved,
    selectedId,
    setFilter,
    setQuery,
    setSelectedId,
    setSort,
    sort,
    updateCurrentEntry,
    visibleEntries,
  };
}
