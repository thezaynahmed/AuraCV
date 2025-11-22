'use client';

import React from 'react';
import { GripVertical, Trash2, ArrowUp, ArrowDown, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type ListItemWrapperProps = {
  title: string;
  children: React.ReactNode;
  onDelete: () => void;
  onEdit?: () => void; // Added onEdit prop
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
};

export function ListItemWrapper({
  title,
  children,
  onDelete,
  onEdit, // Destructure onEdit
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: ListItemWrapperProps) {
  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 relative group">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <GripVertical className="w-5 h-5 text-zinc-600 transition-opacity opacity-0 group-hover:opacity-100" />
              <h4 className="font-semibold text-zinc-100">{title}</h4>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="absolute top-4 right-4 flex items-center gap-1">
        {onMoveUp && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveUp}
            disabled={isFirst}
            className="w-8 h-8 disabled:opacity-30"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        )}
        {onMoveDown && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMoveDown}
            disabled={isLast}
            className="w-8 h-8 disabled:opacity-30"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        )}
        {onEdit && ( // Conditionally render edit button
            <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
                className="w-8 h-8 text-zinc-500 hover:text-zinc-400"
            >
                <Edit2 className="w-4 h-4" />
            </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="w-8 h-8 text-red-500 hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
