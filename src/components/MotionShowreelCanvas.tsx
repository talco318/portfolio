import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

// ==========================================
// MATHEMATICAL EASING FUNCTIONS OF TIME
// Snappy exponential and critically-damped spring curves (strictly non-bouncy)
// ==========================================
function easeOutExpo(x: number): number {
    return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInOutExpo(x: number): number {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return x < 0.5 
        ? Math.pow(2, 20 * x - 10) / 2 
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 4);
}

function clamp(val: number, min = 0, max = 1): number {
    return Math.min(Math.max(val, min), max);
}

// Optimized pacing: 8.0 seconds total loop
// 100 BPM (0.6s per beat) = 13.33 beats across 8 seconds
const BPM = 100;
const BEAT_DURATION = 60 / BPM; // 0.6s
const TOTAL_DURATION = 8.0; // 8.0 seconds comfortable loop

// Palette: 3 curated colors + pure black & pure white
const COLOR_BLACK = '#07080b';
const COLOR_WHITE = '#ffffff';
const COLOR_CYAN = '#00f0ff';    // Vector Cyan
const COLOR_INDIGO = '#6366f1';  // Structural Indigo
const COLOR_EMERALD = '#10b981'; // Telemetry Emerald

// Scene Technique Breakdown per Bar
export const SCENE_PHASES = [
    { start: 0.0, end: 1.8, name: '01. CYBERNETIC CALIBRATION', detail: '0% → 100% high-tech loading meter & stack initialization' },
    { start: 1.8, end: 3.4, name: '02. KINETIC TYPE & STACK', detail: 'Crisp bold typography & 4-tier technological stack modules' },
    { start: 3.4, end: 4.8, name: '03. 3D EXPLODED ARCHITECTURE', detail: '3-Tier multi-plane spatial architecture in isometric depth' },
    { start: 4.8, end: 6.6, name: '04. LIVE AST TELEMETRY', detail: 'Live code compiler, harmonic waveforms & stack status matrix' },
    { start: 6.6, end: 7.7, name: '05. SIGNATURE CONVERGENCE', detail: 'Monolithic signature lockup & illuminated stack tags' },
    { start: 7.7, end: 8.0, name: '06. SEAMLESS LOOP CONTRACT', detail: 'Contraction back into the zero-coordinate seed' },
];

/**
 * PURE DETERMINISTIC FRAME EVALUATOR
 * No CSS animations, no timers, no persistent state.
 * Any call with `t` renders the exact mathematical state.
 */
export function renderShowreelFrame(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    rawTime: number
) {
    const t = ((rawTime % TOTAL_DURATION) + TOTAL_DURATION) % TOTAL_DURATION;
    const cx = width / 2;
    const cy = height / 2;
    const baseScale = Math.min(width / 1920, height / 1080);

    // 1. CLEAR FRAME (Deep Onyx #07080b)
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    // Center coordinate space
    ctx.translate(cx, cy);
    ctx.scale(baseScale, baseScale);

    // Subtle atmospheric ambient background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.lineWidth = 1;
    for (let x = -900; x <= 900; x += 150) {
        ctx.beginPath();
        ctx.moveTo(x, -500);
        ctx.lineTo(x, 500);
        ctx.stroke();
    }
    for (let y = -500; y <= 500; y += 150) {
        ctx.beginPath();
        ctx.moveTo(-900, y);
        ctx.lineTo(900, y);
        ctx.stroke();
    }

    // ==========================================================
    // SHOT 1: CYBERNETIC LOADING / CALIBRATION METER [0.00s <= t < 1.70s]
    // 0% -> 100% high-tech meter hooking visitors, fast charge, clean hold
    // ==========================================================
    if (t < 1.70) {
        // Fast fill from 0.0s to 1.30s
        const fillProgress = clamp(t / 1.30);
        const fillEase = easeOutQuart(fillProgress);
        const percent = Math.min(100, Math.floor(fillEase * 100));

        // Fast snappy exit wipe in final 0.15s
        const exitAlpha = t > 1.55 ? 1 - clamp((t - 1.55) / 0.15) : 1;

        ctx.save();
        ctx.globalAlpha = exitAlpha;

        // Header telemetry label (Large, clear)
        ctx.font = '700 18px "Inter", "JetBrains Mono", monospace';
        ctx.fillStyle = COLOR_CYAN;
        ctx.textAlign = 'center';
        ctx.letterSpacing = '3px';
        ctx.fillText('INITIALIZING SYSTEM ARCHITECTURE // COMPILER KERNEL', 0, -120);

        // Huge Digital Percentage Display (130px, instantly readable)
        ctx.font = '900 130px "Inter", "JetBrains Mono", sans-serif';
        ctx.fillStyle = COLOR_WHITE;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percent}%`, 0, -20);

        // Horizontal Progress Track (940px wide)
        const trackW = 940;
        const trackH = 10;
        const fillW = trackW * fillEase;

        // Background track
        ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.fillRect(-trackW / 2, 60, trackW, trackH);

        // Active glowing progress bar
        ctx.fillStyle = COLOR_CYAN;
        ctx.fillRect(-trackW / 2, 60, fillW, trackH);

        // Glowing laser head tick
        ctx.fillStyle = COLOR_WHITE;
        ctx.fillRect(-trackW / 2 + fillW - 5, 54, 10, trackH + 12);

        // Calibration tick marks along the track
        for (let i = 0; i <= 10; i++) {
            const tx = -trackW / 2 + (trackW / 10) * i;
            ctx.strokeStyle = i % 5 === 0 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.25)';
            ctx.lineWidth = i % 5 === 0 ? 2.5 : 1;
            ctx.beginPath();
            ctx.moveTo(tx, 74);
            ctx.lineTo(tx, 84);
            ctx.stroke();
        }

        // Live stack badges appearing as loading progresses (Enlarged 15px)
        const loadStages = [
            { threshold: 0.15, label: '[OK] PYTHON 3.12 / FASTAPI', color: COLOR_CYAN, x: -350 },
            { threshold: 0.40, label: '[OK] REACT 19 / TYPESCRIPT', color: COLOR_WHITE, x: -115 },
            { threshold: 0.65, label: '[OK] AI AGENTS & AST CORE', color: COLOR_EMERALD, x: 125 },
            { threshold: 0.88, label: '[OK] .NET DISTRIBUTED MESH', color: COLOR_INDIGO, x: 350 },
        ];

        loadStages.forEach((stage) => {
            if (fillProgress >= stage.threshold) {
                ctx.font = '700 15px "Inter", "JetBrains Mono", monospace';
                ctx.fillStyle = stage.color;
                ctx.textAlign = 'center';
                ctx.fillText(stage.label, stage.x, 118);
            }
        });

        // 100% Complete status badge during hold
        if (t >= 1.30) {
            ctx.font = '800 16px "Inter", monospace';
            ctx.fillStyle = COLOR_EMERALD;
            ctx.fillText('● SYSTEM KERNEL READY // DISPATCHING ARCHITECTURE', 0, 155);
        }

        ctx.restore();
    }

    // ==========================================================
    // SHOT 2: KINETIC NAME & 4 TECH STACK MODULES [1.70s <= t < 3.50s]
    // Snappy 0.25s entrance -> 1.35s stable hold to comfortably read!
    // ==========================================================
    else if (t < 3.50) {
        const localT = t - 1.70; // 0.0s to 1.80s
        
        // Fast snap entrance in first 0.25s
        const enterProgress = clamp(localT / 0.25);
        const enterEase = easeOutExpo(enterProgress);

        // Fast snappy exit in final 0.20s (localT >= 1.60)
        const exitAlpha = localT > 1.60 ? 1 - clamp((localT - 1.60) / 0.20) : 1;

        ctx.save();
        ctx.globalAlpha = exitAlpha;

        // Big Display Typography: "TAL COHEN" (Enlarged 104px bold, crystal clear)
        ctx.font = '900 104px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Kinetic motion slice: Upper and lower halves snap together in 0.25s, then stay 100% stable!
        const sliceOffset = (1 - enterEase) * 140;

        // Upper half (clip)
        ctx.save();
        ctx.beginPath();
        ctx.rect(-750, -170, 1500, 170);
        ctx.clip();
        ctx.fillStyle = COLOR_WHITE;
        ctx.fillText('TAL COHEN', sliceOffset, -18);
        ctx.restore();

        // Lower half (clip)
        ctx.save();
        ctx.beginPath();
        ctx.rect(-750, -18, 1500, 170);
        ctx.clip();
        ctx.fillStyle = COLOR_CYAN;
        ctx.fillText('TAL COHEN', -sliceOffset, -18);
        ctx.restore();

        // 4 LARGE, HIGHLY-LEGIBLE TECHNOLOGICAL STACK CARDS
        const stackItems = [
            { label: 'PYTHON 3.12 / FASTAPI', color: COLOR_CYAN, sub: 'BACKEND SERVICES' },
            { label: 'REACT 19 / TYPESCRIPT', color: COLOR_WHITE, sub: 'INTERACTIVE UI' },
            { label: 'AI AGENTS / PYTORCH', color: COLOR_EMERALD, sub: 'AUTONOMOUS CORE' },
            { label: '.NET 9 / DISTRIBUTED', color: COLOR_INDIGO, sub: 'HIGH-CONCURRENCY' },
        ];

        const totalW = 1000;
        const colW = totalW / stackItems.length;
        const stackY = 96;

        stackItems.forEach((item, idx) => {
            const itemDelay = idx * 0.05;
            const itemP = clamp((localT - itemDelay) / 0.22);
            const itemEase = easeOutExpo(itemP);
            const xPos = -totalW / 2 + colW * idx + colW / 2;
            const yPos = stackY + (1 - itemEase) * 30;

            ctx.save();
            ctx.globalAlpha = itemEase * exitAlpha;

            // Card container box (Height: 58px, clear padding)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(xPos - colW / 2 + 8, yPos - 24, colW - 16, 56);

            // Left indicator dot
            ctx.fillStyle = item.color;
            ctx.beginPath();
            ctx.arc(xPos - colW / 2 + 24, yPos, 4.5, 0, Math.PI * 2);
            ctx.fill();

            // Main Stack Title (Legible 16px bold)
            ctx.font = '800 16px "Inter", "JetBrains Mono", monospace';
            ctx.fillStyle = item.color;
            ctx.textAlign = 'left';
            ctx.fillText(item.label, xPos - colW / 2 + 38, yPos - 3);

            // Sub-category (12px bold)
            ctx.font = '600 12px "Inter", monospace';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillText(item.sub, xPos - colW / 2 + 38, yPos + 17);

            ctx.restore();
        });

        ctx.restore();
    }

    // ==========================================================
    // SHOT 3: 3D EXPLODED ARCHITECTURAL TECH STACK [3.50s <= t < 5.20s]
    // 0.25s snappy 3D unfold -> 1.25s stable rotation hold with large 18px text!
    // ==========================================================
    else if (t < 5.20) {
        const localT = t - 3.50; // 0.0s to 1.70s

        // Snappy unfold in first 0.25s
        const unfoldP = clamp(localT / 0.25);
        const unfoldEase = easeOutExpo(unfoldP);

        // Snappy exit in final 0.20s (localT >= 1.50)
        const exitAlpha = localT > 1.50 ? 1 - clamp((localT - 1.50) / 0.20) : 1;

        ctx.save();
        ctx.globalAlpha = exitAlpha;

        // Controlled 3D Isometric Camera Rotation
        const rotY = localT * 0.75;
        const rotX = 0.42;
        const fov = 750;

        // 3 DISTINCT TECHNOLOGICAL PLANES IN SPATIAL Z-DEPTH
        const stackLayers = [
            {
                title: 'LAYER 01 // REACT 19 • TS // MONACO BIDI',
                detail: '6.7K+ ACTIVE DEVS // <10ms INTERFACE',
                zOffset: 110 * unfoldEase,
                color: COLOR_CYAN,
                stroke: 'rgba(0, 240, 255, 0.95)',
                fill: 'rgba(0, 240, 255, 0.08)',
            },
            {
                title: 'LAYER 02 // PYTHON 3.12 • PYTORCH // AI AGENTS',
                detail: 'AUTONOMOUS AST CODE ORCHESTRATION',
                zOffset: 0,
                color: COLOR_EMERALD,
                stroke: 'rgba(16, 185, 129, 0.95)',
                fill: 'rgba(16, 185, 129, 0.08)',
            },
            {
                title: 'LAYER 03 // .NET 9.0 • DISTRIBUTED // KERNEL RUNTIME',
                detail: '100% RESILIENT HIGH-CONCURRENCY SERVICE MESH',
                zOffset: -110 * unfoldEase,
                color: COLOR_INDIGO,
                stroke: 'rgba(99, 102, 241, 0.95)',
                fill: 'rgba(99, 102, 241, 0.08)',
            },
        ];

        const layerSize = 190;
        const corners = [
            [-layerSize, -layerSize * 0.8],
            [layerSize, -layerSize * 0.8],
            [layerSize, layerSize * 0.8],
            [-layerSize, layerSize * 0.8],
        ];

        // Project each 3D layer
        const projectedLayers = stackLayers.map((layer) => {
            const projectedCorners = corners.map(([x, y]) => {
                const wx = x;
                const wy = y;
                const wz = layer.zOffset;

                // Rotate around Y
                const x1 = wx * Math.cos(rotY) + wz * Math.sin(rotY);
                const z1 = -wx * Math.sin(rotY) + wz * Math.cos(rotY);

                // Rotate around X
                const y2 = wy * Math.cos(rotX) - z1 * Math.sin(rotX);
                const z2 = wy * Math.sin(rotX) + z1 * Math.cos(rotX);

                const scale = fov / (fov + z2 + 380);
                return {
                    x: x1 * scale,
                    y: y2 * scale,
                    z: z2,
                };
            });

            return {
                ...layer,
                corners: projectedCorners,
                centerZ: projectedCorners.reduce((sum, p) => sum + p.z, 0) / 4,
            };
        });

        // Back-to-front spatial sorting
        projectedLayers.sort((a, b) => a.centerZ - b.centerZ);

        // Connecting Vertical Neon Struts
        if (projectedLayers.length === 3) {
            const lTop = projectedLayers.find(l => l.zOffset > 0);
            const lBot = projectedLayers.find(l => l.zOffset < 0);
            if (lTop && lBot) {
                for (let i = 0; i < 4; i++) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(lTop.corners[i].x, lTop.corners[i].y);
                    ctx.lineTo(lBot.corners[i].x, lBot.corners[i].y);
                    ctx.stroke();
                }
            }
        }

        // Draw each 3D Tech Plane
        projectedLayers.forEach((layer) => {
            ctx.save();

            // Glass plane surface
            ctx.beginPath();
            ctx.moveTo(layer.corners[0].x, layer.corners[0].y);
            ctx.lineTo(layer.corners[1].x, layer.corners[1].y);
            ctx.lineTo(layer.corners[2].x, layer.corners[2].y);
            ctx.lineTo(layer.corners[3].x, layer.corners[3].y);
            ctx.closePath();
            ctx.fillStyle = layer.fill;
            ctx.fill();

            // Outline
            ctx.strokeStyle = layer.stroke;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Corner vertex nodes
            layer.corners.forEach((p) => {
                ctx.fillStyle = layer.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
                ctx.fill();
            });

            // Center large annotation label (Enlarged 18px / 14px bold)
            const midX = (layer.corners[0].x + layer.corners[2].x) / 2;
            const midY = (layer.corners[0].y + layer.corners[2].y) / 2;

            ctx.font = '800 18px "Inter", "JetBrains Mono", monospace';
            ctx.fillStyle = layer.color;
            ctx.textAlign = 'center';
            ctx.fillText(layer.title, midX, midY - 8);

            ctx.font = '700 14px "Inter", monospace';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.fillText(layer.detail, midX, midY + 16);

            ctx.restore();
        });

        ctx.restore();
    }

    // ==========================================================
    // SHOT 4: LIVE AST TELEMETRY & CODE EXECUTION [5.20s <= t < 6.80s]
    // 0.20s snap entrance -> 1.20s stable hold for reading code & metrics!
    // ==========================================================
    else if (t < 6.80) {
        const localT = t - 5.20; // 0.0s to 1.60s

        // Fast entrance in first 0.20s
        const enterP = clamp(localT / 0.20);
        const enterEase = easeOutExpo(enterP);

        // Fast snappy exit in final 0.20s (localT >= 1.40)
        const exitAlpha = localT > 1.40 ? 1 - clamp((localT - 1.40) / 0.20) : 1;

        ctx.save();
        ctx.globalAlpha = enterEase * exitAlpha;

        // 1. LEFT COLUMN: Real, Highly-Legible Python / AI Agent Code (16px monospace)
        const codeLines = [
            'async def orchestrate_agent_cycle():',
            '    vector_ctx = await memory.vector_recall()',
            '    ast_tree = bidi_parser.parse_syntax()',
            '    pipeline.emit_stream(vector_ctx, ast_tree)',
            '    return {"status": "200_OK", "p99": "<0.8ms"}',
        ];

        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        codeLines.forEach((line, idx) => {
            ctx.fillStyle = idx === 0 
                ? COLOR_CYAN 
                : idx === 4 
                ? COLOR_EMERALD 
                : 'rgba(255, 255, 255, 0.9)';
            ctx.fillText(line, -800, -115 + idx * 32);
        });

        // 2. CENTER: Precision Oscilloscope Waveform Grid
        const graphW = 660;
        const graphH = 175;
        const gx = -graphW / 2;
        const gy = 20;

        ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(gx, gy, graphW, graphH);

        // Sub-grid intervals
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        for (let col = 1; col < 6; col++) {
            const xPos = gx + (graphW / 6) * col;
            ctx.beginPath();
            ctx.moveTo(xPos, gy);
            ctx.lineTo(xPos, gy + graphH);
            ctx.stroke();
        }

        // Primary Waveform (Cyan)
        ctx.beginPath();
        const wavePoints = 120;
        for (let i = 0; i <= wavePoints; i++) {
            const ratio = i / wavePoints;
            const wx = gx + graphW * ratio;
            const phase = t * 14 + ratio * 16;
            const amp = Math.sin(phase) * 50 * Math.sin(ratio * Math.PI);
            const wy = gy + graphH / 2 + amp;
            if (i === 0) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
        }
        ctx.strokeStyle = COLOR_CYAN;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Secondary Waveform (Emerald)
        ctx.beginPath();
        for (let i = 0; i <= wavePoints; i++) {
            const ratio = i / wavePoints;
            const wx = gx + graphW * ratio;
            const phase = t * 20 + ratio * 24;
            const amp = Math.cos(phase) * 26 * Math.sin(ratio * Math.PI);
            const wy = gy + graphH / 2 + amp;
            if (i === 0) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
        }
        ctx.strokeStyle = COLOR_EMERALD;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 3. RIGHT COLUMN: Live Stack Telemetry Matrix (Large 16px font)
        const statusMetrics = [
            { stack: 'PYTHON 3.12 / FASTAPI', status: '100% OPTIMAL', color: COLOR_CYAN },
            { stack: 'REACT 19 / TYPESCRIPT', status: '120 FPS NATIVE', color: COLOR_WHITE },
            { stack: 'AI AGENTS & AST CORE', status: '<0.8ms LATENCY', color: COLOR_EMERALD },
            { stack: '.NET 9.0 CLOUD MESH', status: 'DISTRIBUTED ACTIVE', color: COLOR_INDIGO },
        ];

        ctx.font = '16px "Inter", "JetBrains Mono", monospace';
        statusMetrics.forEach((m, idx) => {
            const yPos = -115 + idx * 32;
            ctx.textAlign = 'right';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.fillText(m.stack, 600, yPos);
            ctx.fillStyle = m.color;
            ctx.fillText(`[${m.status}]`, 800, yPos);
        });

        // Center Sub-metric Bar
        ctx.fillStyle = COLOR_WHITE;
        ctx.fillRect(-230, gy + graphH + 24, 460, 4);

        ctx.font = '14px "Inter", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText('THROUGHPUT PIPELINE SYNCHRONIZATION: 99.8% [STABLE]', 0, gy + graphH + 46);

        ctx.restore();
    }

    // ==========================================================
    // SHOT 5: THE STRONGEST MOMENT & SIGNATURE CONVERGENCE [6.80s <= t < 7.75s]
    // 0.20s lockup -> 0.75s stable hold on monolithic signature + illuminated badges
    // ==========================================================
    else if (t < 7.75) {
        const localT = t - 6.80; // 0.0s to 0.95s

        // Fast entrance in first 0.20s
        const enterP = clamp(localT / 0.20);
        const enterEase = easeOutExpo(enterP);

        // Fast exit in final 0.15s (localT >= 0.80)
        const exitAlpha = localT > 0.80 ? 1 - clamp((localT - 0.80) / 0.15) : 1;

        ctx.save();
        ctx.globalAlpha = enterEase * exitAlpha;

        // Architectural Framing Box
        const boxW = 980;
        const boxH = 260;
        ctx.strokeStyle = COLOR_WHITE;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH);

        // Bold Signature Title: "TAL COHEN" (Enlarged 100px, huge and crisp)
        ctx.font = '900 100px "Inter", sans-serif';
        ctx.fillStyle = COLOR_WHITE;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('TAL COHEN', 0, -45);

        // Cyan Accent Line
        ctx.strokeStyle = COLOR_CYAN;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-boxW / 2 + 50, 16);
        ctx.lineTo(boxW / 2 - 50, 16);
        ctx.stroke();

        // Subtitle: "FULL STACK ARCHITECT & AI ENGINEER" (20px bold)
        ctx.font = '800 20px "Inter", monospace';
        ctx.fillStyle = COLOR_EMERALD;
        ctx.letterSpacing = '8px';
        ctx.fillText('FULL STACK ARCHITECT & AI ENGINEER', 0, 50);

        // 4 ILLUMINATED TECHNOLOGICAL STACK BADGES (Clear 15px)
        const badges = ['PYTHON 3.12', 'REACT 19 / TS', 'AI AGENTS', '.NET 9.0'];
        const badgeTotalW = 720;
        const badgeSlot = badgeTotalW / badges.length;

        badges.forEach((bg, idx) => {
            const bx = -badgeTotalW / 2 + badgeSlot * idx + badgeSlot / 2;
            const by = 94;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(bx - badgeSlot / 2 + 6, by - 16, badgeSlot - 12, 32);

            ctx.font = '800 15px "Inter", monospace';
            ctx.fillStyle = idx === 1 ? COLOR_CYAN : idx === 2 ? COLOR_EMERALD : COLOR_WHITE;
            ctx.letterSpacing = '1px';
            ctx.fillText(bg, bx, by + 5);
        });

        ctx.restore();
    }

    // ==========================================================
    // SHOT 6: SEAMLESS LOOP CONTRACTION [7.75s <= t <= 8.00s]
    // Collapse back into the zero-coordinate seed line, matching t=0.00 exactly!
    // ==========================================================
    else {
        const localT = t - 7.75; // 0.0s to 0.25s
        const pLoop = clamp(localT / 0.25);
        const easeLoop = easeInOutExpo(pLoop);

        // Seed ray contraction to match t = 0
        const seedWidth = 1400 * (1 - easeLoop);
        ctx.strokeStyle = COLOR_WHITE;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-seedWidth / 2, 0);
        ctx.lineTo(seedWidth / 2, 0);
        ctx.stroke();
    }

    ctx.restore();
}

// ==========================================
// SOUNDTRACK SYNTHESIZER (WEB AUDIO API)
// Kick on every beat, loading charge sweep, riser into drop, crisp transient hits
// ==========================================
class ShowreelAudioSynthesizer {
    private ctx: AudioContext | null = null;
    private isMuted: boolean = true; // start muted for polite autoplay

    private initCtx() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public setMuted(muted: boolean) {
        this.isMuted = muted;
        if (!muted) {
            this.initCtx();
            this.playKick();
        }
    }

    public getMuted() {
        return this.isMuted;
    }

    // Loading meter charge sweep
    public playChargeSweep() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(720, now + 1.5);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 1.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.65);
    }

    // Deep punchy electronic kick drum
    public playKick() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.12);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.24);
    }

    // High transient metallic snap for scene changes
    public playSceneHit() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
    }

    // Sub-bass riser into the final bar
    public playRiser() {
        if (this.isMuted) return;
        this.initCtx();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.8);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.75);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.82);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.85);
    }
}

// Global synthesizer instance
const synth = new ShowreelAudioSynthesizer();

// ==========================================
// REACT COMPONENT
// ==========================================
interface MotionShowreelCanvasProps {
    className?: string;
    onCloseFullscreen?: () => void;
    minimal?: boolean;
}

export const MotionShowreelCanvas: React.FC<MotionShowreelCanvasProps> = ({ 
    className = '',
    minimal = false 
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [, setActiveBeat] = useState(0);

    const lastBeatRef = useRef(-1);
    const lastRiserBeatRef = useRef(false);
    const lastSweepTriggeredRef = useRef(false);
    const animIdRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const pausedTimeRef = useRef<number>(0);

    // Expose window.seekShowreel(t) for testing & external programmatic control
    useEffect(() => {
        (window as unknown as { seekShowreel?: (t: number) => void }).seekShowreel = (t: number) => {
            setCurrentTime(t % TOTAL_DURATION);
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) renderShowreelFrame(ctx, canvas.width, canvas.height, t);
            }
        };
        return () => {
            delete (window as unknown as { seekShowreel?: (t: number) => void }).seekShowreel;
        };
    }, []);

    // Audio Sync Engine triggered by Beat Clock
    const handleAudioSync = useCallback((t: number) => {
        const beatIndex = Math.floor(t / BEAT_DURATION);
        if (beatIndex !== lastBeatRef.current) {
            lastBeatRef.current = beatIndex;
            setActiveBeat(beatIndex);

            // Kick on each beat
            synth.playKick();

            // Hit on scene phase boundaries
            if ([3, 6, 8, 11].includes(beatIndex)) {
                synth.playSceneHit();
            }
        }

        // Charge sweep at loop start (Loading meter)
        if (t >= 0.05 && t < 0.2 && !lastSweepTriggeredRef.current) {
            lastSweepTriggeredRef.current = true;
            synth.playChargeSweep();
        } else if (t > 1.5) {
            lastSweepTriggeredRef.current = false;
        }

        // Riser into the final signature moment (t ~ 6.0s)
        if (t >= 6.0 && t < 6.1 && !lastRiserBeatRef.current) {
            lastRiserBeatRef.current = true;
            synth.playRiser();
        } else if (t < 5.0) {
            lastRiserBeatRef.current = false;
        }
    }, []);

    // Main 60fps RequestAnimationFrame Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let running = isPlaying;

        const renderLoop = (now: number) => {
            if (!running) return;

            if (startTimeRef.current === null) {
                startTimeRef.current = now - pausedTimeRef.current * 1000;
            }

            const elapsed = (now - startTimeRef.current) / 1000;
            const t = elapsed % TOTAL_DURATION;
            setCurrentTime(t);

            // Audio synchronization
            handleAudioSync(t);

            // Responsive high-DPI scaling
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const displayW = Math.round(rect.width * dpr);
            const displayH = Math.round(rect.height * dpr);

            if (canvas.width !== displayW || canvas.height !== displayH) {
                canvas.width = displayW;
                canvas.height = displayH;
            }

            renderShowreelFrame(ctx, canvas.width, canvas.height, t);

            animIdRef.current = requestAnimationFrame(renderLoop);
        };

        if (isPlaying) {
            animIdRef.current = requestAnimationFrame(renderLoop);
        } else {
            pausedTimeRef.current = currentTime;
            startTimeRef.current = null;
        }

        return () => {
            running = false;
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        };
    }, [isPlaying, handleAudioSync, currentTime]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleAudio = () => {
        const next = !isMuted;
        setIsMuted(next);
        synth.setMuted(next);
    };

    const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetT = parseFloat(e.target.value);
        setCurrentTime(targetT);
        pausedTimeRef.current = targetT;
        startTimeRef.current = null;

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) renderShowreelFrame(ctx, canvas.width, canvas.height, targetT);
        }
    };

    const handleRestart = () => {
        setCurrentTime(0);
        pausedTimeRef.current = 0;
        startTimeRef.current = null;
        lastBeatRef.current = -1;
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const activePhase = SCENE_PHASES.find(p => currentTime >= p.start && currentTime < p.end) || SCENE_PHASES[0];

    // Minimal Full-Bleed Mode (Pure canvas, zero player chrome, no weird frames)
    if (minimal) {
        return (
            <div
                ref={containerRef}
                className={`relative w-full h-full overflow-hidden bg-[#07080b] flex items-center justify-center ${className}`}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block object-contain"
                />

                {/* Subtle floating audio toggle in bottom right corner */}
                <button
                    onClick={toggleAudio}
                    aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                    className={`absolute bottom-6 right-6 z-30 p-2.5 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                        !isMuted
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                            : 'bg-black/60 border-white/10 text-white/40 hover:text-white hover:border-white/30'
                    }`}
                    title={isMuted ? 'Enable Sound' : 'Mute Sound'}
                >
                    {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`relative rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-800 bg-[#07080b] shadow-2xl transition-all duration-300 ${
                isFullscreen
                    ? 'fixed inset-0 z-50 rounded-none w-screen h-screen flex flex-col justify-between'
                    : className
            }`}
        >
            {/* CANVAS RENDER VIEWPORT */}
            <div className={`relative w-full flex items-center justify-center bg-black ${isFullscreen ? 'flex-1' : 'aspect-video'}`}>
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block object-contain"
                />

                {!isPlaying && (
                    <div
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs cursor-pointer z-10"
                    >
                        <div className="w-16 h-16 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 ml-1 text-cyan-400" />
                        </div>
                    </div>
                )}
            </div>

            {/* MINIMAL BOTTOM CONTROLS */}
            <div className="relative z-20 px-4 py-3 bg-[#07080b]/95 border-t border-white/10 flex items-center gap-3">
                <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                    onClick={handleRestart}
                    className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Restart"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <input
                    type="range"
                    min="0"
                    max={TOTAL_DURATION}
                    step="0.01"
                    value={currentTime}
                    onChange={handleScrub}
                    className="flex-1 accent-cyan-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
                />

                <div className="text-right font-mono text-xs text-zinc-300 shrink-0 min-w-[70px]">
                    <span className="text-cyan-400">{currentTime.toFixed(2)}s</span> / {TOTAL_DURATION.toFixed(2)}s
                </div>

                <button
                    onClick={toggleAudio}
                    className="p-1.5 rounded-md bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                    {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-md bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
            </div>
        </div>
    );
};
export default MotionShowreelCanvas;
