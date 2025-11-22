"use client";

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { DynamicTemplate } from '@/components/templates/DynamicTemplate';
import type { Resume } from '@/lib/types/resume';

interface PDFPreviewInnerProps {
  resume: Resume;
}

export default function PDFPreviewInner({ resume }: PDFPreviewInnerProps) {
  return (
    <PDFViewer width="100%" height="100%" className="border-none" showToolbar={false}>
      <DynamicTemplate resume={resume} />
    </PDFViewer>
  );
}
