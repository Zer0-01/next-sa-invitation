import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ProgrammeComponent = () => {
    return (
        <Card className="mx-auto my-8 w-full max-w-md rounded-xl shadow-lg">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-serif font-bold tracking-wide">
                    Programme
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm font-semibold text-gray-500">Lunch</span>
                    <span className="font-medium text-gray-900">11:00 AM – 5:00 PM</span>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm font-semibold text-gray-500">
                        Arrival of Bride & Groom
                    </span>
                    <span className="font-medium text-gray-900">12:30 PM</span>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm font-semibold text-gray-500">Ceremony</span>
                    <span className="font-medium text-gray-900">1:00 PM – 3:00 PM</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">Reception</span>
                    <span className="font-medium text-gray-900">3:30 PM – 5:00 PM</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProgrammeComponent
