'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autofillInformation?: string;
  title?: string;
  autofillPrediction?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autofillInformation, title, autofillPrediction, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...(autofillInformation && { 'autofill-information': autofillInformation })}
        {...(title && { title })}
        {...(autofillPrediction && { 'autofill-prediction': autofillPrediction })}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
