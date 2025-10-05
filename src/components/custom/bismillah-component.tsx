import Image from "next/image";

const BismillahComponent = () => {
    return (
        <div className="relative w-full max-w-md mx-auto aspect-[3/1]">
            <Image
                src="/image-bismillah.jpg"
                alt="Image Bismillah"
                fill
                className="object-contain" // or object-cover / object-scale-down
                priority
            />
        </div>
    );
};

export default BismillahComponent;
