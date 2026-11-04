import React, { useState, useRef, useEffect, useId } from 'react';
import { UserCheck, Sparkles, ChevronDown, Check, Shield, User, Award, HardHat } from 'lucide-react';
import { PREDICTIVE_RESPONSIBLES, ResponsibleLeader } from '../data/predictiveTexts';

interface PredictiveLeaderInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  filterRole?: 'jefatura' | 'supervisor' | 'prevencion' | 'all';
  className?: string;
}

export const PredictiveLeaderInput: React.FC<PredictiveLeaderInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Buscar o seleccionar nombre...',
  required = false,
  filterRole = 'all',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'todos' | 'jefatura' | 'supervisor' | 'prevencion'>('todos');
  const containerRef = useRef<HTMLDivElement>(null);
  const datalistId = useId();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter leaders
  const filteredLeaders = PREDICTIVE_RESPONSIBLES.filter(leader => {
    if (filterRole !== 'all' && leader.role !== filterRole && leader.role !== 'operador_lider') {
      return false;
    }
    if (activeTab !== 'todos' && leader.role !== activeTab) {
      return false;
    }
    if (!value.trim()) return true;
    const q = value.toLowerCase();
    return (
      leader.name.toLowerCase().includes(q) ||
      leader.roleLabel.toLowerCase().includes(q) ||
      leader.area.toLowerCase().includes(q)
    );
  });

  const getRoleBadge = (role: ResponsibleLeader['role']) => {
    switch (role) {
      case 'jefatura':
        return { label: 'Jefatura', class: 'bg-amber-100 text-amber-900 border-amber-300', icon: Award };
      case 'supervisor':
        return { label: 'Supervisor', class: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: Shield };
      case 'prevencion':
        return { label: 'Prevención SSO', class: 'bg-indigo-100 text-indigo-900 border-indigo-300', icon: HardHat };
      case 'operador_lider':
        return { label: 'Líder', class: 'bg-slate-100 text-slate-700 border-slate-300', icon: User };
    }
  };

  const handleSelectLeader = (leader: ResponsibleLeader) => {
    onChange(leader.name);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer transition"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Sugerencias ({PREDICTIVE_RESPONSIBLES.length})</span>
          </button>
        </div>
      )}

      {/* Input Field with Datalist Support */}
      <div className="relative">
        <input
          type="text"
          list={datalistId}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 pr-9 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008744]"
        />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-2 p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer transition"
          title="Ver lista de jefaturas, supervisores y prevencionistas"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
        </button>

        {/* Native Browser Datalist */}
        <datalist id={datalistId}>
          {PREDICTIVE_RESPONSIBLES.map(l => (
            <option key={l.name} value={l.name}>
              {l.roleLabel} • {l.area}
            </option>
          ))}
        </datalist>
      </div>

      {/* Predictive Dropdown Popup */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-2.5 animate-fade-in space-y-2 max-h-72 overflow-y-auto">
          
          {/* Role Filters in Dropdown */}
          <div className="flex items-center gap-1 pb-1.5 border-b border-slate-100 overflow-x-auto scrollbar-none text-[10px]">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'jefatura', label: '👑 Jefaturas' },
              { id: 'supervisor', label: '🛡️ Supervisores' },
              { id: 'prevencion', label: '🦺 Prevención' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Leaders List */}
          <div className="space-y-1">
            {filteredLeaders.map(leader => {
              const badge = getRoleBadge(leader.role);
              const IconComp = badge.icon;
              const isSelected = value.toLowerCase().trim() === leader.name.toLowerCase().trim();

              return (
                <div
                  key={leader.name}
                  onClick={() => handleSelectLeader(leader)}
                  className={`p-2 rounded-xl transition flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-950 font-black'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <IconComp className="w-3.5 h-3.5 text-slate-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-800 truncate">
                        {leader.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium truncate">
                        {leader.area}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full border ${badge.class}`}>
                      {badge.label}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}

            {filteredLeaders.length === 0 && (
              <div className="p-3 text-center text-xs text-slate-400">
                No se encontraron nombres que coincidan. Puedes escribir uno nuevo.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
