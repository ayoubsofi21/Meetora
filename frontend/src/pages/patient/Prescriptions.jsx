import React, { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import {  Pill,  Loader2,  AlertCircle,  FileText,  CheckCircle2,  CalendarDays,} from "lucide-react";
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
 const handleDownload = async (id) => {
  try {
    setError('');

    const response = await patientApi.downloadPrescription(id);

    const blob = new Blob([response.data], {
      type: 'application/pdf',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `prescription-${id}.pdf`);

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('DOWNLOAD ERROR:', err);
    console.error('STATUS:', err.response?.status);
    console.error('DATA:', err.response?.data);

    setError(
      `Failed to download prescription. ${
        err.response?.status ? `Error ${err.response.status}` : ''
      }`
    );
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">My Prescriptions</h1>
        <p className="text-sm text-[#475569]">View your active medications</p>
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
        <div className="space-y-4">
          {prescriptions.map((script) => (
            <div
              key={script.id}
              className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#3F38CA] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">
                      Prescription
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Dr. {script.doctor?.name || "Practitioner"}
                      {script.doctor?.specialty && (
                        <> · {script.doctor.specialty}</>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <CalendarDays className="w-3.5 h-3.5" />

                  {script.prescribed_at
                    ? new Date(script.prescribed_at).toLocaleDateString()
                    : "Recent"}
                </div>
              </div>
              <div className="px-5 py-4">
                {script.items?.length > 0 ? (
                  <div className="divide-y divide-[#E2E8F0]">
                    {script.items.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="w-4 h-4 text-[#3F38CA]" />

                          <h4 className="text-sm font-semibold text-[#0F172A]">
                            {item.medication_name}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#64748B]">
                          <span>
                            <strong className="text-[#334155]">Dosage:</strong>{" "}
                            {item.dosage || "—"}
                          </span>
                          <span>
                            <strong className="text-[#334155]">Frequency:</strong>{" "}
                            {item.frequency || "—"}
                          </span>
                          <span>
                            <strong className="text-[#334155]">Duration:</strong>{" "}
                            {item.duration || "—"}
                          </span>
                        </div>
                        {item.instructions && (
                          <p className="mt-3 text-sm text-[#475569]">
                            {item.instructions}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#94A3B8]">
                    No medication information available.
                  </p>
                )}
                {script.notes && (
                  <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                    <p className="text-xs font-semibold text-[#64748B] mb-1">
                      Doctor notes
                    </p>

                    <p className="text-sm text-[#475569]">
                      {script.notes}
                    </p>
                  </div>
                )}
              </div>
              <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex justify-end">
                <button
                  onClick={() => handleDownload(script.id)}
                  className="
                    h-9 px-4
                    bg-[#3F38CA]
                    hover:bg-[#3730A3]
                    text-white
                    rounded-lg
                    text-xs font-semibold
                    flex items-center gap-2
                    transition-colors
                  "
                >
                  <FileText className="w-3.5 h-3.5" />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}