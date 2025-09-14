import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './Icons';

interface FileUploadProps {
    onFileChange: (file: File | null) => void;
    onFilesChange?: (files: File[]) => void;
    multiple?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, onFilesChange, multiple = false }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    
    const processFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const validFiles = Array.from(files).filter(file => 
            file.type.startsWith('image/') || file.type.startsWith('video/')
        );
        
        if (validFiles.length === 0) {
            setFeedbackMessage('Invalid file type. Please upload images or videos.');
            onFileChange(null);
            if(onFilesChange) onFilesChange([]);
            return;
        }

        if (multiple && onFilesChange) {
            onFilesChange(validFiles);
            setFeedbackMessage(`${validFiles.length} file(s) selected.`);
        } else {
            onFileChange(validFiles[0]);
            setFeedbackMessage(validFiles[0].name);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    }, [multiple, onFileChange, onFilesChange]);
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 
                ${isDragging ? 'border-blue-500 bg-gray-700/50' : 'border-gray-600 hover:border-blue-500 hover:bg-gray-700/30'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                multiple={multiple}
            />
            <div className="flex flex-col items-center text-center">
                <UploadIcon />
                <p className="mt-2 text-sm text-gray-400">
                    <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                    {multiple ? 'Upload multiple Images or Videos' : 'Image or Video (PNG, JPG, MP4, etc.)'}
                </p>
                {feedbackMessage && <p className="mt-2 text-sm font-medium text-gray-300">{feedbackMessage}</p>}
            </div>
        </div>
    );
};
