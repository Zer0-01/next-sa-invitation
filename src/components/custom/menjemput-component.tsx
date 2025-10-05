const MenjemputComponent = () => {
  return (
    <section className="flex flex-col items-center text-center m-6 space-y-6">
      {/* Parents Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-serif font-semibold text-gray-800">
          Hamzah bin Ahmad
        </h1>
        <h1 className="text-lg font-serif text-gray-700">&</h1>
        <h1 className="text-2xl font-serif font-semibold text-gray-800">
          Jamaliah binti Jali
        </h1>
      </div>

      {/* Invitation Line */}
      <p className="max-w-md text-gray-600 leading-relaxed">
        Dengan penuh kesyukuran ke Hadrat Ilahi, kami ingin menjemput Dato’ /
        Datin / Tuan / Puan / Encik / Cik ke Majlis Perkahwinan anakanda kami
      </p>

      {/* Bride & Groom Section */}
      <div className="flex flex-col items-center justify-center border border-gray-200 bg-white/80 shadow-sm p-6 w-full max-w-sm rounded-2xl space-y-2">
        <h2 className="text-3xl font-serif font-bold text-gray-800 tracking-wide">
          Sahirah
        </h2>
        <h2 className="text-lg font-serif text-gray-700">&</h2>
        <h2 className="text-3xl font-serif font-bold text-gray-800 tracking-wide">
          Ariff
        </h2>
      </div>
    </section>
  );
};

export default MenjemputComponent;
