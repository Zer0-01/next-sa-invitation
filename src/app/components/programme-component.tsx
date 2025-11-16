import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgrammeComponent = () => {
    return (
        <Card  className="m-8">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-serif font-bold mb-4">
                    Programme
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Lunch:</span>
                    <span className="text-gray-900 font-medium">11:00 AM - 5:00 PM</span>
                </div>

                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">The Arrival of Bride & Groom:</span>
                    <span className="text-gray-900 font-medium">12:30 PM</span>
                </div>

                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Ceremony:</span>
                    <span className="text-gray-900 font-medium">1:00 PM - 3:00 PM</span>
                </div>

                <div className="flex flex-col space-y-1">
                    <span className="text-gray-500 font-semibold">Reception:</span>
                    <span className="text-gray-900 font-medium">3:30 PM - 5:00 PM</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProgrammeComponent;
