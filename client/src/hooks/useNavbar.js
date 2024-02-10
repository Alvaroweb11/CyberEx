import { useState, useEffect } from 'react';

export function useNavbar() {
    const [isOpaque, setIsOpaque] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const show = window.scrollY > 0;
        if (show !== isOpaque) {
          setIsOpaque(show);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isOpaque]);

    const backgroundColor = isOpaque ? 'rgba(17, 27, 41, 1)' : 'rgba(17, 27, 41, 0)';
    
    return backgroundColor;
  }
