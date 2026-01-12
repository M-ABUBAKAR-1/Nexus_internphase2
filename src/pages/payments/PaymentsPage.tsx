import React from 'react';
import { PaymentUI } from '../../components/payments/PaymentUI';

export const PaymentsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Payments & Wallet</h1>
        <p className="text-gray-600">Manage your funding deals and payment transactions</p>
      </div>

      <PaymentUI />
    </div>
  );
};

export default PaymentsPage;
