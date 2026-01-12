import React, { useRef } from 'react';
import { Upload, Download, Trash2, Eye, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'contract';
  status: 'draft' | 'in-review' | 'signed';
  uploadedAt: string;
  signedAt?: string;
  fileSize: string;
}

export const DocumentChamber: React.FC = () => {
  const [documents, setDocuments] = React.useState<Document[]>([
    {
      id: '1',
      name: 'Investment Agreement - Series A',
      type: 'contract',
      status: 'signed',
      uploadedAt: '2025-01-10T10:30:00Z',
      signedAt: '2025-01-11T14:20:00Z',
      fileSize: '2.4 MB'
    },
    {
      id: '2',
      name: 'Pitch Deck - Q1 2025',
      type: 'pdf',
      status: 'in-review',
      uploadedAt: '2025-01-12T08:15:00Z',
      fileSize: '5.1 MB'
    },
    {
      id: '3',
      name: 'Financial Projections',
      type: 'doc',
      status: 'draft',
      uploadedAt: '2025-01-11T16:45:00Z',
      fileSize: '1.8 MB'
    }
  ]);

  const [selectedDoc, setSelectedDoc] = React.useState<Document | null>(null);
  const [signature, setSignature] = React.useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const newDoc: Document = {
        id: String(Date.now()),
        name: file.name,
        type: file.name.endsWith('.pdf') ? 'pdf' : 'doc',
        status: 'draft',
        uploadedAt: new Date().toISOString(),
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      };
      setDocuments(prev => [...prev, newDoc]);
    }
  };

  const updateDocStatus = (docId: string, newStatus: 'draft' | 'in-review' | 'signed') => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId
          ? {
              ...doc,
              status: newStatus,
              signedAt: newStatus === 'signed' ? new Date().toISOString() : doc.signedAt
            }
          : doc
      )
    );
    if (selectedDoc?.id === docId) {
      setSelectedDoc({
        ...selectedDoc,
        status: newStatus,
        signedAt: newStatus === 'signed' ? new Date().toISOString() : selectedDoc.signedAt
      });
    }
  };

  const deleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    setSelectedDoc(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return 'text-success-600 bg-success-50';
      case 'in-review':
        return 'text-amber-600 bg-amber-50';
      case 'draft':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed':
        return <CheckCircle size={16} />;
      case 'in-review':
        return <AlertCircle size={16} />;
      case 'draft':
        return <FileText size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Document List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Documents & Contracts</h3>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            <Upload size={18} />
            Upload Document
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
        </div>

        {/* Document Cards */}
        <div className="space-y-3">
          {documents.map(doc => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedDoc?.id === doc.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={20} className="text-gray-500" />
                    <p className="font-medium text-gray-900">{doc.name}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                  </div>
                  <div className={`w-fit px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(doc.status)}`}>
                    {getStatusIcon(doc.status)}
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1).replace('-', ' ')}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDocument(doc.id);
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Upload size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium">No documents uploaded yet</p>
            <p className="text-gray-500 text-sm">Click "Upload Document" to add contracts and agreements</p>
          </div>
        )}
      </div>

      {/* Document Preview & Signature */}
      <div className="space-y-4">
        {selectedDoc ? (
          <>
            {/* Preview Section */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Document Preview</h4>
              <div className="bg-white border border-gray-300 rounded p-4 mb-4 h-48 overflow-auto flex items-center justify-center">
                <div className="text-center">
                  <FileText size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">{selectedDoc.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{selectedDoc.fileSize}</p>
                </div>
              </div>

              {selectedDoc.status !== 'signed' && (
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium mb-3">
                  <Eye size={18} />
                  View Full Document
                </button>
              )}
            </div>

            {/* E-Signature Section */}
            {selectedDoc.status === 'in-review' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Sign Document</h4>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 mb-3 h-24 bg-white flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                  {signature ? (
                    <p className="text-blue-600 font-script text-2xl">{signature}</p>
                  ) : (
                    <p className="text-gray-500 text-sm text-center">Draw or type your signature here</p>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Type your signature"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (signature) {
                      updateDocStatus(selectedDoc.id, 'signed');
                      setSignature('');
                    }
                  }}
                  disabled={!signature}
                  className="w-full px-3 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <CheckCircle className="inline mr-2" size={16} />
                  Sign Document
                </button>
              </div>
            )}

            {/* Status Actions */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Status</h4>
              <div className="space-y-2">
                <button
                  onClick={() => updateDocStatus(selectedDoc.id, 'draft')}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDoc.status === 'draft'
                      ? 'bg-gray-300 text-gray-900'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Draft
                </button>
                <button
                  onClick={() => updateDocStatus(selectedDoc.id, 'in-review')}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDoc.status === 'in-review'
                      ? 'bg-amber-300 text-amber-900'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  }`}
                >
                  In Review
                </button>
                <button
                  onClick={() => updateDocStatus(selectedDoc.id, 'signed')}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDoc.status === 'signed'
                      ? 'bg-success-300 text-success-900'
                      : 'bg-success-100 text-success-700 hover:bg-success-200'
                  }`}
                >
                  Signed
                </button>
              </div>
            </div>

            {selectedDoc.signedAt && (
              <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                <p className="text-sm text-success-900">
                  <strong>Signed on:</strong> {new Date(selectedDoc.signedAt).toLocaleString()}
                </p>
              </div>
            )}

            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium">
              <Download size={18} />
              Download Document
            </button>
          </>
        ) : (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <FileText size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">Select a document to view details and sign</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentChamber;
