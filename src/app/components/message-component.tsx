'use client'

import AttendanceComponent from "./attendance-component";
import { useEffect } from "react";
import { useMessages } from "@/hooks/use-messages";
import MessageListComponent from "./message-list-component";
import MessageFormComponent from "./message-form-component";

const MessageComponent = () => {
    const {
        messages,
        getMessagesStatus,
        getMessages,
        isSubmitting,
        name,
        setName,
        message,
        setMessage,
        isModalOpen,
        openModal,
        closeModal,
        submit
    } = useMessages()

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

            <MessageListComponent messages={messages} status={getMessagesStatus} />

            <div className="flex flex-col sm:flex-row items-center sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                <AttendanceComponent />
                <MessageFormComponent
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                    name={name}
                    setName={setName}
                    message={message}
                    setMessage={setMessage}
                    submit={submit}
                    isSubmitting={isSubmitting}
                />
            </div>
        </section>
    );
};

export default MessageComponent;
