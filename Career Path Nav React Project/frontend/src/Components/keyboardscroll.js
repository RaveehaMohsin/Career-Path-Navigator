import { useEffect } from 'react';

const KeyboardScroll = () => {
  useEffect(() => {
    // Function to handle keyboard scroll
    const handleKeyScroll = (event) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
      }

      const scrollAmount = 200; // Higher scroll amount for faster response
      const pageScrollAmount = window.innerHeight * 2.5; // Larger amount for Page Up/Page Down keys

      switch (event.key) {
        case 'ArrowDown':
          window.scrollBy(0, scrollAmount);
          break;
        case 'ArrowUp':
          window.scrollBy(0, -scrollAmount);
          break;
        case 'PageDown':
          window.scrollBy(0, pageScrollAmount);
          break;
        case 'PageUp':
          window.scrollBy(0, -pageScrollAmount);
          break;
        case 'Home':
          window.scrollTo(0, 0);
          break;
        case 'End':
          window.scrollTo(0, document.body.scrollHeight);
          break;
        default:
          break;
      }
    };

    // Function to handle two-finger scroll (trackpad)
    const handleWheelScroll = (event) => {
      event.preventDefault();
      window.scrollBy(0, event.deltaY * 3); // Increase multiplier for faster two-finger scrolling
    };

    // Add event listeners for keyboard and wheel scrolling
    window.addEventListener('keydown', handleKeyScroll);
    window.addEventListener('wheel', handleWheelScroll, { passive: false });

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyScroll);
      window.removeEventListener('wheel', handleWheelScroll);
    };
  }, []);

  return null;
};

export default KeyboardScroll;
