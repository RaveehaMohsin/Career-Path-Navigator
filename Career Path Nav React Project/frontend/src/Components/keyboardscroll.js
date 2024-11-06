import { useEffect } from 'react';

const KeyboardScroll = () => {
  useEffect(() => {
    const handleKeyScroll = (event) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowDown':
          window.scrollBy({ top: 50, behavior: 'smooth' });
          break;
        case 'ArrowUp':
          window.scrollBy({ top: -50, behavior: 'smooth' });
          break;
        case 'PageDown':
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          break;
        case 'PageUp':
          window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
          break;
        case 'Home':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'End':
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyScroll);
    };
  }, []);

  return null;
};

export default KeyboardScroll;
