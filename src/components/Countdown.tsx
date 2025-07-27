import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div
      className="inline-flex gap-4 sm:gap-8"
      role="timer"
      aria-label="Countdown to the wedding"
    >
      {timeUnits.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="text-4xl sm:text-5xl font-bold text-gray-800 font-serif">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="text-sm sm:text-base text-gray-600 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
