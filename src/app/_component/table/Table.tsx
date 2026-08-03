'use client';

import { ReactNode } from 'react';
import cx from 'classnames';

interface TableProps {
  children: ReactNode;
  footer?: ReactNode;
  tableClassName?: string;
  containerClassName?: string;
}

export default function Table({
  children,
  footer,
  tableClassName,
  containerClassName,
}: TableProps) {
  return (
    <div className={cx('flex w-full flex-col gap-4', containerClassName)}>
      <div className="overflow-x-auto">
        <table className={cx('w-full border-collapse text-left text-sm', tableClassName)}>
          {children}
        </table>
      </div>
      {footer}
    </div>
  );
}
