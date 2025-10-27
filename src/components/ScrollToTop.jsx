import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Scroll to top on any route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll, 'smooth' for animated
    });
  }, [pathname, search, hash]); // Listen to all location changes

  return null;
}

export default ScrollToTop;