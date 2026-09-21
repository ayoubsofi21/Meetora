import { useEffect, useState } from "react";
import { patientApi } from "../../api/patientApi";
import {  FileHeart,  HeartPulse,  AlertTriangle,  Stethoscope,  CalendarDays,  Loader2,  AlertCircle,  ClipboardList,  UserRound,  Activity,} from "lucide-react";

export default function MedicalRecords() {
  const [record, setRecord] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchMedicalData = async () => {
    try {
      setLoading(true);
      setError("");

      const [recordRes, historyRes] = await Promise.all([
        patientApi.getMedicalRecord(),
        patientApi.getMedicalHistory(),
      ]);
      console.log("MEDICAL RECORD RESPONSE:", recordRes.data);
      console.log("MEDICAL HISTORY RESPONSE:", historyRes.data);
      const recordData = recordRes.data?.data ?? recordRes.data ?? null;
      setRecord(recordData);
      const historyData = historyRes.data?.data ?? historyRes.data ?? [];
      if (Array.isArray(historyData)) {
        setHistory(historyData);
      } else if (Array.isArray(historyData?.data)) {
        setHistory(historyData.data);
      } else {
        setHistory([]);
      }

      console.log("RECORD DATA:", recordData);
      console.log("HISTORY DATA:", historyData);
    } catch (err) {
      console.error(
        "MEDICAL RECORD ERROR:",
        err.response?.status,
        err.response?.data,
      );

      setError(
        err.response?.data?.message || "Failed to load your medical records.",
      );
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMedicalData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3F38CA] animate-spin" />

        <p className="text-sm text-[#64748B] mt-3">
          Loading medical records...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Medical Records</h1>
      
      </div>
      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* =====================================================
          MEDICAL CONDITIONS
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#3F38CA] flex items-center justify-center">
            <FileHeart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">
              Medical Conditions & Allergies
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#D97706]" />
              </div>
              <h3 className="text-[1rem] font-semibold text-[#0F172A]">
                Known Allergies
              </h3>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed">
              {record?.allergies || "No known allergies reported."}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-[#3F38CA]" />
              </div>

              <h3 className="text-[1rem] font-semibold text-[#0F172A]">
                Chronic Conditions
              </h3>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed">
              {record?.chronic_conditions || "None listed."}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONSULTATION HISTORY
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#3F38CA] flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Consultation History
              </h2>
            </div>
          </div>
          {history.length > 0 && (
            <span className="px-3 py-1.5 rounded-lg bg-[#EEF2FF] text-[#3F38CA] text-xs font-semibold">
              {history.length}{" "}
              {history.length === 1 ? "Consultation" : "Consultations"}
            </span>
          )}
        </div>
        {history.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-[#CBD5E1] rounded-xl bg-[#F8FAFC]">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#3F38CA] flex items-center justify-center mx-auto mb-3">
              <ClipboardList className="w-6 h-6" />
            </div>

            <p className="text-sm font-semibold text-[#0F172A]">
              No consultation history
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((consultation) => {
              const doctorName =
                consultation.doctor?.name ||
                consultation.doctor?.user?.name ||
                consultation.doctor_name ||
                "Doctor";

              return (
                <div
                  key={consultation.id}
                  className="p-5 rounded-xl border border-[#E2E8F0] hover:border-[#C7D2FE] hover:bg-[#F8FAFC] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#3F38CA] flex items-center justify-center shrink-0">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0F172A]">
                          {consultation.diagnosis || "Medical Consultation"}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#64748B]">
                          <UserRound className="w-3.5 h-3.5" />
                          <span>Dr. {doctorName}</span>
                        </div>
                      </div>
                    </div>
                    {consultation.consultation_date && (
                      <div className="flex items-center gap-1.5 text-xs text-[#64748B] bg-[#F1F5F9] px-3 py-1.5 rounded-lg shrink-0">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {consultation.consultation_date}
                      </div>
                    )}
                  </div>
                  {consultation.symptoms && (
                    <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                      <p className="text-xs font-semibold uppercase text-[#64748B] mb-1">
                        Symptoms
                      </p>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        {consultation.symptoms}
                      </p>
                    </div>
                  )}
                  {consultation.notes && (
                    <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                      <p className="text-xs font-semibold uppercase text-[#64748B] mb-1">
                        Clinical Notes
                      </p>

                      <p className="text-sm text-[#475569] leading-relaxed">
                        {consultation.notes}
                      </p>
                    </div>
                  )}
                  {consultation.treatment && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase text-[#64748B] mb-1">
                        Treatment
                      </p>
                      <p className="text-sm text-[#475569] leading-relaxed">
                        {consultation.treatment}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
