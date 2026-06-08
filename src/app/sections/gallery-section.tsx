"use client";

import { motion } from "framer-motion";
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

const GallerySection = () => {
    const images = [
        "https://picsum.photos/id/1015/600/800",
        "https://picsum.photos/id/1024/600/800",
        "https://picsum.photos/id/1035/600/800",
        "https://picsum.photos/id/1043/600/800",
        "https://picsum.photos/id/1050/600/800",
    ]

    return (
        <section className="py-24 bg-background overflow-hidden border-t border-primary/10">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-16"
            >
                <div className="flex flex-col items-center gap-3 px-6">
                    <span className="text-[10px] font-medium tracking-[0.4em] text-muted-foreground uppercase text-center">Gallery</span>
                    <h2 className="text-2xl font-serif font-bold tracking-tight text-foreground text-center">Moments to Remember</h2>
                </div>

                <div className="flex w-full justify-center px-4">
                    <Carousel className="w-full max-w-sm">
                        <CarouselContent className="-ml-2">
                            {images.map((src, index) => (
                                <CarouselItem key={index} className="basis-full pl-2">
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
                    </Carousel>
                </div>
            </motion.div>
        </section>
    )
}

export default GallerySection
