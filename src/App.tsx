/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Search,
  AlertTriangle,
  Info
} from 'lucide-react';
import { MALWARE_DATA, MalwareInfo } from './constants';
import { TypingEffect } from './components/TypingEffect';

export default function App() {
  const [selectedMalware, setSelectedMalware] = useState<MalwareInfo | null>(null);

  const handleSelect = (id: string) => {
    const malware = MALWARE_DATA.find(m => m.id === id);
    if (malware) setSelectedMalware(malware);
  };

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="border-b border-cyber-border bg-cyber-surface/80 backdrop-blur-md p-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyber-accent/20 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-cyber-accent" />
            </div>
            <div>
              <h1 className="text-xl font-mono font-bold tracking-wider text-white">
                CYBERLAB <span className="text-cyber-accent">v1.0</span>
              </h1>
              <p className="text-xs text-gray-500 font-mono">SecOps Threat Intelligence Node</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-safe animate-pulse"></span>
              <span className="text-cyber-safe">SYSTEMS NOMINAL</span>
            </div>
            <div className="text-gray-500">USER: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Left Panel: Selection */}
        <div className="lg:col-span-4 space-y-6">
          <section>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" /> Threat Database
            </h2>
            <div className="space-y-3">
              {MALWARE_DATA.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full text-left p-4 border rounded-xl transition-all group relative overflow-hidden ${
                    selectedMalware?.id === item.id 
                      ? `border-cyber-accent bg-cyber-accent/10` 
                      : 'border-cyber-border bg-cyber-surface/40 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h3 className="font-mono text-sm text-white group-hover:text-cyber-accent transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{item.type}</p>
                    </div>
                    {item.severity === 'Critical' ? (
                      <AlertTriangle className="w-4 h-4 text-cyber-hazard" />
                    ) : (
                      <Info className="w-4 h-4 text-cyber-warn" />
                    )}
                  </div>
                  {/* Decorative bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    selectedMalware?.id === item.id ? 'bg-cyber-accent' : 'bg-transparent'
                  }`} />
                </motion.button>
              ))}
            </div>
          </section>

          <section className="p-4 border border-cyber-border rounded-xl bg-cyber-surface/20">
            <div className="flex items-center gap-2 text-cyber-warn mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-mono font-bold uppercase">Educational Advisory</span>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-500 italic">
              This node is strictly for cybersecurity education and awareness. Analyzing threat mechanics is essential for building defensive resilience and proactive detection strategies.
            </p>
          </section>
        </div>

        {/* Right Panel: Intelligence Display */}
        <div className="lg:col-span-8 flex flex-col min-h-[600px]">
          <AnimatePresence mode="wait">
            {!selectedMalware ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center border border-dashed border-cyber-border rounded-2xl bg-cyber-surface/10 p-12 text-center"
              >
                <Terminal className="w-16 h-16 text-cyber-border mb-6" />
                <h3 className="text-xl font-mono text-gray-500">SELECT THREAT TO ANALYZE</h3>
                <p className="text-sm text-gray-600 mt-2 max-w-sm">
                  Initialize a session by choosing a malware profile from the threat database to view its operational mechanics and defensive measures.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedMalware.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 space-y-8"
              >
                {/* Profile Header */}
                <div className="p-8 border border-cyber-border rounded-2xl bg-cyber-surface/60 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        selectedMalware.severity === 'Critical' 
                          ? 'border-cyber-hazard text-cyber-hazard bg-cyber-hazard/10' 
                          : 'border-cyber-warn text-cyber-warn bg-cyber-warn/10'
                      }`}>
                        {selectedMalware.severity.toUpperCase()} THREAT
                      </span>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        Intelligence Profile #{selectedMalware.id.toUpperCase()}
                      </span>
                    </div>
                    <TypingEffect 
                      text={selectedMalware.name} 
                      tag="h2" 
                      className="text-3xl font-mono font-bold text-white mb-4"
                    />
                    <div className="text-gray-400 leading-relaxed text-sm max-w-2xl bg-black/30 p-4 rounded-lg border border-white/5">
                      <TypingEffect text={selectedMalware.description} speed={5} />
                    </div>
                  </div>
                  <Terminal className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 pointer-events-none" />
                </div>

                {/* Detailed Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mechanics */}
                  <motion.section 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 border border-cyber-border rounded-xl bg-cyber-surface/40"
                  >
                    <h3 className="text-xs font-mono text-cyber-hazard uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> Execution Mechanics
                    </h3>
                    <ul className="space-y-4">
                      {selectedMalware.mechanics.map((m, i) => (
                        <li key={i} className="flex gap-3 text-sm group">
                          <span className="text-cyber-hazard font-mono opacity-50 shrink-0">[{String(i+1).padStart(2, '0')}]</span>
                          <span className="text-gray-400 leading-snug group-hover:text-gray-200 transition-colors">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>

                  {/* Indicators of Compromise */}
                  <motion.section 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 border border-cyber-border rounded-xl bg-cyber-surface/40"
                  >
                    <h3 className="text-xs font-mono text-cyber-warn uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Search className="w-4 h-4" /> Artifacts & IOCs
                    </h3>
                    <ul className="space-y-4">
                      {selectedMalware.indicators.map((ind, i) => (
                        <li key={i} className="flex gap-3 text-sm group">
                          <Activity className="w-4 h-4 text-cyber-warn shrink-0 opacity-40 mt-0.5" />
                          <span className="text-gray-400 leading-snug group-hover:text-gray-200 transition-colors">{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>

                  {/* Defenses */}
                  <motion.section 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2 p-6 border border-cyber-safe/30 rounded-xl bg-cyber-safe/5"
                  >
                    <h3 className="text-xs font-mono text-cyber-safe uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Mitigation & Defensive Controls
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedMalware.defenses.map((d, i) => (
                        <div key={i} className="flex gap-3 p-3 bg-black/20 rounded border border-cyber-safe/10">
                          <ShieldCheck className="w-4 h-4 text-cyber-safe shrink-0 mt-0.5 opacity-60" />
                          <span className="text-gray-300 text-sm leading-snug">{d}</span>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Meta */}
      <footer className="p-4 border-t border-cyber-border bg-cyber-surface/40 text-[10px] font-mono text-gray-600 flex justify-between items-center">
        <div className="flex gap-4">
          <span>STATION: TERMINAL_01</span>
          <span>LOCATION: LAB_ENV_04</span>
          <span>LATENCY: 12ms</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="animate-pulse">●</span> ENCRYPTED LINK ACTIVE
        </div>
      </footer>
    </div>
  );
}
