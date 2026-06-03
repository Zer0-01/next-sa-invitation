"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DocumentData } from "firebase/firestore"

interface MessageListComponentProps {
    messages: DocumentData[]
    status: "initial" | "loading" | "success" | "error"
}

const MessageListComponent = ({ messages, status }: MessageListComponentProps) => {
    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-muted-foreground tracking-widest text-xs uppercase">Loading Messages...</div>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex justify-center items-center h-64 text-red-400 text-xs tracking-widest uppercase">
                Unable to load messages
            </div>
        )
    }

    if (status === "success") {
        return messages.length > 0 ? (
            <div className="w-full max-w-2xl mx-auto h-[500px] overflow-y-auto px-4 custom-scrollbar">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.05
                            }
                        }
                    }}
                    className="flex flex-col space-y-6 py-4"
                >
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] px-5 py-3 shadow-md
                                        ${msg.isUser
                                            ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-none"
                                            : "bg-background border border-primary/10 text-foreground rounded-2xl rounded-tl-none shadow-primary/5"}`}
                                >
                                    <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${msg.isUser ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                                        {msg.name}
                                    </p>
                                    <p className="text-sm leading-relaxed font-light">
                                        {msg.message}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        ) : (
            <div className="flex justify-center items-center h-64 text-gray-400 text-xs tracking-widest uppercase">
                Waiting for the first wish
            </div>
        )
    }

    return null
}

export default MessageListComponent;
