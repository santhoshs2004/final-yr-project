import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage, AppState } from '../types';

interface ChatbotProps {
    appState: AppState;
}

const Chatbot: React.FC<ChatbotProps> = ({ appState }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const proactiveMessageShownRef = useRef<{ career: string | null }>({ career: null });


    useEffect(() => {
        const initChat = () => {
            if (!process.env.API_KEY) {
                console.error("Chatbot disabled: API_KEY is not set.");
                setMessages([{ role: 'model', text: 'Hello! The chatbot is currently disabled due to a configuration issue.' }]);
                return;
            }

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are a friendly and helpful AI assistant for the 'Career Navigator AI' website. Your goal is to guide users. You can answer questions about their career recommendations, suggest how to use the site's features (like the skill gap analysis or learning path), and provide general career advice. Be encouraging and concise. Occasionally, be proactive if you see what the user is doing.",
                },
            });
            setChat(chatSession);
            setMessages([{ role: 'model', text: 'Hello! How can I help you navigate your career path today?' }]);
        };
        initChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Effect for proactive messaging
    useEffect(() => {
        // When a new career is selected and its learning path is loaded
        if (appState.selectedCareer && appState.learningPath && proactiveMessageShownRef.current.career !== appState.selectedCareer.jobTitle) {
            
            // Set a flag immediately to prevent re-triggering for the same career view
            proactiveMessageShownRef.current.career = appState.selectedCareer.jobTitle;

            const proactiveMessage: ChatMessage = {
                role: 'model',
                text: `I see you're exploring the path to become a ${appState.selectedCareer.jobTitle}! I've outlined a learning plan for you. Let me know if you'd like me to explain a specific step or find alternative courses.`
            };

            // Use a timeout to make it feel less abrupt
            const timer = setTimeout(() => {
                setMessages(prev => [...prev, proactiveMessage]);
                setIsOpen(true); // Open the chat window to show the message
            }, 1500); // 1.5 second delay

            return () => clearTimeout(timer);
        }

        // Reset when the user goes back to the dashboard, so it can trigger for the next career
        if (!appState.selectedCareer) {
            proactiveMessageShownRef.current.career = null;
        }

    }, [appState.selectedCareer, appState.learningPath]);


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseStream = await chat.sendMessageStream({ message: input });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]); 

            for await (const chunk of responseStream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-brand-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-secondary transition-transform transform hover:scale-110 focus:outline-none z-50"
                aria-label="Toggle chatbot"
            >
                {isOpen ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                )}
            </button>
            
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-bg-light rounded-xl shadow-2xl flex flex-col animate-slide-in-up z-40">
                    <header className="bg-brand-dark p-4 rounded-t-xl text-center text-text-main font-bold">
                        AI Career Assistant
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-gray-700 text-text-main'}`}>
                                        <p className="whitespace-pre-wrap">{msg.text}{isLoading && msg.role === 'model' && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-white ml-1 animate-ping"></span>}</p>
                                    </div>
                                </div>
                            ))}
                             <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
                        <div className="flex items-center bg-gray-700 rounded-lg">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                disabled={isLoading || !chat}
                                className="w-full p-3 bg-transparent border-none rounded-lg focus:ring-0 text-text-main"
                            />
                            <button type="submit" disabled={isLoading || !input.trim() || !chat} className="p-3 text-brand-light hover:text-white disabled:text-gray-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;