import React, { useState, useCallback } from 'react';
import { FileUpload } from './FileUpload';
import { ScheduleResultDisplay } from './ScheduleResultDisplay';
import { generateScheduleForMedia } from '../services/geminiService';
import type { ScheduledPost } from '../types';
import { CalendarIcon } from './Icons';

interface ScheduleResult {
    file: File;
    data: ScheduledPost | null;
    error: string | null;
}

export const ContentScheduler: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [results, setResults] = useState<ScheduleResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleFilesChange = (selectedFiles: File[]) => {
        setFiles(selectedFiles);
        setResults([]);
    };

    const handleGenerateSchedule = useCallback(async () => {
        if (files.length === 0) {
            // This could be a more user-friendly error message
            console.error("No files selected.");
            return;
        }
        setIsLoading(true);
        setResults([]); // Clear previous results

        const schedulePromises = files.map(async (file) => {
            try {
                const data = await generateScheduleForMedia(file);
                return { file, data, error: null };
            } catch (err) {
                return { file, data: null, error: err instanceof Error ? err.message : "An unknown error occurred." };
            }
        });

        const settledResults = await Promise.all(schedulePromises);
        setResults(settledResults);
        setIsLoading(false);
    }, [files]);

    return (
        <div className="animate-fade-in space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-200">1. Upload Bulk Content</h2>
                <FileUpload onFileChange={() => {}} onFilesChange={handleFilesChange} multiple={true} />
                
                <button
                    onClick={handleGenerateSchedule}
                    disabled={files.length === 0 || isLoading}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Schedule...
                        </>
                    ) : (
                        <>
                            <CalendarIcon /> Generate Schedule
                        </>
                    )}
                </button>
            </div>

            {(isLoading || results.length > 0) && (
                 <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg">
                     <h2 className="text-2xl font-bold mb-4 text-gray-200">2. AI-Generated Schedule</h2>
                     <ScheduleResultDisplay results={results} isLoading={isLoading} />
                </div>
            )}
        </div>
    );
};
