import { useMemo } from "react";

export default function useFilteredEvents(events, filters) {
  return useMemo(() => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (filters.category !== "All" && event.category !== filters.category) {
          return false;
        }

       
        if (filters.dateFilter === "Today") {
          if (eventDate.toDateString() !== today.toDateString()) return false;
        }
        if (filters.dateFilter === "Upcoming") {
          if (eventDate < today) return false;
        }
        if (filters.dateFilter === "Past") {
          if (eventDate >= today) return false;
        }

       
        if (filters.startDate) {
          const start = new Date(filters.startDate);
          if (eventDate < start) return false;
        }
        if (filters.endDate) {
          const end = new Date(filters.endDate);
          end.setHours(23, 59, 59, 999);
          if (eventDate > end) return false;
        }

      
        if (
          filters.search &&
          !event.title.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
     
      .sort((a, b) => {
        if (filters.sortOrder === "asc") {
          return a.title.localeCompare(b.title);
        }
        if (filters.sortOrder === "desc") {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [events, filters]);
}
