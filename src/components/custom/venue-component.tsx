import { MapPin } from "lucide-react";

const VenueComponent = () => {
    return (
        <div className="flex flex-col items-center space-y-2 text-gray-700 text-center m-3">
            <MapPin className="w-6 h-6 text-pink-600" />
            <p className="text-base font-medium font-serif">
                Maeps Bistro, Serdang, <br /> 43400 Selangor
            </p>
        </div>
    );
};

export default VenueComponent;
