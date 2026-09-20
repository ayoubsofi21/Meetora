import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { doctorApi } from "../../api/doctorApi";
import {
  Activity,
  Pill,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  User,
  ShieldAlert,
  HeartPulse,
} from "lucide-react";

export default function PatientDetail() {
  const { id: patientId } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointment_id");

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================
  // Fetch patient
  // =========================
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await doctorApi.getPatientDetail(patientId);

        console.log("PATIENT RESPONSE:", response.data);

        const data = response.data.data ?? response.data ?? {};

        setPatient(data);
      } catch (err) {
        console.error("PATIENT FETCH ERROR:", err.response?.data || err);

        setError(
          err.response?.data?.message || "Failed to load patient profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);
const handleSaveConsultation = async (e) => {
    e.preventDefault();

    if (!diagnosis.trim()) {
      setError('Diagnosis is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      setSuccessMsg('');

      // 1. Create consultation
      const response = await doctorApi.createConsultation(
        appointmentId,
        {
          diagnosis: diagnosis.trim(),
          notes: notes.trim() || null,
        }
      );

      const consultation =
        response.data?.data ?? response.data;

      const consultationId = consultation?.id;

      // 2. Create prescription if medication exists
      if (medicationName.trim()) {
        await doctorApi.createPrescription(
          consultationId,
          {
            medications: [
              {
                medication_name: medicationName.trim(),
                dosage: dosage.trim() || null,
                instructions: instructions.trim() || null,
              },
            ],
          }
        );
      }

      // ConsultationService already marks appointment as completed
      setSuccessMsg(
        'Consultation completed successfully!'
      );

      setTimeout(() => {
        navigate('/doctor');
      }, 1500);

    } catch (err) {
      console.error(err.response?.data || err);

      setError(
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})
          .flat()
          .join(' ') ||
        'Failed to save consultation.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/doctor")}
          className="w-11 h-11 shrink-0
            flex items-center justify-center
            bg-white border border-[#E2E8F0]
            hover:bg-[#F8FAFC]
            hover:text-[#3F38CA]
            rounded-xl text-[#475569]
            transition-all"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">
            Patient Consultation File
          </h1>

          <p className="text-sm text-[#64748B] mt-1">
            Patient #{patientId} — Record clinical findings and prescribe
            treatment
          </p>
        </div>
      </div>
      {error && (
        <div
          className="p-4 rounded-xl
            bg-[#FEE2E2]
            border border-[#FCA5A5]
            flex items-center gap-3
            text-[#DC2626] text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* =========================
          Success
      ========================== */}
      {successMsg && (
        <div
          className="p-4 rounded-xl
            bg-[#D1FAE5]
            border border-[#A7F3D0]
            flex items-center gap-3
            text-[#059669] text-sm"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />

          <span>{successMsg}</span>
        </div>
      )}

      {/* =========================
          Loading
      ========================== */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-9 h-9 text-[#3F38CA] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* =========================
              Patient Overview
          ========================== */}
          <div
            className="bg-white rounded-2xl
              border border-[#E2E8F0]
              p-6 shadow-sm h-fit"
          >
            {/* Patient */}
            <div
              className="flex items-center gap-4
                pb-5 border-b border-[#E2E8F0]"
            >
              <div
                className="w-14 h-14 rounded-full
                  bg-[#EEF2FF]
                  text-[#3F38CA]
                  font-bold text-lg
                  flex items-center justify-center
                  shrink-0"
              >
                {patient?.name?.charAt(0)?.toUpperCase() || "P"}
              </div>

              <div className="min-w-0">
                <h2
                  className="font-bold
                    text-[#0F172A]
                    text-lg truncate"
                >
                  {patient?.name || `Patient #${patientId}`}
                </h2>

                <p
                  className="text-sm
                    text-[#64748B]
                    mt-1 truncate"
                >
                  {patient?.email || "Registered Patient"}
                </p>
              </div>
            </div>

            {/* Information */}
            <div className="space-y-5 mt-5">
              {/* Patient ID */}
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg
                    bg-[#EEF2FF]
                    flex items-center
                    justify-center shrink-0"
                >
                  <User className="w-5 h-5 text-[#3F38CA]" />
                </div>

                <div>
                  <p className="text-xs text-[#94A3B8]">Patient ID</p>

                  <p className="text-sm font-semibold text-[#0F172A] mt-0.5">
                    #{patientId}
                  </p>
                </div>
              </div>

              {/* Allergies */}
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg
                    bg-[#FEE2E2]
                    flex items-center
                    justify-center shrink-0"
                >
                  <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
                </div>

                <div>
                  <p className="text-xs text-[#94A3B8]">Known Allergies</p>

                  <p className="text-sm font-semibold text-[#DC2626] mt-0.5">
                    {patient?.allergies || "None recorded"}
                  </p>
                </div>
              </div>

              {/* Chronic Conditions */}
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg
                    bg-[#FEF3C7]
                    flex items-center
                    justify-center shrink-0"
                >
                  <HeartPulse className="w-5 h-5 text-[#D97706]" />
                </div>

                <div>
                  <p className="text-xs text-[#94A3B8]">Chronic Conditions</p>

                  <p className="text-sm font-semibold text-[#0F172A] mt-0.5">
                    {patient?.chronic_conditions || "None recorded"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              Consultation Form
          ========================== */}
          <form
            onSubmit={handleSaveConsultation}
            className="lg:col-span-2 space-y-6"
          >
            {/* =========================
                Diagnosis
            ========================== */}
            <div
              className="bg-white rounded-2xl
                border border-[#E2E8F0]
                p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl
                    bg-[#EEF2FF]
                    flex items-center
                    justify-center"
                >
                  <Activity className="w-5 h-5 text-[#3F38CA]" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    Diagnosis & Clinical Findings
                  </h2>

                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Record diagnosis and clinical observations
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Diagnosis */}
                <div>
                  <label className="block text-sm font-semibold text-[#475569] mb-2">
                    Primary Diagnosis *
                  </label>

                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="e.g. Acute Upper Respiratory Tract Infection"
                    className="w-full h-12 px-4
                      bg-[#F8FAFC]
                      border border-[#E2E8F0]
                      rounded-xl text-sm text-[#0F172A]
                      placeholder:text-[#94A3B8]
                      focus:outline-none
                      focus:border-[#3F38CA]
                      focus:ring-2
                      focus:ring-[#3F38CA]/10
                      transition-all"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-[#475569] mb-2">
                    Clinical Notes & Advice
                  </label>

                  <textarea
                    rows={5}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Document examination observations, patient symptoms, and follow-up plan..."
                    className="w-full px-4 py-3
                      bg-[#F8FAFC]
                      border border-[#E2E8F0]
                      rounded-xl text-sm text-[#0F172A]
                      placeholder:text-[#94A3B8]
                      focus:outline-none
                      focus:border-[#3F38CA]
                      focus:ring-2
                      focus:ring-[#3F38CA]/10
                      transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* =========================
                Prescription
            ========================== */}
            <div
              className="bg-white rounded-2xl
                border border-[#E2E8F0]
                p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl
                    bg-[#EEF2FF]
                    flex items-center
                    justify-center"
                >
                  <Pill className="w-5 h-5 text-[#3F38CA]" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    Prescribe Medication
                  </h2>

                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Optional prescription for this consultation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Medication */}
                <div>
                  <label className="block text-sm font-semibold text-[#475569] mb-2">
                    Medication Name
                  </label>

                  <input
                    type="text"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    placeholder="e.g. Amoxicillin 500mg"
                    className="w-full h-12 px-4
                      bg-[#F8FAFC]
                      border border-[#E2E8F0]
                      rounded-xl text-sm text-[#0F172A]
                      placeholder:text-[#94A3B8]
                      focus:outline-none
                      focus:border-[#3F38CA]
                      focus:ring-2
                      focus:ring-[#3F38CA]/10
                      transition-all"
                  />
                </div>

                {/* Dosage */}
                <div>
                  <label className="block text-sm font-semibold text-[#475569] mb-2">
                    Dosage
                  </label>

                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 1 tablet 3x daily after meals"
                    className="w-full h-12 px-4
                      bg-[#F8FAFC]
                      border border-[#E2E8F0]
                      rounded-xl text-sm text-[#0F172A]
                      placeholder:text-[#94A3B8]
                      focus:outline-none
                      focus:border-[#3F38CA]
                      focus:ring-2
                      focus:ring-[#3F38CA]/10
                      transition-all"
                  />
                </div>

                {/* Instructions */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#475569] mb-2">
                    Usage Instructions
                  </label>

                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="e.g. Take for 7 days continuously. Drink plenty of water."
                    className="w-full h-12 px-4
                      bg-[#F8FAFC]
                      border border-[#E2E8F0]
                      rounded-xl text-sm text-[#0F172A]
                      placeholder:text-[#94A3B8]
                      focus:outline-none
                      focus:border-[#3F38CA]
                      focus:ring-2
                      focus:ring-[#3F38CA]/10
                      transition-all"
                  />
                </div>
              </div>
            </div>

            {/* =========================
                Actions
            ========================== */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/doctor")}
                className="h-12 px-6
                  border border-[#E2E8F0]
                  hover:bg-[#F8FAFC]
                  text-[#0F172A]
                  font-semibold rounded-xl
                  text-sm transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-6
                  bg-[#3F38CA]
                  hover:bg-[#312E81]
                  text-white font-semibold
                  rounded-xl text-sm
                  transition-all
                  flex items-center
                  justify-center gap-2.5
                  disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}

                <span>Complete Consultation</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
