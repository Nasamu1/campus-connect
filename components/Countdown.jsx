import { useEffect, useState } from "react";

export default function Countdown() {
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  
  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => {
        const graduationEvent = data.find(
          (event) =>
            event.title.toLowerCase().includes("graduation") ||
            event.category.toLowerCase() === "academic"
        );
        if (graduationEvent) {
          setTargetDate(new Date(graduationEvent.date));
        }
      })
      .catch((err) => console.error("Error loading events.json:", err));
  }, []);

  
  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference <= 0) return null;

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!targetDate) {
    return (
      <section className="py-5 text-center bg-dark text-white">
        <h2 className="fw-bold">Loading Graduation Countdown...</h2>
      </section>
    );
  }

  if (!timeLeft) {
    return (
      <section className="py-5 text-center bg-dark text-white">
        <h2 className="fw-bold">🎉 Graduation Day Has Arrived!</h2>
      </section>
    );
  }

  return (
    <section className="d-flex justify-content-center align-items-center py-5">
      <div
        className="container text-center px-3 pt-4 mx-4"
        style={{
          backgroundColor: "#000000a3",
          borderRadius: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          maxWidth: "1000px",
        }}
      >
        <div className="row g-4">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="col-6 col-md-3">
              <h2
                style={{
                  fontSize: "2.8rem",
                  fontWeight: "bold",
                  color: "#ffc107",
                }}
              >
                {item.value}
              </h2>
              <p className="fw-bold text-white m-0">{item.label}</p>
            </div>
          ))}
        </div>

        
        <p className="mt-3 text-warning ">Till Graduation Day</p>
      </div>
    </section>
  );
}
