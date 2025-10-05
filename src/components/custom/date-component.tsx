import { Calendar } from "lucide-react";

const DateComponent = () => {
  return (
    <div className="flex flex-col items-center space-y-2 text-gray-700 m-3">
      <Calendar className="w-6 h-6 text-pink-600" />
      <p className="text-base font-medium font-serif">
        Sabtu, 6 Disember 2025
      </p>
    </div>
  );
};

export default DateComponent;
