'use client'

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useMessages } from "@/hooks/use-messages";
import AttendanceComponent from "../components/attendance-component";
import MessageFormComponent from "../components/message-form-component";
import MessageListComponent from "../components/message-list-component";

const RSVPSection = () => {
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
        <section className="overflow-hidden px-6 py-24 text-foreground">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h2 className="font-serif text-[2.3rem] leading-none text-primary sm:text-[3rem]">
                        RSVP
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                        PENGESAHAN KEHADIRAN (RSVP) BOLEH DILAKUKAN DI BAWAH, KEHADIRAN TUAN/PUAN AMAT KAMI HARGAI:
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12, duration: 0.85 }}
                    className="flex w-full max-w-3xl flex-col items-center gap-4"
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18, duration: 0.85 }}
                    className="relative w-full max-w-4xl rounded-[2rem] border border-primary/10 bg-background/45 px-5 py-6 shadow-[0_18px_40px_rgba(33,31,24,0.07)] backdrop-blur-[1px] sm:px-8 sm:py-8"
                >
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/18 to-transparent" />
                    <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent" />
                    <div className="mb-6 flex flex-col items-center gap-2 text-center">
                        <h3 className="font-serif text-[1.85rem] leading-none text-primary sm:text-[2.2rem]">
                            Pesanan & Doa
                        </h3>
                    </div>
                    <MessageListComponent messages={messages} status={getMessagesStatus} />
                </motion.div>
            </div>
        </section>
    );
};

export default RSVPSection;
