import React, { useState, useEffect } from 'react';
import { supabase, supabaseProd } from '../lib/supabase';
import cialLogo from '../assets/cial-alimentos-logo.png';
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff, RotateCcw, ShieldCheck } from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot';

const ALLOWED_DOMAIN = 'cial.cl';

interface LoginPageProps {
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem('nexus_session_expired') === 'true') {
      localStorage.removeItem('nexus_session_expired');
      setError('Tu sesión se cerró automáticamente por inactividad según la política de seguridad corporativa CIAL.');
    }
  }, []);

  const validateDomain = (mail: string): boolean => {
    const domain = mail.split('@')[1]?.toLowerCase();
    return domain === ALLOWED_DOMAIN;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateDomain(email)) {
      setError('Solo se permiten correos corporativos @cial.cl para acceder al sistema.');
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      let { error: authError } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });

      // Si falla en MAIN, verificar si el usuario tiene cuenta válida en Nexus PROD / Dock y sincronizar
      if (authError && (authError.message.includes('Invalid login credentials') || authError.message.includes('User not found'))) {
        try {
          const { data: prodData, error: prodError } = await supabaseProd.auth.signInWithPassword({
            email: cleanEmail,
            password
          });
          if (!prodError && prodData?.user) {
            await supabase.rpc('sync_user_credentials', {
              target_email: cleanEmail,
              new_password: password
            });
            const retry = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
            authError = retry.error;
          }
        } catch (syncErr) {
          console.warn('Error en sincronización automática con servidores Nexus:', syncErr);
        }
      }

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('Correo o contraseña incorrectos. Recuerda usar las mismas credenciales de Nexus Outbound / CIAL.');
        } else {
          setError(authError.message);
        }
      } else {
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setError(err?.message || 'Error de conexión con el servidor de autenticación CIAL.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateDomain(email)) {
      setError('Solo se permiten correos corporativos @cial.cl para crear cuenta.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres según la política de seguridad CIAL.');
      return;
    }

    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError('La contraseña debe ser alfanumérica (contener al menos una letra y un número).');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const { data, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            domain_verified: true,
            registered_at: new Date().toISOString()
          }
        }
      });

      if (authError) {
        if (authError.message.includes('User already registered') || authError.message.includes('already exists')) {
          const { error: loginErr } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
          if (loginErr) {
            setError('Esta cuenta @cial.cl ya fue creada previamente. Inicia sesión con tu contraseña o usa "¿Olvidaste tu contraseña?".');
          } else if (onSuccess) {
            onSuccess();
          }
        } else {
          setError(authError.message);
        }
      } else {
        if (data.session) {
          if (onSuccess) onSuccess();
          return;
        }
        const { error: loginErr } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
        if (loginErr) {
          setSuccess('¡Cuenta creada correctamente! Ya puedes iniciar sesión con tus credenciales.');
          setMode('login');
        } else if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Error al procesar registro.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateDomain(email)) {
      setError('Solo se permiten correos corporativos @cial.cl.');
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: window.location.origin
      });

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(`Hemos enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada corporativa.`);
      }
    } catch (err: any) {
      setError(err?.message || 'Error al solicitar recuperación.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccess(null);
    setShowPassword(false);
  };

  const switchMode = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#063d25] p-4">
      
      {/* Fondo con gradiente y formas orgánicas corporativas */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#042818] via-[#005a2e] to-[#008744]" />
        
        {/* Glows y difuminados de luz */}
        <div className="absolute top-[-100px] right-[-60px] w-[500px] h-[500px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[450px] h-[450px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-emerald-300/5 blur-2xl" />
        
        {/* Grilla sutil */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Card Principal */}
      <div className="relative z-10 w-full max-w-md select-none">
        
        <div className="bg-white/[0.97] backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/40 border border-white/50 overflow-hidden">
          
          {/* Header con gradiente CIAL */}
          <div className="bg-gradient-to-br from-[#005a2e] to-[#008744] p-7 text-center relative border-b border-emerald-800/40">
            {/* Brillo superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            
            <div className="flex items-center justify-center gap-3.5 mb-2.5">
              <div className="bg-white p-2 rounded-2xl shadow-md border border-emerald-100 flex items-center justify-center shrink-0">
                <img
                  src={cialLogo}
                  alt="CIAL Alimentos"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-white font-black text-xl leading-none tracking-tight">NEXUS</h1>
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                </div>
                <span className="text-emerald-200 font-extrabold text-xs tracking-widest uppercase leading-none block mt-1">
                  ZONA VERDE
                </span>
              </div>
            </div>
            
            <p className="text-emerald-100/90 text-xs font-semibold tracking-wide">
              Gestión Operacional de Seguridad, LUPs y Equipos — CIAL Alimentos
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-black/20 text-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              <span>Mismas cuentas y acceso unificado que Nexus Outbound</span>
            </div>
          </div>

          {/* Formulario */}
          <div className="p-7">
            
            {/* MODO: LOGIN */}
            {mode === 'login' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Iniciar Sesión</h2>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Acceso exclusivo para colaboradores con correo <span className="text-[#008744] font-black">@cial.cl</span>
                  </p>
                </div>

                {error && <ErrorBanner message={error} />}
                {success && <SuccessBanner message={success} />}

                <form onSubmit={handleLogin} className="space-y-3.5">
                  <EmailField
                    value={email}
                    onChange={setEmail}
                    placeholder="usuario@cial.cl"
                    disabled={loading}
                  />
                  <PasswordField
                    value={password}
                    onChange={setPassword}
                    show={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                    placeholder="Contraseña"
                    disabled={loading}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#008744] hover:bg-[#007038] active:bg-[#005a2e] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-black transition-all cursor-pointer shadow-md active:scale-95 mt-2"
                  >
                    {loading ? (
                      <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4" />
                        Ingresar a Zona Verde
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 mt-2">
                  <button
                    onClick={() => switchMode('forgot')}
                    className="text-slate-400 hover:text-[#008744] font-bold transition-colors cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  <button
                    onClick={() => switchMode('register')}
                    className="text-[#008744] font-black hover:underline transition-colors cursor-pointer"
                  >
                    Crear cuenta CIAL →
                  </button>
                </div>
              </div>
            )}

            {/* MODO: REGISTRO */}
            {mode === 'register' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Crear Cuenta</h2>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Disponible para colaboradores <span className="text-[#008744] font-black">@cial.cl</span>
                  </p>
                </div>

                {error && <ErrorBanner message={error} />}

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 font-semibold leading-relaxed">
                    Si ya posees cuenta en <strong>Nexus Outbound</strong> o <strong>Nexus Lean</strong>, no es necesario registrarte: inicia sesión con tu misma contraseña.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-3">
                  <EmailField
                    value={email}
                    onChange={setEmail}
                    placeholder="tu.nombre@cial.cl"
                    disabled={loading}
                    showDomainBadge
                  />
                  <PasswordField
                    value={password}
                    onChange={setPassword}
                    show={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                    placeholder="Contraseña (mínimo 8 caracteres)"
                    disabled={loading}
                  />
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirmar contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      required
                      className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 font-semibold placeholder-slate-400 focus:outline-none transition-all disabled:opacity-50 ${
                        confirmPassword && password !== confirmPassword
                          ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200 bg-red-50/30'
                          : 'border-slate-200 focus:border-[#008744] focus:ring-1 focus:ring-[#008744]/20 focus:bg-white'
                      }`}
                    />
                    {confirmPassword && password === confirmPassword && (
                      <CheckCircle2 className="absolute right-3 top-3 w-4 h-4 text-emerald-500 pointer-events-none" />
                    )}
                  </div>

                  {password.length > 0 && (
                    <PasswordStrength password={password} />
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#008744] hover:bg-[#007038] active:bg-[#005a2e] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-black transition-all cursor-pointer shadow-md active:scale-95 mt-2"
                  >
                    {loading ? (
                      <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4" />
                        Crear Cuenta e Ingresar
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-slate-400 font-semibold">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={() => switchMode('login')}
                    className="text-[#008744] font-black hover:underline cursor-pointer"
                  >
                    Iniciar sesión
                  </button>
                </p>
              </div>
            )}

            {/* MODO: RECUPERAR CONTRASEÑA */}
            {mode === 'forgot' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Recuperar Acceso</h2>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Te enviaremos un enlace a tu correo <span className="text-[#008744] font-black">@cial.cl</span>
                  </p>
                </div>

                {error && <ErrorBanner message={error} />}
                {success && <SuccessBanner message={success} />}

                {!success && (
                  <form onSubmit={handleForgotPassword} className="space-y-3.5">
                    <EmailField
                      value={email}
                      onChange={setEmail}
                      placeholder="usuario@cial.cl"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-[#008744] hover:bg-[#007038] disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-black transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      {loading ? (
                        <RotateCcw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Enviar Enlace de Recuperación
                        </>
                      )}
                    </button>
                  </form>
                )}

                <button
                  onClick={() => switchMode('login')}
                  className="w-full text-center text-xs text-slate-400 hover:text-[#008744] font-bold transition-colors cursor-pointer"
                >
                  ← Volver al inicio de sesión
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-7 pb-6 text-center">
            <div className="border-t border-slate-100 pt-3.5">
              <p className="text-[10px] text-slate-400 font-semibold">
                Sistema seguro CIAL Alimentos S.A. •{' '}
                <span className="text-[#008744] font-black">@cial.cl</span>
              </p>
            </div>
          </div>
        </div>

        {/* Versión */}
        <p className="text-center text-emerald-100/60 text-[10px] font-bold tracking-wider mt-3 uppercase">
          Nexus Zona Verde • Autenticación Unificada CIAL
        </p>
      </div>
    </div>
  );
};

// Componentes auxiliares

function EmailField({
  value,
  onChange,
  placeholder,
  disabled,
  showDomainBadge = false
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled: boolean;
  showDomainBadge?: boolean;
}) {
  const isDomainValid = !value || value.split('@')[1]?.toLowerCase() === 'cial.cl';
  const hasAt = value.includes('@');

  return (
    <div className="relative">
      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required
        className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 font-semibold placeholder-slate-400 focus:outline-none transition-all disabled:opacity-50 ${
          !isDomainValid && hasAt
            ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-200 bg-red-50/30'
            : 'border-slate-200 focus:border-[#008744] focus:ring-1 focus:ring-[#008744]/20 focus:bg-white'
        }`}
      />
      {showDomainBadge && (
        <span className="absolute right-3 top-2.5 text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md leading-none">
          @cial.cl
        </span>
      )}
      {!isDomainValid && hasAt && (
        <p className="text-[10px] text-red-500 font-semibold mt-1 pl-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          Solo se permiten correos @cial.cl
        </p>
      )}
    </div>
  );
}

function PasswordField({
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  disabled
}: {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
  disabled: boolean;
}) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required
        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-800 font-semibold placeholder-slate-400 focus:outline-none focus:border-[#008744] focus:ring-1 focus:ring-[#008744]/20 focus:bg-white transition-all disabled:opacity-50"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const hasMinLen = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isOk = hasMinLen && hasLetter && hasNumber;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5 text-[11px] font-semibold">
      <div className="flex items-center justify-between">
        <span className="text-slate-500 uppercase text-[9px] font-bold tracking-wider">Seguridad CIAL</span>
        {isOk ? (
          <span className="text-emerald-600 font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Contraseña Segura
          </span>
        ) : (
          <span className="text-amber-600 font-bold">Requisitos pendientes</span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-0.5 text-[10px]">
        <span className={`flex items-center gap-1 ${hasMinLen ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
          <CheckCircle2 className="w-3 h-3 shrink-0" /> Mínimo 8 caracteres
        </span>
        <span className={`flex items-center gap-1 ${hasLetter ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
          <CheckCircle2 className="w-3 h-3 shrink-0" /> Al menos 1 letra
        </span>
        <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
          <CheckCircle2 className="w-3 h-3 shrink-0" /> Al menos 1 número
        </span>
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
      <p className="text-xs text-red-700 font-semibold leading-relaxed">{message}</p>
    </div>
  );
}

function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
      <p className="text-xs text-emerald-700 font-semibold leading-relaxed">{message}</p>
    </div>
  );
}
