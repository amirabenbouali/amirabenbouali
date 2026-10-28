'use client';

import { useState } from 'react';
import styles from './DesktopNotes.module.css';

export function CopyNoteLink() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className={styles.copyButton} onClick={copyLink} type="button">
      {copied ? 'Link copied' : 'Copy link'}
      <span aria-live="polite" className="sr-only">{copied ? 'Article link copied to clipboard' : ''}</span>
    </button>
  );
}

