"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, FileText, X } from "lucide-react";
import { DownloadButton } from "./DownloadButton";

interface BuilderLayoutProps {
  children: React.ReactNode;
  preview: React.ReactNode;
}

export function BuilderLayout({ children, preview }: BuilderLayoutProps) {
  const { theme, setTheme } = useTheme();
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [editorWidth, setEditorWidth] = useState(35); // percentage
  const [isDragging, setIsDragging] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle mouse move for resizing
  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newWidth = (e.clientX / window.innerWidth) * 100;
    // Constrain between 20% and 70%
    if (newWidth >= 20 && newWidth <= 70) {
      setEditorWidth(newWidth);
    }
  }, [isDragging]);

  // Handle mouse up
  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-white dark:bg-zinc-950 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-zinc-900 font-bold text-xl">
              A
            </span>
          </div>
          <span className="font-bold text-lg tracking-tight">AuraCV</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <DownloadButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden h-[calc(100vh-3.5rem)]">
        {/* Editor Panel (Left) - Resizable */}
        <div 
          className="w-full lg:w-auto overflow-y-auto p-6 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          style={{ width: `${editorWidth}%` }}
        >
           {children}
        </div>

        {/* Draggable Divider */}
        <div
          className="hidden lg:flex w-1 bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-500 dark:hover:bg-blue-500 cursor-col-resize transition-all relative group items-center justify-center"
          onMouseDown={() => setIsDragging(true)}
          style={{
            backgroundColor: isDragging ? '#3b82f6' : undefined,
          }}
        >
          {/* Hover/Active indicator area */}
          <div className="absolute inset-y-0 -left-2 -right-2 group-hover:bg-blue-500/10" />
          
          {/* Grip dots indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-none z-10">
            <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 group-hover:bg-blue-500 transition-colors" />
            <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 group-hover:bg-blue-500 transition-colors" />
            <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 group-hover:bg-blue-500 transition-colors" />
            <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 group-hover:bg-blue-500 transition-colors" />
            <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 group-hover:bg-blue-500 transition-colors" />
          </div>
        </div>

        {/* Preview Panel (Right) - Auto-sized */}
        <div 
          className="hidden lg:flex bg-zinc-100 dark:bg-zinc-900 items-center justify-center p-4 overflow-hidden relative"
          style={{ width: `${100 - editorWidth}%` }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {preview}
          </div>
        </div>
      </main>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowMobilePreview(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 lg:hidden">
          <div className="bg-zinc-100 dark:bg-zinc-900 w-full h-full max-w-3xl rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-950">
              <h3 className="font-bold">Resume Preview</h3>
              <button
                onClick={() => setShowMobilePreview(false)}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex justify-center">
              {preview}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
