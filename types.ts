import { Type } from "@google/genai";

export interface AnalysisResult {
    caption: string;
    hashtags: string[];
    tags: string[];
    location: string;
    optimalTime: string;
}

export const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    caption: {
      type: Type.STRING,
      description: "A compelling, engaging, and SEO-friendly caption for the social media post. It should be between 100 and 200 characters.",
    },
    hashtags: {
      type: Type.ARRAY,
      description: "An array of 10-15 relevant and trending hashtags, each starting with '#'.",
      items: { type: Type.STRING },
    },
    tags: {
      type: Type.ARRAY,
      description: "An array of 3-5 relevant user or brand tags (e.g., @username).",
      items: { type: Type.STRING },
    },
    location: {
      type: Type.STRING,
      description: "A suggested location tag relevant to the content.",
    },
    optimalTime: {
      type: Type.STRING,
      description: "The optimal time of day to post this content for maximum engagement (e.g., '7:00 PM - 9:00 PM on Weekends').",
    },
  },
  required: ["caption", "hashtags", "tags", "location", "optimalTime"],
};

export interface ScheduledPost {
    title: string;
    description: string;
    caption: string;
    youtubeTags: string[];
    hashtags: string[];
    optimalTime: string;
}

export const scheduleSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "An SEO-optimized, catchy title for a YouTube Short, Reel, or video."
        },
        description: {
            type: Type.STRING,
            description: "A detailed, SEO-friendly YouTube video description, including relevant keywords. Around 200-300 characters."
        },
        caption: {
            type: Type.STRING,
            description: "A compelling and engaging caption for an Instagram Reel or social media post. 100-150 characters."
        },
        youtubeTags: {
            type: Type.ARRAY,
            description: "An array of 10-15 optimized tags for YouTube, including a mix of broad and specific keywords.",
            items: { type: Type.STRING }
        },
        hashtags: {
            type: Type.ARRAY,
            description: "An array of 15-20 relevant and trending hashtags for Instagram Reels and Shorts.",
            items: { type: Type.STRING }
        },
        optimalTime: {
            type: Type.STRING,
            description: "The single best time to post this content for maximum engagement (e.g., '8:30 PM')."
        }
    },
    required: ["title", "description", "caption", "youtubeTags", "hashtags", "optimalTime"]
};