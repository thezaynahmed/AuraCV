"use client";

import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { useResumeStore } from '@/store/useResumeStore';
import { DynamicTemplate } from '@/components/templates/DynamicTemplate';
import { FileText, ZoomIn, ZoomOut, Maximize2, Download, Loader2 } from 'lucide-react';

export function PDFPreview() {
  const { resume, isHydrated } = useResumeStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (!isHydrated || !resume) return;

    let isCancelled = false;

    const generatePDF = async () => {
      setIsGenerating(true);
      try {
        const blob = await pdf(<DynamicTemplate resume={resume} />).toBlob();
        if (!isCancelled) {
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        }
      } catch (error) {
        console.error('PDF generation error:', error);
      } finally {
        if (!isCancelled) {
          setIsGenerating(false);
        }
      }
    };

    // Debounce PDF generation
    const timeoutId = setTimeout(generatePDF, 500);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [resume, isHydrated, pdfUrl]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const handleFitWidth = () => setZoom(100);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${resume?.profile?.name || 'resume'}_resume.pdf`;
    link.click();
  };

  if (!isHydrated) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">Initializing...</p>
        </div>
      </div>
    );
  }

  if (isGenerating && !pdfUrl) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center space-y-4">
          <div className="relative">
            <FileText className="h-20 w-20 text-zinc-300 dark:text-zinc-700 mx-auto" />
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">Generating preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-zinc-900 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          
          <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400 min-w-[4rem] text-center">
            {zoom}%
          </span>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />

          <button
            onClick={handleFitWidth}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Fit to Width"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {isGenerating && (
            <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Updating...</span>
            </div>
          )}
          
          <button
            onClick={handleDownload}
            disabled={!pdfUrl}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            title="Download PDF"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-900 p-4">
        {pdfUrl ? (
          <div 
            className="mx-auto bg-white shadow-2xl"
            style={{ 
              width: `${zoom}%`,
              minWidth: '400px',
              maxWidth: '100%'
            }}
          >
            <iframe
              src={`${pdfUrl}#toolbar=0&view=FitH`}
              className="w-full border-none"
              style={{ 
                height: 'calc(100vh - 10rem)',
                minHeight: '600px'
              }}
              title="Resume Preview"
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 dark:text-zinc-500">Loading preview...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
