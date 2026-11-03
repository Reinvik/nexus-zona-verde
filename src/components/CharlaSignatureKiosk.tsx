import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  PenTool, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  X, 
  Users, 
  Search, 
  Plus, 
  ShieldCheck, 
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { LupItem, CharlaAttendee, OperatorItem, ShiftType, ShiftId } from '../types';
import { getOperators } from '../services/storage';

interface CharlaSignatureKioskProps {
  isOpen: boolean;
  onClose: () => void;
  lup: LupItem;
  shiftName: ShiftType | string;
  shiftId: ShiftId;
  date: string;
  initialAttendees: CharlaAttendee[];
  supervisorName?: string;
  onSaveSignatures: (attendees: CharlaAttendee[]) => void;
}

export const CharlaSignatureKiosk: React.FC<CharlaSignatureKioskProps> = ({
  isOpen,
  onClose,
  lup,
  shiftName,
  shiftId,
  date,
  initialAttendees,
  supervisorName,
  onSaveSignatures
}) => {
  const [attendees, setAttendees] = useState<CharlaAttendee[]>(initialAttendees);
  const [selectedOpId, setSelectedOpId] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [showAddAttendeeModal, setShowAddAttendeeModal] = useState<boolean>(false);
  const [addSearch, setAddSearch] = useState<string>('');
  const [allOperators, setAllOperators] = useState<OperatorItem[]>([]);

  // Canvas drawing ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  // Initialize attendees and operators
  useEffect(() => {
    setAttendees(initialAttendees);
    const ops = getOperators();
    setAllOperators(ops);

    // Default select first unsigned attendee or first attendee
    const firstUnsigned = initialAttendees.find(a => !a.signatureUrl);
    if (firstUnsigned) {
      setSelectedOpId(firstUnsigned.operatorId);
    } else if (initialAttendees.length > 0) {
      setSelectedOpId(initialAttendees[0].operatorId);
    }
  }, [initialAttendees, isOpen]);

  // Current active attendee
  const currentAttendee = attendees.find(a => a.operatorId === selectedOpId) || attendees[0];

  // Canvas setup with High DPI resolution
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 2;
    
    // Set actual canvas size in memory (scaled for sharpness)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0f172a'; // Deep slate ink

    // If current attendee already has a signature, render it on canvas
    if (currentAttendee?.signatureUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setHasDrawn(true);
      };
      img.src = currentAttendee.signatureUrl;
    } else {
      setHasDrawn(false);
    }
  };

  // Re-setup canvas on window resize or when changing attendee
  useEffect(() => {
    if (isOpen && currentAttendee) {
      // Short delay to ensure modal DOM layout has calculated width
      const timer = setTimeout(() => {
        setupCanvas();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedOpId]);

  // Pointer drawing handlers (Stylus, Touch, Mouse)
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    setHasDrawn(true);

    const { x, y } = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);

    // Also clear from state if currently signed
    if (currentAttendee?.signatureUrl) {
      setAttendees(prev => prev.map(a => {
        if (a.operatorId === currentAttendee.operatorId) {
          const { signatureUrl, signedAt, ...rest } = a;
          return rest;
        }
        return a;
      }));
    }
  };

  const handleConfirmSignatureAndNext = () => {
    if (!currentAttendee) return;
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) {
      alert('Por favor estampa la firma con el lápiz en el recuadro blanco antes de confirmar.');
      return;
    }

    const signatureDataUrl = canvas.toDataURL('image/png');
    const nowTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

    // Update attendee
    const updatedAttendees = attendees.map(a => {
      if (a.operatorId === currentAttendee.operatorId) {
        return {
          ...a,
          signatureUrl: signatureDataUrl,
          signedAt: nowTime
        };
      }
      return a;
    });

    setAttendees(updatedAttendees);

    // Find next unsigned attendee
    const nextUnsigned = updatedAttendees.find(a => !a.signatureUrl && a.operatorId !== currentAttendee.operatorId);
    if (nextUnsigned) {
      setSelectedOpId(nextUnsigned.operatorId);
      handleClearSignature();
    } else {
      // All signed!
    }
  };

  const handleFinishAndSave = () => {
    onSaveSignatures(attendees);
    onClose();
  };

  const handleAddOperatorToAttendees = (op: OperatorItem) => {
    if (attendees.some(a => a.operatorId === op.id)) return;
    const newAttendee: CharlaAttendee = {
      operatorId: op.id,
      operatorName: op.name,
      rut: op.rut,
      role: op.role,
      area: op.area
    };
    const updated = [...attendees, newAttendee];
    setAttendees(updated);
    setSelectedOpId(op.id);
    setShowAddAttendeeModal(false);
  };

  if (!isOpen) return null;

  const signedCount = attendees.filter(a => !!a.signatureUrl).length;
  const totalCount = attendees.length;
  const percentComplete = totalCount > 0 ? Math.round((signedCount / totalCount) * 100) : 0;
  const allSigned = totalCount > 0 && signedCount === totalCount;

  const filteredAttendees = attendees.filter(a => 
    a.operatorName.toLowerCase().includes(search.toLowerCase()) ||
    (a.rut && a.rut.toLowerCase().includes(search.toLowerCase())) ||
    (a.role && a.role.toLowerCase().includes(search.toLowerCase()))
  );

  const availableOperatorsToAdd = allOperators.filter(op => 
    !attendees.some(a => a.operatorId === op.id) &&
    (op.name.toLowerCase().includes(addSearch.toLowerCase()) ||
     (op.rut && op.rut.toLowerCase().includes(addSearch.toLowerCase())))
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in select-none">
      <div className="bg-slate-900 rounded-3xl max-w-6xl w-full max-h-[96vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden">
        
        {/* KIOSK TOP HEADER */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-4 sm:px-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full font-mono">
                  {lup.code}
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {shiftName} • {date}
                </span>
                {supervisorName && (
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Supervisor: <strong>{supervisorName}</strong>
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-black text-white truncate max-w-xl">
                Kiosco de Firma Digital: {lup.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress Bar Badge */}
            <div className="bg-black/40 px-3.5 py-1.5 rounded-2xl border border-slate-700 flex items-center gap-2.5">
              <div className="text-right">
                <span className="text-xs font-black text-emerald-400 block">
                  {signedCount} de {totalCount} Firmados
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {percentComplete}% Completado
                </span>
              </div>
              <div className="w-12 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleFinishAndSave}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Guardar Firmas</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
              title="Cerrar Kiosco"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN BODY: 2 COLUMNS (ATTENDEE LIST & SIGNATURE CANVAS) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0 bg-slate-900">
          
          {/* LEFT COLUMN: OPERATORS LIST (4 Cols) */}
          <div className="lg:col-span-4 border-r border-slate-800 flex flex-col min-h-0 bg-slate-950/50">
            
            {/* Search and Add Header */}
            <div className="p-3 border-b border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dotación del Turno ({attendees.length})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddAttendeeModal(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar</span>
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar operador por nombre o RUT..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 text-white text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* List of Attendees */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
              {filteredAttendees.map((att, idx) => {
                const isSelected = att.operatorId === currentAttendee?.operatorId;
                const isSigned = !!att.signatureUrl;

                return (
                  <div
                    key={att.operatorId}
                    onClick={() => setSelectedOpId(att.operatorId)}
                    className={`p-3 rounded-2xl cursor-pointer transition flex items-center justify-between gap-3 border ${
                      isSelected
                        ? 'bg-emerald-950/50 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                        : isSigned
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-900/30 border-amber-900/30 hover:border-amber-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        isSigned 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <span className={`text-xs font-black block truncate ${isSelected ? 'text-emerald-300' : 'text-slate-200'}`}>
                          {att.operatorName}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          {att.rut && <span>{att.rut}</span>}
                          {att.role && <span className="truncate">• {att.role}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSigned ? (
                        <div className="flex items-center gap-1.5 text-right">
                          <span className="text-[10px] text-emerald-400 font-mono font-bold">
                            {att.signedAt || '✓'}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredAttendees.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No se encontraron colaboradores en la lista.
                </div>
              )}
            </div>

            {/* Bottom Quick Indicator */}
            <div className="p-3 border-t border-slate-800 bg-black/40 flex items-center justify-between text-xs">
              <span className="text-slate-400">Pendientes:</span>
              <span className="font-bold text-amber-400">{totalCount - signedCount} Colaboradores</span>
            </div>

          </div>

          {/* RIGHT COLUMN: SIGNATURE CANVAS & STYLUS PAD (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col min-h-0 bg-slate-900 p-4 sm:p-6 overflow-y-auto">
            
            {currentAttendee ? (
              <div className="flex flex-col h-full justify-between space-y-4">
                
                {/* Signer Identity Banner */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                      Operador en Turno para Firmar
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {currentAttendee.operatorName}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-0.5">
                      {currentAttendee.rut && <span>RUT: <strong className="text-slate-200">{currentAttendee.rut}</strong></span>}
                      {currentAttendee.role && <span>• Cargo: <strong className="text-slate-200">{currentAttendee.role}</strong></span>}
                      {currentAttendee.area && <span>• Área: <strong className="text-slate-200">{currentAttendee.area}</strong></span>}
                    </div>
                  </div>

                  {currentAttendee.signatureUrl ? (
                    <div className="flex items-center gap-2 bg-emerald-950/70 text-emerald-300 border border-emerald-800/80 px-3 py-1.5 rounded-xl self-start sm:self-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold">Firmado a las {currentAttendee.signedAt || '14:00'} hrs</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-amber-950/50 text-amber-300 border border-amber-800/60 px-3 py-1.5 rounded-xl self-start sm:self-center">
                      <PenTool className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold">Firma Requerida en Tablet</span>
                    </div>
                  )}
                </div>

                {/* Legal Statement Text */}
                <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-[11px] sm:text-xs">
                    <strong>Declaración de Toma de Conocimiento:</strong> Declaro haber participado activamente en la capacitación de 5 minutos, comprender el procedimiento seguro de la lección <strong>{lup.code} - {lup.title}</strong> y comprometerme a cumplir las normas de seguridad operacional de CIAL Alimentos.
                  </p>
                </div>

                {/* THE SIGNATURE CANVAS CONTAINER */}
                <div className="flex-1 flex flex-col min-h-[220px] sm:min-h-[280px] bg-white rounded-3xl p-3 shadow-inner border-4 border-slate-800 relative">
                  
                  {/* Canvas Header / Instructions */}
                  <div className="flex items-center justify-between text-slate-400 text-xs px-2 pb-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 font-bold text-slate-600">
                      <PenTool className="w-3.5 h-3.5 text-slate-500" />
                      <span>Firma aquí con el lápiz de la tablet o dedo</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleClearSignature}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer hover:bg-rose-50 px-2 py-0.5 rounded-lg transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Limpiar Firma</span>
                    </button>
                  </div>

                  {/* HTML5 Canvas Element */}
                  <div className="flex-1 relative w-full h-full min-h-[160px] cursor-crosshair">
                    <canvas
                      ref={canvasRef}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      className="w-full h-full touch-none rounded-xl"
                      style={{ touchAction: 'none' }}
                    />

                    {/* Dotted Guideline for signature position */}
                    <div className="absolute bottom-6 inset-x-8 border-b-2 border-dashed border-slate-200 pointer-events-none flex items-center justify-between text-[11px] text-slate-300 font-mono">
                      <span>✕ Firma del Colaborador</span>
                      <span>CIAL Alimentos</span>
                    </div>
                  </div>

                </div>

                {/* Canvas Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClearSignature}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                    <span>Borrar Trazo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmSignatureAndNext}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirmar Firma y Siguiente Operador</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {allSigned && (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-2xl text-center text-xs text-emerald-200 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>¡Excelente! Todos los operadores presentes han firmado la capacitación del turno.</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-3">
                <AlertCircle className="w-12 h-12 text-slate-600" />
                <p className="text-sm font-bold">No hay operadores en la lista para firmar.</p>
                <button
                  onClick={() => setShowAddAttendeeModal(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Agregar Colaboradores
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* MODAL: AGREGAR COLABORADOR EXTRA A LA LISTA DE FIRMAS */}
      {showAddAttendeeModal && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowAddAttendeeModal(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Agregar Colaborador a la Charla</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddAttendeeModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por nombre o RUT..."
                value={addSearch}
                onChange={(e) => setAddSearch(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1.5 scrollbar-thin">
              {availableOperatorsToAdd.map(op => (
                <div
                  key={op.id}
                  onClick={() => handleAddOperatorToAttendees(op)}
                  className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-emerald-950/50 border border-slate-800 hover:border-emerald-600 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-black text-white block">{op.name}</span>
                    <span className="text-[10px] text-slate-400">{op.rut || 'Sin RUT'} • {op.role || 'Operador'}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded-lg border border-emerald-800">
                    + Añadir
                  </span>
                </div>
              ))}

              {availableOperatorsToAdd.length === 0 && (
                <div className="py-6 text-center text-slate-500 text-xs">
                  No hay más operadores disponibles para agregar.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAddAttendeeModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
