// helpers/formatBlogContent.js
// Register this in your Express app so EJS can call it as a local function.
//
// In app.js / index.js add:
//   const { formatBlogContent } = require('./helpers/formatBlogContent');
//   app.locals.formatBlogContent = formatBlogContent;

function formatBlogContent(raw) {
  if (!raw) return "";

  // Split into lines for processing
  const lines = raw.split("\n");
  const output = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip truly empty lines (handled by paragraph spacing in CSS)
    if (line === "") {
      i++;
      continue;
    }

    // ── Section numbers like "01", "02" … "09", "10" on their own line
    //    followed by a heading text on the next line
    if (
      /^\d{2}$/.test(line) &&
      i + 1 < lines.length &&
      lines[i + 1].trim() !== ""
    ) {
      const num = line;
      const heading = escapeHtml(lines[i + 1].trim());
      output.push(`
                <div style="margin:2.75rem 0 0.5rem">
                    <span class="section-num">${num}</span>
                    <h2>${heading}</h2>
                </div>`);
      i += 2;
      continue;
    }

    // ── Blockquote: lines starting with > or wrapped in "quotes"
    if (line.startsWith(">")) {
      const qText = escapeHtml(line.slice(1).trim());
      output.push(`<blockquote><p>${qText}</p></blockquote>`);
      i++;
      continue;
    }

    // ── Pull quote: lines between --- markers
    if (line === "---") {
      const quoteLines = [];
      i++;
      while (i < lines.length && lines[i].trim() !== "---") {
        quoteLines.push(lines[i].trim());
        i++;
      }
      i++; // skip closing ---
      const qContent = quoteLines.join(" ");
      output.push(`
                <div class="pull-quote">
                    <p>${escapeHtml(qContent)}</p>
                </div>`);
      continue;
    }

    // ── Bold heading style: ALL CAPS short line (less than 80 chars, no period)
    if (
      line === line.toUpperCase() &&
      line.length < 80 &&
      !line.endsWith(".") &&
      line.length > 3
    ) {
      output.push(`<h3>${escapeHtml(line)}</h3>`);
      i++;
      continue;
    }

    // ── Regular paragraph — collect consecutive non-empty lines
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== "") {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      // Inline formatting within paragraph text
      let text = paraLines.join(" ");
      text = escapeHtml(text);
      // **bold** → <strong>
      text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      // *italic* → <em>
      text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
      // `code` → <code>
      text = text.replace(/`(.+?)`/g, "<code>$1</code>");

      output.push(`<p>${text}</p>`);
    }
  }

  return output.join("\n");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = { formatBlogContent };
