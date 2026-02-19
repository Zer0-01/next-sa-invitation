"use client";

import { motion } from "framer-motion";
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
        <section className="py-24 bg-[#fdfdfd] overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-16"
            >
                <div className="flex flex-col items-center gap-3 px-6">
                    <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-400 font-medium text-center">Gallery</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 tracking-tight text-center">Moments to Remember</h2>
                </div>

                <div className="w-full flex justify-center px-4 md:px-0">
                    <Carousel className="w-full max-w-sm md:max-w-4xl">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {images.map((src, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative aspect-[3/4] overflow-hidden shadow-sm"
                                    >
                                        <Image
                                            src={src}
                                            alt={`Slide ${index + 1}`}
                                            fill
                                            priority={index === 0}
                                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        />
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-12 bg-white border-none shadow-sm hover:bg-gray-50" />
                        <CarouselNext className="hidden md:flex -right-12 bg-white border-none shadow-sm hover:bg-gray-50" />
                    </Carousel>
                </div>
            </motion.div>
        </section>
    )
}

export default CarouselComponent

