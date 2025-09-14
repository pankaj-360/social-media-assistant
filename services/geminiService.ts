import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { AnalysisResult, ScheduledPost } from '../types';
import { analysisSchema, scheduleSchema } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
    const base64EncodedData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    return {
        inlineData: {
            data: base64EncodedData,
            mimeType: file.type,
        },
    };
};

export const analyzeMedia = async (file: File, duration: number | null): Promise<AnalysisResult> => {
    const imagePart = await fileToGenerativePart(file);
    
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
    const durationInfo = duration ? ` The video is ${duration} seconds long.` : '';

    const prompt = `
        You are a world-class social media marketing expert.
        Analyze this ${mediaType} and provide a detailed analysis for a social media post.
        The content is about ${file.name}.${durationInfo}
        Based on the content, generate the following in a JSON object:
        1.  **caption**: A compelling, engaging, and SEO-friendly caption (100-200 characters).
        2.  **hashtags**: An array of 10-15 relevant and trending hashtags.
        3.  **tags**: An array of 3-5 relevant user/brand tags (e.g., @username).
        4.  **location**: A suitable location tag.
        5.  **optimalTime**: The best time to post for maximum engagement.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            },
        });
        
        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error calling Gemini API for analysis:", error);
        throw new Error("Failed to analyze media. The AI model may be overloaded or the content could not be processed.");
    }
};

export const generateScheduleForMedia = async (file: File): Promise<ScheduledPost> => {
    const mediaPart = await fileToGenerativePart(file);
    const mediaType = file.type.startsWith('video/') ? 'video/short' : 'image';

    const prompt = `
        You are an expert YouTube and social media SEO strategist.
        Analyze this ${mediaType} content (${file.name}) and generate a complete, SEO-optimized post schedule.
        Provide the output as a JSON object with the following fields:
        - title: An SEO-optimized, catchy title for a YouTube Short, Reel, or video.
        - description: A detailed, SEO-friendly YouTube video description (200-300 characters).
        - caption: A compelling caption for an Instagram Reel (100-150 characters).
        - youtubeTags: An array of 10-15 optimized tags for YouTube.
        - hashtags: An array of 15-20 relevant hashtags for Instagram Reels/Shorts.
        - optimalTime: The single best time to post.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [mediaPart, { text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: scheduleSchema,
            },
        });
        
        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error calling Gemini API for scheduling:", error);
        throw new Error(`Failed to generate schedule for ${file.name}. Please try again.`);
    }
};