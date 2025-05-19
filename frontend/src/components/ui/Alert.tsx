import { useEffect, useState } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  message: string;
  type?: AlertType;
  duration?: number;
  onClose?: () => void;
}

const alertStyles = {
  success: 'bg-success text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-accent text-white',
  info: 'bg-secondary text-white',
};

export const Alert = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300 ${alertStyles[type]}`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <p className="font-opensans text-body-desktop">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="ml-4 hover:opacity-80"
          aria-label="Cerrar alerta"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}; 