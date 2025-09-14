import React, { useState, useCallback } from 'react';
import { FileUpload } from './FileUpload';
import { AnalysisResultDisplay } from './AnalysisResult';
import { analyzeMedia } from '../services/geminiService';
import type { AnalysisResult } from '../types';
import { SparklesIcon } from './Icons';

export const ContentAnalyzer: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (selectedFile: File | null) => {
        setFile(selectedFile);
        setAnalysisResult(null); 
        setError(null);
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleAnalyzeFile = useCallback(async () => {
        if (!file) {
            setError("Please upload a file first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await analyzeMedia(file, videoDuration > 0 ? videoDuration : null);
            setAnalysisResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [file, videoDuration]);

    const isVideo = file?.type.startsWith('video/');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-200">1. Upload Your Content</h2>
                <FileUpload onFileChange={handleFileChange} />
                
                {isVideo && (
                    <div className="mt-6">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                            Video Duration (in seconds)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            value={videoDuration}
                            onChange={(e) => setVideoDuration(Number(e.target.value))}
                            placeholder="e.g., 15"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                )}
                
                <AnalyzeButton onClick={handleAnalyzeFile} disabled={!file || isLoading}>
                    <SparklesIcon /> Analyze Content
                </AnalyzeButton>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg min-h-[400px]">
                <h2 className="text-2xl font-bold mb-4 text-gray-200">2. AI-Generated Results</h2>
                <AnalysisResultDisplay
                    result={analysisResult}
                    isLoading={isLoading}
                    error={error}
                    previewUrl={previewUrl}
                />
            </div>
        </div>
    );
};

const AnalyzeButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
    >
        {disabled ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
            </>
        ) : children }
    </button>
);
