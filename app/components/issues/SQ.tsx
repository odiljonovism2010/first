import { ShieldCheck, Lock, Key, CheckCircle2, ExternalLink } from 'lucide-react';

export default function SecurityFooterLightComponent() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-white p-6 font-sans">
      <div className="w-[90%] h-[90%] bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm text-gray-900">
        
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            <span className="font-semibold text-lg text-gray-900">Project Security & Compliance Center</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Automated Vulnerability Scanning</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-normal">
                    Routine checks identify and report dependencies with known security risks.
                  </p>
                  <div className="mt-3 text-xs text-gray-700 flex items-center space-x-1.5">
                    <span className="font-medium">Status:</span>
                    <span className="text-gray-900 font-medium">Active & Monitored.</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  </div>
                </div>
                <div className="p-2 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Data Encryption Protocols</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-normal">
                    All sensitive project data is encrypted at rest and in transit using industry-standard AES-256 and TLS protocols.
                  </p>
                </div>
                <div className="p-2 text-blue-600">
                  <Lock className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Access Control Management</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-normal">
                    Role-Based Access Control (RBAC) is enforced, restricting repository access to authorized personnel only.
                  </p>
                  <div className="mt-3 text-xs text-blue-600 flex items-center space-x-1">
                    <Key className="w-4 h-4" />
                    <span>key</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Compliance Standards Adherence</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-normal">
                    The project aligns with GDPR and other relevant data protection regulations. Regular compliance audits are conducted.
                  </p>
                  <div className="mt-3 text-xs text-blue-600 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>checklist</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
          <p className="leading-relaxed">
            For full details on our data handling and user obligations, please review our{' '}
            <a 
              href="#privacy" 
              className="text-blue-600 hover:underline font-medium inline-flex items-center space-x-0.5"
            >
              <span>Privacy and Rules</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>{' '}
            documentation.
          </p>
        </div>

      </div>
    </div>
  );
}