import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Plus, Check } from 'lucide-react';
import { PREDICTIVE_OBSERVATIONS } from '../data/predictiveTexts';

export type PredictiveContext = keyof typeof PREDICTIVE_OBSERVATIONS;

interface PredictiveTextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  context: PredictiveContext;
  className?: string;
}

export const PredictiveTextarea: React.FC<PredictiveTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Escribe las observaciones detalladas...',
  rows = 2,
  required = false,
  context,
  className = ''
}) => {
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const suggestions = PREDICTIVE_OBSERVATIONS[context] || [];

  const handleSelectSuggestion = (phrase: string) => {
    if (!value.trim()) {
      onChange(phrase);
    } else {
      // Append if already has content
      if (value.includes(phrase)) return;
      onChange(`${value.trim()} • ${phrase}`);
    }
  };

  const displayedSuggestions = showAllSuggestions ? suggestions : suggestions.slice(0, 3);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Texto Predictivo CD</span>
          </span>
        </div>
      )}

      {/* Textarea */}
      <textarea
        rows={rows}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#008744] transition leading-relaxed"
      />

      {/* Predictive Phrase Chips */}
      {suggestions.length > 0 && (
        <div className="pt-0.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
            <span className="flex items-center gap-1">
              <span>Frases sugeridas para supervisores y jefaturas:</span>
            </span>

            {suggestions.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                className="text-emerald-700 hover:text-emerald-800 underline text-[10px] font-bold cursor-pointer"
              >
                {showAllSuggestions ? 'Ver menos' : `Ver todas (${suggestions.length})`}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {displayedSuggestions.map((phrase, idx) => {
              const isIncluded = value.includes(phrase);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(phrase)}
                  className={`text-left px-2.5 py-1 rounded-lg text-[11px] font-semibold transition border flex items-center gap-1.5 cursor-pointer max-w-full ${
                    isIncluded
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-2xs'
                      : 'bg-white hover:bg-emerald-50/60 border-slate-200 hover:border-emerald-300 text-slate-700'
                  }`}
                  title="Haz clic para insertar esta frase predictiva"
                >
                  {isIncluded ? (
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  ) : (
                    <Plus className="w-3 h-3 text-emerald-500 shrink-0" />
                  )}
                  <span className="truncate">{phrase}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
