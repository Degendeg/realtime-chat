import { useState } from 'react'

const User = ({ imgNmbrs, username, setUserJoin, setUsername, avatarUrl, setAvatarUrl }) => {
    const [selectedAvatar, setSelectedAvatar] = useState('');

    const setAvatar = (e) => {
        const avatarSrc = e.target.src;
        localStorage.setItem('avatarUrl', avatarSrc);
        setSelectedAvatar(avatarSrc)
        setAvatarUrl(avatarSrc);
    }

    const setName = (name) => {
        setUsername(name);
        localStorage.setItem('username', name);
    }

    const setUserJoined = () => {
        setUserJoin(true);
        localStorage.setItem('userJoin', JSON.stringify({ username: username, avatar: avatarUrl }));
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <span className="font-semibold text-xl tracking-tight mb-6">Enter your username and pick avatar</span>
            <form className="mb-8">
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-400 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Jane Doe"
                        aria-label="Full name"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span className="flex-shrink-0 border-transparent border-4 text-teal-500 text-md py-1 px-2 rounded">
                        Avatar {avatarUrl ?
                            <span className="text-green-600 text-xl">&#10003;</span>
                            : <span className="text-red-600 text-xl">&times;</span>
                        }
                    </span>
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 disabled:opacity-50
                         text-sm border-4 text-white py-1 px-2 rounded cursor-pointer disabled:cursor-default"
                        type="button"
                        onClick={setUserJoined}
                        disabled={!username || !avatarUrl}
                    >
                        Join
                    </button>
                </div>
            </form>
            <div className="flex gap-4">
                {imgNmbrs.map((num, idx) => (
                    <img
                        key={idx}
                        src={`https://i.pravatar.cc/80?img=${num}`}
                        alt={`Avatar ${num}`}
                        className={`w-20 h-20 rounded-full cursor-pointer transition-all duration-200 
                            ${selectedAvatar === `https://i.pravatar.cc/80?img=${num}` ? 'border-4 border-green-500' : ''}`}
                        loading="lazy"
                        onClick={(e) => setAvatar(e)}
                    />
                ))}
            </div>
        </div>
    )
}

export default User