import { database, ref, push } from '../utils/firebase';
import { isMobile } from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker from 'emoji-picker-react';

const Chat = ({ messages, message, setMessage, showPicker, setShowPicker, setUser, user, darkTheme }) => {
    const getSessionId = () => {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = uuidv4();
            localStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    };

    const sessionId = getSessionId();

    const handleSendMessage = async (e) => {
        if (e.key === 'Enter' && message.trim() !== '') {
            const messagesRef = ref(database, 'messages');

            await push(messagesRef, {
                text: message,
                timestamp: new Date().toISOString(),
                sessionId: sessionId,
                username: user.username,
                avatar: user.avatar,
            });

            setMessage('');
        }
    };

    const onEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
        setShowPicker(false);
    };

    return (
        <div className={`max-w-md mx-auto mt-5 p-8 rounded-lg border border-gray-200 shadow-lg ${darkTheme ? 'bg-zinc-700 text-white' : 'bg-yellow-100 text-black'}`}>
            {(messages && messages.length > 0) ?
                <>
                    {messages.map((msg) => (
                        <div className={`chat ${msg.sessionId === sessionId ? 'chat-end' : 'chat-start'}`} key={msg.id}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS chat bubble component"
                                        src={msg.avatar}
                                    />
                                </div>
                            </div>
                            <div className="chat-bubble m-1">
                                {msg.text}
                            </div>
                            <div className="chat-header text-[8px] text-slate-300 pr-1 pl-2">
                                {msg.username}
                            </div>
                        </div>
                    ))}
                </> : <>No messages yet 😔</>
            }
            <label className="input input-bordered flex items-center gap-2 mt-5">
                💬
                <div className="join">
                    <input
                        type="text" className="grow join-item"
                        placeholder="Write your message" value={message}
                        onChange={(e) => setMessage(e.target.value)} onKeyDown={handleSendMessage}
                    />
                    <span className={`ml-28 cursor-pointer ${!isMobile ? 'ml-20' : ''}`}
                        onClick={() => setShowPicker(val => !val)}>
                        😀
                    </span>
                </div>
            </label>
            {showPicker && (
                <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle="native"
                    reactionsDefaultOpen="true" skinTonesDisabled="false"
                    searchDisabled="true" theme="dark"
                />
            )}
        </div>
    )
}

export default Chat