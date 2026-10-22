import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  Award, 
  FileText, 
  AlertTriangle,
  ChevronDown,
  Volume2,
  VolumeX,
  Share2,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LupItem, CharlaSession, ShiftType } from '../types';
import { saveCharla } from '../services/storage';

interface CharlaTimerProps {
  lups: LupItem[];
  selectedLupId?: string;
  onCharlaSaved: () => void;
  onSelectLup: (id: string) => void;
}

// Web Audio API beep synthesizer for industrial countdown feedback
function playChime(type: 'start' | 'warning' | 'finish') {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'start') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'warning') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'finish') {
      // Triad chord for celebration
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + i * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.5);
      });
    }
  } catch (e) {
    // Audio might be blocked by browser autoplay policy until interaction
  }
}

export const CharlaTimer: React.FC<CharlaTimerProps> = ({
  lups,
  selectedLupId,
  onCharlaSaved,
  onSelectLup
}) => {
  const [currentLupId, setCurrentLupId] = useState<string>(selectedLupId || lups[0]?.id || '');
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes = 300 seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);

  // Registration Form State
  const [facilitator, setFacilitator] = useState<string>('');
  const [shift, setShift] = useState<ShiftType>('Turno 1 (Mañana 07:00 - 15:00)');
  const [area, setArea] = useState<string>('Andenes de Despacho');
  const [attendeesCount, setAttendeesCount] = useState<number>(6);
  const [attendeesNotes, setAttendeesNotes] = useState<string>('');
  const [keyAgreements, setKeyAgreements] = useState<string>('');

  const timerRef = useRef<any>(null);

  // Sync selected LUP from prop if changed externally
  useEffect(() => {
    if (selectedLupId && selectedLupId !== currentLupId) {
      setCurrentLupId(selectedLupId);
      setTimeLeft(300);
      setIsRunning(false);
      setHasFinished(false);
    }
  }, [selectedLupId]);

  const activeLup = lups.find(l => l.id === currentLupId) || lups[0];

  // Timer loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setHasFinished(true);
            if (soundEnabled) playChime('finish');
            triggerConfetti();
            setShowSaveModal(true);
            return 0;
          }
          if (prev === 61 && soundEnabled) {
            playChime('warning'); // 1 minute warning
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundEnabled]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleTogglePlay = () => {
    if (!isRunning && timeLeft === 300 && soundEnabled) {
      playChime('start');
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(300);
    setHasFinished(false);
  };

  const handleAddMinute = () => {
    setTimeLeft(prev => prev + 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress percentage (300s = 100%)
  const progressPercent = Math.min(100, Math.max(0, ((300 - timeLeft) / 300) * 100));

  const handleFinishEarly = () => {
    setIsRunning(false);
    setHasFinished(true);
    if (soundEnabled) playChime('finish');
    triggerConfetti();
    setShowSaveModal(true);
  };

  const handleSaveCharla = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLup) return;

    const now = new Date();
    const session: CharlaSession = {
      id: `charla-${Date.now()}`,
      lupId: activeLup.id,
      lupCode: activeLup.code,
      lupTitle: activeLup.title,
      facilitator: facilitator.trim() || 'Operador / Líder Turno',
      shift,
      area,
      date: now.toISOString().slice(0, 10),
      time: now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: 300 - timeLeft,
      attendeesCount: Math.max(1, attendeesCount),
      attendeesNotes: attendeesNotes.trim() || undefined,
      keyAgreements: keyAgreements.trim() || undefined,
      createdAt: now.toISOString()
    };

    saveCharla(session);
    setShowSaveModal(false);
    handleReset();
    onCharlaSaved();
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & LUP Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Modo Charla 5 Minutos
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Estándar Gemba CIAL
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-1">
              {activeLup ? activeLup.title : 'Selecciona una Lección (LUP)'}
            </h2>
          </div>

          {/* LUP Selector Dropdown */}
          <div className="w-full md:w-80">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Cambiar Lección de 1 Punto (LUP):
            </label>
            <div className="relative">
              <select
                value={currentLupId}
                onChange={(e) => {
                  setCurrentLupId(e.target.value);
                  onSelectLup(e.target.value);
                  handleReset();
                }}
                className="w-full bg-slate-50 border border-slate-300 hover:border-emerald-500 text-slate-800 text-sm font-semibold rounded-xl px-3.5 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#008744] transition cursor-pointer pr-10"
              >
                {lups.map((lup) => (
                  <option key={lup.id} value={lup.id}>
                    [{lup.code}] {lup.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Big Industrial Timer Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Timer Display Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl border-4 border-slate-700/60 relative overflow-hidden">
            
            {/* Background Glow */}
            <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-30 ${
              isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`} />

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-white/10 transition"
              title={soundEnabled ? 'Silenciar avisos sonoros' : 'Activar avisos sonoros'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Badge */}
            <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 font-extrabold mb-2">
              {isRunning ? 'CHARLA EN CURSO' : timeLeft === 0 ? '¡TIEMPO CUMPLIDO!' : 'LISTO PARA EXPLICAR'}
            </span>

            {/* Digital Digits */}
            <div className={`text-6xl sm:text-7xl font-mono font-black tracking-tight my-2 drop-shadow-md ${
              timeLeft === 0 
                ? 'text-rose-400 animate-bounce' 
                : timeLeft < 60 
                ? 'text-amber-400' 
                : 'text-white'
            }`}>
              {formatTime(timeLeft)}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 h-3 rounded-full mt-2 mb-6 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  timeLeft < 60 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Main Tactile Buttons */}
            <div className="flex items-center gap-3 w-full justify-center flex-wrap">
              <button
                onClick={handleTogglePlay}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide shadow-lg transition transform active:scale-95 cursor-pointer ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-[#008744] hover:bg-emerald-500 text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>PAUSAR</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>{timeLeft === 300 ? 'INICIAR' : 'REANUDAR'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleAddMinute}
                className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white p-3.5 rounded-2xl transition cursor-pointer font-bold text-xs flex items-center gap-1 shadow-sm"
                title="Agregar 1 minuto adicional"
              >
                <Plus className="w-4 h-4" />
                <span>1 MIN</span>
              </button>

              <button
                onClick={handleReset}
                className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-300 hover:text-white p-3.5 rounded-2xl transition cursor-pointer"
                title="Reiniciar a 5:00"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Finish Early / Record button */}
            <button
              onClick={handleFinishEarly}
              className="mt-4 text-xs font-bold text-emerald-300 hover:text-emerald-200 underline decoration-emerald-500/50 hover:decoration-emerald-400 transition cursor-pointer"
            >
              Registrar Charla Inmediatamente
            </button>
          </div>

          {/* Operator Talking Guide (Cheatsheet) */}
          <div className="lg:col-span-7 space-y-4">
            
            {activeLup ? (
              <>
                {/* Objective Card */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-1">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span>Objetivo de la Charla (1 Minuto para abrir):</span>
                  </div>
                  <p className="text-sm font-medium text-emerald-950 leading-relaxed">
                    "{activeLup.objective}"
                  </p>
                </div>

                {/* Do vs Don't side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* DO ✅ */}
                  <div className="bg-green-50/70 border-2 border-emerald-500/80 rounded-2xl p-4 shadow-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs uppercase tracking-wider mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Lo Correcto (Qué SÍ hacer)</span>
                    </div>
                    <h4 className="text-sm font-bold text-emerald-950 mb-1.5">
                      {activeLup.doPractice.title}
                    </h4>
                    <p className="text-xs text-emerald-900 mb-2 font-medium">
                      {activeLup.doPractice.description}
                    </p>
                    <ul className="space-y-1.5">
                      {activeLup.doPractice.points.map((pt, idx) => (
                        <li key={idx} className="text-xs text-emerald-900 flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DONT ❌ */}
                  <div className="bg-rose-50/70 border-2 border-rose-400/80 rounded-2xl p-4 shadow-xs">
                    <div className="flex items-center gap-1.5 text-rose-800 font-black text-xs uppercase tracking-wider mb-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Prohibido (Qué NO hacer)</span>
                    </div>
                    <h4 className="text-sm font-bold text-rose-950 mb-1.5">
                      {activeLup.dontPractice.title}
                    </h4>
                    <p className="text-xs text-rose-900 mb-2 font-medium">
                      {activeLup.dontPractice.description}
                    </p>
                    <ul className="space-y-1.5">
                      {activeLup.dontPractice.points.map((pt, idx) => (
                        <li key={idx} className="text-xs text-rose-900 flex items-start gap-1.5">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Key takeaway */}
                {activeLup.safetyWarning && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-amber-900">
                      <span className="font-bold">Advertencia Crítica:</span> {activeLup.safetyWarning}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-slate-500 font-medium">
                Selecciona una lección para visualizar la guía de la charla.
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Save Charla Modal */}
      {showSaveModal && activeLup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  ¡Charla 5 Min Concluida!
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Registra la asistencia para contabilizar el indicador de la Zona Verde.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveCharla} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  LUP Dictada
                </label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700">
                  [{activeLup.code}] {activeLup.title}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Facilitador (Operador o Líder de Turno) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Ariel Mella / Juan Pérez"
                  value={facilitator}
                  onChange={(e) => setFacilitator(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Turno *
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value as ShiftType)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  >
                    <option value="Turno 1 (Mañana 07:00 - 15:00)">Turno 1 (Mañana)</option>
                    <option value="Turno 2 (Tarde 15:00 - 23:00)">Turno 2 (Tarde)</option>
                    <option value="Turno 3 (Noche 23:00 - 07:00)">Turno 3 (Noche)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Área Operacional *
                  </label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Ej: Andenes 1-6"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  N° de Asistentes al Encuentro
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendeesCount(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 text-center text-lg font-black text-slate-800">
                    {attendeesCount} operadores
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttendeesCount(prev => prev + 1)}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Acuerdos y Compromisos Tomados (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Se revisarán las ruedas de las transpaletas antes de las 10:00 AM..."
                  value={keyAgreements}
                  onChange={(e) => setKeyAgreements(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Omitir Registro
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#008744] hover:bg-emerald-700 text-white shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guardar Charla</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
