import { GoogleGenAI, Type } from "@google/genai";
import type { CareerRecommendation, SkillGapAnalysis, LearningPath, FutureOutlook, UserProfile, JobPosting, Source } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface JobRecommendationResult {
    postings: JobPosting[];
    sources: Source[];
}

const careerRecSchema = {
    type: Type.OBJECT,
    properties: {
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    jobTitle: { type: Type.STRING },
                    matchPercentage: { type: Type.INTEGER },
                    reasoning: { type: Type.STRING },
                    requiredSkills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                }
            }
        }
    }
};

const skillGapSchema = {
    type: Type.OBJECT,
    properties: {
        missingSkills: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    importance: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
                }
            }
        },
        summary: { type: Type.STRING }
    }
};

const learningPathSchema = {
    type: Type.OBJECT,
    properties: {
        path: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    duration: { type: Type.STRING },
                    title: { type: Type.STRING },
                    learningObjectives: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                description: { type: Type.STRING },
                                courses: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            title: { type: Type.STRING },
                                            platform: { type: Type.STRING },
                                            url: { type: Type.STRING }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    project: { type: Type.STRING }
                }
            }
        },
        estimatedTimeToCompletion: { type: Type.STRING }
    }
};

const futureOutlookSchema = {
    type: Type.OBJECT,
    properties: {
        fiveYearDemand: { type: Type.STRING, description: "A paragraph explaining the key drivers for this demand (e.g., technological adoption, industry growth, economic factors). Is the demand for generalists or specialists growing faster?" },
        newSkillsOnTheRise: {
            type: Type.ARRAY,
            items: { 
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    reason: { type: Type.STRING }
                }
             }
        },
        automationRisk: {
            type: Type.OBJECT,
            properties: {
                level: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                percentage: { type: Type.INTEGER },
                commentary: { type: Type.STRING, description: "Analysis on which specific tasks are most susceptible to automation and which require human creativity and strategic thinking." }
            }
        },
        salaryTrend: {
            type: Type.OBJECT,
            properties: {
                growthPercentage: { type: Type.INTEGER },
                commentary: { type: Type.STRING, description: "Commentary on factors influencing salary, such as specialization, location trends, and required experience levels." }
            }
        }
    }
};

const parseJsonResponse = <T,>(jsonString: string, fallback: T): T => {
    const jsonMatch = jsonString.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    const cleanedString = jsonMatch ? jsonMatch[0] : jsonString.replace(/^```json\s*|```$/g, '').trim();

    if (!cleanedString) {
        return fallback;
    }

    try {
      return JSON.parse(cleanedString);
    } catch (e) {
      console.error("Failed to parse JSON, returning fallback:", cleanedString, e);
      return fallback;
    }
};

export const analyzeResumeAndInterests = async (profile: UserProfile): Promise<CareerRecommendation[]> => {
    const prompt = `
        Act as an expert career counselor. Analyze the following user profile to provide 3 diverse career recommendations.
        The user's profile includes a resume, interests, personality quiz answers, and optionally GitHub/LeetCode profiles.
        Your analysis should be holistic, taking all provided information into account to infer skills, strengths, and potential career alignments.
        For each recommendation, provide a match percentage, a brief reasoning, and a list of key skills.

        ---
        Resume:
        ${profile.resumeText}
        ---
        Interests: ${profile.interests.join(', ')}
        ---
        Personality Quiz Answers:
        ${profile.quizAnswers.map(qa => `Q: ${qa.question}\nA: ${qa.answer}`).join('\n')}
        ---
        ${profile.githubUrl ? `GitHub Profile: ${profile.githubUrl}\n(Analyze repositories, languages, and activity for technical skills).` : ''}
        ${profile.leetcodeUrl ? `LeetCode Profile: ${profile.leetcodeUrl}\n(Analyze problem-solving skills and consistency).` : ''}
        ---

        Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: careerRecSchema,
        }
    });

    const parsed = parseJsonResponse<{ recommendations: CareerRecommendation[] }>(response.text, { recommendations: [] });
    return parsed.recommendations;
};


export const getSkillGapAnalysis = async (currentSkills: string[], targetCareer: string): Promise<SkillGapAnalysis> => {
    const prompt = `
        Analyze the skill gap for a professional wanting to become a ${targetCareer}.
        
        Their current known skills are: ${currentSkills.join(', ')}. If this list is empty, assume they are a beginner.
        
        Identify the top missing skills, rating their importance as High, Medium, or Low.
        Provide a brief summary of the skill gap.
        
        Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: skillGapSchema,
        }
    });
    return parseJsonResponse<SkillGapAnalysis>(response.text, { missingSkills: [], summary: 'Could not generate skill gap analysis.' });
};


export const generateLearningPath = async (missingSkills: string[]): Promise<LearningPath> => {
    const prompt = `
        Create a structured, step-by-step learning plan to acquire the following skills: ${missingSkills.join(', ')}.
        Organize the plan into logical phases (e.g., by weeks or months). For each phase, provide:
        1. A title.
        2. A duration.
        3. A list of learningObjectives. Each objective should have a description and a list of 1-2 recommended online courses from platforms like Coursera, Udemy, or edX. For each course, provide its title, platform, and a valid, direct URL.
        4. A suggested hands-on project to solidify the knowledge.
        Also provide an overall estimated time to completion.

        Return the response in JSON format.
    `;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: learningPathSchema,
        }
    });

    return parseJsonResponse<LearningPath>(response.text, { path: [], estimatedTimeToCompletion: 'N/A' });
};

export const getFutureCareerOutlook = async (career: string): Promise<FutureOutlook> => {
    const prompt = `
        Provide a detailed and nuanced futuristic 5-year outlook for the career of a "${career}". Your analysis should be comprehensive and data-driven where possible.
        Analyze the following aspects:
        1.  fiveYearDemand: Provide a paragraph explaining the key drivers for this demand (e.g., technological adoption, industry growth, economic factors). Is the demand for generalists or specialists growing faster?
        2.  newSkillsOnTheRise: List at least 3-5 emerging skills. For each skill, provide the skill name and a brief reason explaining *why* it's becoming important for this role.
        3.  automationRisk: Provide the level (Low, Medium, High) and percentage, but also include a commentary on *which specific tasks* within this role are most susceptible to automation and which require human creativity and strategic thinking that are harder to automate.
        4.  salaryTrend: Provide the growth percentage and a commentary. The commentary should touch upon factors influencing salary, such as specialization, location (if general trends are known), and required experience levels.

        Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: futureOutlookSchema,
        }
    });
    return parseJsonResponse<FutureOutlook>(response.text, { fiveYearDemand: 'Not available', newSkillsOnTheRise: [], automationRisk: { level: 'Medium', percentage: 0, commentary: ''}, salaryTrend: { growthPercentage: 0, commentary: ''}});
};

export const getJobRecommendations = async (careerTitle: string): Promise<JobRecommendationResult> => {
    const prompt = `
        Act as a job board aggregator. Using Google Search, find 3 to 5 recent and currently active job postings for a "${careerTitle}".
        
        IMPORTANT:
        1. You MUST source these jobs exclusively from linkedin.com.
        2. Your entire response MUST be a single, valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON object.
        3. The JSON object must have a single key "postings", which is an array of job objects.
        4. If you cannot find any suitable job postings from linkedin.com after searching, the "postings" array must be empty. For example: {"postings": []}.

        For each job posting, extract the following information:
        - title: The job title.
        - company: The name of the company hiring.
        - platform: This should always be 'LinkedIn'.
        - url: The direct URL to the job posting on linkedin.com.
        - description: A short, 1-2 sentence summary of the role.
    `;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        }
    });
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Source'
    })).filter(source => source.uri) || [];

    const parsed = parseJsonResponse<{ postings: JobPosting[] }>(response.text, { postings: [] });
    
    return { postings: parsed.postings || [], sources };
};