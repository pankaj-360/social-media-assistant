
import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { ClipboardIcon, CheckIcon, CaptionIcon, HashtagIcon, TagIcon, LocationIcon, ClockIcon } from './Icons';

interface AnalysisResultProps {
    result: AnalysisResult | null;
    isLoading: boolean;
    error: string | null;
    previewUrl: string | null;
}

const ResultSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; textToCopy: string }> = ({ title, icon, children, textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mb-6 bg-gray-900/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    {icon}
                    <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
                </div>
                <button onClick={handleCopy} className="text-gray-400 hover:text-white transition">
                    {copied ? <CheckIcon /> : <ClipboardIcon />}
                </button>
            </div>
            <div className="text-gray-300">{children}</div>
        </div>
    );
};

export const AnalysisResultDisplay: React.FC<AnalysisResultProps> = ({ result, isLoading, error, previewUrl }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-400">AI is analyzing your content...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full bg-red-900/20 border border-red-500/50 text-red-300 p-4 rounded-lg">
                <p>Error: {error}</p>
            </div>
        );
    }
    
    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                {previewUrl && (
                    <div className="mb-4 max-w-full">
                        {previewUrl.startsWith('data:video') || previewUrl.endsWith('mp4') || previewUrl.endsWith('mov') ? (
                           <video src={previewUrl} controls className="max-h-64 rounded-lg mx-auto" />
                        ) : (
                           <img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg mx-auto" />
                        )}
                    </div>
                )}
                <p className="text-gray-500">Your analysis results will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fade-in">
            <ResultSection title="Caption" icon={<CaptionIcon />} textToCopy={result.caption}>
                <p className="whitespace-pre-wrap">{result.caption}</p>
            </ResultSection>

            <ResultSection title="Hashtags" icon={<HashtagIcon />} textToCopy={result.hashtags.join(' ')}>
                <div className="flex flex-wrap gap-2">
                    {result.hashtags.map((tag, index) => (
                        <span key={index} className="bg-blue-900/50 text-blue-300 text-sm font-medium px-2.5 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </ResultSection>

            <ResultSection title="Tags" icon={<TagIcon />} textToCopy={result.tags.join(' ')}>
                <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, index) => (
                        <span key={index} className="bg-purple-900/50 text-purple-300 text-sm font-medium px-2.5 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </ResultSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResultSection title="Location" icon={<LocationIcon />} textToCopy={result.location}>
                    <p>{result.location}</p>
                </ResultSection>

                <ResultSection title="Optimal Time" icon={<ClockIcon />} textToCopy={result.optimalTime}>
                    <p>{result.optimalTime}</p>
                </ResultSection>
            </div>
        </div>
    );
};
