"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentData } from "firebase/firestore"
import { cn } from "@/lib/utils";

interface MessageListComponentProps {
    messages: DocumentData[]
    status: "initial" | "loading" | "success" | "error"
}

const bubblePalette = [
    {
        wrapper: "bg-[#f4efe7] border-[#d8cfbf]",
        accent: "bg-[#d7deca]",
        name: "text-[#44502a]",
    },
    {
        wrapper: "bg-[#f7f2ea] border-[#ddcfbf]",
        accent: "bg-[#e7d7c6]",
        name: "text-[#6d5745]",
    },
    {
        wrapper: "bg-[#eef1e7] border-[#cfd8c0]",
        accent: "bg-[#d6dfc7]",
        name: "text-[#3c4c27]",
    },
    {
        wrapper: "bg-[#f3ece6] border-[#d7c8bc]",
        accent: "bg-[#eadfd4]",
        name: "text-[#70594e]",
    },
] as const

const getBubbleIndex = (name: string, index: number) => {
    const normalized = name.trim()
    const hash = normalized.split("").reduce((total, char) => total + char.charCodeAt(0), 0)
    return (hash + index) % bubblePalette.length
}

const MessageListComponent = ({ messages, status }: MessageListComponentProps) => {
    const orderedMessages = [...messages].reverse()
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (status !== "success" || !scrollContainerRef.current) return

        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }, [orderedMessages, status])

    if (status === "loading") {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="animate-pulse text-muted-foreground tracking-widest text-xs uppercase">Loading Messages...</div>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex h-64 items-center justify-center text-red-400 text-xs tracking-widest uppercase">
                Unable to load messages
            </div>
        )
    }

    if (status === "success") {
        return messages.length > 0 ? (
            <div
                ref={scrollContainerRef}
                className="mx-auto h-[500px] w-full max-w-4xl overflow-y-auto px-2 sm:px-4 custom-scrollbar"
            >
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
                    className="flex flex-col gap-4 py-2 sm:gap-5 sm:py-4"
                >
                    <AnimatePresence>
                        {orderedMessages.map((msg, index) => (
                            (() => {
                                const palette = bubblePalette[getBubbleIndex(String(msg.name ?? ""), index)]
                                const alignRight = index % 3 === 1

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className={cn("flex", alignRight ? "justify-end" : "justify-start")}
                                    >
                                        <div
                                            className={cn(
                                                "relative max-w-[92%] rounded-[1.75rem] border px-4 py-4 shadow-[0_10px_30px_rgba(33,31,24,0.06)] sm:max-w-[78%] sm:px-5",
                                                alignRight ? "rounded-br-md" : "rounded-bl-md",
                                                palette.wrapper,
                                            )}
                                        >
                                            <div className="mb-3 flex items-center gap-3">
                                                <div className={cn("flex size-8 items-center justify-center rounded-full text-[11px] font-semibold uppercase text-primary", palette.accent)}>
                                                    {String(msg.name ?? "?").trim().charAt(0) || "?"}
                                                </div>
                                                <p className={cn("text-[11px] font-semibold uppercase tracking-[0.24em]", palette.name)}>
                                                    {msg.name}
                                                </p>
                                            </div>
                                            <p className="text-sm leading-7 text-foreground/85">
                                                {msg.message}
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            })()
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        ) : (
            <div className="flex h-64 items-center justify-center text-gray-400 text-xs tracking-widest uppercase">
                Waiting for the first wish
            </div>
        )
    }

    return null
}

export default MessageListComponent;
