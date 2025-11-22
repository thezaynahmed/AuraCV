"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useResumeStore } from "@/store/useResumeStore";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, X } from "lucide-react";

// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500">Loading Preview...</div> }
);

export const ResumeEditor = () => {
  const { resume, isHydrated } = useResumeStore();
  const [activeTab, setActiveTab] = useState("personal");
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Prevent hydration mismatch
  if (!isHydrated) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-gray-50">
      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 flex flex-col h-full border-r border-gray-200 bg-white">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="font-bold text-lg">Resume Builder</h1>
          <Button variant="outline" size="sm" onClick={() => setShowMobilePreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>

        {/* Tabs & Form Area */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-gray-200 px-4 pt-2">
            <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-md px-4 py-2"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="max-w-2xl mx-auto pb-20">
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <h2 className="text-2xl font-bold mb-6 capitalize">{tab.label}</h2>
                  
                  {/* Placeholder for Form Content */}
                  <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
                    <p>Form inputs for <strong>{tab.label}</strong> will go here.</p>
                    <p className="text-sm mt-2">Sprint 4: Layout Skeleton (shadcn/ui)</p>
                  </div>

                  {/* Debug Info (Optional) */}
                  <div className="mt-8 p-4 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-40">
                    <p className="font-bold mb-2">Current State Preview:</p>
                    <pre>{JSON.stringify(resume[tab.id as keyof typeof resume] || resume, null, 2)}</pre>
                  </div>
                </TabsContent>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Right Panel - Preview */}
      <div className={`
        fixed inset-0 z-50 bg-white md:static md:z-auto md:block md:w-1/2 h-full
        ${showMobilePreview ? 'block' : 'hidden'}
      `}>
        <div className="h-full flex flex-col">
          {/* Mobile Preview Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <h2 className="font-bold">Live Preview</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowMobilePreview(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 bg-gray-100 p-4 md:p-8">
            <div className="h-full w-full shadow-2xl rounded-lg overflow-hidden">
              <PDFViewer width="100%" height="100%" className="border-none">
                <ProfessionalTemplate resume={resume} />
              </PDFViewer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
