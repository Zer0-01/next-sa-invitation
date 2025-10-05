import { Clock3 } from "lucide-react";

const TimeComponent = () => {
    return (
        <div className="flex flex-col items-center space-y-2 text-gray-700 m-3">
            <Clock3 className="w-6 h-6 text-pink-600" />
            <p className="text-base font-medium font-serif">
                7.00 malam – 10.00 malam
            </p>
        </div>
    );
};

export default TimeComponent;
