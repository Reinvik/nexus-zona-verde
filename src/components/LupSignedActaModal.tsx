import React from 'react';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Clock, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { CharlaSession, LupItem } from '../types';
import cialLogo from '../assets/cial-alimentos-logo.png';

interface LupSignedActaModalProps {
  isOpen: boolean;
  onClose: () => void;
  charla: CharlaSession;
  lup?: LupItem;
}

export const LupSignedActaModal: React.FC<LupSignedActaModalProps> = ({
  isOpen,
  onClose,
  charla,
  lup
}) => {
  if (!isOpen) return null;

  const attendees = charla.attendeesList || [];
  const signedCount = attendees.filter(a => !!a.signatureUrl).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fade-in print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden print:max-w-none print:w-full print:max-h-none print:rounded-none print:border-none print:shadow-none">
        
        {/* MODAL CONTROL HEADER (Hidden when printing) */}
        <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-black">
              Acta Oficial de Capacitación LUP con Firmas
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Descargar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE OFFICIAL ACTA DOCUMENT */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 print:p-4 text-slate-900">
          
          {/* Institutional Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={cialLogo} 
                alt="CIAL Alimentos" 
                className="h-12 w-auto object-contain" 
              />
              <div>
                <h1 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  CIAL Alimentos S.A. • Centro de Distribución
                </h1>
                <p className="text-[11px] font-bold text-slate-600">
                  Departamento de Prevención de Riesgos & Medio Ambiente (SSO)
                </p>
                <p className="text-[10px] text-slate-500">
                  Cumplimiento Obligación de Informar Riesgos Laborales (D.S. 40 / Ley 16.744)
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-slate-900 text-white text-xs font-mono font-black px-3 py-1 rounded-lg">
                FOLIO: {charla.id.slice(-8).toUpperCase()}
              </span>
              <p className="text-[10px] text-slate-500 mt-1">
                Fecha de Emisión: {new Date().toLocaleDateString('es-CL')}
              </p>
            </div>
          </div>

          {/* Title Banner */}
          <div className="bg-slate-100 rounded-2xl p-4 text-center border border-slate-300">
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-widest block">
              REGISTRO DE CAPACITACIÓN Y TOMA DE CONOCIMIENTO
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              LECCIÓN DE UN PUNTO: {charla.lupCode} - {charla.lupTitle}
            </h2>
            {lup?.objective && (
              <p className="text-xs text-slate-600 italic mt-1 max-w-2xl mx-auto">
                "{lup.objective}"
              </p>
            )}
          </div>

          {/* Session Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-bold block text-[10px] uppercase">Fecha & Hora:</span>
              <span className="font-black text-slate-900">{charla.date} • {charla.time} hrs</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block text-[10px] uppercase">Turno Operativo:</span>
              <span className="font-black text-slate-900">{charla.shift}</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block text-[10px] uppercase">Supervisor a Cargo:</span>
              <span className="font-black text-slate-900">{charla.supervisor}</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold block text-[10px] uppercase">Facilitador / Líder:</span>
              <span className="font-black text-slate-900">{charla.facilitator}</span>
            </div>
          </div>

          {/* Photo Evidence and Key Agreements (if available) */}
          {(charla.photoUrl || charla.keyAgreements) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {charla.photoUrl && (
                <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50">
                  <span className="text-[10px] font-black uppercase text-slate-600 block mb-1">
                    📸 Registro Fotográfico del Equipo en Terreno:
                  </span>
                  <div className="h-36 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img 
                      src={charla.photoUrl} 
                      alt="Equipo en Charla" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              )}

              {charla.keyAgreements && (
                <div className="border border-amber-200 rounded-2xl p-3 bg-amber-50/60 text-xs">
                  <span className="text-[10px] font-black uppercase text-amber-900 block mb-1">
                    🤝 Acuerdos Operacionales Tomados en la Charla:
                  </span>
                  <p className="text-slate-800 leading-relaxed">
                    {charla.keyAgreements}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TABLE OF SIGNATURES */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Nómina de Asistentes y Firmas Digitales ({signedCount} de {attendees.length} Firmados)</span>
              </h4>
              <span className="text-[11px] font-bold text-slate-500">
                Pase de lista nominal
              </span>
            </div>

            <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-[11px] font-black text-slate-700 uppercase">
                    <th className="p-2.5 text-center w-10">N°</th>
                    <th className="p-2.5">Nombre del Colaborador</th>
                    <th className="p-2.5">RUT</th>
                    <th className="p-2.5">Cargo / Área</th>
                    <th className="p-2.5 text-center w-24">Hora</th>
                    <th className="p-2.5 text-center w-44">Firma Digital</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {attendees.map((att, i) => (
                    <tr key={att.operatorId || i} className="hover:bg-slate-50/80">
                      <td className="p-2.5 text-center font-bold text-slate-500">{i + 1}</td>
                      <td className="p-2.5 font-black text-slate-900">{att.operatorName}</td>
                      <td className="p-2.5 font-mono text-slate-600 font-bold">{att.rut || '—'}</td>
                      <td className="p-2.5 text-slate-600">{att.role || att.area || 'Operador'}</td>
                      <td className="p-2.5 text-center font-mono text-[11px] text-slate-500">
                        {att.signedAt || '—'}
                      </td>
                      <td className="p-2 text-center">
                        {att.signatureUrl ? (
                          <div className="h-10 w-36 mx-auto bg-white rounded-lg border border-slate-200 p-0.5 flex items-center justify-center">
                            <img 
                              src={att.signatureUrl} 
                              alt={`Firma ${att.operatorName}`} 
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Pendiente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {attendees.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-slate-400 italic">
                        No se registraron asistentes individuales en esta sesión.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Signatures / Stamp Footer */}
          <div className="pt-8 mt-6 border-t-2 border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <div className="w-48 mx-auto border-b border-slate-800 pb-1 mb-1 font-bold text-slate-900">
                {charla.supervisor}
              </div>
              <span className="text-[11px] text-slate-600 font-bold block">
                Firma Supervisor Responsable de Turno
              </span>
              <span className="text-[10px] text-slate-400">CIAL Alimentos S.A.</span>
            </div>

            <div>
              <div className="w-48 mx-auto border-b border-slate-800 pb-1 mb-1 font-bold text-slate-900">
                Prevención de Riesgos SSO
              </div>
              <span className="text-[11px] text-slate-600 font-bold block">
                Revisión & Validación de Cumplimiento
              </span>
              <span className="text-[10px] text-slate-400">Departamento SSO • CD CIAL</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
