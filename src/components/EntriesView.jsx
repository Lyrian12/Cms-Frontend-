import { motion } from "motion/react";
import { ArrowDownUp, ChevronDown, Plus, Search } from "lucide-react";

function Status({ value }) {
  const statusClass = value === "Published" ? "status published" : "status";

  return <span className={statusClass}>{value}</span>;
}

export default function EntriesView({
  entriesCount,
  filter,
  onCompose,
  onFilterChange,
  onOpenEntry,
  onQueryChange,
  onSortChange,
  query,
  sort,
  visibleEntries,
}) {
  return (
    <motion.section
      className="listing"
      key="listing"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="intro">
        <div>
          <h1>
            Entries <small>{entriesCount}</small>
          </h1>
        </div>
        <button className="primary compose" onClick={onCompose}>
          <Plus size={13} />
          New Entry
        </button>
      </div>

      <div className="toolbar">
        <label className="search">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search Entries"
            aria-label="Search entries"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
            />
          )}
        </label>

        <div className="filters">
          <label>
            <select
              value={filter}
              onChange={(event) => onFilterChange(event.target.value)}
              aria-label="Filter entries"
            >
              <option>All entries</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
            <ChevronDown size={12} />
          </label>

          <label className="sort">
            <ArrowDownUp size={13} />
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value)}
              aria-label="Sort entries"
            >
              <option>Recent first</option>
              <option>Oldest first</option>
            </select>
            <ChevronDown size={12} />
          </label>
        </div>
      </div>

      <div className="table" role="table" aria-label="Entries">
        <div className="table-head" role="row">
          <span>TITLE</span>
          <span>STATUS</span>
          <span>LAST MODIFIED</span>
          <span />
        </div>

        {visibleEntries.length ? (
          visibleEntries.map((entry, index) => (
            <motion.button
              className="entry-row"
              role="row"
              key={entry.id}
              onClick={() => onOpenEntry(entry.id)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
            >
              <span className="entry-name">
                <span>{entry.title}</span>
                <small>{entry.author}</small>
              </span>
              <span>
                <Status value={entry.status} />
              </span>
              <time>{entry.modified}</time>
            </motion.button>
          ))
        ) : (
          <div className="empty">No entries found. Try another search.</div>
        )}
      </div>

      <footer className="list-foot">
        <span>
          Showing <b>{visibleEntries.length}</b> of <b>142</b> entries
        </span>
        <span>
          Archived thoughts are hidden <i>·</i>{" "}
          <button onClick={() => onFilterChange("All entries")}>
            View archive
          </button>
        </span>
      </footer>
    </motion.section>
  );
}
