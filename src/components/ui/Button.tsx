'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        'rounded px-4 py-2 font-semibold text-white fire-gradient shadow-[0_0_20px_rgba(255,122,0,.45)]',
        className
      )}
      {...props}
    />
  );
}
