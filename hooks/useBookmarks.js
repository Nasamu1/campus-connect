
import { useState, useEffect } from "react";

const LS_KEY = "campusconnect.bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  const toggle = (id, payload = true) => {
    setBookmarks(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = payload;
      }
      return next;
    });
  };

  const isBookmarked = id => !!bookmarks[id];

  return { bookmarks, toggle, isBookmarked };
}
