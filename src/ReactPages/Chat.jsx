import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from '../firebase/client'; 

const db = getFirestore(app);

function Chat({ requestId, currentUser, studentData, counsellorData }) {

    // watch the chat collection sub collection under request collection
    // then display update the state with it so we can rerender the chat
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!requestId) return;

        const q = query(
            collection(db, 'requests', requestId, 'messages'),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [requestId]);

    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-3 ${message.sender === currentUser.email ? 'justify-end' : ''}`}>
                        {message.sender !== currentUser.email && (
                            <span className="relative flex shrink-0 overflow-hidden rounded-full border w-8 h-8">
                                <img src="/placeholder.svg" alt={message.sender === counsellorData.email ? "Counselor" : "Student"} />
                                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                    {message.sender === counsellorData.email ? counsellorData.name[0] : studentData.name[0]}
                                </span>
                            </span>
                        )}
                        <div className={`p-3 rounded-lg max-w-[70%] ${message.sender === currentUser.email ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <p>{message.text}</p>
                            <div className="text-xs text-gray-500 mt-1">
                                {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                            </div>
                        </div>
                        {message.sender === currentUser.email && (
                            <span className="relative flex shrink-0 overflow-hidden rounded-full border w-8 h-8">
                                <img src="/placeholder.svg" alt="You" />
                                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                    {currentUser.email[0]}
                                </span>
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <MessageChat requestId={requestId} currentUser={currentUser} />
        </>
    )
}

export default Chat;


function MessageChat({ requestId, currentUser }) {
    const [message, setMessage] = useState('');
    console.log(requestId);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (!message.trim()) return;  // Do not send empty messages

        try {
            await addDoc(collection(db, 'requests', requestId, 'messages'), {
                text: message,
                sender: currentUser.email,
                timestamp: serverTimestamp()
            });
            setMessage('');  // Clear the message input after sending
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    return (
        <div className="bg-gray-100 px-4 py-3 rounded-b-lg dark:bg-gray-900">
            <form onSubmit={handleSendMessage} className="relative">
                <textarea
                    className="flex w-full bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm dark:border-gray-800"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 absolute top-3 right-3 w-8 h-8"
                    type="submit" >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4">
                        <path d="m5 12 7-7 7 7"></path>
                        <path d="M12 19V5"></path>
                    </svg>
                    <span className="sr-only">Send</span>
                </button>
            </form>
        </div>
    )
}