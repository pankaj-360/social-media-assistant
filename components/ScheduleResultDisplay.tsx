import React, { useState, useMemo } from 'react';
import type { ScheduledPost } from '../types';
import { ClipboardIcon, CheckIcon, CaptionIcon, HashtagIcon, TitleIcon, ClockIcon, YouTubeIcon } from './Icons';

interface ScheduleResult {
    file: File;
    data: ScheduledPost | null;
    error: string | null;
}

interface ScheduleResultDisplayProps {
    results: ScheduleResult[];
    isLoading: boolean;
}

const ResultCard: React.FC<{ result: ScheduleResult }> = ({ result }) => {
    const previewUrl = useMemo(() => URL.createObjectURL(result.file), [result.file]);

    if (result.error) {
        return (
            <div className="bg-red-900/20 border border-red-500/50 text-red-300 p-4 rounded-lg">
                <p className="font-semibold">{result.file.name}</p>
                <p>Error: {result.error}</p>
            </div>
        )
    }

    if (!result.data) return null;

    const { title, description, caption, youtubeTags, hashtags, optimalTime } = result.data;

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                {result.file.type.startsWith('video/') ? (
                    <video src={previewUrl} controls className="w-full rounded-lg" />
                ) : (
                    <img src={previewUrl} alt={result.file.name} className="w-full rounded-lg" />
                )}
                 <div className="mt-2 text-center text-sm text-gray-400 truncate">{result.file.name}</div>
            </div>
            <div className="md:col-span-2 space-y-4">
                <ResultSection title="Title" icon={<TitleIcon />} textToCopy={title}><p>{title}</p></ResultSection>
                <ResultSection title="YouTube Description" icon={<CaptionIcon />} textToCopy={description}><p className="whitespace-pre-wrap">{description}</p></ResultSection>
                <ResultSection title="Instagram Caption" icon={<CaptionIcon />} textToCopy={caption}><p className="whitespace-pre-wrap">{caption}</p></ResultSection>
                <ResultSection title="YouTube Tags" icon={<YouTubeIcon />} textToCopy={youtubeTags.join(', ')}>
                    <TagsDisplay tags={youtubeTags} color="red" />
                </ResultSection>
                 <ResultSection title="Hashtags" icon={<HashtagIcon />} textToCopy={hashtags.join(' ')}>
                    <TagsDisplay tags={hashtags} color="blue" />
                </ResultSection>
                <ResultSection title="Optimal Time (IST)" icon={<ClockIcon />} textToCopy={optimalTime}><p className="font-bold text-lg text-purple-300">{optimalTime}</p></ResultSection>
            </div>
        </div>
    );
};

export const ScheduleResultDisplay: React.FC<ScheduleResultDisplayProps> = ({ results, isLoading }) => {
     if (isLoading && results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-400">AI is generating your schedule...</p>
                <p className="text-sm text-gray-500">This may take a moment for multiple files.</p>
            </div>
        );
    }
    
    if (results.length === 0) return null;

    return (
        <div className="space-y-6">
            {results.map((result, index) => (
                <ResultCard key={index} result={result} />
            ))}
        </div>
    );
};


const ResultSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; textToCopy: string }> = ({ title, icon, children, textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">{icon}</span>
                    <h4 className="text-md font-semibold text-gray-300">{title}</h4>
                </div>
                <button onClick={handleCopy} className="text-gray-500 hover:text-white transition" aria-label={`Copy ${title}`}>
                    {copied ? <CheckIcon /> : <ClipboardIcon />}
                </button>
            </div>
            <div className="text-gray-300 text-sm ml-8">{children}</div>
        </div>
    );
};

const TagsDisplay: React.FC<{ tags: string[], color: 'red' | 'blue' | 'purple' }> = ({ tags, color }) => {
    const colorClasses = {
        red: 'bg-red-900/50 text-red-300',
        blue: 'bg-blue-900/50 text-blue-300',
        purple: 'bg-purple-900/50 text-purple-300',
    };
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <span key={index} className={`text-xs font-medium px-2 py-1 rounded-full ${colorClasses[color]}`}>
                    {tag}
                </span>
            ))}
        </div>
    )
};
