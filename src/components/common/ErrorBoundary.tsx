"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error /* eslint-disable-line @typescript-eslint/no-unused-vars */): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-zinc-500">
            <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Something went wrong</h3>
            <p className="text-sm mb-4">The preview could not be rendered.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm hover:bg-zinc-800 transition-colors"
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
