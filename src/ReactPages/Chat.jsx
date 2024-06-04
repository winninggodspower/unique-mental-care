function Chat({ currentUser, requestId }) {

    // watch the chat collection for changes
    // if chatrequestId is requestId
    //     then add

    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-start gap-3">
                    <span
                        className="relative flex shrink-0 overflow-hidden rounded-full border w-8 h-8">
                        <img src="/placeholder.svg" alt="Counselor" />
                        <span
                            className="flex h-full w-full items-center justify-center rounded-full bg-muted">SJ</span>
                    </span>
                    <div
                        className="bg-gray-100 p-3 rounded-lg max-w-[70%] dark:bg-gray-800">
                        <p>Hello, how are you feeling today?</p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            3:45 PM
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                    <div
                        className="bg-blue-100 p-3 rounded-lg max-w-[70%]">
                        <p>
                            I\'m doing okay, but I\'ve been feeling a bit anxious lately.
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            3:46 PM
                        </div>
                    </div>
                    <span
                        className="relative flex shrink-0 overflow-hidden rounded-full border w-8 h-8">
                        <img src="/placeholder.svg" alt="Patient" />
                        <span
                            className="flex h-full w-full items-center justify-center rounded-full bg-muted">JD</span>
                    </span>
                </div>
                <div className="flex items-start gap-3">
                    <span
                        className="relative flex shrink-0 overflow-hidden rounded-full border w-8 h-8">
                        <img src="/placeholder.svg" alt="Counselor" />
                        <span
                            className="flex h-full w-full items-center justify-center rounded-full bg-muted"
                        >SJ</span>
                    </span>
                    <div
                        className="bg-gray-100 p-3 rounded-lg max-w-[70%] dark:bg-gray-800">
                        <p>
                            I see. Let\'s talk through what\'s been causing your anxiety.
                            What have you been feeling or thinking about?
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            3:47 PM
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                    <div
                        className="bg-blue-100 p-3 rounded-lg max-w-[70%] dark:bg-blue-900 dark:text-white">
                        <p>
                            Well, I\'ve been worrying a lot about my job and finances. I\'m
                            afraid I might lose my job, and I\'m not sure I can pay my
                            bills.
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            3:48 PM
                        </div>
                    </div>
                    <span
                        className="relative flex shrink-0 overflow-hidden rounded-full border w-8 h-8">
                        <img src="/placeholder.svg" alt="Patient" />
                        <span
                            className="flex h-full w-full items-center justify-center rounded-full bg-muted">JD</span>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Chat
