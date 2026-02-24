import clsx from 'clsx';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('rounded-xl bg-smoke/70 p-4 fire-border backdrop-blur-sm', className)} {...props} />;
}
