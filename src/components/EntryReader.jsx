import { motion } from "motion/react";
import { BookOpen, CalendarDays, UserRound } from "lucide-react";

export default function EntryReader({ entries, heading, selectedId }) {
  const selectedEntry =
    entries.find((entry) => entry.id === selectedId) ?? entries[0];

  return (
    <motion.section
      className="published-view"
      key={heading}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <article className="published-content">
        {selectedEntry ? (
          <>
            <div className="published-kicker">
              <BookOpen size={13} /> {selectedEntry.status} entry
            </div>
            <h1>{selectedEntry.title}</h1>
            <p className="published-excerpt">{selectedEntry.excerpt}</p>
            <div className="published-metadata">
              <div>
                <UserRound size={14} />
                <span>{selectedEntry.author}</span>
              </div>
              <div>
                <CalendarDays size={14} />
                <span>{selectedEntry.modified}</span>
              </div>
            </div>
            <div className="published-rule" />
            <div className="published-body">{selectedEntry.body}</div>
          </>
        ) : (
          <div className="published-empty">
            <BookOpen size={19} />
            <h1>No {heading.toLowerCase()} entries</h1>
            <p>Entries will appear here once they are available.</p>
          </div>
        )}
      </article>
    </motion.section>
  );
}
