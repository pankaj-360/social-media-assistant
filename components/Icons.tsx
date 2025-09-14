import React from 'react';

export const UploadIcon: React.FC = () => (
    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4h-2m-6 4v-4m0 0l-3 3m3-3l3 3"></path>
    </svg>
);

export const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1zM5.293 6.707a1 1 0 010-1.414l2-2a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0zM14.707 6.707a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414l2 2a1 1 0 010 1.414zM10 17a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zM3 10a1 1 0 011-1h2a1 1 0 110 2H4a1 1 0 01-1-1zM15 9a1 1 0 100 2h2a1 1 0 100-2h-2zM5.293 13.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM13.293 13.293a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414l2-2a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

export const ClipboardIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

export const CaptionIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></IconBase>;
export const HashtagIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M5 9h14M5 15h14" /></IconBase>;
export const TagIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2z" /></IconBase>;
export const LocationIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></IconBase>;
export const ClockIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></IconBase>;
export const CalendarIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></IconBase>;
export const TitleIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></IconBase>;
export const YouTubeIcon: React.FC = () => <IconBase><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.72 8.79l-4.24-2.34a1 1 0 00-1.48.87v4.68a1 1 0 001.48.87l4.24-2.34a1 1 0 000-1.74z" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconBase>;


const IconBase: React.FC<{children: React.ReactNode}> = ({children}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {children}
    </svg>
);
