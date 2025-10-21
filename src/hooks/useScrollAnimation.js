import { useState, useEffect, useRef } from "react";
/**
 * A custom hook that detects when an element is visible in the viewport.
 * It uses the Intersection Observer API for performance.
 * @returns {object} An object containing the ref to attach to the element
 * and a boolean `isVisible` that is true when the element is in view.
 */
export const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We only want to trigger the animation once
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
};
