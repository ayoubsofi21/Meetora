import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorApi } from '../../api/doctorApi';
import { User, Activity, FileText, Pill, Save, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await doctorApi.getAppointments({ patient_id: id });
        const data = response.data.data || response.data || {};
        setPatient(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load patient profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleSaveConsultation = async (e) => {
    e.preventDefault();
    if (!diagnosis) {
      setError('Diagnosis is required to submit a consultation record.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await doctorApi.completeAppointment(id, {
        patient_id: id,
        diagnosis,
        notes,
        prescription: medicationName
          ? {
              medication_name: medicationName,
              dosage,
              instructions,
            }
          : null,
      });

      setSuccessMsg('Consultation and prescription recorded successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/doctor');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save consultation details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/doctor')}
          className="p-2 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl text-[#0F172A] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Patient Consultation File</h1>
          <p className="text-sm text-[#475569]">ID: #{id} — Record clinical notes and prescribe treatment</p>
        </div>
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Overview Sidebar */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4 h-fit">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-[#DBEAFE] text-[#2563EB] font-bold flex items-center justify-center text-lg shrink-0">
                {patient?.name?.charAt(0) || 'P'}
              </div>
              <div>
                <h2 className="font-bold text-[#0F172A] text-lg">{patient?.name || `Patient #${id}`}</h2>
                <p className="text-xs text-[#64748B]">{patient?.email || 'Registered Patient'}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#475569]">
              <p>
                <strong className="text-[#0F172A]">Known Allergies:</strong>{' '}
                <span className="text-[#DC2626] font-medium">{patient?.allergies || 'None recorded'}</span>
              </p>
              <p>
                <strong className="text-[#0F172A]">Chronic Conditions:</strong> {patient?.chronic_conditions || 'None'}
              </p>
            </div>
          </div>

          {/* Clinical Record & Prescription Form */}
          <form onSubmit={handleSaveConsultation} className="lg:col-span-2 space-y-6">
            {/* Consultation Notes */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#2563EB]" />
                Diagnosis & Clinical Findings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                    Primary Diagnosis *
                  </label>
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="e.g., Acute Upper Respiratory Tract Infection"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                    Clinical Notes & Advice
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Document examination observations, patient symptoms, and follow-up plan..."
                    className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Prescription Attachment */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Pill className="w-5 h-5 text-[#2563EB]" />
                Prescribe Medication (Optional)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    placeholder="e.g., Amoxicillin 500mg"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g., 1 tablet 3x daily after meals"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                    Usage Instructions
                  </label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g., Take for 7 days continuously. Drink plenty of water."
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/doctor')}
                className="h-11 px-5 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Complete Consultation</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}