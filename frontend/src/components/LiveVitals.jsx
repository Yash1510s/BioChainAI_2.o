/**
 * =============================================================================
 * Copyright (c) 2025-2026 BioChainAI Development Team. All Rights Reserved.
 * Project  : Smart Blockchain and AI-Based Healthcare System (BioChainAI 2.0)
 * License  : Proprietary — See LICENSE file in project root for full terms.
 * Repo     : https://github.com/Yash1510s/BioChainAI_2.o
 * WARNING  : Unauthorized copying, modification, or distribution is prohibited.
 * =============================================================================
 */
import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';
import { 
    Activity, Heart, Wind, AlertTriangle, Wifi, WifiOff,
    ShieldCheck, TrendingUp, Clock, Zap
} from 'lucide-react';

const CHART_MAX_POINTS = 30; // Show last 30 readings (~60 seconds)

// Derive WebSocket URL from API_BASE_URL (http://127.0.0.1:8000 -> ws://127.0.0.1:8000)
const WS_BASE_URL = API_BASE_URL.replace(/^http/, 'ws');

const LiveVitals = ({ userData }) => {
    const [connected, setConnected] = useState(false);
    const [vitals, setVitals] = useState(null);
    const [bpmHistory, setBpmHistory] = useState([]);
    const [spo2History, setSpo2History] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const wsRef = useRef(null);
    const bpmCanvasRef = useRef(null);
    const spo2CanvasRef = useRef(null);

    const patientId = userData?.wallet_address || userData?.email || 'demo-patient';

    useEffect(() => {
        let ws;
        let reconnectTimer;

        const connectWebSocket = () => {
            const encodedId = encodeURIComponent(patientId);
            const wsUrl = `${WS_BASE_URL}/ws/vitals/${encodedId}`;
            ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                setConnected(true);
                console.log('📡 IoT WebSocket Connected');
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setVitals(data);

                    setBpmHistory(prev => {
                        const next = [...prev, data.bpm];
                        return next.length > CHART_MAX_POINTS ? next.slice(-CHART_MAX_POINTS) : next;
                    });

                    setSpo2History(prev => {
                        const next = [...prev, data.spo2];
                        return next.length > CHART_MAX_POINTS ? next.slice(-CHART_MAX_POINTS) : next;
                    });

                    // Threshold alerts
                    if (data.status === 'CRITICAL') {
                        const alertMsg = data.bpm > 100
                            ? `⚠️ TACHYCARDIA DETECTED — BPM spiked to ${data.bpm} at ${data.timestamp}`
                            : `⚠️ LOW OXYGEN — SpO2 dropped to ${data.spo2}% at ${data.timestamp}`;

                        setAlerts(prev => [{ msg: alertMsg, time: data.timestamp, bpm: data.bpm, spo2: data.spo2 }, ...prev].slice(0, 8));
                    }
                } catch (e) {
                    console.error("WebSocket message error:", e);
                }
            };

            ws.onclose = () => {
                setConnected(false);
                console.log('❌ IoT WebSocket Disconnected. Reconnecting in 3 seconds...');
                // Auto-reconnect logic
                reconnectTimer = setTimeout(connectWebSocket, 3000);
            };

            ws.onerror = (e) => {
                setConnected(false);
                console.error("WebSocket Error:", e);
                ws.close(); // Triggers onclose -> reconnect
            };
        };

        connectWebSocket();

        return () => {
            clearTimeout(reconnectTimer);
            if (ws) {
                ws.onclose = null; // Prevent reconnect on unmount
                ws.close();
            }
        };
    }, [patientId]);

    // Draw BPM chart
    useEffect(() => {
        drawChart(bpmCanvasRef.current, bpmHistory, { 
            min: 50, max: 120, 
            threshold: 100, 
            color: '#f43f5e', 
            gradientTop: 'rgba(244,63,94,0.3)', 
            gradientBottom: 'rgba(244,63,94,0)' 
        });
    }, [bpmHistory]);

    // Draw SpO2 chart
    useEffect(() => {
        drawChart(spo2CanvasRef.current, spo2History, { 
            min: 88, max: 102, 
            threshold: 95, 
            thresholdDir: 'below',
            color: '#3b82f6', 
            gradientTop: 'rgba(59,130,246,0.3)', 
            gradientBottom: 'rgba(59,130,246,0)' 
        });
    }, [spo2History]);

    const drawChart = (canvas, data, opts) => {
        if (!canvas || data.length < 2) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const padding = { top: 10, bottom: 10, left: 0, right: 0 };
        const chartW = w - padding.left - padding.right;
        const chartH = h - padding.top - padding.bottom;

        ctx.clearRect(0, 0, w, h);

        // Draw threshold line
        const thresholdY = padding.top + chartH - ((opts.threshold - opts.min) / (opts.max - opts.min)) * chartH;
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding.left, thresholdY);
        ctx.lineTo(w - padding.right, thresholdY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Build path
        const points = data.map((val, i) => ({
            x: padding.left + (i / (CHART_MAX_POINTS - 1)) * chartW,
            y: padding.top + chartH - ((val - opts.min) / (opts.max - opts.min)) * chartH
        }));

        // Gradient fill
        const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
        gradient.addColorStop(0, opts.gradientTop);
        gradient.addColorStop(1, opts.gradientBottom);

        ctx.beginPath();
        ctx.moveTo(points[0].x, h - padding.bottom);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, h - padding.bottom);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Line
        ctx.beginPath();
        ctx.strokeStyle = opts.color;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();

        // Glow dot on last point
        const last = points[points.length - 1];
        ctx.beginPath();
        ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = opts.color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(last.x, last.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = opts.color.replace(')', ',0.2)').replace('rgb', 'rgba');
        ctx.fill();
    };

    return (
        <div className="space-y-6 animate-fade-in-up max-w-5xl">

            {/* Header */}
            <div className="bg-[#121620] rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-rose-500/5 to-blue-500/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-3 rounded-xl border ${connected ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                        {connected ? <Wifi size={24} /> : <WifiOff size={24} />}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            Live IoT Vitals Monitor
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${connected ? 'bg-emerald-500 text-white' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                                {connected ? '● LIVE' : '○ OFFLINE'}
                            </span>
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">Real-time biometric data streamed via WebSocket from IoT sensors</p>
                    </div>
                    {vitals && (
                        <div className="text-right">
                            <p className="text-[10px] text-slate-600 uppercase tracking-wider">Last Reading</p>
                            <p className="text-sm font-mono text-slate-400">{vitals.timestamp}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Vitals Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* BPM Card */}
                <div className={`bg-[#121620] rounded-2xl border overflow-hidden transition-all duration-500 ${
                    vitals?.bpm > 100 
                        ? 'border-rose-500/50 shadow-[0_0_40px_rgba(244,63,94,0.15)]' 
                        : 'border-slate-800'
                }`}>
                    <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${vitals?.bpm > 100 ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                <Heart size={20} className={vitals?.bpm > 100 ? 'animate-pulse' : ''} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Heart Rate</p>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-3xl font-black ${vitals?.bpm > 100 ? 'text-rose-400' : 'text-white'}`}>
                                        {vitals?.bpm || '--'}
                                    </span>
                                    <span className="text-xs text-slate-500">BPM</span>
                                </div>
                            </div>
                        </div>
                        {vitals?.bpm > 100 && (
                            <span className="flex items-center gap-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider animate-pulse">
                                <AlertTriangle size={12} /> HIGH
                            </span>
                        )}
                        {vitals && vitals.bpm <= 100 && (
                            <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                <ShieldCheck size={12} /> NORMAL
                            </span>
                        )}
                    </div>
                    <div className="px-2 pb-2">
                        <canvas ref={bpmCanvasRef} className="w-full h-[120px]" style={{ width: '100%', height: '120px' }} />
                    </div>
                </div>

                {/* SpO2 Card */}
                <div className={`bg-[#121620] rounded-2xl border overflow-hidden transition-all duration-500 ${
                    vitals?.spo2 < 95 
                        ? 'border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15)]' 
                        : 'border-slate-800'
                }`}>
                    <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${vitals?.spo2 < 95 ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                <Wind size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Oxygen Saturation</p>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-3xl font-black ${vitals?.spo2 < 95 ? 'text-amber-400' : 'text-white'}`}>
                                        {vitals?.spo2 || '--'}
                                    </span>
                                    <span className="text-xs text-slate-500">SpO2 %</span>
                                </div>
                            </div>
                        </div>
                        {vitals?.spo2 < 95 && (
                            <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider animate-pulse">
                                <AlertTriangle size={12} /> LOW
                            </span>
                        )}
                        {vitals && vitals.spo2 >= 95 && (
                            <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                <ShieldCheck size={12} /> NORMAL
                            </span>
                        )}
                    </div>
                    <div className="px-2 pb-2">
                        <canvas ref={spo2CanvasRef} className="w-full h-[120px]" style={{ width: '100%', height: '120px' }} />
                    </div>
                </div>
            </div>

            {/* Threshold Alerts Feed */}
            <div className="bg-[#121620] rounded-2xl p-6 border border-slate-800 shadow-xl">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Zap size={14} className="text-amber-400" /> Threshold Alerts
                    {alerts.length > 0 && (
                        <span className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/20 font-bold">
                            {alerts.length}
                        </span>
                    )}
                </h3>

                {alerts.length === 0 ? (
                    <div className="text-center py-8">
                        <ShieldCheck size={32} className="mx-auto text-emerald-500/30 mb-3" />
                        <p className="text-sm text-slate-600">All vitals within normal range. No alerts triggered.</p>
                    </div>
                ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {alerts.map((alert, i) => (
                            <div 
                                key={i} 
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                                    i === 0 ? 'bg-rose-500/10 border-rose-500/20 animate-fade-in-up' : 'bg-[#0b0e14] border-slate-800'
                                }`}
                            >
                                <AlertTriangle size={14} className={i === 0 ? 'text-rose-400' : 'text-slate-600'} />
                                <p className={`text-xs flex-1 ${i === 0 ? 'text-rose-300 font-bold' : 'text-slate-500'}`}>
                                    {alert.msg}
                                </p>
                                <div className="flex gap-3 text-[10px] text-slate-600 font-mono">
                                    <span>♥ {alert.bpm}</span>
                                    <span>O₂ {alert.spo2}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Connection Info */}
            <div className="bg-[#121620] rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between text-[10px] text-slate-600">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <Activity size={10} /> Stream: ws://localhost:8000/ws/vitals/
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={10} /> Interval: 2s
                        </span>
                        <span className="flex items-center gap-1.5">
                            <TrendingUp size={10} /> Readings: {bpmHistory.length}
                        </span>
                    </div>
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck size={10} /> BioChain Guardian Protocol v1.0
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LiveVitals;
