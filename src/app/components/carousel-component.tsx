import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

const CarouselComponent = () => {
    const images = [
        "https://picsum.photos/id/1015/600/800",
        "https://picsum.photos/id/1024/600/800",
        "https://picsum.photos/id/1035/600/800",
        "https://picsum.photos/id/1043/600/800",
        "https://picsum.photos/id/1050/600/800"
    ];

    return (
        <div className="w-full">
            <Carousel className="w-full">
                <CarouselContent className="!gap-0"> {/* Remove spacing */}
                    {images.map((src, index) => (
                        <CarouselItem key={index} className="!px-0 !mx-0"> {/* Remove padding/margin */}
                            <div className="relative w-full h-72 overflow-hidden shadow-md">
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

                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
