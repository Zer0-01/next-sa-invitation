'use client'

import { motion } from "framer-motion";
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
        <section className="flex flex-col items-center py-24 bg-sage/5 text-foreground border-y border-primary/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4 mb-20 px-6"
            >
                <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground font-medium text-center">Wishes</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-center">Guest Book</h2>
                <p className="text-sm md:text-base text-muted-foreground text-center max-w-sm leading-relaxed font-light mt-2">
                    Leave a sweet message for the happy couple to cherish forever.
                </p>
            </motion.div>

            <MessageListComponent messages={messages} status={getMessagesStatus} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 mt-16 px-6"
            >
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
            </motion.div>
        </section>
    );
};

export default MessageComponent;

