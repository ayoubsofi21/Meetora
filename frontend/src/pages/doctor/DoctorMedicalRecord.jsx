import { useEffect, useState } from 'react';
import { doctorApi } from '../../api/doctorApi';
import {  FileHeart,  Save,  Loader2,  AlertCircle,  CheckCircle2,  User,  Droplets,  AlertTriangle,  HeartPulse,  ClipboardList,} from 'lucide-react';
export default function DoctorMedicalRecords() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const [formData, setFormData] = useState({
    blood_type: '',
    allergies: '',
    chronic_conditions: '',
    medical_history: '',
  });

  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingRecord, setLoadingRecord] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get doctor's patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoadingPatients(true);
        setError('');

        const response = await doctorApi.getPatients();

        const data =
          response.data?.data ??
          response.data ??
          [];

        setPatients(
          Array.isArray(data)
            ? data
            : data.data || []
        );
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
          'Failed to load patients.'
        );
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  // Get selected patient's medical record
  useEffect(() => {
    if (!selectedPatientId) {
      setFormData({
        blood_type: '',
        allergies: '',
        chronic_conditions: '',
        medical_history: '',
      });

      return;
    }

    const fetchRecord = async () => {
      try {
        setLoadingRecord(true);
        setError('');
        setSuccess('');

        const response =
          await doctorApi.getPatientMedicalRecord(
            selectedPatientId
          );

        const record =
          response.data?.data ??
          response.data ??
          {};

        setFormData({
          blood_type: record.blood_type || '',
          allergies: record.allergies || '',
          chronic_conditions:
            record.chronic_conditions || '',
          medical_history:
            record.medical_history || '',
        });
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
          'Failed to load medical record.'
        );
      } finally {
        setLoadingRecord(false);
      }
    };

    fetchRecord();
  }, [selectedPatientId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatientId) {
      setError('Please select a patient first.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await doctorApi.updatePatientMedicalRecord(
        selectedPatientId,
        formData
      );

      setSuccess(
        'Medical record updated successfully.'
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        'Failed to update medical record.'
      );
    } finally {
      setSaving(false);
    }
  };

  const selectedPatient = patients.find(
    (patient) =>
      String(patient.id) === String(selectedPatientId)
  );

  return (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
        Patient Medical Records
      </h1>
      <p className="mt-1 text-sm text-[#64748B]">
        Review and update health information for your patients.
      </p>
    </div>
    {error && (
      <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <span>{error}</span>
      </div>
    )}

    {success && (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <span>{success}</span>
      </div>
    )}

    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#3F38CA]">
            <User className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#0F172A]">
              Select Patient
            </h2>
          </div>
        </div>

        <div className="w-full md:w-[320px]">
          {loadingPatients ? (
            <div className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F8FAFC] text-sm text-[#64748B]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading patients...
            </div>
          ) : (
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="
                h-11 w-full rounded-xl
                border border-[#E2E8F0]
                bg-[#F8FAFC]
                px-4 text-sm text-[#0F172A]
                outline-none transition
                focus:border-[#3F38CA]
                focus:ring-2 focus:ring-[#3F38CA]/10
              "
            >
              <option value="">Select a patient...</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name ||
                    patient.user?.name ||
                    `Patient #${patient.id}`}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
    {!selectedPatientId && (
      <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white px-6 py-14 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#3F38CA]">
          <FileHeart className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-[#0F172A]">
          No patient selected
        </h3>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#64748B]">
          Select a patient above to review allergies, chronic conditions,
          blood type and medical history.
        </p>
      </div>
    )}
    {selectedPatientId && (
      <form onSubmit={handleSubmit}>
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#3F38CA]">
                <FileHeart className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-semibold text-[#0F172A]">
                  Medical Information
                </h2>
                <p className="mt-0.5 text-xs text-[#64748B]">
                  {selectedPatient?.name ||
                    selectedPatient?.user?.name ||
                    `Patient #${selectedPatientId}`}
                </p>
              </div>
            </div>
          </div>
          {loadingRecord ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#3F38CA]" />
                <p className="mt-3 text-xs text-[#64748B]">
                  Loading medical record...
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[1rem] font-semibold text-[#0F172A]">
                    <Droplets className="h-5 w-5 text-red-500" />
                    Blood Type
                  </label>
                  <select
                    name="blood_type"
                    value={formData.blood_type}
                    onChange={handleChange}
                    className="
                      h-11 w-full rounded-xl
                      border border-[#E2E8F0]
                      bg-[#F8FAFC]
                      px-4 text-sm
                      outline-none transition
                      focus:border-[#3F38CA]
                      focus:ring-2 focus:ring-[#3F38CA]/10
                    "
                  >
                    <option value="">Not specified</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[1rem] font-semibold text-[#0F172A]">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Known Allergies
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g. Penicillin, peanuts..."
                    className="
                      w-full resize-none rounded-xl
                      border border-[#E2E8F0]
                      bg-[#F8FAFC]
                      p-3 text-sm
                      outline-none transition
                      placeholder:text-[#94A3B8]
                      focus:border-[#3F38CA]
                      focus:ring-2 focus:ring-[#3F38CA]/10
                    "
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[1rem] font-semibold text-[#0F172A]">
                    <HeartPulse className="h-5 w-5 text-[#3F38CA]" />
                    Chronic Conditions
                  </label>
                  <textarea
                    name="chronic_conditions"
                    value={formData.chronic_conditions}
                    onChange={handleChange}
                    rows={4}
                    placeholder="e.g. Diabetes, asthma..."
                    className="
                      w-full resize-none rounded-xl
                      border border-[#E2E8F0]
                      bg-[#F8FAFC]
                      p-3 text-sm
                      outline-none transition
                      placeholder:text-[#94A3B8]
                      focus:border-[#3F38CA]
                      focus:ring-2 focus:ring-[#3F38CA]/10
                    "
                  />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-[1rem] font-semibold text-[#0F172A]">
                    <ClipboardList className="h-5 w-5 text-[#3F38CA]" />
                    Medical History
                  </label>
                  <textarea
                    name="medical_history"
                    value={formData.medical_history}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Previous diseases, surgeries or medical events..."
                    className="
                      w-full resize-none rounded-xl
                      border border-[#E2E8F0]
                      bg-[#F8FAFC]
                      p-3 text-sm
                      outline-none transition
                      placeholder:text-[#94A3B8]
                      focus:border-[#3F38CA]
                      focus:ring-2 focus:ring-[#3F38CA]/10
                    "
                  />
                </div>
              </div>
            </div>
          )}
          {!loadingRecord && (
            <div className="flex items-center justify-end border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
              <button
                type="submit"
                disabled={saving}
                className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-xl bg-[#3F38CA]
                  px-6 text-sm font-semibold text-white
                  shadow-sm transition
                  hover:bg-[#3730A3]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </form>
    )}
  </div>
);
}