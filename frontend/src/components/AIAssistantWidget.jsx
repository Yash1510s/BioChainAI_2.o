/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Bot, X, Send, Sparkles, Activity } from 'lucide-react';

const INITIAL_MESSAGE = { sender: 'ai', text: `Hi there! I'm your BioChain AI Assistant. How can I help you today?` };

const AIAssistantWidget = ({ userData, role }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Clear chat history on close for privacy
    const handleToggleChat = () => {
        if (isOpen) {
            setTimeout(() => setMessages([INITIAL_MESSAGE]), 300);
        }
        setIsOpen(prev => !prev);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || isTyping) return;

        const userMsg = inputText.trim();
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInputText('');
        setIsTyping(true);

        const userId = role === 'PATIENT' ? (userData?.email || 'patient@biochain.ai') : (userData?.wallet_address || '0xAdminWallet');
        const safeRole = role || 'USER';

        try {
            const res = await axios.post(`${API_BASE_URL}/api/ai/chat`, {
                user_id: userId,
                role: safeRole,
                message: userMsg
            });
            // Strip markdown bold (**text**) from Gemini output
            const cleaned = (res.data.reply || '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
            setMessages(prev => [...prev, { sender: 'ai', text: cleaned }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: "Network error. Node connection lost." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className="bg-[#121620]/95 backdrop-blur-xl border border-slate-700 shadow-2xl shadow-emerald-900/20 w-80 sm:w-96 h-[28rem] rounded-3xl mb-4 flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="bg-[#0b0e14] p-4 border-b border-slate-700 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500/20 p-2 rounded-full border border-emerald-500/30 text-emerald-400">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm flex items-center gap-1">
                                    BioChain AI <Sparkles size={12} className="text-emerald-400" />
                                </h3>
                                <p className="text-[10px] text-emerald-500 font-bold tracking-wider uppercase flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={handleToggleChat} className="text-slate-400 hover:text-white transition">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                                {msg.sender === 'ai' && (
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex-shrink-0 flex items-center justify-center border border-emerald-500/30 text-emerald-500 mt-1">
                                        <Bot size={12} />
                                    </div>
                                )}
                                <div className={`px-4 py-2.5 max-w-[80%] rounded-2xl text-sm leading-relaxed ${
                                    msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-sm shadow-lg'
                                    : 'bg-[#0b0e14] text-slate-300 border border-slate-800 rounded-bl-sm shadow-md'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing dots */}
                        {isTyping && (
                            <div className="flex justify-start gap-2">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex-shrink-0 flex items-center justify-center border border-emerald-500/30 text-emerald-500 mt-1">
                                    <Activity size={12} className="animate-spin" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-[#0b0e14] border border-slate-800 rounded-bl-sm flex gap-1 items-center">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-[#0b0e14] border-t border-slate-700 flex gap-2">
                        <input
                            type="text"
                            placeholder="Ask BioChain AI..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="flex-1 bg-[#121620] text-sm text-white px-4 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-emerald-500 transition"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isTyping}
                            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white p-2.5 rounded-xl transition flex items-center justify-center shadow-lg"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* FLOATING BUTTON */}
            <button
                onClick={handleToggleChat}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                    isOpen
                    ? 'bg-rose-500 hover:bg-rose-400 rotate-90 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-[#0b0e14] shadow-emerald-500/40 hover:scale-110'
                }`}
            >
                {isOpen ? <X size={24} /> : <Bot size={28} />}
            </button>
        </div>
    );
};

export default AIAssistantWidget;
