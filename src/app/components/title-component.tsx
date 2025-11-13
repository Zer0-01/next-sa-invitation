const TitleComponent = () => {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-black bg-white px-6 py-10">
            <div className="relative z-10 flex flex-col items-center space-y-3">
                <p className="text-sm tracking-[0.3em] uppercase text-gray-600">
                    The Wedding Of
                </p>
                <h1 className="text-5xl font-serif font-bold tracking-wide">
                    Adam
                </h1>
                <p className="text-3xl font-serif font-light">&</p>
                <h1 className="text-5xl font-serif font-bold tracking-wide">
                    Hawa
                </h1>
                <p className="text-sm mt-6 tracking-wider text-gray-500">
                    Saturday • 12.12.26
                </p>
            </div>
        </section>
    );
};

export default TitleComponent;
