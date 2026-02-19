"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  error: string | null;
}

const MAX_FILE_SIZE_MB = 5;

export function FileUpload({
  onFileSelect,
  selectedFile,
  error,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function validateFile(file: File): boolean {
    const isVCF = file.name.toLowerCase().endsWith(".vcf");
    const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

    return isVCF && isValidSize;
  }

  function handleFile(file: File) {
    if (!validateFile(file)) {
      onFileSelect(null);
      return;
    }

    onFileSelect(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      handleFile(files[0]);
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }

  function handleClick() {
    inputRef.current?.click();
  }

  function handleRemove(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onFileSelect(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm text-zinc-700">
        VCF File
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragging
            ? "border-zinc-400 bg-zinc-50"
            : "border-zinc-300 bg-white",
          error ? "border-red-300" : ""
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".vcf"
          onChange={handleFileInput}
          className="hidden"
        />

        {selectedFile ? (
          <div className="space-y-2">
            <div className="text-sm text-zinc-900">
              {selectedFile.name}
            </div>

            <div className="text-xs text-zinc-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-zinc-600"
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-sm text-zinc-700">
              Drag and drop VCF file here, or click to browse
            </div>

            <div className="text-xs text-zinc-500">
              Maximum file size: {MAX_FILE_SIZE_MB}MB
            </div>
          </div>
        )}
      </div>

      {error ? (
        <div className="text-sm text-red-600">
          {error}
        </div>
      ) : null}
    </div>
  );
}
