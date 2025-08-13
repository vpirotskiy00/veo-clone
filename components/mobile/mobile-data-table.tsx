'use client';

import { useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface MobileDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  className?: string;
  cardView?: boolean;
}

export function MobileDataTable<T extends Record<string, unknown>>({
  data,
  columns,
  title,
  className,
  cardView = false,
}: MobileDataTableProps<T>) {
  const widthStyle = useMemo(() => ({ width: undefined }), []);
  if (cardView) {
    // Card view for mobile - each row becomes a card
    return (
      <div className={cn('space-y-4', className)}>
        {title && <h3 className='text-lg font-semibold'>{title}</h3>}
        {data.map((item, index) => (
          <Card key={index}>
            <CardContent className='pt-6'>
              <dl className='space-y-3'>
                {columns.map(column => (
                  <div
                    className='flex justify-between'
                    key={String(column.key)}
                  >
                    <dt className='text-sm font-medium text-muted-foreground'>
                      {column.label}
                    </dt>
                    <dd className='text-sm text-right font-medium'>
                      {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key])}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Horizontal scroll view for tables
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className='p-0'>
        <ScrollArea className='w-full whitespace-nowrap'>
          <div className='w-full'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  {columns.map(column => (
                    <th
                      className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'
                      key={String(column.key)}
                      style={
                        column.width ? { width: column.width } : widthStyle
                      }
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr className='border-b' key={index}>
                    {columns.map(column => (
                      <td className='p-4 align-middle' key={String(column.key)}>
                        {column.render
                          ? column.render(item[column.key], item)
                          : String(item[column.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
