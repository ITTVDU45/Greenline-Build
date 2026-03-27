import type { PropsWithChildren, ReactNode } from 'react';

type DeviceShellProps = PropsWithChildren<{
  className?: string;
  footer?: ReactNode;
  width?: number;
}>;

export function DeviceShell({
  children,
  className = '',
  footer,
  width = 390,
}: DeviceShellProps) {
  return (
    <main className="app-stage">
      <section
        className={`device-shell ${className}`.trim()}
        style={{ maxWidth: width, width: '100%' }}
      >
        {children}
        {footer}
      </section>
    </main>
  );
}
