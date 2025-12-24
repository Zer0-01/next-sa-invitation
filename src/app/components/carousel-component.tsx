import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const CarouselComponent = () => {
    const images = [
        "https://picsum.photos/id/1015/600/800",
        "https://picsum.photos/id/1024/600/800",
        "https://picsum.photos/id/1035/600/800",
        "https://picsum.photos/id/1043/600/800",
        "https://picsum.photos/id/1050/600/800",
    ]

    return (
        <div className="flex justify-center overflow-hidden">
            <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md overflow-hidden">
                <CarouselContent className="gap-0">
                    {images.map((src, index) => (
                        <CarouselItem key={index} className="px-0">
                            <div className="relative aspect-[3/4] overflow-hidden  shadow-lg">
                                <Image
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    className="object-cover"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/80 backdrop-blur-md shadow-md hover:bg-white" />
                <CarouselNext className="right-2 bg-white/80 backdrop-blur-md shadow-md hover:bg-white" />
            </Carousel>
        </div>
    )
}

export default CarouselComponent
