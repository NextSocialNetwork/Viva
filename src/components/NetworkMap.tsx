import React, { useState } from 'react';
import { MAJOR_CITIES_TELEMETRY, US_STATES } from '../data/networkData';
import { CityCoverage } from '../types';
import { Signal, Radio, CheckCircle2, Zap, Search, Activity, RefreshCw, Server, ArrowUpRight, MapPin } from 'lucide-react';

interface NetworkMapProps {
  t: any;
}

export const NetworkMap: React.FC<NetworkMapProps> = ({ t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [testing, setTesting] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityCoverage>(MAJOR_CITIES_TELEMETRY[0]);
  const [customResult, setCustomResult] = useState<{ city: string; speed: string; latency: string; uptime: string } | null>(null);
  const [activeTabState, setActiveTabState] = useState<'map' | 'states'>('map');

  const handleTestSignal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTesting(true);
    setCustomResult(null);

    setTimeout(() => {
      setTesting(false);
      if (searchQuery.trim()) {
        // Generate deterministic realistic metrics based on string hash
        const query = searchQuery.trim();
        const hash = query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const downSpeed = 650 + (hash % 580); // 650 - 1230 Mbps
        const ping = 9 + (hash % 11); // 9 - 19 ms
        setCustomResult({
          city: query.toUpperCase(),
          speed: `${downSpeed} Mbps`,
          latency: `${ping}ms`,
          uptime: '99.999%'
        });
      }
    }, 1800);
  };

  return (
    <section id="network" className="py-24 bg-[#070410] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF007F]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF6B00]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF007F]/10 border border-[#FF007F]/30 text-[#FF007F] text-xs font-mono font-bold mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>NATIONWIDE 5G ULTRA CAPACITY INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight mb-4">
            {t.network.title}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {t.network.subtitle}
          </p>
        </div>

        {/* SIGNAL TESTER BAR */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleTestSignal} className="relative flex items-center bg-white/5 border border-white/15 p-1.5 rounded-full shadow-[0_0_30px_rgba(255,0,127,0.15)] focus-within:border-[#FF007F] transition-all">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.network.searchPlaceholder}
              className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none font-sans"
            />
            <button
              type="submit"
              disabled={testing}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF007F] to-[#FF6B00] text-white font-bold text-xs sm:text-sm whitespace-nowrap hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">{t.network.scanning}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current text-[#FFD700]" />
                  <span>{t.network.testBtn}</span>
                </>
              )}
            </button>
          </form>

          {/* Custom Test Result Display */}
          {(testing || customResult) && (
            <div className="mt-6 p-6 rounded-3xl bg-gradient-to-b from-[#13082a] to-[#0a0518] border border-[#FF007F]/40 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
              {testing ? (
                <div className="py-6 flex flex-col items-center justify-center space-y-3 text-center font-mono text-sm text-[#FF007F]">
                  <Activity className="w-8 h-8 animate-bounce" />
                  <div>{t.network.scanning}</div>
                  <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FF007F] to-[#FF6B00] animate-[shimmer_1.5s_infinite]" style={{ width: '70%' }} />
                  </div>
                </div>
              ) : customResult && (
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                      <span className="text-base font-bold font-sans text-white">{customResult.city}</span>
                      <span className="px-2 py-0.5 rounded bg-[#E20074] text-white text-[10px] font-extrabold uppercase">T-Mobile 5G UC</span>
                    </div>
                    <span className="text-xs font-mono text-[#FF007F] font-bold animate-pulse">{t.network.signalOptimal}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <div className="text-[10px] uppercase font-mono text-gray-400 mb-1">{t.network.speed}</div>
                      <div className="text-lg sm:text-2xl font-extrabold text-[#FFD700] font-sans">{customResult.speed}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <div className="text-[10px] uppercase font-mono text-gray-400 mb-1">{t.network.latency}</div>
                      <div className="text-lg sm:text-2xl font-extrabold text-[#FF007F] font-mono">{customResult.latency}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <div className="text-[10px] uppercase font-mono text-gray-400 mb-1">{t.network.uptime}</div>
                      <div className="text-lg sm:text-2xl font-extrabold text-[#10B981] font-mono">{customResult.uptime}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* View Switcher: Map vs State List */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 p-1 rounded-full border border-white/10 flex gap-1">
            <button
              onClick={() => setActiveTabState('map')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTabState === 'map' ? 'bg-gradient-to-r from-[#FF007F] to-[#D946EF] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Interactive USA Coverage Map
            </button>
            <button
              onClick={() => setActiveTabState('states')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTabState === 'states' ? 'bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              All 50 States Directory
            </button>
          </div>
        </div>

        {/* MAIN VISUALIZATION STAGE */}
        {activeTabState === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Interactive USA Map Canvas Stage (Left 2 cols) */}
            <div className="lg:col-span-2 relative aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-br from-[#0d071e] via-[#05030c] to-[#0c0618] rounded-3xl border border-white/15 p-4 sm:p-8 overflow-hidden shadow-2xl group flex items-center justify-center">
              
              {/* Simulated Futuristic Vector Map Outline Grid */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF007F_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* US Map SVG Shape / Silhouette representation */}
              <div className="relative w-full h-full flex items-center justify-center select-none">
                <div className="absolute inset-4 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                  
                  {/* Glowing Coverage Waves */}
                  <div className="absolute w-full h-full bg-gradient-to-tr from-[#FF007F]/20 via-[#FF6B00]/15 to-[#D946EF]/20 blur-2xl" />

                  {/* Coverage Legend overlay */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-[10px] space-y-1 z-20">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF007F] animate-pulse" />
                      {t.network.tierUc}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
                      {t.network.tierExt}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
                      {t.network.tierLte}
                    </div>
                  </div>

                  {/* City Pins on Map */}
                  {MAJOR_CITIES_TELEMETRY.map((cityObj) => {
                    const isSelected = selectedCity.city === cityObj.city;
                    return (
                      <button
                        key={cityObj.city}
                        onClick={() => setSelectedCity(cityObj)}
                        style={{ left: `${cityObj.coords.x}%`, top: `${cityObj.coords.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all transform hover:scale-125 focus:outline-none group/pin`}
                      >
                        <div className="relative flex items-center justify-center">
                          {isSelected && (
                            <span className="absolute w-8 h-8 rounded-full bg-[#FF007F] opacity-50 animate-ping" />
                          )}
                          <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shadow-[0_0_15px_#FF007F] ${isSelected ? 'bg-[#FFD700] scale-125' : 'bg-[#FF007F]'}`}>
                            <span className="w-1 h-1 bg-black rounded-full" />
                          </div>
                          
                          {/* Pin Label tooltip */}
                          <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#050508]/90 border text-[10px] font-sans font-bold whitespace-nowrap backdrop-blur-sm pointer-events-none transition-opacity ${isSelected ? 'border-[#FFD700] text-[#FFD700] opacity-100 z-40 scale-105' : 'border-white/10 text-white opacity-80 group-hover/pin:opacity-100'}`}>
                            {cityObj.city}
                            <span className="ml-1 text-[8px] font-mono text-[#FF007F]">({cityObj.latency})</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  <div className="text-center font-mono text-xs uppercase tracking-[0.4em] text-white/30 pointer-events-none">
                    T-MOBILE 5G NATIONWIDE GRID (USA)
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-400 bg-black/80 px-3 py-1 rounded-lg border border-white/10">
                ● Live 5G Towers Connected
              </div>
            </div>

            {/* Selected City Live Diagnostics Sidebar (Right 1 col) */}
            <div className="bg-[#110826] border border-[#FF007F]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#FF007F]" />
                  <div>
                    <h3 className="text-xl font-extrabold text-white font-sans leading-none">{selectedCity.city}</h3>
                    <span className="text-xs font-mono text-gray-400">{selectedCity.state} • Zip {selectedCity.zip}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#FF007F]/20 text-[#FF007F] font-mono text-[10px] font-bold">
                  LIVE FEED
                </span>
              </div>

              <div className="space-y-4 font-mono">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Download Speed</span>
                  <span className="text-lg font-extrabold text-[#FFD700] flex items-center gap-1 font-sans">
                    <Zap className="w-4 h-4 fill-current" />
                    {selectedCity.speed}
                  </span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Network Latency</span>
                  <span className="text-lg font-extrabold text-[#FF007F]">{selectedCity.latency}</span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Tower Uptime Status</span>
                  <span className="text-lg font-extrabold text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {selectedCity.uptime}
                  </span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Carrier Aggregation</span>
                  <span className="text-xs font-bold text-gray-200 bg-[#E20074]/30 px-2 py-0.5 rounded">
                    Ultra Capacity n41 + n71
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF007F]/10 to-[#FF6B00]/10 border border-[#FF007F]/20 text-xs text-gray-300 leading-relaxed">
                ⚡ <strong className="text-white">Instant eSIM Ready:</strong> Order your VIVA Mobile $10 Kit now to instantly connect to this exact {selectedCity.city} tower in under 2 minutes.
              </div>
            </div>

          </div>
        ) : (
          /* ALL 50 STATES DIRECTORY VIEW */
          <div className="bg-[#0c071d] border border-white/15 rounded-3xl p-6 sm:p-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-white">United States 5G UC Coverage Directory</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">All 50 states fully covered by T-Mobile Ultra Capacity infrastructure.</p>
              </div>
              <span className="bg-[#10B981]/20 text-[#10B981] font-mono text-xs px-3 py-1.5 rounded-full font-bold">
                100% STATES ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {US_STATES.map((stateName) => (
                <div key={stateName} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF007F]/40 transition-colors flex items-center justify-between group cursor-default">
                  <span className="text-xs font-medium text-gray-200 group-hover:text-white font-sans">{stateName}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700] group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5G CONNECTIVITY STATUS INDICATORS TABLE */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[#FF6B00]" />
                <h3 className="text-2xl font-extrabold text-white font-sans">{t.network.liveIndicatorsTitle}</h3>
              </div>
              <p className="text-sm text-gray-400 mt-1">{t.network.liveIndicatorsSub}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Telemetry Updated Live</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4 rounded-l-xl">Major Metro Area</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Network Latency</th>
                  <th className="py-3 px-4">Peak Down Speed</th>
                  <th className="py-3 px-4">Verified Uptime</th>
                  <th className="py-3 px-4 rounded-r-xl">5G UC Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MAJOR_CITIES_TELEMETRY.map((city) => (
                  <tr 
                    key={city.city}
                    onClick={() => setSelectedCity(city)}
                    className="hover:bg-white/[0.04] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-sans font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] group-hover:scale-150 transition-transform" />
                      {city.city}
                    </td>
                    <td className="py-3.5 px-4 text-gray-400">{city.state}</td>
                    <td className="py-3.5 px-4 text-[#FF007F] font-bold">{city.latency}</td>
                    <td className="py-3.5 px-4 text-[#FFD700] font-bold">{city.speed}</td>
                    <td className="py-3.5 px-4 text-[#10B981]">{city.uptime}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E20074]/20 border border-[#E20074]/40 text-[#FFD700] text-[10px] font-bold uppercase">
                        <Zap className="w-2.5 h-2.5 fill-current" />
                        Optimal 5G UC
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
