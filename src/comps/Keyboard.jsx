import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

const Keyboard = () => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            const kbdElements = document.querySelectorAll('.kbd');

            kbdElements.forEach(kbd => {
                if (kbd.textContent.toLowerCase() === key) {
                    kbd.classList.add('highlight');
                    setTimeout(() => {
                        kbd.classList.remove('highlight');
                    }, 300);
                }
            });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={isMobile ? `max-w-screen-sm text-[0.77rem]` : ``}>
            <div className="my-1 flex justify-center gap-1">
                {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å'].map(key => (
                    <kbd key={key} className="kbd">{key}</kbd>
                ))}
            </div>
            <div className="my-1 flex justify-center gap-1">
                {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'].map(key => (
                    <kbd key={key} className="kbd">{key}</kbd>
                ))}
            </div>
            <div className="my-1 flex justify-center gap-1">
                {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(key => (
                    <kbd key={key} className="kbd">{key}</kbd>
                ))}
            </div>
        </div>
    )
}

export default Keyboard