export function buildCircuitSVG(category, brand) {
    // Shared defs string
    const defs = `<defs>
        <filter id="cglow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="busG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.2"/>
            <stop offset="50%" stop-color="#00ffff" stop-opacity="1"/>
            <stop offset="100%" stop-color="#00d4ff" stop-opacity="0.2"/>
        </linearGradient>
    </defs>`;

    const circuits = {
        'mdb': () => `<svg viewBox="0 0 220 260" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1.5">MAIN DISTRIBUTION BOARD</text>
            <!-- 3-phase incoming -->
            <line x1="70" y1="22" x2="70" y2="48" stroke="#ef4444" stroke-width="2.5"/>
            <line x1="110" y1="22" x2="110" y2="48" stroke="#fbbf24" stroke-width="2.5"/>
            <line x1="150" y1="22" x2="150" y2="48" stroke="#34d399" stroke-width="2.5"/>
            <text x="70"  y="20" text-anchor="middle" fill="#ef4444" font-size="7">L1</text>
            <text x="110" y="20" text-anchor="middle" fill="#fbbf24" font-size="7">L2</text>
            <text x="150" y="20" text-anchor="middle" fill="#34d399" font-size="7">L3</text>
            <!-- Main MCCB -->
            <rect x="50" y="48" width="120" height="28" rx="4" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="110" y="60" text-anchor="middle" fill="#00d4ff" font-size="8" font-family="monospace">MAIN MCCB</text>
            <text x="110" y="71" text-anchor="middle" fill="#607080" font-size="6.5">125A · 4P · 6kA</text>
            <!-- Connections thru breaker -->
            <line x1="70"  y1="48" x2="70"  y2="76" stroke="#00d4ff" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <line x1="110" y1="48" x2="110" y2="76" stroke="#00d4ff" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <line x1="150" y1="48" x2="150" y2="76" stroke="#00d4ff" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
            <!-- Busbar -->
            <rect x="20" y="84" width="180" height="10" rx="2" fill="url(#busG)" class="busbar-pulse"/>
            <text x="110" y="106" text-anchor="middle" fill="#7c3aed" font-size="7" font-family="monospace">3Φ BUSBAR — 400V AC</text>
            <!-- Drops to MCBs -->
            <line x1="38"  y1="94" x2="38"  y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <line x1="72"  y1="94" x2="72"  y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <line x1="106" y1="94" x2="106" y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <line x1="140" y1="94" x2="140" y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <line x1="174" y1="94" x2="174" y2="114" stroke="#00d4ff" stroke-width="1.5" opacity="0.7" class="flow-line"/>
            <!-- 5 MCBs -->
            ${[38,72,106,140,174].map((x,i) => `
            <rect x="${x-10}" y="114" width="20" height="26" rx="3" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="1.2" class="mcb-blink"/>
            <text x="${x}" y="124" text-anchor="middle" fill="#00d4ff" font-size="6.5" font-family="monospace">MCB</text>
            <text x="${x}" y="134" text-anchor="middle" fill="#607080" font-size="6">${['20A','32A','40A','32A','20A'][i]}</text>
            <line x1="${x}" y1="140" x2="${x}" y2="160" stroke="#00d4ff" stroke-width="1.2" opacity="0.6" class="flow-line-slow"/>
            <circle cx="${x}" cy="166" r="6" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.8"/>
            <text x="${x}" y="169" text-anchor="middle" fill="#7c3aed" font-size="7">~</text>`).join('')}
            <!-- Neutral + Earth bars -->
            <rect x="16" y="180" width="188" height="7" rx="2" fill="rgba(0,160,200,0.2)" stroke="#00a0c0" stroke-width="1"/>
            <text x="110" y="197" text-anchor="middle" fill="#00a0c0" font-size="6.5" font-family="monospace">NEUTRAL BAR (N)</text>
            <rect x="16" y="204" width="188" height="7" rx="2" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1"/>
            <text x="110" y="221" text-anchor="middle" fill="#34d399" font-size="6.5" font-family="monospace">EARTH BAR (PE)</text>
            <text x="110" y="244" text-anchor="middle" fill="#607080" font-size="6.5" font-family="monospace">IEC 61439-3 CERTIFIED</text>
        </svg>`,

        'sdb': () => `<svg viewBox="0 0 220 260" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1.5">SUB DISTRIBUTION BOARD</text>
            <!-- Incoming feeder -->
            <line x1="110" y1="22" x2="110" y2="48" stroke="#00d4ff" stroke-width="2.5" class="flow-line"/>
            <text x="110" y="20" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace">FROM MDB</text>
            <!-- Incomer MCB -->
            <rect x="80" y="48" width="60" height="26" rx="4" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="110" y="59" text-anchor="middle" fill="#00d4ff" font-size="8" font-family="monospace">INCOMER</text>
            <text x="110" y="69" text-anchor="middle" fill="#607080" font-size="6.5">63A MCB</text>
            <!-- RCCB -->
            <line x1="110" y1="74" x2="110" y2="90" stroke="#a78bfa" stroke-width="1.5" class="flow-line"/>
            <rect x="76" y="90" width="68" height="26" rx="4" fill="rgba(124,58,237,0.1)" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="110" y="101" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="monospace">RCCB</text>
            <text x="110" y="111" text-anchor="middle" fill="#607080" font-size="6.5">63A · 30mA</text>
            <line x1="110" y1="116" x2="110" y2="126" stroke="#00d4ff" stroke-width="1.5" class="flow-line"/>
            <!-- Busbar -->
            <rect x="20" y="126" width="180" height="8" rx="2" fill="url(#busG)" class="busbar-pulse"/>
            <!-- 8 MCBs -->
            ${[30,57,84,111,138,165].map((x,i) => `
            <line x1="${x}" y1="134" x2="${x}" y2="150" stroke="#00d4ff" stroke-width="1.2" opacity="0.7" class="flow-line-slow"/>
            <rect x="${x-9}" y="150" width="18" height="24" rx="2.5" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.1" class="mcb-blink"/>
            <text x="${x}" y="160" text-anchor="middle" fill="#00d4ff" font-size="6" font-family="monospace">MCB</text>
            <text x="${x}" y="169" text-anchor="middle" fill="#607080" font-size="5.5">${['16A','16A','20A','20A','32A','32A'][i]}</text>
            <line x1="${x}" y1="174" x2="${x}" y2="188" stroke="#00d4ff" stroke-width="1" opacity="0.5" class="flow-line-slow"/>
            <circle cx="${x}" cy="193" r="5" fill="none" stroke="#7c3aed" stroke-width="1.3" opacity="0.8"/>
            <text x="${x}" y="196" text-anchor="middle" fill="#7c3aed" font-size="6">~</text>`).join('')}
            <rect x="16" y="206" width="188" height="6" rx="2" fill="rgba(0,160,200,0.2)" stroke="#00a0c0" stroke-width="1"/>
            <text x="110" y="222" text-anchor="middle" fill="#00a0c0" font-size="6.5" font-family="monospace">NEUTRAL BAR (N)</text>
            <rect x="16" y="227" width="188" height="6" rx="2" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1"/>
            <text x="110" y="243" text-anchor="middle" fill="#34d399" font-size="6.5" font-family="monospace">EARTH BAR (PE)</text>
        </svg>`,

        'mcc': () => `<svg viewBox="0 0 220 270" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1.5">MOTOR CONTROL CENTER</text>
            <!-- 3Φ incoming -->
            <line x1="60"  y1="22" x2="60"  y2="44" stroke="#ef4444" stroke-width="2.5"/>
            <line x1="110" y1="22" x2="110" y2="44" stroke="#fbbf24" stroke-width="2.5"/>
            <line x1="160" y1="22" x2="160" y2="44" stroke="#34d399" stroke-width="2.5"/>
            <text x="60"  y="20" text-anchor="middle" fill="#ef4444"  font-size="7">L1</text>
            <text x="110" y="20" text-anchor="middle" fill="#fbbf24" font-size="7">L2</text>
            <text x="160" y="20" text-anchor="middle" fill="#34d399"  font-size="7">L3</text>
            <!-- Main incomer -->
            <rect x="40" y="44" width="140" height="24" rx="4" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="110" y="54" text-anchor="middle" fill="#00d4ff" font-size="7.5" font-family="monospace">MAIN INCOMER</text>
            <text x="110" y="63" text-anchor="middle" fill="#607080" font-size="6">630A MCCB</text>
            <!-- Busbar -->
            <rect x="16" y="78" width="188" height="9" rx="2" fill="url(#busG)" class="busbar-pulse"/>
            <text x="110" y="97" text-anchor="middle" fill="#7c3aed" font-size="6.5" font-family="monospace">3Φ BUS — 400V AC</text>
            <!-- 3 starters -->
            ${[45,110,175].map((x,i) => `
            <line x1="${x}" y1="87" x2="${x}" y2="106" stroke="#00d4ff" stroke-width="1.5" class="flow-line"/>
            <!-- Contactor symbol -->
            <rect x="${x-18}" y="106" width="36" height="28" rx="3" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.3"/>
            <line x1="${x-10}" y1="112" x2="${x-10}" y2="128" stroke="#00d4ff" stroke-width="1.2"/>
            <line x1="${x}"    y1="112" x2="${x}"    y2="128" stroke="#00d4ff" stroke-width="1.2"/>
            <line x1="${x+10}" y1="112" x2="${x+10}" y2="128" stroke="#00d4ff" stroke-width="1.2"/>
            <line x1="${x-14}" y1="119" x2="${x+14}" y2="119" stroke="#00d4ff" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="${x}" y="146" text-anchor="middle" fill="#00d4ff" font-size="6.5" font-family="monospace">DOL</text>
            <!-- Overload relay -->
            <rect x="${x-18}" y="150" width="36" height="16" rx="3" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" stroke-width="1.2"/>
            <text x="${x}" y="161" text-anchor="middle" fill="#fbbf24" font-size="6" font-family="monospace">OVERLOAD</text>
            <!-- Motor symbol -->
            <line x1="${x}" y1="166" x2="${x}" y2="180" stroke="#00d4ff" stroke-width="1.5" class="flow-line-slow"/>
            <circle cx="${x}" cy="192" r="12" fill="rgba(124,58,237,0.1)" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="${x}" y="189" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="monospace">M</text>
            <text x="${x}" y="199" text-anchor="middle" fill="#a78bfa" font-size="6">3~</text>
            <text x="${x}" y="216" text-anchor="middle" fill="#607080" font-size="6" font-family="monospace">${['PUMP-1','FAN-2','PUMP-3'][i]}</text>`).join('')}
            <text x="110" y="244" text-anchor="middle" fill="#607080" font-size="6.5" font-family="monospace">IEC 61439-2 · FORM 4</text>
            <text x="110" y="256" text-anchor="middle" fill="#7c3aed" font-size="6.5" font-family="monospace">EMS ENGINEERING</text>
        </svg>`,

        'lv-panel': () => `<svg viewBox="0 0 220 270" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1">LV SWITCHGEAR PANEL</text>
            <!-- Utility supply -->
            <text x="110" y="24" text-anchor="middle" fill="#607080" font-size="7" font-family="monospace">UTILITY / TRANSFORMER</text>
            <line x1="110" y1="26" x2="110" y2="46" stroke="#00d4ff" stroke-width="3" class="flow-line"/>
            <!-- Incoming ACB -->
            <rect x="60" y="46" width="100" height="30" rx="5" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="2"/>
            <rect x="70" y="52" width="80" height="18" rx="3" fill="rgba(0,212,255,0.06)" stroke="#00d4ff" stroke-width="1"/>
            <text x="110" y="62" text-anchor="middle" fill="#00d4ff" font-size="8" font-family="monospace">MAIN ACB</text>
            <text x="110" y="72" text-anchor="middle" fill="#607080" font-size="6.5">4000A · Drawout</text>
            <line x1="110" y1="76" x2="110" y2="92" stroke="#00d4ff" stroke-width="2" class="flow-line"/>
            <!-- Bus section -->
            <rect x="16" y="92" width="188" height="11" rx="3" fill="url(#busG)" class="busbar-pulse"/>
            <text x="110" y="115" text-anchor="middle" fill="#7c3aed" font-size="7" font-family="monospace">MAIN BUSBAR — 4000A</text>
            <!-- 4 feeder ACBs -->
            ${[36,84,136,184].map((x,i) => `
            <line x1="${x}" y1="103" x2="${x}" y2="120" stroke="#00d4ff" stroke-width="1.5" class="flow-line"/>
            <rect x="${x-20}" y="120" width="40" height="32" rx="4" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="${x}" y="133" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace">ACB</text>
            <text x="${x}" y="144" text-anchor="middle" fill="#607080" font-size="6">${['800A','630A','630A','400A'][i]}</text>
            <line x1="${x}" y1="152" x2="${x}" y2="172" stroke="#00d4ff" stroke-width="1.5" class="flow-line-slow"/>
            <rect x="${x-18}" y="172" width="36" height="20" rx="3" fill="rgba(124,58,237,0.1)" stroke="#a78bfa" stroke-width="1.2"/>
            <text x="${x}" y="183" text-anchor="middle" fill="#a78bfa" font-size="6.5" font-family="monospace">MCC</text>
            <text x="${x}" y="204" text-anchor="middle" fill="#607080" font-size="6" font-family="monospace">${['MDB-A','MDB-B','MCC-1','SDB-1'][i]}</text>`).join('')}
            <text x="110" y="228" text-anchor="middle" fill="#607080" font-size="6.5" font-family="monospace">IEC 61439-2 · FORM 4b</text>
            <text x="110" y="241" text-anchor="middle" fill="#00d4ff" font-size="6.5" font-family="monospace">IP54 · ARC FLASH RATED</text>
            <text x="110" y="256" text-anchor="middle" fill="#7c3aed" font-size="6.5" font-family="monospace">EMS ENGINEERING</text>
        </svg>`,

        'mcb-panel': () => `<svg viewBox="0 0 220 260" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">${defs}
            <text x="110" y="14" text-anchor="middle" fill="#00d4ff" font-size="7" font-family="monospace" letter-spacing="1.5">MCB DISTRIBUTION PANEL</text>
            <!-- Incoming -->
            <line x1="110" y1="22" x2="110" y2="50" stroke="#00d4ff" stroke-width="2.5" class="flow-line"/>
            <text x="110" y="20" text-anchor="middle" fill="#607080" font-size="7" font-family="monospace">INCOMER</text>
            <!-- Main isolator -->
            <rect x="75" y="50" width="70" height="26" rx="4" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" stroke-width="1.5"/>
            <text x="110" y="61" text-anchor="middle" fill="#00d4ff" font-size="8" font-family="monospace">ISOLATOR</text>
            <text x="110" y="71" text-anchor="middle" fill="#607080" font-size="6.5">125A 1P</text>
            <!-- Busbar -->
            <line x1="110" y1="76" x2="110" y2="88" stroke="#00d4ff" stroke-width="2" class="flow-line"/>
            <rect x="20" y="88" width="180" height="8" rx="2" fill="url(#busG)" class="busbar-pulse"/>
            <!-- RCCB -->
            <line x1="60" y1="96" x2="60" y2="112" stroke="#a78bfa" stroke-width="1.5" class="flow-line"/>
            <rect x="38" y="112" width="44" height="24" rx="3" fill="rgba(124,58,237,0.1)" stroke="#a78bfa" stroke-width="1.5"/>
            <text x="60" y="123" text-anchor="middle" fill="#a78bfa" font-size="7.5" font-family="monospace">RCCB</text>
            <text x="60" y="132" text-anchor="middle" fill="#607080" font-size="6">30mA</text>
            <!-- 6 MCBs -->
            ${[100,128,156,184].map((x,i) => `
            <line x1="${x}" y1="96" x2="${x}" y2="112" stroke="#00d4ff" stroke-width="1.4" class="flow-line"/>
            <rect x="${x-11}" y="112" width="22" height="24" rx="3" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" stroke-width="1.2" class="mcb-blink"/>
            <text x="${x}" y="123" text-anchor="middle" fill="#00d4ff" font-size="6.5" font-family="monospace">MCB</text>
            <text x="${x}" y="132" text-anchor="middle" fill="#607080" font-size="6">${['20A','20A','16A','16A'][i]}</text>
            <line x1="${x}" y1="136" x2="${x}" y2="154" stroke="#00d4ff" stroke-width="1.2" opacity="0.6" class="flow-line-slow"/>
            <circle cx="${x}" cy="160" r="6" fill="none" stroke="#7c3aed" stroke-width="1.3"/>
            <text x="${x}" y="163" text-anchor="middle" fill="#7c3aed" font-size="7">~</text>
            <text x="${x}" y="178" text-anchor="middle" fill="#607080" font-size="6" font-family="monospace">${['LTNG','SOCS','A/C','MISC'][i]}</text>`).join('')}
            <rect x="16" y="194" width="188" height="6" rx="2" fill="rgba(0,160,200,0.2)" stroke="#00a0c0" stroke-width="1"/>
            <text x="110" y="210" text-anchor="middle" fill="#00a0c0" font-size="6.5" font-family="monospace">NEUTRAL BAR (N)</text>
            <rect x="16" y="215" width="188" height="6" rx="2" fill="rgba(52,211,153,0.2)" stroke="#34d399" stroke-width="1"/>
            <text x="110" y="231" text-anchor="middle" fill="#34d399" font-size="6.5" font-family="monospace">EARTH BAR (PE)</text>
            <text x="110" y="250" text-anchor="middle" fill="#607080" font-size="6.5" font-family="monospace">IEC 61439-3 RESIDENTIAL</text>
        </svg>`,
    };

    const fallback = circuits['mdb'];
    return (circuits[category] || fallback)();
}

export function getStandardByCategory(category) {
    const map = {
        'mdb': 'IEC 61439-3',
        'sdb': 'IEC 61439-3',
        'mcc': 'IEC 61439-2',
        'lv-panel': 'IEC 61439-2',
        'mcb-panel': 'IEC 61439-3',
    };
    return map[category] || 'IEC 61439';
}

