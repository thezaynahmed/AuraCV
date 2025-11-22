"use client";

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit2, ChevronUp } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { ResumeSection, SectionItemType } from '@/lib/types/resume'; // Import SectionItemType

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onDelete: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function SortableItem({ id, children, title, subtitle, onDelete, isExpanded, onToggleExpand }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg mb-3 shadow-sm">
      <div className="flex items-center p-3 gap-3">
        <button {...attributes} {...listeners} className="cursor-grab text-zinc-400 hover:text-zinc-600 touch-none">
          <GripVertical className="h-5 w-5" />
        </button>
        
        <div className="flex-1">
           <h4 className="font-medium text-sm">{title}</h4>
           {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-1">
           <button onClick={onToggleExpand} className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
           </button>
           <button onClick={onDelete} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
              <Trash2 className="h-4 w-4" />
           </button>
        </div>
      </div>
      
      {isExpanded && (
         <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            {children}
         </div>
      )}
    </div>
  );
}

interface SortableListProps<K extends keyof ResumeSection> {
  items: SectionItemType<K>[];
  sectionKey: K;
  renderItem: (item: SectionItemType<K>) => React.ReactNode;
  getItemTitle: (item: SectionItemType<K>) => string;
  getItemSubtitle?: (item: SectionItemType<K>) => string;
}

export function SortableList<K extends keyof ResumeSection>({ items, sectionKey, renderItem, getItemTitle, getItemSubtitle }: SortableListProps<K>) {
  const { reorderSection, removeSectionItem } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      reorderSection(sectionKey, newOrder as SectionItemType<typeof sectionKey>[]);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id}
            title={getItemTitle(item)}
            subtitle={getItemSubtitle ? getItemSubtitle(item) : undefined}
            onDelete={() => removeSectionItem(sectionKey, item.id)}
            isExpanded={expandedId === item.id}
            onToggleExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
             {renderItem(item)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
