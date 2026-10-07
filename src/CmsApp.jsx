import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  FileText,
  Image,
  Settings2,
  UserRound,
} from "lucide-react";
import { useEntries } from "./application/useEntries.js";
import EntryEditor from "./components/EntryEditor.jsx";
import EntriesView from "./components/EntriesView.jsx";
import EntryReader from "./components/EntryReader.jsx";

const navigationItems = [
  { label: "Entries", icon: FileText, view: "entries" },
  { label: "Published", icon: BookOpen, view: "published" },
  { label: "Media", icon: Image, view: "media" },
  { label: "Settings", icon: Settings2, view: "settings" },
];

export default function CmsApp() {
  const [view, setView] = useState("entries");
  const [, setPreview] = useState(false);
  const [notice, setNotice] = useState("");

  const entriesState = useEntries();

  function composeEntry() {
    entriesState.addEntry();
    setView("editor");
  }

  function openEntry(entryId) {
    entriesState.setSelectedId(entryId);
    setView("reader");
  }

  function save() {
    entriesState.markSaved();
    setNotice("Changes saved");
    window.setTimeout(() => setNotice(""), 2200);
  }

  return (
    <main className="cms min-h-screen">
      <header className="masthead">
        <button className="wordmark" onClick={() => setView("entries")}>
          <span className="seal">f.</span>
          <span>
            foundry<span className="wordmark-light">/cms</span>
          </span>
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          {navigationItems.map(({ label, icon: Icon, view: targetView }) => (
            <button
              key={label}
              className={
                view === targetView ||
                (targetView === "entries" && view === "reader")
                  ? "current"
                  : ""
              }
              onClick={() => setView(targetView)}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>
        <button className="profile-button" aria-label="Profile">
          <UserRound size={17} />
        </button>
      </header>

      <AnimatePresence mode="wait">
        {view === "entries" && (
          <EntriesView
            entriesCount={entriesState.entries.length}
            filter={entriesState.filter}
            onCompose={composeEntry}
            onFilterChange={entriesState.setFilter}
            onOpenEntry={openEntry}
            onQueryChange={entriesState.setQuery}
            onSortChange={entriesState.setSort}
            query={entriesState.query}
            sort={entriesState.sort}
            visibleEntries={entriesState.visibleEntries}
          />
        )}

        {view === "editor" && (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <EntryEditor
              currentEntry={entriesState.currentEntry}
              onBack={() => setView("entries")}
              onChange={entriesState.updateCurrentEntry}
              onPreview={() => setPreview(true)}
              onPublish={entriesState.publishCurrentEntry}
              onSave={save}
              saved={entriesState.saved}
            />
          </motion.div>
        )}

        {view === "reader" && (
          <EntryReader
            entries={entriesState.entries}
            heading="Entries"
            selectedId={entriesState.selectedId}
          />
        )}

        {view === "published" && (
          <EntryReader
            entries={entriesState.publishedEntries}
            heading="Published"
            selectedId={entriesState.selectedId}
          />
        )}

        {view !== "entries" &&
          view !== "editor" &&
          view !== "reader" &&
          view !== "published" && (
            <motion.section
              className="placeholder"
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button className="back" onClick={() => setView("entries")}>
                <ArrowLeft size={15} /> Back to entries
              </button>
              <p className="kicker">FIELDNOTES JOURNAL</p>
              <h1>{view[0].toUpperCase() + view.slice(1)}</h1>
              <p>This space is ready for your next idea.</p>
            </motion.section>
          )}
      </AnimatePresence>

      <AnimatePresence>
        {notice && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
          >
            <Check size={15} />
            {notice}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
