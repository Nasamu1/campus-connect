import { useState } from "react";
import EventCard from "./EventCard";
import EventFilter from "./EventFilter";
import useFilteredEvents from "../hooks/useFilteredEvents";

export default function EventsList({ eventsData }) {
  const [filters, setFilters] = useState({
    category: "All",
    dateFilter: "All",
    search: "",
    sortOrder: "none",
    startDate: "",
    endDate: "",
  });

  const filteredEvents = useFilteredEvents(eventsData, filters);

  return (
    <div className="container my-4">
      <EventFilter onFilter={setFilters} />

      <div className="row">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))
        ) : (
          <p className="text-center text-muted mt-4">
            No events found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
}
