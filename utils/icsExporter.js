function formatDate(date) {
  const pad = n => String(n).padStart(2, "0");
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

export function eventToICS(event) {
  const start = formatDate(new Date(event.start));
  const end = formatDate(new Date(event.end));
  const uid = `${event.id || Date.now()}@campusconnect`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CampusConnect//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.shortDescription || "").replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location || "Campus"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Blob([ics], { type: "text/calendar;charset=utf-8" });
}
