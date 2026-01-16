'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  easing?: (t: number) => number;
}

// Easing function (ease out cubic)
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  easing = easeOutCubic,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const startCounting = () => {
    startTimeRef.current = null;
    setIsComplete(false);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const currentCount = start + (end - start) * easedProgress;

      setCount(currentCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    // Start animation after delay
    setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return {
    count,
    formattedCount,
    isComplete,
    startCounting,
  };
}

// Hook that auto-starts when element is in view
export function useCountUpOnView({
  start = 0,
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  threshold = 0.3,
}: UseCountUpOptions & { threshold?: number }) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);

          const animate = (timestamp: number) => {
            if (!startTimeRef.current) {
              startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentCount = start + (end - start) * easedProgress;

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [start, end, duration, hasStarted, threshold]);

  const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return {
    ref: elementRef,
    count,
    formattedCount,
    hasStarted,
  };
}
