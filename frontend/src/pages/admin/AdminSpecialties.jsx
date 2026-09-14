import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import {
  Stethoscope,
  Plus,
  Loader2,
  AlertCircle,
  Trash2,
  Edit,
} from 'lucide-react';

export default function AdminSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getSpecialties();

      setSpecialties(response.data.data || response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to load specialties.'
      );
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
    setError('');

    try {
      await adminApi.createSpecialty({
        name,
        description,
      });

      setName('');
      setDescription('');

      fetchSpecialties();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Error creating specialty.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id) => {
    const specialtyToUpdate = specialties.find(
      (item) => item.id === id
    );

    if (!specialtyToUpdate) return;

    const newName = prompt(
      'Enter new name:',
      specialtyToUpdate.name
    );

    const newDescription = prompt(
      'Enter new description:',
      specialtyToUpdate.description
    );

    if (newName !== null && newDescription !== null) {
      try {
        await adminApi.updateSpecialty(id, {
          name: newName,
          description: newDescription,
        });

        fetchSpecialties();
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Error updating specialty.'
        );
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this specialty?'
      )
    ) {
      return;
    }

    try {
      await adminApi.deleteSpecialty(id);

      setSpecialties((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Error deleting specialty.'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Medical Specialties
        </h1>

        <p className="text-sm text-[#64748B] mt-1">
          Manage clinic medical fields and categories
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-3 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-[#0F172A] mb-5">
            Add Specialty
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Specialty Name */}
            <div>
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Specialty Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. Cardiology"
                className="w-full h-12 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3F38CA] focus:ring-2 focus:ring-[#3F38CA]/10 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Brief description..."
                rows={4}
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3F38CA] focus:ring-2 focus:ring-[#3F38CA]/10 transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#3F38CA] hover:bg-[#312E81] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}

              <span>Add Specialty</span>
            </button>
          </form>
        </div>

        {/* List Table Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#0F172A] mb-5">
            Existing Specialties
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#3F38CA] animate-spin" />
            </div>
          ) : specialties.length === 0 ? (
            <p className="text-sm text-[#94A3B8] text-center py-10">
              No specialties found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#64748B] text-sm">
                    <th className="pb-4 font-semibold">
                      Name
                    </th>

                    <th className="pb-4 font-semibold">
                      Description
                    </th>

                    <th className="pb-4 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E2E8F0]">
                  {specialties.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#F8FAFC] transition-colors duration-200"
                    >
                      {/* Name */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
                            <Stethoscope className="w-5 h-5 text-[#3F38CA]" />
                          </div>

                          <span className="font-semibold text-sm text-[#0F172A]">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="py-4 text-sm text-[#475569]">
                        {item.description || '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() =>
                              handleUpdate(item.id)
                            }
                            className="text-[#3F38CA] hover:text-[#1D4ED8] transition-colors"
                            title="Edit specialty"
                          >
                            <Edit className="w-6 h-6" />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                            title="Delete specialty"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
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