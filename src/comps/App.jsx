import { useEffect, useState } from 'react';
import { database, ref, onValue } from '../utils/firebase';
import { isMobile } from 'react-device-detect';
import { getUniqueNumbers } from '../utils/nmbrs';
import Chat from './Chat';
import Keyboard from './Keyboard';
import User from './User';

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [join, setJoin] = useState(localStorage.getItem('join') === 'true');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { username: '', avatar: '' });
  const [showPicker, setShowPicker] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [imgNmbrs] = useState(getUniqueNumbers(5, 70));

  const chatProps = {
    messages,
    message,
    setMessage,
    showPicker,
    setShowPicker,
    user,
    setUser,
    imgNmbrs,
    darkTheme,
  };

  const userProps = {
    imgNmbrs,
    setUser,
    user,
    setJoin,
  }

  useEffect(() => {
    const messagesRef = ref(database, 'messages');

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  if (!loading && !join) {
    return (
      <User {...userProps} />
    )
  }

  return (
    <div className={`p-5 ${!isMobile ? 'mt-40' : 'mt-20'}`}>
      <input type="checkbox" value="retro" className="absolute top-0 right-0 toggle theme-controller mt-14 mr-14"
        onChange={() => setDarkTheme(darkTheme => !darkTheme)} />
      <Keyboard />
      <Chat {...chatProps} />
    </div>
  );
}

export default App;
