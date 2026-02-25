'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
      <button
        className={clsx(
          'rounded px-4 py-2 font-semibold text-white fire-gradient shadow-[0_0_20px_rgba(255,122,0,.45)] disabled:opacity-60',
          className
        )}
        {...props}
      />
    </motion.div>
  );
}
