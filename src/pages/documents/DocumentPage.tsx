import React from 'react';
import { DocumentChamber } from '../../components/documents/DocumentChamber';

export const DocumentsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Document Chamber</h1>
        <p className="text-gray-600">Upload, manage, and sign contracts and agreements securely</p>
      </div>

      <DocumentChamber />
    </div>
  );
};

export default DocumentsPage;
