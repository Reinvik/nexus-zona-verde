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
import { LupItem, CharlaSession, ShiftType, ShiftId } from '../types';
import { saveCharla, saveShiftTeamPhoto } from '../services/storage';
import { compressImageFile } from '../utils/imageCompressor';
import { Camera, Image as ImageIcon, X } from 'lucide-react';

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
  const [supervisor, setSupervisor] = useState<string>('Carlos Venegas (Supervisor Turno)');
  const [shift, setShift] = useState<ShiftType>('Turno 1');
  const [area, setArea] = useState<string>('Andenes de Despacho');
  const [attendeesCount, setAttendeesCount] = useState<number>(6);
  const [attendeesNotes, setAttendeesNotes] = useState<string>('');
  const [keyAgreements, setKeyAgreements] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoSizeKb, setPhotoSizeKb] = useState<number | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        setPhotoPreview(dataUrl);
        setPhotoSizeKb(sizeKb);
      } catch (err) {
        console.error('Error al comprimir foto:', err);
      }
    }
  };

  const handleSimulatePhoto = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60'
    ];
    setPhotoPreview(samplePhotos[Math.floor(Math.random() * samplePhotos.length)]);
    setPhotoSizeKb(45);
  };

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
    const shiftId: ShiftId = shift.includes('Mañana') ? 'manana' : shift.includes('Tarde') ? 'tarde' : 'noche';

    const session: CharlaSession = {
      id: `charla-${Date.now()}`,
      lupId: activeLup.id,
      lupCode: activeLup.code,
      lupTitle: activeLup.title,
      facilitator: facilitator.trim() || 'Operador / Líder Turno',
      supervisor: supervisor.trim() || 'Supervisor de Turno CIAL',
      shift,
      shiftId,
      area,
      date: now.toISOString().slice(0, 10),
      time: now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: 300 - timeLeft,
      attendeesCount: Math.max(1, attendeesCount),
      attendeesNotes: attendeesNotes.trim() || undefined,
      keyAgreements: keyAgreements.trim() || undefined,
      photoUrl: photoPreview || undefined,
      photoSizeKb: photoSizeKb || undefined,
      createdAt: now.toISOString()
    };

    saveCharla(session);

    if (photoPreview) {
      saveShiftTeamPhoto({
        date: session.date,
        shiftId: session.shiftId,
        photoUrl: photoPreview,
        photoSizeKb: photoSizeKb || undefined,
        takenAt: now.toISOString(),
        takenBy: supervisor || 'Supervisor de Turno',
        attendeesCount: attendeesCount
      });
    }

    setShowSaveModal(false);
    setPhotoPreview(null);
    setPhotoSizeKb(null);
    handleReset();
    onCharlaSaved();
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & LUP Main View */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-7 space-y-5">
        
        {/* Top Control Bar: LUP Title & Ultra-Compact Presenter Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          
          {/* LUP Details on Left */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Modo Charla 5 Minutos (Tablet Gemba)
              </span>
              <span className="font-mono text-xs font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {activeLup ? activeLup.code : ''}
              </span>
              <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                • {activeLup?.area}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {activeLup ? activeLup.title : 'Selecciona una Lección (LUP)'}
            </h1>
          </div>

          {/* Ultra-Compact Scoreboard Timer Pill on Right */}
          <div className="bg-slate-900 text-white rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-lg border border-slate-700/80 flex items-center gap-3 shrink-0 self-start lg:self-center">
            
            {/* Digital Clock */}
            <div className="flex items-center gap-2">
              <div className={`text-2xl sm:text-3xl font-mono font-black tracking-tight ${
                timeLeft === 0 
                  ? 'text-rose-400 animate-bounce' 
                  : timeLeft < 60 
                  ? 'text-amber-400' 
                  : 'text-white'
              }`}>
                {formatTime(timeLeft)}
              </div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold hidden sm:inline">
                {isRunning ? 'EN VIVO' : 'PAUSA'}
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-12 bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
              <div 
                className={`h-full transition-all duration-1000 ${timeLeft < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Compact Action Buttons */}
            <div className="flex items-center gap-1.5 border-l border-slate-700 pl-2.5">
              <button
                onClick={handleTogglePlay}
                className={`p-2 rounded-xl font-bold transition transform active:scale-90 cursor-pointer ${
                  isRunning 
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                    : 'bg-[#008744] hover:bg-emerald-500 text-white'
                }`}
                title={isRunning ? 'Pausar tiempo' : 'Iniciar cronómetro'}
              >
                {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={handleAddMinute}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-2 py-1.5 rounded-xl text-[11px] font-black transition cursor-pointer"
                title="Agregar 1 minuto"
              >
                +1m
              </button>

              <button
                onClick={handleReset}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
                title="Reiniciar a 5:00"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
                title={soundEnabled ? 'Silenciar avisos' : 'Activar avisos'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            </div>

            {/* Direct Register Button & Quick Camera Capture */}
            <div className="flex items-center gap-1.5">
              <label 
                className={`text-xs font-black px-3 py-2 rounded-xl transition shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-95 whitespace-nowrap ${
                  photoPreview 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                }`}
                title="Tomar foto al equipo durante la charla (Cámara del Celular)"
              >
                <Camera className="w-4 h-4" />
                <span>{photoPreview ? '📸 Foto Lista' : '📸 Foto Equipo'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handlePhotoUpload} 
                  className="hidden" 
                />
              </label>

              <button
                onClick={handleFinishEarly}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl transition shadow-xs cursor-pointer whitespace-nowrap active:scale-95"
              >
                Registrar Charla
              </button>
            </div>
          </div>

        </div>

        {/* LUP Switcher Dropdown (Thin Bar) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2 text-slate-600 font-bold">
            <span>Cambiar LUP para esta charla:</span>
          </div>
          <div className="relative w-full sm:w-96">
            <select
              value={currentLupId}
              onChange={(e) => {
                setCurrentLupId(e.target.value);
                onSelectLup(e.target.value);
                handleReset();
              }}
              className="w-full bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 text-xs font-bold rounded-xl px-3 py-1.5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#008744] transition cursor-pointer pr-8"
            >
              {lups.map((lup) => (
                <option key={lup.id} value={lup.id}>
                  [{lup.code}] {lup.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* FULL WIDTH PROMINENT LUP PRESENTATION (TABLET-FIRST) */}
        {activeLup ? (
          <div className="space-y-5 pt-1">
            
            {/* Objective Banner */}
            <div className="bg-emerald-50/90 border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-1">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Objetivo de la Charla para el Turno:</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-emerald-950 leading-relaxed">
                "{activeLup.objective}"
              </p>
            </div>

            {/* 4 FOTOS DEL ESTÁNDAR / CHARLA DE 5 MIN */}
            {activeLup.photos && activeLup.photos.length >= 4 && (
              <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-amber-400 text-xs sm:text-sm font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center gap-1.5">
                    <Camera className="w-4 h-4" />
                    4 Puntos Críticos del Estándar (Fotografías de Terreno)
                  </span>
                  <span className="text-xs text-amber-300 font-bold hidden sm:inline">
                    Estándar de Seguridad CD CIAL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeLup.photos.map((p, idx) => (
                    <div key={idx} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex flex-col justify-between shadow-sm">
                      <div className="relative h-44 bg-slate-950">
                        <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                        <span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded shadow ${
                          p.type === 'do' ? 'bg-emerald-600 text-white' : (p.type === 'dont' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950')
                        }`}>
                          {p.type === 'do' ? '✅ SÍ' : (p.type === 'dont' ? '❌ NO' : '⚠️ ALERTA')}
                        </span>
                      </div>
                      <div className="p-3 text-xs space-y-1">
                        <p className="font-black text-slate-100 line-clamp-1">{p.title}</p>
                        {p.caption && (
                          <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">{p.caption}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DUAL COMPARISON: CASO CORRECTO VS CASO INCORRECTO - FULL WIDTH & BIG PHOTOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              
              {/* CASO CORRECTO (QUÉ SÍ HACER) */}
              <div className="bg-green-50/80 border-3 border-emerald-500 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="bg-emerald-600 text-white text-xs sm:text-sm font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" /> CASO CORRECTO (QUÉ SÍ HACER)
                    </span>
                    {activeLup.doPractice.photoSizeKb && (
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">
                        📸 {activeLup.doPractice.photoSizeKb} KB
                      </span>
                    )}
                  </div>

                  {/* Big Hero Photo for Coworkers to See */}
                  {activeLup.doPractice.photoUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 mb-4 h-56 sm:h-72 bg-emerald-100 shadow-sm">
                      <img 
                        src={activeLup.doPractice.photoUrl} 
                        alt="Caso Correcto" 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-2 left-2 bg-emerald-800/90 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                        ✅ PRÁCTICA ESTÁNDAR
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-emerald-300 mb-4 h-44 flex items-center justify-center text-emerald-700/60 bg-emerald-50 font-bold text-sm">
                      Sin fotografía registrada
                    </div>
                  )}

                  <h3 className="text-lg sm:text-xl font-black text-emerald-950 mb-2">
                    {activeLup.doPractice.title}
                  </h3>
                  <p className="text-sm text-emerald-900 font-medium mb-4 leading-relaxed">
                    {activeLup.doPractice.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase text-emerald-800 block">Puntos Clave:</span>
                    <ul className="space-y-2 text-sm text-emerald-900">
                      {activeLup.doPractice.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-semibold">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* CASO INCORRECTO (PROHIBIDO) */}
              <div className="bg-rose-50/80 border-3 border-rose-400 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="bg-rose-600 text-white text-xs sm:text-sm font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs">
                      <AlertTriangle className="w-4 h-4" /> CASO INCORRECTO (PROHIBIDO)
                    </span>
                    {activeLup.dontPractice.photoSizeKb && (
                      <span className="text-[10px] text-rose-700 font-mono font-bold">
                        📸 {activeLup.dontPractice.photoSizeKb} KB
                      </span>
                    )}
                  </div>

                  {/* Big Hero Photo for Coworkers to See */}
                  {activeLup.dontPractice.photoUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-rose-400 mb-4 h-56 sm:h-72 bg-rose-100 shadow-sm">
                      <img 
                        src={activeLup.dontPractice.photoUrl} 
                        alt="Caso Incorrecto" 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-2 left-2 bg-rose-800/90 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                        ❌ RIESGO / CONDICIÓN INSEGURA
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-rose-300 mb-4 h-44 flex items-center justify-center text-rose-700/60 bg-rose-50 font-bold text-sm">
                      Sin fotografía registrada
                    </div>
                  )}

                  <h3 className="text-lg sm:text-xl font-black text-rose-950 mb-2">
                    {activeLup.dontPractice.title}
                  </h3>
                  <p className="text-sm text-rose-900 font-medium mb-4 leading-relaxed">
                    {activeLup.dontPractice.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase text-rose-800 block">Peligros a Evitar:</span>
                    <ul className="space-y-2 text-sm text-rose-900">
                      {activeLup.dontPractice.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-rose-200">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <span className="font-semibold">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Critical Safety Warning Banner */}
            {activeLup.safetyWarning && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl shadow-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                  <span className="font-black uppercase tracking-wider text-amber-900 block mb-0.5">Advertencia Crítica de Seguridad:</span>
                  {activeLup.safetyWarning}
                </p>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 font-medium">
            Selecciona una lección para visualizar la guía de la charla.
          </div>
        )}

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Facilitador (Operador o Líder) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Juan Pérez (Operador)"
                    value={facilitator}
                    onChange={(e) => setFacilitator(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Supervisor a Cargo del Registro *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Carlos Venegas / Ariel Mella"
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
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
                    <option value="Turno 1">Turno 1</option>
                    <option value="Turno 2">Turno 2</option>
                    <option value="Turno 3">Turno 3</option>
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
                  Foto de Evidencia de la Charla (Formato Liviano)
                </label>
                
                {photoPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 h-32 bg-slate-100 mb-2">
                    <img src={photoPreview} alt="Evidencia" className="w-full h-full object-cover" />
                    <div className="absolute bottom-1 left-1 bg-black/70 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                      📸 Evidencia Liviana: {photoSizeKb ? `${photoSizeKb} KB` : 'Optimizado'}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                        setPhotoSizeKb(null);
                      }}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-2.5 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition">
                      <Camera className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-600 block">Tomar Foto del Equipo en Zona Verde</span>
                      <span className="text-[10px] text-slate-400 block">Se comprime automáticamente (&lt; 80 KB)</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment" 
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleSimulatePhoto}
                      className="px-3 border border-slate-200 hover:bg-slate-100 rounded-2xl text-[11px] font-bold text-slate-600 transition cursor-pointer shrink-0"
                      title="Foto de muestra para pruebas rápidas"
                    >
                      Foto Test
                    </button>
                  </div>
                )}
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
