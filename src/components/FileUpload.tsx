import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { FilePreviewItem } from './FileUploadPreview';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string;
}

export function FileUpload({ 
  files, 
  onChange, 
  maxFiles = 5,
  maxSize = 10,
  accept = '.jpg,.jpeg,.png,.pdf'
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
      const isValidType = accept.split(',').some(type => 
        file.name.toLowerCase().endsWith(type.toLowerCase()));
      const isValidSize = file.size <= maxSize * 1024 * 1024;
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
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 transition-colors hover:border-blue-500 dark:hover:border-blue-400"
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
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <FilePreviewItem
              key={index}
              file={file}
              onRemove={() => removeFile(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}