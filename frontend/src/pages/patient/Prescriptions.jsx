import React, { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import { Pill, RotateCcw, Loader2, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reissuingId, setReissuingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await patientApi.getPrescriptions();
      setPrescriptions(response.data.data || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load prescriptions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleReissue = async (id) => {
    try {
      setReissuingId(id);
      setError('');
      await patientApi.reissuePrescription(id);
      setSuccessMsg('Reissue request submitted successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchPrescriptions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request prescription reissue.');
    } finally {
      setReissuingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">My Prescriptions</h1>
        <p className="text-sm text-[#475569]">View and request reissues for active medications</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center gap-2 text-[#166534] text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
        </div>
      ) : prescriptions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center shadow-sm">
          <Pill className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
          <p className="text-sm text-[#94A3B8]">No active prescriptions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prescriptions.map((script) => (
            <div
              key={script.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-base">
                        {script.medication_name || script.title || `Prescription #${script.id}`}
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        Prescribed by {script.doctor?.name || script.doctor_name || 'Practitioner'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569]">
                    {script.created_at || script.date || 'Recent'}
                  </span>
                </div>

                <div className="bg-[#F8FAFC] p-3 rounded-xl text-xs space-y-1 text-[#475569]">
                  <p>
                    <strong className="text-[#0F172A]">Dosage:</strong> {script.dosage || 'As directed'}
                  </p>
                  <p>
                    <strong className="text-[#0F172A]">Instructions:</strong> {script.instructions || 'Follow doctor advice'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex justify-end">
                <button
                  onClick={() => handleReissue(script.id)}
                  disabled={reissuingId === script.id}
                  className="h-9 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-xs transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {reissuingId === script.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RotateCcw className="w-3.5 h-3.5" />
                  )}
                  <span>Request Reissue</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}