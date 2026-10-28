# Publishing notes

The notes section reads Markdown files from `content/notes`. Every published file is added to the notebook automatically; no index needs to be edited by hand.

## Add a post

Create `content/notes/my-note.md` with this frontmatter:

```md
---
title: "A clear, human title"
slug: "my-note"
date: "2026-10-28"
description: "One sentence used by the notebook index and page metadata."
category: "Building"
draft: true
coverImage: "/images/notes/my-note.jpg"
---

Write the article in Markdown here.
```

Valid categories are `Building`, `Learning`, and `Beyond the code`. `coverImage` is optional.

## Add images

Put article images in `public/images/notes`. Reference them from Markdown with an absolute public path:

```md
![A helpful description](/images/notes/my-image.jpg)
```

## Preview a draft

Run the existing development server:

```bash
npm run dev
```

Open `http://localhost:3000/notes?preview=1`. Draft previewing only works in development. A direct draft URL is `http://localhost:3000/notes/my-note?preview=1`.

## Publish

Set `draft: false`, then run the normal checks:

```bash
npm run lint
npm run build
```

Commit and push through the repository's existing deployment workflow. The public `/notes` page excludes every file whose `draft` value is not explicitly `false`.
