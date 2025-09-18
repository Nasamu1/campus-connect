function normalize(text) {
  return String(text || "").toLowerCase().trim();
}

export function fuzzyMatch(text, query) {
  const t = normalize(text);
  const q = normalize(query);

  if (!q) return true; 

  
  if (t.includes(q)) return true;

  
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every(token => t.includes(token));
}
