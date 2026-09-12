import React, { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import { FileText, Calendar, Activity, Loader2, AlertCircle, ShieldAlert } from 'lucide-react';

export default function MedicalRecords() {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await patientApi.getMedicalRecord();
        setRecord(response.data.data || response.data || {});
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load medical record.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Medical Records</h1>
        <p className="text-sm text-[#475569]">Personal health history and medical document logs</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Allergies and Chronic Conditions Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
              Medical Conditions & Allergies
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase text-[#64748B] mb-1">Known Allergies</p>
                <div className="p-3 bg-[#FEF2F2] rounded-xl text-xs text-[#991B1B]">
                  {record?.allergies || 'No known allergies reported.'}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-[#64748B] mb-1">Chronic Conditions</p>
                <div className="p-3 bg-[#F8FAFC] rounded-xl text-xs text-[#475569]">
                  {record?.chronic_conditions || 'None listed.'}
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Timeline Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#2563EB]" />
              Consultation History
            </h2>

            {(!record?.history || record.history.length === 0) ? (
              <p className="text-sm text-[#94A3B8] py-8 text-center">No past consultation histories recorded.</p>
            ) : (
              <div className="space-y-3">
                {record.history.map((entry, idx) => (
                  <div key={idx} className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-[#0F172A]">{entry.diagnosis || 'General Consultation'}</p>
                      <span className="text-xs text-[#64748B] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {entry.date}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569]">{entry.notes || 'No notes attached.'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}