const DoaComponent = () => {
    return (
        <div className="flex flex-col items-center text-center gap-4 m-3 p-6 bg-gradient-to-b from-white to-pink-50 rounded-2xl shadow-sm border border-pink-100 max-w-xl">
            {/* Arabic Header */}
            <h1 className="text-2xl md:text-3xl font-arabic text-gray-800 tracking-wide">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </h1>

            {/* Divider */}
            <div className="w-16 border-t-2 border-pink-200 my-2"></div>

            {/* Malay Translation */}
            <p className="text-gray-700 leading-relaxed">
                Ya Allah, jadikanlah perkahwinan mereka sebagai perkahwinan yang
                diberkati, kebahagiaan yang kekal dan hubungan yang kuat di antara mereka.
            </p>

            <p className="text-gray-700 leading-relaxed">
                Jadikanlah perkahwinan mereka sebagai sebab untuk keredhaan-Mu dan Syurga.
                Serta kurniakan mereka kesabaran dan kasih sayang.
            </p>

            <p className="text-gray-800 font-semibold mt-2">Amin Ya Rabbal Alamin</p>
        </div>
    );
};

export default DoaComponent;
