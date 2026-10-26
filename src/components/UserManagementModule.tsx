import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  UserCheck, 
  Trash2, 
  UserPlus, 
  Check, 
  Search, 
  Filter, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  Lock, 
  KeyRound, 
  Building2, 
  Clock, 
  CheckCircle2, 
  X,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { AppUser, UserRole, UserPermissions } from '../types';
import { 
  getAppUsers, 
  saveAppUser, 
  deleteAppUser, 
  DEFAULT_ROLE_PERMISSIONS 
} from '../services/storage';

interface UserManagementModuleProps {
  currentUser?: AppUser;
}

export const UserManagementModule: React.FC<UserManagementModuleProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'todos' | UserRole>('todos');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state for adding user
  const [newEmail, setNewEmail] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newRole, setNewRole] = useState<UserRole>('supervisor');
  const [newArea, setNewArea] = useState<string>('Despacho & Andenes');

  const loadUsers = () => {
    const list = getAppUsers();
    setUsers(list);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMsg({ type, text });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 4000);
  };

  // Toggle single permission for user
  const handleTogglePermission = (userId: string, permKey: keyof UserPermissions) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    // Regla de seguridad: Ariel Mella siempre mantiene canDeleteLup y canManageUsers
    if (targetUser.email.toLowerCase() === 'ariel.mella@cial.cl' && (permKey === 'canDeleteLup' || permKey === 'canManageUsers')) {
      showNotification('Ariel Mella es el Administrador Principal y debe conservar permisos críticos.', 'error');
      return;
    }

    const updatedPermissions: UserPermissions = {
      ...targetUser.permissions,
      [permKey]: !targetUser.permissions[permKey]
    };

    const updatedUser: AppUser = {
      ...targetUser,
      permissions: updatedPermissions,
      updatedAt: new Date().toISOString()
    };

    saveAppUser(updatedUser);
    loadUsers();
    showNotification(`Permiso "${permKey}" actualizado para ${targetUser.name}`);
  };

  // Change user role and optionally update default permissions
  const handleChangeRole = (userId: string, newRoleValue: UserRole) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    if (targetUser.email.toLowerCase() === 'ariel.mella@cial.cl' && newRoleValue !== 'jefatura') {
      showNotification('Ariel Mella no puede ser degradado de Jefatura.', 'error');
      return;
    }

    const updatedUser: AppUser = {
      ...targetUser,
      role: newRoleValue,
      permissions: {
        ...DEFAULT_ROLE_PERMISSIONS[newRoleValue]
      },
      updatedAt: new Date().toISOString()
    };

    saveAppUser(updatedUser);
    loadUsers();
    showNotification(`Rol de ${targetUser.name} actualizado a "${newRoleValue.toUpperCase()}" con permisos por defecto`);
  };

  // Reset permissions to role default
  const handleResetToRoleDefaults = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    const updatedUser: AppUser = {
      ...targetUser,
      permissions: {
        ...DEFAULT_ROLE_PERMISSIONS[targetUser.role]
      },
      updatedAt: new Date().toISOString()
    };

    saveAppUser(updatedUser);
    loadUsers();
    showNotification(`Permisos de ${targetUser.name} restablecidos a valores estándar.`);
  };

  // Delete user
  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el acceso del usuario "${userName}" del sistema Zona Verde?`)) {
      const res = deleteAppUser(userId);
      if (!res.success) {
        showNotification(res.message || 'No se pudo eliminar el usuario.', 'error');
        return;
      }
      loadUsers();
      showNotification(`Usuario ${userName} eliminado exitosamente.`);
    }
  };

  // Add new user
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newEmail.trim().toLowerCase();
    if (!cleanEmail) return;

    // Check existing
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      showNotification(`El correo "${cleanEmail}" ya se encuentra registrado.`, 'error');
      return;
    }

    const user: AppUser = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      name: newName.trim() || cleanEmail.split('@')[0],
      role: newRole,
      area: newArea.trim() || 'Operaciones CIAL',
      permissions: {
        ...DEFAULT_ROLE_PERMISSIONS[newRole]
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveAppUser(user);
    loadUsers();
    setShowAddModal(false);
    setNewEmail('');
    setNewName('');
    showNotification(`Usuario ${user.name} registrado exitosamente con rol ${user.role.toUpperCase()}`);
  };

  // Filter users
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.area && u.area.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'todos' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Metrics
  const totalUsers = users.length;
  const jefaturasWithDelete = users.filter(u => u.permissions.canDeleteLup).length;
  const supervisorCount = users.filter(u => u.role === 'supervisor').length;
  const operadorCount = users.filter(u => u.role === 'operador').length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* BANNER PRINCIPAL DE ADMINISTRACIÓN ARIEL MELLA */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-xl border border-emerald-900/40">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-widest border border-emerald-500/30 mb-3">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Módulo de Control de Acceso & Permisos • CIAL Alimentos</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Administración de Usuarios y Roles de Jefatura
          </h1>
          
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mb-5">
            Configura qué jefaturas tienen la autorización exclusiva para <strong>eliminar estándares LUPs</strong>, y otorga permisos granulares a supervisores y operadores del Centro de Distribución.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Registrar Nuevo Usuario</span>
            </button>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-200">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>Administrador Activo: <strong className="text-white">{currentUser?.email || 'ariel.mella@cial.cl'}</strong></span>
            </div>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
      </div>

      {/* FEEDBACK NOTIFICATION */}
      {feedbackMsg && (
        <div className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold shadow-md transition-all ${
          feedbackMsg.type === 'success' 
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
            : 'bg-rose-50 text-rose-900 border border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Usuarios</span>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-3xl font-black text-slate-900">{totalUsers}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Con acceso al sistema</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs bg-gradient-to-br from-rose-50/40 to-transparent">
          <div className="flex items-center justify-between text-rose-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pueden Eliminar LUPs</span>
            <ShieldAlert className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-3xl font-black text-rose-600">{jefaturasWithDelete}</p>
          <p className="text-[11px] text-rose-800 font-semibold mt-1">Jefaturas autorizadas 🗑️</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-xs bg-gradient-to-br from-indigo-50/40 to-transparent">
          <div className="flex items-center justify-between text-indigo-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Supervisores Turno</span>
            <UserCheck className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-black text-indigo-600">{supervisorCount}</p>
          <p className="text-[11px] text-indigo-800 font-medium mt-1">Charlas 5m & Asistencia</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs bg-gradient-to-br from-emerald-50/40 to-transparent">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Operadores CD</span>
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-emerald-600">{operadorCount}</p>
          <p className="text-[11px] text-emerald-800 font-medium mt-1">Consulta & Equipos</p>
        </div>
      </div>

      {/* REGLA DE NEGOCIO CIAL ALIMENTOS */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-black text-amber-950 mb-0.5">
            Política de Trazabilidad y Control Operacional CIAL:
          </p>
          <p className="leading-relaxed">
            Los <strong>Supervisores</strong> pueden dictar charlas de 5 minutos, tomar asistencia y registrar fallas de equipos, pero <strong>no pueden eliminar LUPs</strong> a menos que Ariel Mella o una Jefatura les otorgue explícitamente el permiso con el interruptor <strong>"Eliminar LUPs"</strong>. Todas las eliminaciones quedan selladas con la marca <code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono font-bold">[JEFATURA]</code> en el registro de auditoría.
          </p>
        </div>
      </div>

      {/* BARRA DE HERRAMIENTAS: BÚSQUEDA Y FILTRO */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo @cial.cl o área..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Filtrar:</span>
          {(['todos', 'jefatura', 'supervisor', 'operador'] as const).map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                roleFilter === role
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {role === 'todos' ? 'Todos' : role}
            </button>
          ))}
        </div>
      </div>

      {/* LISTA / TABLA DE USUARIOS Y GESTIÓN DE PERMISOS */}
      <div className="space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500">
            <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-bold">No se encontraron usuarios con ese criterio.</p>
          </div>
        ) : (
          filteredUsers.map((u) => {
            const isAriel = u.email.toLowerCase() === 'ariel.mella@cial.cl';
            const roleBadgeStyle = 
              u.role === 'jefatura' 
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                : (u.role === 'supervisor' ? 'bg-indigo-100 text-indigo-900 border-indigo-300' : 'bg-slate-100 text-slate-800 border-slate-300');

            return (
              <div 
                key={u.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: User Identity */}
                  <div className="flex items-start gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border ${
                      u.role === 'jefatura' 
                        ? 'bg-emerald-600 text-white border-emerald-700' 
                        : (u.role === 'supervisor' ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-slate-700 text-white border-slate-800')
                    }`}>
                      {u.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-black text-slate-900">{u.name}</h3>
                        
                        {isAriel && (
                          <span className="bg-amber-100 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            SUPER ADMIN
                          </span>
                        )}

                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${roleBadgeStyle}`}>
                          {u.role}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 font-medium font-mono mt-0.5">
                        {u.email}
                      </p>

                      <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                        {u.area || 'Operaciones CIAL Alimentos'}
                      </p>
                    </div>
                  </div>

                  {/* Center: Role Selector */}
                  <div className="flex items-center gap-2 self-start lg:self-center">
                    <span className="text-xs font-bold text-slate-500">Rol:</span>
                    <select
                      value={u.role}
                      disabled={isAriel}
                      onChange={(e) => handleChangeRole(u.id, e.target.value as UserRole)}
                      className={`text-xs font-bold rounded-xl px-3 py-2 border transition ${
                        isAriel 
                          ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed' 
                          : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                      }`}
                    >
                      <option value="jefatura">Jefatura (Acceso Total)</option>
                      <option value="supervisor">Supervisor de Turno</option>
                      <option value="operador">Operador CD</option>
                    </select>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-center">
                    <button
                      onClick={() => handleResetToRoleDefaults(u.id)}
                      className="px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      title="Restablecer permisos recomendados para este rol"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Valores Rol</span>
                    </button>

                    {!isAriel && (
                      <button
                        onClick={() => handleDeleteUser(u.id, u.name)}
                        className="px-2.5 py-1.5 rounded-xl text-rose-600 hover:text-rose-800 hover:bg-rose-50 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        title="Eliminar usuario del sistema"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* MATRIZ DE TOGGLES DE PERMISOS GRANULARES */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2.5">
                    Permisos de Operación Concedidos:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    
                    {/* TOGGLE 1: ELIMINAR LUPS (EL REQUERIMIENTO PRINCIPAL) */}
                    <button
                      onClick={() => handleTogglePermission(u.id, 'canDeleteLup')}
                      disabled={isAriel}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                        u.permissions.canDeleteLup
                          ? 'bg-rose-50/90 border-rose-300 text-rose-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60 hover:opacity-100'
                      }`}
                      title={u.permissions.canDeleteLup ? 'Permiso activo: puede eliminar LUPs' : 'Sin permiso para eliminar LUPs'}
                    >
                      <div className="flex items-center gap-2">
                        <Trash2 className={`w-4 h-4 ${u.permissions.canDeleteLup ? 'text-rose-600' : 'text-slate-400'}`} />
                        <div>
                          <span className="text-xs block">Eliminar LUPs</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {u.permissions.canDeleteLup ? 'AUTORIZADO' : 'BLOQUEADO'}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        u.permissions.canDeleteLup ? 'bg-rose-600 text-white' : 'bg-slate-200 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>

                    {/* TOGGLE 2: CREAR & EDITAR LUPS */}
                    <button
                      onClick={() => handleTogglePermission(u.id, 'canEditLup')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                        u.permissions.canEditLup
                          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className={`w-4 h-4 ${u.permissions.canEditLup ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <div>
                          <span className="text-xs block">Crear/Editar LUP</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {u.permissions.canEditLup ? 'HABILITADO' : 'INACTIVO'}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        u.permissions.canEditLup ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>

                    {/* TOGGLE 3: ASISTENCIA & PASE DE LISTA */}
                    <button
                      onClick={() => handleTogglePermission(u.id, 'canManageAttendance')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                        u.permissions.canManageAttendance
                          ? 'bg-blue-50/90 border-blue-300 text-blue-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${u.permissions.canManageAttendance ? 'text-blue-600' : 'text-slate-400'}`} />
                        <div>
                          <span className="text-xs block">Pase de Lista</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {u.permissions.canManageAttendance ? 'HABILITADO' : 'INACTIVO'}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        u.permissions.canManageAttendance ? 'bg-blue-600 text-white' : 'bg-slate-200 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>

                    {/* TOGGLE 4: GESTIONAR USUARIOS (SOLO ARIEL MELLA Y JEFATURAS TOP) */}
                    <button
                      onClick={() => handleTogglePermission(u.id, 'canManageUsers')}
                      disabled={isAriel}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                        u.permissions.canManageUsers
                          ? 'bg-purple-50/90 border-purple-300 text-purple-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <KeyRound className={`w-4 h-4 ${u.permissions.canManageUsers ? 'text-purple-600' : 'text-slate-400'}`} />
                        <div>
                          <span className="text-xs block">Manejar Usuarios</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {u.permissions.canManageUsers ? 'HABILITADO' : 'INACTIVO'}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        u.permissions.canManageUsers ? 'bg-purple-600 text-white' : 'bg-slate-200 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>

                    {/* TOGGLE 5: EQUIPOS (TRANSPALETAS Y RF) */}
                    <button
                      onClick={() => handleTogglePermission(u.id, 'canManageEquipment')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                        u.permissions.canManageEquipment
                          ? 'bg-amber-50/90 border-amber-300 text-amber-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className={`w-4 h-4 ${u.permissions.canManageEquipment ? 'text-amber-600' : 'text-slate-400'}`} />
                        <div>
                          <span className="text-xs block">Equipos & RF</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {u.permissions.canManageEquipment ? 'HABILITADO' : 'INACTIVO'}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        u.permissions.canManageEquipment ? 'bg-amber-600 text-white' : 'bg-slate-200 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>

                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* MODAL REGISTRAR NUEVO USUARIO CIAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Registrar Colaborador CIAL
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Asigna rol de Jefatura, Supervisor u Operador para el Centro de Distribución.
                </p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Claudio Sepúlveda"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Correo Corporativo (@cial.cl) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@cial.cl"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Rol Inicial *
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="jefatura">Jefatura (Elimina LUPs)</option>
                    <option value="supervisor">Supervisor de Turno</option>
                    <option value="operador">Operador CD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Área Operativa
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Despacho & Andenes"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px] text-slate-600">
                <span className="font-bold text-slate-800">Nota:</span> Si seleccionas <strong>Jefatura</strong>, se habilitará automáticamente la potestad de eliminar LUPs. Podrás modificar cualquier permiso en la tabla en cualquier momento.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Guardar Usuario</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
