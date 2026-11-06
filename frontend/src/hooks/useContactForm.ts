import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { sendContactMessage, type ContactPayload } from '../lib/api';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const EMPTY: ContactPayload = { name: '', email: '', message: '' };
const RESET_AFTER_MS = 4000;

/** Contact form state machine: idle → loading → success | error → idle. */
export function useContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [status, setStatus] = useState<FormStatus>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const settle = (next: FormStatus) => {
    setStatus(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), RESET_AFTER_MS);
  };

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  const onSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setValues(EMPTY);
      settle('success');
    } catch (err) {
      console.error('Submission error:', err);
      settle('error');
    }
  };

  return { values, status, onChange, onSubmit };
}
