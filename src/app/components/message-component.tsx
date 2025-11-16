import { Button } from "@/components/ui/button";

const messages = [
    { sender: "Ahmad", content: "Selamat pengantin baru! Semoga bahagia hingga ke syurga." },
    { sender: "Fatimah", content: "Tahniah! Semoga berkat dan bahagia selalu." },
    { sender: "Ali", content: "Doa terbaik untuk kalian berdua. Semoga kekal hingga akhir hayat." },
    { sender: "Sara", content: "Semoga cinta kalian selalu mekar dan bahagia." },
    { sender: "Hafiz", content: "Selamat pengantin baru! Semoga dimurahkan rezeki." },
    { sender: "Nadia", content: "Semoga menjadi pasangan yang sakinah, mawaddah dan rahmah." },
    { sender: "Imran", content: "Tahniah! Semoga selalu dilimpahi rahmat Allah SWT." },
];

const MessageComponent = () => {
    return (
        <section className="flex flex-col items-center px-6 py-12 bg-white text-gray-900 space-y-8">
            <h2 className="text-3xl md:text-2xl font-serif font-bold tracking-wide text-center">
                Ucapan
            </h2>
            <p className="text-sm md:text-base text-gray-600 text-center max-w-sm leading-relaxed">
                Lihat ucapan dan kirim pesan manis untuk pasangan pengantin.
            </p>

            {/* Scrollable Message List */}
            <div className="flex flex-col w-full max-w-md mt-6 h-96 overflow-y-auto space-y-4 px-2">
                {messages.map((msg, index) => (
                    <div key={index} className="flex flex-col py-3">
                        <p className="text-sm text-green-700 font-semibold tracking-wide">{msg.sender}</p>
                        <p className="text-gray-900 mt-1 text-base leading-relaxed">{msg.content}</p>
                        {index < messages.length - 1 && (
                            <div className="border-b border-gray-200 mt-3" />
                        )}
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                <Button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Sahkan Kehadiran
                </Button>
                <Button className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    Tulis Ucapan
                </Button>
            </div>
        </section>
    );
};

export default MessageComponent;
