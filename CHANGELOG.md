# 📒 Changelog

### of [@igorskyflyer/valid-path](https://github.com/igorskyflyer/npm-valid-path)

<br>

## v3.0.0 (*03-Sep-2025*)

- **❌ BREAKING**: **stricter** validation (*might not apply to your case*):
  - rejects paths with reserved names in subfolders
  - over‑length segments
  - bad trailing chars
  - invalid colons

<br>

- **✨ feat**: add separator normalization for cross‑platform consistency
- **✨ feat**: enforce per‑segment and total path length limits for Windows and Unix
- **✨ feat**: add Windows‑specific rules for trailing space/dot, drive‑letter colon, and reserved device names
- **✨ feat**: add Unix‑specific `NUL` byte check per segment

<br>

- **✅ fix**: handle mixed separators correctly by normalizing before validation
- **✅ fix**: distinguish byte length (Unix) vs. character length (Windows) in limits
- **✅ fix**: reject empty or whitespace‑only paths early

<br>

- **💻 dev**: upgrade Node to >= v22
- **💻 dev**: upgrade dependencies
- **💻 dev**: add CHANGELOG
