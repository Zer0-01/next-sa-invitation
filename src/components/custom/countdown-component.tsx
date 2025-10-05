"use client";

import { useEffect, useState } from "react";

const CountdownComponent = () => {
    // 🎯 Target date (adjust as needed)
    const targetDate = new Date("2025-12-06T19:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // 🧠 Countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((distance / (1000 * 60)) % 60),
                seconds: Math.floor((distance / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    // ✨ UI
    return (
        <div className="grid grid-cols-7 gap-2 items-center justify-center text-center m-6">
            {/* Days */}
            <TimeBox label="Hari" value={timeLeft.days} />

            {/* Colon */}
            <Separator />

            {/* Hours */}
            <TimeBox label="Jam" value={timeLeft.hours} />

            <Separator />

            {/* Minutes */}
            <TimeBox label="Minit" value={timeLeft.minutes} />

            <Separator />

            {/* Seconds */}
            <TimeBox label="Detik" value={timeLeft.seconds} />
        </div>
    );
};

// 🧩 Reusable subcomponents
const TimeBox = ({
    label,
    value,
}: {
    label: string;
    value: number | string;
}) => (
    <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
            {String(value).padStart(2, "0")}
        </div>
        <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
);

const Separator = () => (
    <div className="flex items-center justify-center text-2xl font-bold text-gray-600">
        :
    </div>
);

export default CountdownComponent;
