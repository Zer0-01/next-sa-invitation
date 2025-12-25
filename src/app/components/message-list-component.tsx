import { useMessageStore } from "@/lib/store/message-store"

const MessageListComponent = () => {
    const getMessagesStatus = useMessageStore((state) => state.getMessagesStatus)
    const messages = useMessageStore((state) => state.messages)

    if (getMessagesStatus === "loading") {
        return <div className="mt-6 text-center text-gray-500">Loading...</div>
    }

    if (getMessagesStatus === "error") {
        return (
            <div className="mt-6 text-center text-red-600">
                Something went wrong
            </div>
        )
    }

    if (getMessagesStatus === "success") {
        return messages.length > 0 ? (
            <div className="flex flex-col w-full max-w-md mt-6 h-96 overflow-y-auto px-2 space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-xl break-words
                                ${msg.isUser ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-bl-none"}`}
                        >
                            <p className="text-sm font-semibold">{msg.name}</p>
                            <p className="mt-1 text-base">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="mt-6 text-center text-gray-500">No messages yet</div>
        )
    }

    return null
}

export default MessageListComponent
