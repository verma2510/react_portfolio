import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

export type ContactStatus = 'idle' | 'loading' | 'success' | 'error';

const EMPTY = { name: '', email: '', message: '' };
const RESET_AFTER_MS = 4000;

/**
 * Contact form state + submission. Talks to the existing backend
 * endpoint: POST `${VITE_BACKEND_URL}/api/contact` with { name, email, message }.
 */
export function useContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState<ContactStatus>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const settle = (next: ContactStatus) => {
    setStatus(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), RESET_AFTER_MS);
  };

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setValues(EMPTY);
        settle('success');
      } else {
        settle('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      settle('error');
    }
  };

  return { values, status, onChange, onSubmit };
}
