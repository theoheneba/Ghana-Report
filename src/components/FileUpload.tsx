import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '../utils/cn';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
  className?: string;
}

export function FileUpload({ 
  files, 
  onChange, 
  maxFiles = 5,
  maxSize = 10,
  accept = '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx',
  className
}: FileUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, [files]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const isValidType = accept.split(',').some(type => {
        const extension = type.trim().toLowerCase();
        return file.name.toLowerCase().endsWith(extension);
      });

      const isValidSize = file.size <= maxSize * 1024 * 1024;

      if (!isValidType) {
        toast.error(`Invalid file type: ${file.name}`);
      }
      if (!isValidSize) {
        toast.error(`File too large: ${file.name}`);
      }

      return isValidType && isValidSize;
    });

    const totalFiles = [...files, ...validFiles].slice(0, maxFiles);
    onChange(totalFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 transition-colors hover:border-ghana-yellow dark:hover:border-ghana-yellow/70"
      >
        <input
          type="file"
          onChange={handleFileInput}
          multiple
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center text-center">
          <Upload className="w-10 h-10 text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Drag and drop files here or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Maximum {maxFiles} files, up to {maxSize}MB each
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: {accept}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}