import React from 'react';
import { X } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export function FilePreviewItem({ file, onRemove }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/');
  
  return (
    <div className="relative group">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-24 object-cover rounded"
          />
        ) : (
          <div className="w-full h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {file.name}
            </span>
          </div>
        )}
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}