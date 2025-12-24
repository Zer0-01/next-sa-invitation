'use client'

import { Button } from "@/components/ui/button";
import AttendanceComponent from "./attendance-component";
import { useEffect } from "react";
import { useMessageStore } from "@/lib/store/message-store";
import MessageListComponent from "./message-list-component";



const MessageComponent = () => {

    const getMessages = useMessageStore((state) => state.getMessages)

    useEffect(() => {
        getMessages()
    }, [getMessages])

    return (
        <section className="flex flex-col items-center px-6 py-12 bg-white text-gray-900 space-y-8">
            <h2 className="text-3xl md:text-2xl font-serif font-bold tracking-wide text-center">
                Ucapan
            </h2>
            <p className="text-sm md:text-base text-gray-600 text-center max-w-sm leading-relaxed">
                Lihat ucapan dan kirim pesan manis untuk pasangan pengantin.
            </p>

            <MessageListComponent />



            <div className="flex flex-col sm:flex-row items-center sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                <AttendanceComponent />
                <Button className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    Tulis Ucapan
                </Button>
            </div>
        </section>
    );
};

export default MessageComponent;
