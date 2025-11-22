import React from 'react';

type SectionShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function SectionShell({ title, description, children }: SectionShellProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold tracking-tight text-zinc-100">{title}</h3>
        <p className="text-zinc-400 mt-1">{description}</p>
      </div>
      <div className="border-t border-zinc-700/50 pt-6">{children}</div>
    </div>
  );
}
