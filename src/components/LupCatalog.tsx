import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Timer, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  FolderSync, 
  Clock, 
  Printer, 
  X, 
  Camera, 
  Image as ImageIcon, 
  Eye,
  Edit,
  Trash2,
  History,
  User,
  Check,
  RefreshCw,
  FileText,
  Lock
} from 'lucide-react';
import { LupItem, LupPractice, LupCategory, LupAuditLog } from '../types';
import { ARIEL_ONEDRIVE_URL } from '../data/seedData';
import { saveLup, deleteLup, getLupAuditLogs } from '../services/storage';
import { compressImageFile } from '../utils/imageCompressor';
import cdCialBg from '../assets/cd-cial-bg.png';

interface LupCatalogProps {
  lups: LupItem[];
  onSelectForCharla: (lupId: string) => void;
  onLupsUpdated: () => void;
  currentUserEmail?: string;
  canDeleteLup?: boolean;
  canEditLup?: boolean;
  canCreateLup?: boolean;
  userRole?: string;
}

export const LupCatalog: React.FC<LupCatalogProps> = ({
  lups,
  onSelectForCharla,
  onLupsUpdated,
  currentUserEmail = 'colaborador@cial.cl',
  canDeleteLup = false,
  canEditLup = true,
  canCreateLup = true,
  userRole = 'operador'
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeModalLup, setActiveModalLup] = useState<LupItem | null>(null);
  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [zoomPhoto, setZoomPhoto] = useState<{ url: string; title: string; subtitle: string } | null>(null);
  
  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<LupAuditLog[]>([]);
  const [auditFilter, setAuditFilter] = useState<'TODOS' | 'CREADO' | 'MODIFICADO' | 'ELIMINADO'>('TODOS');
  const [auditSearch, setAuditSearch] = useState<string>('');

  const refreshAuditLogs = () => {
    setAuditLogs(getLupAuditLogs());
  };

  useEffect(() => {
    refreshAuditLogs();
  }, [lups]);

  // New LUP form state
  const [newCode, setNewCode] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<LupCategory>('Seguridad SSO');
  const [newObjective, setNewObjective] = useState<string>('');
  const [newArea, setNewArea] = useState<string>('Andenes de Despacho');
  const [newDoTitle, setNewDoTitle] = useState<string>('');
  const [newDoDesc, setNewDoDesc] = useState<string>('');
  const [newDoPhoto, setNewDoPhoto] = useState<string | null>(null);
  const [newDoPhotoSizeKb, setNewDoPhotoSizeKb] = useState<number | null>(null);
  const [newDontTitle, setNewDontTitle] = useState<string>('');
  const [newDontDesc, setNewDontDesc] = useState<string>('');
  const [newDontPhoto, setNewDontPhoto] = useState<string | null>(null);
  const [newDontPhotoSizeKb, setNewDontPhotoSizeKb] = useState<number | null>(null);
  const [newSafetyWarning, setNewSafetyWarning] = useState<string>('');

  // Múltiples Qué SÍ hacer y Qué NO hacer para nuevo LUP
  const [newDoPracticesList, setNewDoPracticesList] = useState<{
    id: string;
    title: string;
    description: string;
    pointsText: string;
    photoUrl: string | null;
    photoSizeKb?: number;
  }[]>([
    { id: 'new-do-1', title: '', description: '', pointsText: '', photoUrl: null }
  ]);

  const [newDontPracticesList, setNewDontPracticesList] = useState<{
    id: string;
    title: string;
    description: string;
    pointsText: string;
    photoUrl: string | null;
    photoSizeKb?: number;
  }[]>([
    { id: 'new-dont-1', title: '', description: '', pointsText: '', photoUrl: null }
  ]);

  // Edit LUP state & form
  const [editingLup, setEditingLup] = useState<LupItem | null>(null);
  const [editCode, setEditCode] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [editCategory, setEditCategory] = useState<LupCategory>('Seguridad SSO');
  const [editObjective, setEditObjective] = useState<string>('');
  const [editArea, setEditArea] = useState<string>('');
  const [editDoTitle, setEditDoTitle] = useState<string>('');
  const [editDoDesc, setEditDoDesc] = useState<string>('');
  const [editDoPoints, setEditDoPoints] = useState<string>('');
  const [editDoPhoto, setEditDoPhoto] = useState<string | null>(null);
  const [editDoPhotoSizeKb, setEditDoPhotoSizeKb] = useState<number | null>(null);
  const [editDontTitle, setEditDontTitle] = useState<string>('');
  const [editDontDesc, setEditDontDesc] = useState<string>('');
  const [editDontPoints, setEditDontPoints] = useState<string>('');
  const [editDontPhoto, setEditDontPhoto] = useState<string | null>(null);
  const [editDontPhotoSizeKb, setEditDontPhotoSizeKb] = useState<number | null>(null);
  const [editSafetyWarning, setEditSafetyWarning] = useState<string>('');
  const [editReason, setEditReason] = useState<string>('');

  // Delete LUP confirmation state
  const [deletingLup, setDeletingLup] = useState<LupItem | null>(null);
  const [deleteReason, setDeleteReason] = useState<string>('');

  const categories: string[] = [
    'Todas',
    'Seguridad SSO',
    'Cadena de Frío',
    'Operación de Equipos',
    'Calidad & BPM',
    'Mantención Autónoma 5S',
    'Calidad / Inocuidad',
    'Despacho & Zonales',
    'Eficiencia Operacional'
  ];

  // Photo handlers with client-side compression
  const handleDoPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        if (isEdit) {
          setEditDoPhoto(dataUrl);
          setEditDoPhotoSizeKb(sizeKb);
        } else {
          setNewDoPhoto(dataUrl);
          setNewDoPhotoSizeKb(sizeKb);
        }
      } catch (err) {
        console.error('Error al comprimir foto:', err);
      }
    }
  };

  const handleDontPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        if (isEdit) {
          setEditDontPhoto(dataUrl);
          setEditDontPhotoSizeKb(sizeKb);
        } else {
          setNewDontPhoto(dataUrl);
          setNewDontPhotoSizeKb(sizeKb);
        }
      } catch (err) {
        console.error('Error al comprimir foto:', err);
      }
    }
  };

  // Handlers para múltiples DO en Nuevo LUP
  const handleAddNewDoPractice = () => {
    setNewDoPracticesList(prev => [
      ...prev,
      { id: `do-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, title: '', description: '', pointsText: '', photoUrl: null }
    ]);
  };

  const handleRemoveNewDoPractice = (index: number) => {
    if (newDoPracticesList.length <= 1) return;
    setNewDoPracticesList(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateNewDoPractice = (index: number, field: string, value: any) => {
    setNewDoPracticesList(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Handlers para múltiples DONT en Nuevo LUP
  const handleAddNewDontPractice = () => {
    setNewDontPracticesList(prev => [
      ...prev,
      { id: `dont-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, title: '', description: '', pointsText: '', photoUrl: null }
    ]);
  };

  const handleRemoveNewDontPractice = (index: number) => {
    if (newDontPracticesList.length <= 1) return;
    setNewDontPracticesList(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateNewDontPractice = (index: number, field: string, value: any) => {
    setNewDontPracticesList(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleNewPracticePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, isDo: boolean, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        if (isDo) {
          handleUpdateNewDoPractice(index, 'photoUrl', dataUrl);
          handleUpdateNewDoPractice(index, 'photoSizeKb', sizeKb);
        } else {
          handleUpdateNewDontPractice(index, 'photoUrl', dataUrl);
          handleUpdateNewDontPractice(index, 'photoSizeKb', sizeKb);
        }
      } catch (err) {
        console.error('Error al comprimir foto:', err);
      }
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (lup: LupItem) => {
    setEditingLup(lup);
    setEditCode(lup.code);
    setEditTitle(lup.title);
    setEditCategory(lup.category);
    setEditObjective(lup.objective);
    setEditArea(lup.area);
    setEditDoTitle(lup.doPractice.title);
    setEditDoDesc(lup.doPractice.description);
    setEditDoPoints(lup.doPractice.points.join('\n'));
    setEditDoPhoto(lup.doPractice.photoUrl || null);
    setEditDoPhotoSizeKb(lup.doPractice.photoSizeKb || null);
    setEditDontTitle(lup.dontPractice.title);
    setEditDontDesc(lup.dontPractice.description);
    setEditDontPoints(lup.dontPractice.points.join('\n'));
    setEditDontPhoto(lup.dontPractice.photoUrl || null);
    setEditDontPhotoSizeKb(lup.dontPractice.photoSizeKb || null);
    setEditSafetyWarning(lup.safetyWarning || '');
    setEditReason('');
  };

  // Save Edit Handler
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLup) return;

    const doPointsList = editDoPoints.split('\n').map(p => p.trim()).filter(Boolean);
    const dontPointsList = editDontPoints.split('\n').map(p => p.trim()).filter(Boolean);

    const updated: LupItem = {
      ...editingLup,
      code: editCode.trim() || editingLup.code,
      title: editTitle.trim() || editingLup.title,
      category: editCategory,
      objective: editObjective.trim() || editingLup.objective,
      summary: editObjective.trim().slice(0, 120),
      area: editArea.trim() || editingLup.area,
      doPractice: {
        title: editDoTitle.trim() || editingLup.doPractice.title,
        description: editDoDesc.trim() || editingLup.doPractice.description,
        points: doPointsList.length > 0 ? doPointsList : editingLup.doPractice.points,
        photoUrl: editDoPhoto || undefined,
        photoSizeKb: editDoPhotoSizeKb || undefined
      },
      dontPractice: {
        title: editDontTitle.trim() || editingLup.dontPractice.title,
        description: editDontDesc.trim() || editingLup.dontPractice.description,
        points: dontPointsList.length > 0 ? dontPointsList : editingLup.dontPractice.points,
        photoUrl: editDontPhoto || undefined,
        photoSizeKb: editDontPhotoSizeKb || undefined
      },
      safetyWarning: editSafetyWarning.trim() || undefined
    };

    saveLup(updated, currentUserEmail, editReason.trim() || 'Modificación general de contenidos y estándares');
    setEditingLup(null);
    if (activeModalLup && activeModalLup.id === updated.id) {
      setActiveModalLup(updated);
    }
    onLupsUpdated();
    refreshAuditLogs();
  };

  // Open Delete Modal
  const handleOpenDelete = (lup: LupItem) => {
    setDeletingLup(lup);
    setDeleteReason('');
  };

  // Confirm Delete Handler
  const handleConfirmDelete = () => {
    if (!deletingLup) return;
    try {
      const res = deleteLup(deletingLup.id, currentUserEmail, deleteReason.trim() || 'Eliminado formalmente por Jefatura');
      if (res && !res.success) {
        alert(res.message || 'Acceso denegado: Solo el rol de Jefatura puede eliminar LUPs del sistema.');
        setDeletingLup(null);
        return;
      }
      const targetId = deletingLup.id;
      setDeletingLup(null);
      if (activeModalLup && activeModalLup.id === targetId) {
        setActiveModalLup(null);
      }
      onLupsUpdated();
      refreshAuditLogs();
    } catch (err: any) {
      console.error('Error al eliminar LUP:', err);
      alert('Error al intentar eliminar el LUP: ' + (err?.message || 'Error desconocido'));
      setDeletingLup(null);
    }
  };

  // Create LUP Handler
  const handleCreateLup = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDoPractices: LupPractice[] = newDoPracticesList.map((item, idx) => ({
      title: item.title.trim() || `Procedimiento Estándar Seguro #${idx + 1}`,
      description: item.description.trim() || 'Seguir la instrucción de trabajo estandarizada.',
      points: item.pointsText.split('\n').map(p => p.trim()).filter(Boolean).length > 0
        ? item.pointsText.split('\n').map(p => p.trim()).filter(Boolean)
        : ['Mantener la postura ergonómica correcta', 'Verificar entorno antes de operar'],
      photoUrl: item.photoUrl || undefined,
      photoSizeKb: item.photoSizeKb
    }));

    const formattedDontPractices: LupPractice[] = newDontPracticesList.map((item, idx) => ({
      title: item.title.trim() || `Práctica Riesgosa Prohibida #${idx + 1}`,
      description: item.description.trim() || 'Evitar omitir los pasos de seguridad y calidad.',
      points: item.pointsText.split('\n').map(p => p.trim()).filter(Boolean).length > 0
        ? item.pointsText.split('\n').map(p => p.trim()).filter(Boolean)
        : ['No apurarse sin verificar el entorno', 'No operar sin implementos EPP'],
      photoUrl: item.photoUrl || undefined,
      photoSizeKb: item.photoSizeKb
    }));

    const item: LupItem = {
      id: `lup-${Date.now()}`,
      code: newCode.trim() || `LUP-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      category: newCategory,
      summary: newObjective.trim().slice(0, 120),
      objective: newObjective.trim(),
      durationMinutes: 5,
      area: newArea.trim(),
      author: currentUserEmail,
      createdBy: currentUserEmail,
      createdAt: new Date().toISOString(),
      oneDriveUrl: ARIEL_ONEDRIVE_URL,
      doPractice: formattedDoPractices[0],
      dontPractice: formattedDontPractices[0],
      doPractices: formattedDoPractices,
      dontPractices: formattedDontPractices,
      keyPoints: [
        'Estandarizar el método entre todos los turnos.',
        'Reportar desviaciones en la Zona Verde.'
      ],
      safetyWarning: newSafetyWarning.trim() || undefined
    };

    saveLup(item, currentUserEmail, 'Nuevo LUP ingresado al catálogo de Zona Verde');
    setShowNewModal(false);
    onLupsUpdated();
    refreshAuditLogs();

    // Reset form
    setNewCode('');
    setNewTitle('');
    setNewObjective('');
    setNewDoPracticesList([{ id: 'new-do-1', title: '', description: '', pointsText: '', photoUrl: null }]);
    setNewDontPracticesList([{ id: 'new-dont-1', title: '', description: '', pointsText: '', photoUrl: null }]);
    setNewSafetyWarning('');
  };

  const filteredLups = lups.filter(lup => {
    const matchesCategory = selectedCategory === 'Todas' || lup.category === selectedCategory;
    const matchesSearch = 
      lup.title.toLowerCase().includes(search.toLowerCase()) ||
      lup.code.toLowerCase().includes(search.toLowerCase()) ||
      lup.summary.toLowerCase().includes(search.toLowerCase()) ||
      lup.objective.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesAction = auditFilter === 'TODOS' || log.action === auditFilter;
    const matchesSearch = 
      log.lupCode.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.lupTitle.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.performedBy.toLowerCase().includes(auditSearch.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(auditSearch.toLowerCase()));
    return matchesAction && matchesSearch;
  });

  const getCategoryColor = (cat: LupCategory) => {
    switch (cat) {
      case 'Seguridad SSO':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Cadena de Frío':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Operación de Equipos':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Calidad & BPM':
      case 'Calidad / Inocuidad':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Mantención Autónoma 5S':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Despacho & Zonales':
      case 'Eficiencia Operacional':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const formatLogDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return new Intl.DateTimeFormat('es-CL', {
        timeZone: 'America/Santiago',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(d);
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Banner with CIAL CD Background */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/40 min-h-[280px] sm:min-h-[320px] flex items-center">
        <img 
          src={cdCialBg} 
          alt="Centro de Distribución CIAL Alimentos" 
          className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00381b]/95 via-[#005a2e]/88 to-[#004222]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,84,0.35),transparent_70%)]" />

        <div className="relative z-10 p-6 sm:p-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-emerald-200 mb-3.5 border border-white/20 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>Biblioteca Operacional de LUPs con Trazabilidad Completa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2.5 drop-shadow-md">
            Lecciones de Un Punto (LUP) para Charlas de 5 Minutos
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/95 font-medium leading-relaxed mb-6 drop-shadow-xs max-w-2xl">
            Crea, edita y consulta lecciones con <strong>fotos de Caso Correcto ✅</strong> y <strong>Caso Incorrecto ❌</strong> con registro estricto de quién creó, modificó o eliminó cada lección.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {canCreateLup ? (
              <button
                onClick={() => setShowNewModal(true)}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition transform active:scale-95 cursor-pointer font-sans"
              >
                <Plus className="w-4 h-4 fill-current text-slate-950" />
                <span>Crear Nueva LUP</span>
              </button>
            ) : (
              <div 
                className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md text-emerald-100 border border-white/20 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider select-none"
                title="Solo supervisores y jefaturas pueden redactar nuevos LUPs"
              >
                <Lock className="w-4 h-4 text-emerald-300" />
                <span>Crear LUP (Supervisión / Jefatura)</span>
              </div>
            )}

            <button
              onClick={() => setShowAuditModal(true)}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-sm active:scale-95"
            >
              <History className="w-4 h-4 text-emerald-300" />
              <span>Registro de Auditoría ({auditLogs.length})</span>
            </button>

            <a
              href={ARIEL_ONEDRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black/35 hover:bg-black/50 backdrop-blur-md text-white border border-white/25 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition cursor-pointer group shadow-sm"
            >
              <FolderSync className="w-4 h-4 text-emerald-300 group-hover:rotate-45 transition-transform" />
              <span>OneDrive CIAL</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por código, título o tema (ej: transpaleta, frío)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAuditModal(true)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>Ver Historial de Auditoría</span>
            </button>
            <span className="text-xs text-slate-500 font-bold">
              {filteredLups.length} de {lups.length} LUPs
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#008744] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* LUP Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLups.map((lup) => {
          const isSafety = lup.isSafety || lup.category === 'Seguridad SSO';
          return (
            <div
              key={lup.id}
              className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between group hover:shadow-lg ${
                isSafety 
                  ? 'border-amber-300 hover:border-amber-500 shadow-xs' 
                  : 'border-slate-200 hover:border-emerald-500'
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {lup.code}
                    </span>
                    {isSafety && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                        🛡️ SSO
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getCategoryColor(lup.category)}`}>
                    {lup.category}
                  </span>
                </div>

              {/* Title & Area */}
              <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition line-clamp-2 mb-1.5">
                {lup.title}
              </h3>
              
              <div className="text-[11px] text-slate-500 font-semibold mb-3 flex items-center justify-between">
                <span>📍 {lup.area}</span>
                <span className="text-slate-400">⏱️ {lup.durationMinutes} min</span>
              </div>

              {/* Photos Preview (Supports 4 Photos or 2 Photos) */}
              {lup.photos && lup.photos.length >= 4 ? (
                <div className="mb-3">
                  <div className="grid grid-cols-4 gap-1.5 h-20">
                    {lup.photos.slice(0, 4).map((p, pIdx) => (
                      <div 
                        key={pIdx} 
                        className={`relative rounded-xl overflow-hidden border h-full bg-slate-100 ${
                          p.type === 'do' ? 'border-emerald-300' : (p.type === 'dont' ? 'border-rose-300' : 'border-amber-300')
                        }`}
                        title={p.title}
                      >
                        <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                        <span className={`absolute bottom-0.5 left-0.5 text-[8px] font-black px-1 rounded shadow-xs ${
                          p.type === 'do' ? 'bg-emerald-600 text-white' : (p.type === 'dont' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950')
                        }`}>
                          {pIdx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[10px] font-bold text-amber-800">
                    <span>📸 4 Puntos Clave</span>
                    <span className="text-slate-400">Ver detalle</span>
                  </div>
                </div>
              ) : (lup.doPractice.photoUrl || lup.dontPractice.photoUrl) ? (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="relative rounded-xl overflow-hidden border border-emerald-300 h-24 bg-emerald-50">
                    {lup.doPractice.photoUrl ? (
                      <img 
                        src={lup.doPractice.photoUrl} 
                        alt="Caso Correcto" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-[10px] text-emerald-700 font-bold">
                        Sin foto
                      </div>
                    )}
                    <span className="absolute bottom-1 left-1 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      ✅ SÍ
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-rose-300 h-24 bg-rose-50">
                    {lup.dontPractice.photoUrl ? (
                      <img 
                        src={lup.dontPractice.photoUrl} 
                        alt="Caso Incorrecto" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-[10px] text-rose-700 font-bold">
                        Sin foto
                      </div>
                    )}
                    <span className="absolute bottom-1 left-1 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      ❌ NO
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">SÍ: {lup.doPractice.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="truncate">NO: {lup.dontPractice.title}</span>
                  </div>
                </div>
              )}

              {/* Creator & Modifier Traceability Pill */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 mb-3 text-[10px] text-slate-600 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-500">Creado por:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[170px]" title={lup.createdBy || lup.author}>
                    {lup.createdBy ? lup.createdBy.split('@')[0] : lup.author}
                  </span>
                </div>
                {lup.lastModifiedBy && (
                  <div className="flex items-center justify-between text-amber-800 pt-0.5 border-t border-slate-200/60">
                    <span className="font-semibold">Modificado por:</span>
                    <span className="font-black truncate max-w-[170px]" title={lup.lastModifiedBy}>
                      {lup.lastModifiedBy.split('@')[0]} (rev. #{lup.modificationCount || 1})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
              <button
                onClick={() => setActiveModalLup(lup)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                Ver Detalle
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(lup)}
                  className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                  title="Editar LUP (Registrará tu usuario en auditoría)"
                >
                  <Edit className="w-4 h-4" />
                </button>

                {canDeleteLup && (
                  <button
                    onClick={() => handleOpenDelete(lup)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Eliminar LUP de catálogo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => onSelectForCharla(lup.id)}
                  className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
                  title="Asignar e impartir lección al turno de hoy"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Impartir LUP</span>
                </button>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {filteredLups.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700">No se encontraron Lecciones de un Punto</h4>
          <p className="text-xs text-slate-500 mt-1">Prueba cambiando los filtros o la búsqueda.</p>
        </div>
      )}

      {/* LUP DETAIL MODAL */}
      {activeModalLup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-xs font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                    {activeModalLup.code}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getCategoryColor(activeModalLup.category)}`}>
                    {activeModalLup.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Área: {activeModalLup.area}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeModalLup.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalLup(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Traceability Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="block text-slate-400 font-bold text-[10px] uppercase">Creado por</span>
                <span className="font-extrabold text-slate-800">
                  {activeModalLup.createdBy || activeModalLup.author}
                </span>
                <span className="block text-[10px] text-slate-400">
                  {formatLogDate(activeModalLup.createdAt)}
                </span>
              </div>
              <div>
                <span className="block text-slate-400 font-bold text-[10px] uppercase">Última modificación</span>
                <span className="font-extrabold text-amber-800">
                  {activeModalLup.lastModifiedBy || 'Sin modificaciones'}
                </span>
                {activeModalLup.lastModifiedAt && (
                  <span className="block text-[10px] text-slate-400">
                    {formatLogDate(activeModalLup.lastModifiedAt)}
                  </span>
                )}
              </div>
              <div>
                <span className="block text-slate-400 font-bold text-[10px] uppercase">Historial de Revisiones</span>
                <span className="font-extrabold text-emerald-800">
                  {activeModalLup.modificationCount || 0} ediciones registradas
                </span>
                <span className="block text-[10px] text-emerald-600 font-semibold">
                  Trazabilidad CIAL activa
                </span>
              </div>
            </div>

            {/* Objective Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-1">
                Objetivo de la Lección de un Punto:
              </h4>
              <p className="text-sm font-semibold text-emerald-950">
                "{activeModalLup.objective}"
              </p>
            </div>

            {/* Critical Risk & EPP for Safety LUPs */}
            {(activeModalLup.criticalRisk || (activeModalLup.mandatoryEpp && activeModalLup.mandatoryEpp.length > 0)) && (
              <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 mb-5 space-y-2">
                {activeModalLup.criticalRisk && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-600 text-white">
                      Peligro Crítico
                    </span>
                    <span className="text-xs font-bold text-rose-950">
                      {activeModalLup.criticalRisk}
                    </span>
                  </div>
                )}
                {activeModalLup.mandatoryEpp && activeModalLup.mandatoryEpp.length > 0 && (
                  <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-amber-900">EPP Obligatorio:</span>
                    {activeModalLup.mandatoryEpp.map((epp, idx) => (
                      <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-amber-300 text-xs font-bold text-slate-800 shadow-2xs">
                        🛡️ {epp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4 FOTOS DEL ESTÁNDAR (PREVENCIÓN DE RIESGOS) */}
            {activeModalLup.photos && activeModalLup.photos.length >= 4 && (
              <div className="mb-6 bg-slate-900 text-white rounded-3xl p-5 shadow-lg border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      4 Puntos Clave en Fotografías Reales
                    </span>
                  </div>
                  <span className="text-xs text-amber-300 font-bold">
                    🔍 Clic en cualquier foto para pantalla completa
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeModalLup.photos.map((p, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setZoomPhoto({
                        url: p.url,
                        title: p.title,
                        subtitle: p.caption || ''
                      })}
                      className="group cursor-pointer bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-400 transition-all flex flex-col justify-between shadow-xs"
                    >
                      <div className="relative h-44 bg-slate-950 overflow-hidden">
                        <img 
                          src={p.url} 
                          alt={p.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-md shadow-md ${
                          p.type === 'do' 
                            ? 'bg-emerald-600 text-white' 
                            : (p.type === 'dont' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950')
                        }`}>
                          {p.type === 'do' ? '✅ CORRECTO' : (p.type === 'dont' ? '❌ PROHIBIDO' : '⚠️ ALERTA')}
                        </span>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-black/75 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> Ampliar
                          </span>
                        </div>
                      </div>

                      <div className="p-3 text-xs space-y-1">
                        <h5 className="font-black text-slate-100 line-clamp-1 group-hover:text-amber-400 transition">
                          {p.title}
                        </h5>
                        {p.caption && (
                          <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                            {p.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DUAL COMPARISON: CORRECT VS INCORRECT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              
              {/* CASOS CORRECTOS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-black text-sm text-emerald-950 uppercase tracking-wide">
                    CASO CORRECTO (QUÉ SÍ HACER)
                  </h4>
                </div>

                {((activeModalLup.doPractices && activeModalLup.doPractices.length > 0)
                  ? activeModalLup.doPractices
                  : (activeModalLup.doPractice ? [activeModalLup.doPractice] : [])
                ).map((practice, pIdx) => (
                  <div key={pIdx} className="bg-green-50/70 border-2 border-emerald-400 rounded-2xl p-5 shadow-xs space-y-3">
                    {practice.photoUrl && (
                      <div 
                        onClick={() => setZoomPhoto({
                          url: practice.photoUrl!,
                          title: `Caso Correcto • ${activeModalLup.code}`,
                          subtitle: practice.title
                        })}
                        className="relative rounded-2xl overflow-hidden border-2 border-emerald-300 h-48 sm:h-56 bg-emerald-100/50 group cursor-pointer shadow-xs"
                      >
                        <img 
                          src={practice.photoUrl} 
                          alt="Caso Correcto" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5">
                            <Eye className="w-4 h-4" /> Ampliar Fotografía
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <h5 className="text-base font-black text-emerald-950 mb-1">
                        {practice.title}
                      </h5>
                      <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                        {practice.description}
                      </p>
                    </div>

                    {practice.points && practice.points.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-emerald-900 pt-2 border-t border-emerald-200/80">
                        {practice.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* CASOS INCORRECTOS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h4 className="font-black text-sm text-rose-950 uppercase tracking-wide">
                    CASO INCORRECTO (QUÉ NO HACER)
                  </h4>
                </div>

                {((activeModalLup.dontPractices && activeModalLup.dontPractices.length > 0)
                  ? activeModalLup.dontPractices
                  : (activeModalLup.dontPractice ? [activeModalLup.dontPractice] : [])
                ).map((practice, pIdx) => (
                  <div key={pIdx} className="bg-rose-50/70 border-2 border-rose-400 rounded-2xl p-5 shadow-xs space-y-3">
                    {practice.photoUrl && (
                      <div 
                        onClick={() => setZoomPhoto({
                          url: practice.photoUrl!,
                          title: `Caso Incorrecto • ${activeModalLup.code}`,
                          subtitle: practice.title
                        })}
                        className="relative rounded-2xl overflow-hidden border-2 border-rose-300 h-48 sm:h-56 bg-rose-100/50 group cursor-pointer shadow-xs"
                      >
                        <img 
                          src={practice.photoUrl} 
                          alt="Caso Incorrecto" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5">
                            <Eye className="w-4 h-4" /> Ampliar Fotografía
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <h5 className="text-base font-black text-rose-950 mb-1">
                        {practice.title}
                      </h5>
                      <p className="text-xs text-rose-900 font-medium leading-relaxed">
                        {practice.description}
                      </p>
                    </div>

                    {practice.points && practice.points.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-rose-900 pt-2 border-t border-rose-200/80">
                        {practice.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Warning */}
            {activeModalLup.safetyWarning && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-2xl mb-5 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-amber-900">
                  <span className="font-bold">Advertencia Crítica:</span> {activeModalLup.safetyWarning}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 flex-wrap">
              <div className="flex items-center gap-2">
                {canEditLup && (
                  <button
                    onClick={() => handleOpenEdit(activeModalLup)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit className="w-4 h-4 text-emerald-600" />
                    <span>Modificar LUP</span>
                  </button>
                )}

                {canDeleteLup ? (
                  <button
                    onClick={() => handleOpenDelete(activeModalLup)}
                    className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 transition flex items-center gap-1.5 cursor-pointer border border-rose-200 shadow-xs"
                    title="Eliminar LUP (Rol Jefatura autorizado)"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar LUP</span>
                  </button>
                ) : (
                  <div 
                    className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-xs font-semibold flex items-center gap-1.5 cursor-not-allowed select-none"
                    title="La eliminación de estándares LUP está restringida a Jefaturas de CIAL Alimentos"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Eliminar (Solo Jefatura)</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir</span>
                </button>
                <button
                  onClick={() => {
                    onSelectForCharla(activeModalLup.id);
                    setActiveModalLup(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Asignar a Turno (SSO)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* EDIT LUP MODAL */}
      {editingLup && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-slate-200">
            
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    MODO EDICIÓN
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {editingLup.code}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Modificar Lección de Un Punto
                </h3>
                <p className="text-xs text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  Registrando cambios como: <strong>{currentUserEmail}</strong>
                </p>
              </div>

              <button
                onClick={() => setEditingLup(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              {/* Motivo del cambio (Obligatorio para auditoría) */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
                <label className="block text-xs font-black text-amber-900 uppercase tracking-wide mb-1">
                  Motivo o Resumen del Cambio (Se registrará en auditoría) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Actualización de foto por cambio de estándar en andenes de despacho..."
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Código LUP *
                  </label>
                  <input
                    type="text"
                    required
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Categoría *
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as LupCategory)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  >
                    <option value="Seguridad SSO">Seguridad SSO</option>
                    <option value="Cadena de Frío">Cadena de Frío</option>
                    <option value="Operación de Equipos">Operación de Equipos</option>
                    <option value="Calidad & BPM">Calidad & BPM</option>
                    <option value="Mantención Autónoma 5S">Mantención Autónoma 5S</option>
                    <option value="Calidad / Inocuidad">Calidad / Inocuidad</option>
                    <option value="Despacho & Zonales">Despacho & Zonales</option>
                    <option value="Eficiencia Operacional">Eficiencia Operacional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Título de la LUP *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Área Operacional *
                  </label>
                  <input
                    type="text"
                    required
                    value={editArea}
                    onChange={(e) => setEditArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Objetivo de la Lección *
                </label>
                <textarea
                  required
                  rows={2}
                  value={editObjective}
                  onChange={(e) => setEditObjective(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              {/* Caso Correcto Edit */}
              <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-emerald-900 uppercase">
                    ✅ Caso Correcto (Qué Sí Hacer)
                  </h4>
                  {editDoPhotoSizeKb && (
                    <span className="text-[10px] text-emerald-700 font-mono font-bold">
                      📸 {editDoPhotoSizeKb} KB
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                      Título Caso Correcto *
                    </label>
                    <input
                      type="text"
                      required
                      value={editDoTitle}
                      onChange={(e) => setEditDoTitle(e.target.value)}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-1.5 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                      Cambiar Fotografía Correcta (Opcional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDoPhotoUpload(e, true)}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                    Descripción del Caso Correcto *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={editDoDesc}
                    onChange={(e) => setEditDoDesc(e.target.value)}
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-1.5 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                    Puntos Clave (uno por línea)
                  </label>
                  <textarea
                    rows={2}
                    value={editDoPoints}
                    onChange={(e) => setEditDoPoints(e.target.value)}
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-1.5 text-xs font-semibold font-mono"
                  />
                </div>
              </div>

              {/* Caso Incorrecto Edit */}
              <div className="bg-rose-50/60 border-2 border-rose-300 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-rose-900 uppercase">
                    ❌ Caso Incorrecto (Qué No Hacer)
                  </h4>
                  {editDontPhotoSizeKb && (
                    <span className="text-[10px] text-rose-700 font-mono font-bold">
                      📸 {editDontPhotoSizeKb} KB
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-rose-950 mb-1">
                      Título Caso Incorrecto *
                    </label>
                    <input
                      type="text"
                      required
                      value={editDontTitle}
                      onChange={(e) => setEditDontTitle(e.target.value)}
                      className="w-full bg-white border border-rose-300 rounded-xl px-3 py-1.5 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-rose-950 mb-1">
                      Cambiar Fotografía Incorrecta (Opcional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDontPhotoUpload(e, true)}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-rose-950 mb-1">
                    Descripción del Caso Incorrecto *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={editDontDesc}
                    onChange={(e) => setEditDontDesc(e.target.value)}
                    className="w-full bg-white border border-rose-300 rounded-xl px-3 py-1.5 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-rose-950 mb-1">
                    Riesgos (uno por línea)
                  </label>
                  <textarea
                    rows={2}
                    value={editDontPoints}
                    onChange={(e) => setEditDontPoints(e.target.value)}
                    className="w-full bg-white border border-rose-300 rounded-xl px-3 py-1.5 text-xs font-semibold font-mono"
                  />
                </div>
              </div>

              {/* Safety Warning */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Advertencia de Seguridad (Opcional)
                </label>
                <input
                  type="text"
                  value={editSafetyWarning}
                  onChange={(e) => setEditSafetyWarning(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingLup(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#008744] hover:bg-emerald-600 text-white text-xs font-black shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar Modificación y Registrar Auditoría</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingLup && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-rose-200">
            
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
              ¿Eliminar Lección de un Punto?
            </h3>
            
            <p className="text-xs text-slate-600 mb-3">
              Estás a punto de eliminar <strong>[{deletingLup.code}] {deletingLup.title}</strong>.
            </p>

            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 mb-4 text-xs text-rose-900 leading-relaxed">
              <p className="font-bold mb-1">⚠️ Registro Obligatorio en Auditoría CIAL:</p>
              <p>
                Esta acción se registrará formalmente bajo tu cuenta corporativa: <strong>{currentUserEmail}</strong> en el historial de trazabilidad.
              </p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleConfirmDelete();
            }}>
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Motivo de la eliminación (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Descontinuado por nueva normativa de congelados..."
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingLup(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-md cursor-pointer flex items-center gap-1.5 transition active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Confirmar Eliminación</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* AUDIT LOG MODAL (HISTORIAL COMPLETO DE MODIFICACIONES Y ELIMINACIONES) */}
      {showAuditModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-slate-200 flex flex-col justify-between">
            
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                      AUDITORÍA CIAL
                    </span>
                    <span className="text-xs text-slate-500 font-bold">
                      {auditLogs.length} eventos registrados
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Registro de Auditoría y Trazabilidad de LUPs
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Historial oficial de quién creó, modificó o eliminó lecciones operacionales en Zona Verde.
                  </p>
                </div>

                <button
                  onClick={() => setShowAuditModal(false)}
                  className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Buscar por usuario, LUP o motivo..."
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto pb-1">
                  {(['TODOS', 'CREADO', 'MODIFICADO', 'ELIMINADO'] as const).map((action) => (
                    <button
                      key={action}
                      onClick={() => setAuditFilter(action)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-black tracking-wide transition cursor-pointer ${
                        auditFilter === action
                          ? action === 'ELIMINADO'
                            ? 'bg-rose-600 text-white'
                            : action === 'MODIFICADO'
                            ? 'bg-amber-500 text-slate-950'
                            : action === 'CREADO'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audit Timeline */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {filteredAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 hover:border-slate-300 transition"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                            log.action === 'ELIMINADO'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : log.action === 'MODIFICADO'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {log.action}
                        </span>

                        <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {log.lupCode}
                        </span>

                        <span className="text-xs font-black text-slate-900">
                          {log.lupTitle}
                        </span>
                      </div>

                      <span className="text-[11px] font-semibold text-slate-400">
                        ⏱️ {formatLogDate(log.performedAt)}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Responsable: <strong className="text-slate-900">{log.performedBy}</strong></span>
                      </div>

                      {log.details && (
                        <div className="text-slate-600 font-medium italic text-[11px]">
                          "{log.details}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {filteredAuditLogs.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                    No se encontraron registros de auditoría para este criterio.
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-[11px] text-slate-400 font-semibold">
                Registro inmutable de trazabilidad CIAL Alimentos
              </span>
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                Cerrar Auditoría
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CREATE NEW LUP MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-slate-200">
            
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="bg-emerald-100 text-emerald-900 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Nueva Lección Operacional
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Crear Lección de Un Punto (LUP)
                </h3>
                <p className="text-xs text-emerald-700 font-bold mt-0.5">
                  👤 Creador registrado: <strong>{currentUserEmail}</strong>
                </p>
              </div>

              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLup} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Código LUP *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: LUP-DES-05"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Categoría *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as LupCategory)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  >
                    <option value="Seguridad SSO">Seguridad SSO</option>
                    <option value="Cadena de Frío">Cadena de Frío</option>
                    <option value="Operación de Equipos">Operación de Equipos</option>
                    <option value="Calidad & BPM">Calidad & BPM</option>
                    <option value="Mantención Autónoma 5S">Mantención Autónoma 5S</option>
                    <option value="Calidad / Inocuidad">Calidad / Inocuidad</option>
                    <option value="Despacho & Zonales">Despacho & Zonales</option>
                    <option value="Eficiencia Operacional">Eficiencia Operacional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Título de la LUP *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Correcto Traspaso de Pallets en Andén..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Área Operacional *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Despacho, Andenes, Cámara Frío..."
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Objetivo de la Lección *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="¿Qué buscamos lograr o evitar con esta lección en el turno?..."
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              {/* Qué SÍ hacer vs Qué NO hacer (Múltiples prácticas) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* LISTA QUÉ SÍ HACER */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-800 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Qué SÍ Hacer ({newDoPracticesList.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAddNewDoPractice}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar otro Qué Hacer</span>
                    </button>
                  </div>

                  {newDoPracticesList.map((item, idx) => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-300 space-y-2 relative">
                      <div className="flex items-center justify-between pb-1 border-b border-emerald-200/70">
                        <span className="text-[11px] font-black text-emerald-900">
                          #{idx + 1} Caso Seguro Recomendado
                        </span>
                        {newDoPracticesList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveNewDoPractice(idx)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-100/60 transition cursor-pointer"
                            title="Eliminar este Qué Hacer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Título ej: Cajas con traba en cruz..."
                        value={item.title}
                        onChange={(e) => handleUpdateNewDoPractice(idx, 'title', e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Descripción detallada de cómo realizar la tarea según estándar..."
                        value={item.description}
                        onChange={(e) => handleUpdateNewDoPractice(idx, 'description', e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Puntos clave paso a paso (uno por línea)..."
                        value={item.pointsText}
                        onChange={(e) => handleUpdateNewDoPractice(idx, 'pointsText', e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-1.5 text-[11px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      <div>
                        <label className="text-[10px] font-bold text-emerald-800 block mb-1">
                          Foto Caso Correcto (Opcional):
                        </label>
                        {item.photoUrl ? (
                          <div className="flex items-center gap-2 bg-emerald-100/70 p-1.5 rounded-xl border border-emerald-300">
                            <img src={item.photoUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-emerald-400" />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-emerald-900 block truncate">Foto adjunta</span>
                              {item.photoSizeKb && (
                                <span className="text-[9px] text-emerald-700 font-mono block">Tamaño: {item.photoSizeKb} KB</span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                handleUpdateNewDoPractice(idx, 'photoUrl', null);
                                handleUpdateNewDoPractice(idx, 'photoSizeKb', undefined);
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-100 transition cursor-pointer"
                              title="Quitar foto"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleNewPracticePhotoUpload(e, true, idx)}
                            className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-emerald-600 file:text-white cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddNewDoPractice}
                    className="w-full py-2 border-2 border-dashed border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar otro Qué SÍ Hacer</span>
                  </button>
                </div>

                {/* LISTA QUÉ NO HACER */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-800 uppercase flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Qué NO Hacer ({newDontPracticesList.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAddNewDontPractice}
                      className="text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar otro Qué NO Hacer</span>
                    </button>
                  </div>

                  {newDontPracticesList.map((item, idx) => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-300 space-y-2 relative">
                      <div className="flex items-center justify-between pb-1 border-b border-rose-200/70">
                        <span className="text-[11px] font-black text-rose-900">
                          #{idx + 1} Caso Inseguro Prohibido
                        </span>
                        {newDontPracticesList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveNewDontPractice(idx)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-100/60 transition cursor-pointer"
                            title="Eliminar este Qué NO Hacer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Título ej: Cajas en columnas sin traba..."
                        value={item.title}
                        onChange={(e) => handleUpdateNewDontPractice(idx, 'title', e.target.value)}
                        className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Descripción del error operacional o desviación..."
                        value={item.description}
                        onChange={(e) => handleUpdateNewDontPractice(idx, 'description', e.target.value)}
                        className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Puntos clave de prohibición (uno por línea)..."
                        value={item.pointsText}
                        onChange={(e) => handleUpdateNewDontPractice(idx, 'pointsText', e.target.value)}
                        className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-[11px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />

                      <div>
                        <label className="text-[10px] font-bold text-rose-800 block mb-1">
                          Foto Caso Incorrecto (Opcional):
                        </label>
                        {item.photoUrl ? (
                          <div className="flex items-center gap-2 bg-rose-100/70 p-1.5 rounded-xl border border-rose-300">
                            <img src={item.photoUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-rose-400" />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-rose-900 block truncate">Foto adjunta</span>
                              {item.photoSizeKb && (
                                <span className="text-[9px] text-rose-700 font-mono block">Tamaño: {item.photoSizeKb} KB</span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                handleUpdateNewDontPractice(idx, 'photoUrl', null);
                                handleUpdateNewDontPractice(idx, 'photoSizeKb', undefined);
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-100 transition cursor-pointer"
                              title="Quitar foto"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleNewPracticePhotoUpload(e, false, idx)}
                            className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-rose-600 file:text-white cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddNewDontPractice}
                    className="w-full py-2 border-2 border-dashed border-rose-300 hover:border-rose-500 hover:bg-rose-50 text-rose-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar otro Qué NO Hacer</span>
                  </button>
                </div>

              </div>

              {/* Safety Warning */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Advertencia de Seguridad (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: ¡Riesgo inminente de aplastamiento si se mueve el camión!"
                  value={newSafetyWarning}
                  onChange={(e) => setNewSafetyWarning(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#008744] hover:bg-emerald-600 text-white text-xs font-black shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar LUP en Catálogo</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* PHOTO ZOOM MODAL */}
      {zoomPhoto && (
        <div 
          onClick={() => setZoomPhoto(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-4 sm:p-6 text-white shadow-2xl space-y-3 cursor-default"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase">{zoomPhoto.title}</span>
                <h4 className="text-base font-extrabold">{zoomPhoto.subtitle}</h4>
              </div>
              <button 
                onClick={() => setZoomPhoto(null)}
                className="p-2 hover:bg-slate-800 rounded-xl transition cursor-pointer text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-black max-h-[70vh] flex items-center justify-center">
              <img 
                src={zoomPhoto.url} 
                alt="Detalle" 
                className="max-h-[70vh] w-auto object-contain" 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
