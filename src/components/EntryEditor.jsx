import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { countWords } from "../domain/entries.js";

export default function EntryEditor({
  currentEntry,
  onBack,
  onChange,
  onPreview,
  onPublish,
  onSave,
  saved,
}) {
  return (
    <section className="editor">
      <section className="writing">
        <div className="editor-bar">
          <button className="back" onClick={onBack}>
            <ArrowLeft size={15} /> All entries
          </button>
          <div>
            <span className="saved-label">
              {saved ? (
                <>
                  <Check size={12} /> Saved
                </>
              ) : (
                "Draft"
              )}
            </span>
            <button className="quiet" onClick={onPreview}>
              <Eye size={15} /> Preview
            </button>
            <button className="primary save" onClick={onSave}>
              Save changes
            </button>
          </div>
        </div>

        <div className="writing-area">
          <div className="overline">
            ENTRY <i /> {currentEntry.status.toUpperCase()}
          </div>
          <input
            className="title-input"
            value={currentEntry.title}
            onChange={(event) => onChange("title", event.target.value)}
            aria-label="Entry title"
          />
          <div className="slug">
            <span>foundry.site/</span>
            <input
              value={currentEntry.slug}
              onChange={(event) => onChange("slug", event.target.value)}
              aria-label="Entry slug"
            />
          </div>
          <label className="field-label" htmlFor="excerpt">
            EXCERPT
          </label>
          <textarea
            id="excerpt"
            className="excerpt"
            value={currentEntry.excerpt}
            onChange={(event) => onChange("excerpt", event.target.value)}
            placeholder="A short introduction to this entry..."
            rows={2}
          />
          <div className="body-heading">
            <span>THE STORY</span>
            <span>⌘ ↵</span>
          </div>
          <textarea
            className="story"
            value={currentEntry.body}
            onChange={(event) => onChange("body", event.target.value)}
            placeholder="Begin with a thought..."
            aria-label="Entry content"
          />
          <div className="word-count">
            <span>Words: {countWords(currentEntry.body)}</span>
            <span>Last edited {currentEntry.modified.toLowerCase()}</span>
          </div>
        </div>
      </section>

      <aside className="details">
        <div className="details-title">
          <h2>Post details</h2>
          <button className="icon-btn" aria-label="More post options">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <label className="detail">
          <span>STATUS</span>
          <select
            value={currentEntry.status}
            onChange={(event) => onChange("status", event.target.value)}
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </label>
        <label className="detail">
          <span>AUTHOR</span>
          <select
            value={currentEntry.author}
            onChange={(event) => onChange("author", event.target.value)}
          >
            <option>Mara Ellis</option>
            <option>Jonah Park</option>
            <option>Nico Alvarez</option>
          </select>
        </label>
        <div className="detail">
          <span>LAST MODIFIED</span>
          <p>{currentEntry.modified}</p>
        </div>
        <div className="detail">
          <span>VISIBILITY</span>
          <p className="visibility">
            <i /> Public on publish
          </p>
        </div>

        <hr />
        <div className="note">
          <span>✳</span>
          <p>
            Thoughtful work takes time.
            <br />
            <b>Take all the space you need.</b>
          </p>
        </div>
        <button className="publish" onClick={onPublish}>
          {currentEntry.status === "Published"
            ? "Update published entry"
            : "Publish entry"}
          <ArrowUpRight size={15} />
        </button>
      </aside>
    </section>
  );
}
