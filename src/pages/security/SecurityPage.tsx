import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { PasswordStrengthMeter, TwoFactorAuth } from '../../components/security/SecurityComponents';

export const SecurityPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Security & Access Control</h1>
        <p className="text-gray-600">Manage your account security and authentication settings</p>
      </div>

      {/* Password Management */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Password Management</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter your current password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <PasswordStrengthMeter password={newPassword} />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-red-600 text-sm mt-2">Passwords do not match</p>
            )}
            {confirmPassword && newPassword === confirmPassword && newPassword.length > 0 && (
              <p className="text-green-600 text-sm mt-2">Passwords match ✓</p>
            )}
          </div>

          <button className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newPassword || newPassword !== confirmPassword || newPassword.length < 8}
          >
            Update Password
          </button>
        </CardBody>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Two-Factor Authentication (2FA)</h2>
        </CardHeader>
        <CardBody>
          <TwoFactorAuth />
        </CardBody>
      </Card>

      {/* Account Activity */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Recent Account Activity</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[
              { action: 'Sign in from Chrome', device: 'Windows 10', time: '2 hours ago', location: 'New York, NY' },
              { action: 'Sign in from Safari', device: 'iPhone 13', time: '1 day ago', location: 'San Francisco, CA' },
              { action: 'Password changed', device: 'Chrome', time: '3 days ago', location: 'New York, NY' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-between gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.device} • {activity.location}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Active Sessions</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-blue-50">
              <div>
                <p className="font-medium text-gray-900">Current Session</p>
                <p className="text-sm text-gray-600">Chrome • Windows 10 • New York, NY</p>
              </div>
              <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-xs font-semibold">Active</span>
            </div>
            <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm">
              Sign Out All Other Sessions
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SecurityPage;
