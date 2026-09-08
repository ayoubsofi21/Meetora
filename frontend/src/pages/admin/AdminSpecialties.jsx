import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { Stethoscope, Plus, Loader2, AlertCircle, Trash2, Edit2 } from 'lucide-react';

export default function AdminSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch list of specialties
  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getSpecialties();
      setSpecialties(response.data.data || response.data);
      console.log('Fetched specialties:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load specialties.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    setIsSubmitting(true);
    try {
      await adminApi.createSpecialty({ name, description });
      setName('');
      setDescription('');
      fetchSpecialties(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating specialty.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this specialty?')) return;
    try {
      await adminApi.deleteSpecialty(id);
      setSpecialties((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting specialty.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Medical Specialties</h1>
        <p className="text-sm text-[#475569]">Manage clinic medical fields and categories</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Add Specialty</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                Specialty Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cardiology"
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description..."
                rows={3}
                className="w-full p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Add Specialty</span>
            </button>
          </form>
        </div>

        {/* List Table Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Existing Specialties</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
            </div>
          ) : specialties.length === 0 ? (
            <p className="text-sm text-[#94A3B8] text-center py-8">No specialties found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase text-xs">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Description</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {specialties.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F8FAFC]">
                      <td className="py-3.5 font-semibold text-[#0F172A] flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-[#2563EB]" />
                        {item.name}
                      </td>
                      <td className="py-3.5 text-[#475569]">{item.description || '—'}</td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );
}