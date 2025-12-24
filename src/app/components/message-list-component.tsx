import { useMessageStore } from "@/lib/store/message-store"

const MessageListComponent = () => {
    const getMessagesStatus = useMessageStore((state) => state.getMessagesStatus)
    const messages = useMessageStore((state) => state.messages)


    if (getMessagesStatus === "loading") {
        return <div className="mt-6 text-center">Loading...</div>
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
            <div className="flex flex-col w-full max-w-md mt-6 h-96 overflow-y-auto space-y-4 px-2">
                {messages.map((msg, index) => (
                    <div key={index} className="flex flex-col py-3">
                        <p className="text-sm text-green-700 font-semibold tracking-wide">
                            {msg.name}
                        </p>
                        <p className="text-gray-900 mt-1 text-base leading-relaxed">
                            {msg.message}
                        </p>

                        {index < messages.length - 1 && (
                            <div className="border-b border-gray-200 mt-3" />
                        )}
                    </div>
                ))}
            </div>
        ) : (
            <div className="mt-6 text-center">Tiada pesanan lagi</div>
        )
    }

    return null
}

export default MessageListComponent