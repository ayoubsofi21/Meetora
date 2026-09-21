import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";
import { Users, Loader2, AlertCircle, Mail, Trash2 } from "lucide-react";

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminApi.getPatients();

      console.log("PATIENTS:", response.data);

      setPatients(response.data.data || response.data || []);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to load patients.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this patient?'
    );
    if (!confirmed) return;
    try {
      setError('');
      await adminApi.deletePatient(id);
      setPatients((prev) =>
        prev.filter((patient) => patient.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        'Failed to delete patient.'
      );
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Patients</h1>

        <p className="text-sm text-[#475569] mt-1">
          View and manage registered patients
        </p>
      </div>
      {error && (
        <div
          className="
          p-3 rounded-xl
          bg-[#FEE2E2]
          border border-[#FCA5A5]
          flex items-center gap-2
          text-[#DC2626] text-sm
        "
        >
          <AlertCircle className="w-5 h-5" />

          {error}
        </div>
      )}
      <div
        className="
        bg-white
        rounded-2xl
        border border-[#E2E8F0]
        p-6
        shadow-sm
      "
      >
        <div className="flex items-center gap-2 mb-5">
          <Users className="w-5 h-5 text-[#3F38CA]" />

          <h2 className="text-lg font-bold text-[#0F172A]">
            Registered Patients
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2
              className="
              w-8 h-8
              text-[#3F38CA]
              animate-spin
            "
            />
          </div>
        ) : patients.length === 0 ? (
          <p
            className="
            text-center
            text-sm text-[#94A3B8]
            py-10
          "
          >
            No patients found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr
                  className="
                  border-b border-[#E2E8F0]
                  text-xs uppercase
                  text-[#64748B]
                "
                >
                  <th className="pb-3">Patient</th>

                  <th className="pb-3">Email</th>

                  <th className="pb-3">Patient ID</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2E8F0]">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-[#F8FAFC]">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                          w-10 h-10
                          rounded-full
                          bg-[#EEF2FF]
                          text-[#3F38CA]
                          font-bold
                          flex items-center justify-center
                        "
                        >
                          {patient.name?.charAt(0)?.toUpperCase() || "P"}
                        </div>

                        <div>
                          <p
                            className="
                            font-semibold
                            text-[#0F172A]
                          "
                          >
                            {patient.name}
                          </p>

                          <p
                            className="
                            text-xs
                            text-[#94A3B8]
                          "
                          >
                            Patient
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 text-[#475569]">
                      <div className="flex items-center gap-2">
                        <Mail
                          className="
                          w-4 h-4
                          text-[#94A3B8]
                        "
                        />

                        {patient.email}
                      </div>
                    </td>

                    <td
                      className="
                      py-4
                      text-[#475569]
                      font-medium
                    "
                    >
                      {patient.id}
                    </td>
                    <td className="py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(patient.id)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#DC2626] hover:bg-[#FEE2E2] hover:text-[#B91C1C] transition-all "
                          title="Delete patient"
                          aria-label={`Delete ${patient.name}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
