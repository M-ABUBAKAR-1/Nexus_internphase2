import React, { useState } from 'react';
import { CreditCard, Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'funding';
  from: string;
  to: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

export const PaymentUI: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState(50000);
  const [showBalance, setShowBalance] = useState(true);
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'funding',
      from: 'John Investor',
      to: 'You',
      amount: 25000,
      status: 'completed',
      date: '2025-01-10T14:30:00Z',
      description: 'Series A Funding - Tech Startup Inc'
    },
    {
      id: '2',
      type: 'deposit',
      from: 'Bank Account',
      to: 'Wallet',
      amount: 10000,
      status: 'completed',
      date: '2025-01-09T10:15:00Z',
      description: 'Bank Deposit'
    },
    {
      id: '3',
      type: 'transfer',
      from: 'You',
      to: 'Sarah Chen',
      amount: 5000,
      status: 'completed',
      date: '2025-01-08T16:45:00Z',
      description: 'Co-founder Equity Distribution'
    },
    {
      id: '4',
      type: 'withdraw',
      from: 'Wallet',
      to: 'Bank Account',
      amount: 3000,
      status: 'pending',
      date: '2025-01-12T09:00:00Z',
      description: 'Withdraw to Bank'
    }
  ]);

  const handleTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    const transactionAmount = parseFloat(amount);
    if (transactionType === 'withdraw' && transactionAmount > walletBalance) return;

    const newTransaction: Transaction = {
      id: String(Date.now()),
      type: transactionType,
      from: transactionType === 'deposit' ? 'Bank Account' : 'You',
      to: transactionType === 'deposit' ? 'Wallet' : recipient || 'Bank Account',
      amount: transactionAmount,
      status: 'pending',
      date: new Date().toISOString(),
      description: `${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} - ${amount}`
    };

    setTransactions(prev => [newTransaction, ...prev]);

    if (transactionType === 'deposit') {
      setWalletBalance(prev => prev + transactionAmount);
    } else if (transactionType === 'withdraw') {
      setWalletBalance(prev => prev - transactionAmount);
    } else if (transactionType === 'transfer') {
      setWalletBalance(prev => prev - transactionAmount);
    }

    setAmount('');
    setRecipient('');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return <TrendingUp className="text-success-600" size={20} />;
      case 'deposit':
        return <ArrowDownLeft className="text-blue-600" size={20} />;
      case 'withdraw':
        return <ArrowUpRight className="text-orange-600" size={20} />;
      case 'transfer':
        return <ArrowUpRight className="text-purple-600" size={20} />;
      default:
        return <CreditCard size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success-600 bg-success-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Wallet Card */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg p-8 text-white shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold">Available Balance</h3>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <div className="mb-8">
            <p className="text-white text-opacity-80 text-sm mb-2">Total Balance</p>
            <h2 className="text-4xl font-bold">
              {showBalance ? `$${walletBalance.toLocaleString()}` : '••••••'}
            </h2>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white border-opacity-20">
            <Wallet size={24} />
            <div>
              <p className="text-sm text-white text-opacity-80">Nexus Wallet</p>
              <p className="font-semibold">****4823</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Monthly Incoming</p>
                <h3 className="text-2xl font-bold text-gray-900">$35,000</h3>
              </div>
              <ArrowDownLeft className="text-success-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Monthly Outgoing</p>
                <h3 className="text-2xl font-bold text-gray-900">$8,000</h3>
              </div>
              <ArrowUpRight className="text-orange-600" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Make a Transaction</h3>

        <div className="space-y-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Transaction Type</label>
            <div className="grid grid-cols-3 gap-3">
              {(['deposit', 'withdraw', 'transfer'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setTransactionType(type)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    transactionType === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Recipient (for transfer) */}
          {transactionType === 'transfer' && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Recipient</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient name or email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleTransaction}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full px-4 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Transaction History</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {transactions.map(transaction => (
            <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">
                      {transaction.from} → {transaction.to}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(transaction.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {transaction.type === 'deposit' || transaction.type === 'funding'
                      ? '+' : '-'}
                    ${transaction.amount.toLocaleString()}
                  </p>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentUI;
