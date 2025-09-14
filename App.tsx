import React, { useState } from 'react';
import { ContentAnalyzer } from './components/ContentAnalyzer';
import { ContentScheduler } from './components/ContentScheduler';
import { SparklesIcon, CalendarIcon } from './components/Icons';

type Tab = 'analyzer' | 'scheduler';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('analyzer');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'analyzer':
                return <ContentAnalyzer />;
            case 'scheduler':
                return <ContentScheduler />;
            default:
                return null;
        }
    };

    const TabButton: React.FC<{ tabName: Tab; label: string; icon: React.ReactNode }> = ({ tabName, label, icon }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-md transition-all duration-300 ${
                activeTab === tabName
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
            }`}
        >
            {icon}
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                        AI Social Content Suite
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">
                        Your all-in-one tool for content optimization and scheduling.
                    </p>
                </header>

                <div className="flex justify-center mb-8">
                    <div className="flex space-x-4 p-2 bg-gray-800/80 rounded-lg border border-gray-700">
                        <TabButton tabName="analyzer" label="Content Analyzer" icon={<SparklesIcon />} />
                        <TabButton tabName="scheduler" label="Bulk Content Scheduler" icon={<CalendarIcon />} />
                    </div>
                </div>

                <main>
                    {renderTabContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
