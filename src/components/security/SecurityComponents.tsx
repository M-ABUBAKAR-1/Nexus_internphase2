import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Lock, Zap } from 'lucide-react';

interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
}

const calculatePasswordStrength = (password: string): PasswordStrength => {
  let score = 0;

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Character variety checks
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  // Cap at 4
  score = Math.min(score, 4);

  const strengthLevels: PasswordStrength[] = [
    { score: 0, label: 'Very Weak', color: 'bg-red-500' },
    { score: 1, label: 'Weak', color: 'bg-orange-500' },
    { score: 2, label: 'Fair', color: 'bg-yellow-500' },
    { score: 3, label: 'Good', color: 'bg-blue-500' },
    { score: 4, label: 'Strong', color: 'bg-green-500' }
  ];

  return strengthLevels[Math.floor(score)];
};

export const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
  const strength = calculatePasswordStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-900">Password Strength</label>
        <span className={`text-sm font-semibold ${
          strength.score <= 1 ? 'text-red-600' :
          strength.score === 2 ? 'text-yellow-600' :
          strength.score === 3 ? 'text-blue-600' :
          'text-green-600'
        }`}>
          {strength.label}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${strength.color} transition-all duration-300`}
          style={{ width: `${((strength.score + 1) / 5) * 100}%` }}
        />
      </div>
      <div className="text-xs text-gray-600 space-y-1 mt-3">
        <p className="font-medium mb-2">Password should contain:</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className={password.length >= 8 ? 'text-green-600' : 'text-gray-400'} />
            <span>At least 8 characters</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'} />
            <span>Uppercase letter</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className={/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'} />
            <span>Lowercase letter</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className={/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'} />
            <span>Number</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <CheckCircle size={14} className={/[^a-zA-Z0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'} />
            <span>Special character (!@#$%^&*)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TwoFactorAuth: React.FC = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [otp, setOtp] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([
    'NEXUS-1234-5678',
    'NEXUS-9012-3456',
    'NEXUS-7890-1234',
    'NEXUS-5678-9012',
  ]);

  const handleEnable2FA = () => {
    setStep('verify');
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setIs2FAEnabled(true);
      setOtp('');
      setStep('setup');
    }
  };

  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    setOtp('');
  };

  if (!is2FAEnabled) {
    return (
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900">Two-Factor Authentication (2FA) is Disabled</h4>
              <p className="text-sm text-amber-800 mt-1">
                Enable 2FA to add an extra layer of security to your account. You'll need to provide a verification code in addition to your password when logging in.
              </p>
            </div>
          </div>
        </div>

        {step === 'setup' && (
          <button
            onClick={handleEnable2FA}
            className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            Enable Two-Factor Authentication
          </button>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Scan QR Code</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy, Microsoft Authenticator, etc.)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg border border-gray-300">
              <div className="w-40 h-40 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs text-center px-4">
                  [QR Code Placeholder]\nScan with Authenticator App
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Enter 6-Digit Code</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              className="w-full px-4 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify and Enable 2FA
            </button>

            <button
              onClick={() => setStep('setup')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-success-50 border border-success-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle size={20} className="text-success-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-success-900">Two-Factor Authentication is Enabled</h4>
            <p className="text-sm text-success-800 mt-1">
              Your account is protected with 2FA. You'll be asked for a verification code when you sign in.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Backup Codes</h4>
        <p className="text-sm text-gray-600 mb-4">
          Save these backup codes in a safe place. You can use them to access your account if you lose access to your authenticator app.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {backupCodes.map((code, idx) => (
            <div
              key={idx}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded font-mono text-sm text-gray-900"
            >
              {code}
            </div>
          ))}
        </div>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          Download Backup Codes
        </button>
      </div>

      <button
        onClick={handleDisable2FA}
        className="w-full px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
      >
        Disable Two-Factor Authentication
      </button>
    </div>
  );
};

export default PasswordStrengthMeter;
