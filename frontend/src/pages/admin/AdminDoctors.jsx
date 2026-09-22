import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { UserPlus, UserCheck, Stethoscope, Mail, Shield, Loader2, AlertCircle, Plus, Search, Edit, Trash } from 'lucide-react';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [image, setImage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const [doctorsRes, specialtiesRes] = await Promise.all([
        adminApi.getDoctors(),
        adminApi.getSpecialties(),
      ]);

      console.log('DOCTORS API:', doctorsRes.data);

      setDoctors(doctorsRes.data.data || doctorsRes.data || []);
      setSpecialties(
        specialtiesRes.data.data || specialtiesRes.data || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to load doctors or specialties.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !specialtyId || !licenseNumber) {
      setError('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', 'doctor');
      formData.append('specialty_id', specialtyId);
      formData.append('license_number', licenseNumber);

      if (image) {
        formData.append('image', image);
      }

      await adminApi.createDoctor(formData);
      setName('');
      setEmail('');
      setPassword('');
      setSpecialtyId('');
      setLicenseNumber('');
      setImage(null);
      setIsFormOpen(false);
      await fetchData();
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.message ||
        'Error registering doctor.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateDoctor=async(id)=>{
    const doctorToUpdate=doctors.find((doc)=>doc.id===id);
    console.log('Doctor to update:',doctorToUpdate);
    if(!doctorToUpdate) return;
    const newName=prompt('Enter new name:', doctorToUpdate.name);
    const newEmail=prompt('Enter new email:', doctorToUpdate.email)
    const newLicenseNumber=prompt('Enter new license number:', doctorToUpdate.license_number);
    const newSpecialtyId=prompt('Enter new specialty ID:', doctorToUpdate.specialty?.id || doctorToUpdate.doctor_profile?.specialty?.id);
    if(newName!==null && newEmail!==null && newSpecialtyId!==null && newLicenseNumber!=null){
      try{
        await adminApi.updateDoctor(id,{name:newName,email:newEmail,specialty_id:newSpecialtyId,license_number:newLicenseNumber});
        fetchData();
      }catch(err){
        setError(err.response?.data?.message || 'Error updating doctor.');
      }
    }
  }
  const handleDeleteDoctor=async(id)=>{
    if(!window.confirm('are you sure you want to delete this doctor?')) return;
    try{
      await adminApi.deleteDoctor(id);
      setDoctors((prev)=>prev.filter((doc)=>doc.id!==id));
    }catch(err){
      setError(err.response?.data?.message || 'Error deleting doctor.');
    }
  }
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Doctor Management</h1>
          <p className="text-sm text-[#475569]">Register practitioners and manage medical staff profiles</p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="h-11 px-4 bg-[#3F38CA] hover:bg-[#312E81] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? 'Close Form' : 'Register New Doctor'}</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {isFormOpen && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#0F172A] mb-5 flex items-center gap-2.5">
            <UserPlus className="w-6 h-6 text-[#3F38CA]" />
            Register Practitioner
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Aris Vance"
                className="w-full h-12 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3F38CA] focus:ring-2 focus:ring-[#3F38CA]/10 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aris.vance@meetora.health"
                className="w-full h-12 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3F38CA] focus:ring-2 focus:ring-[#3F38CA]/10 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3F38CA] focus:ring-2 focus:ring-[#3F38CA]/10 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Medical Specialty *
              </label>
              <select
                value={specialtyId}
                onChange={(e) => setSpecialtyId(e.target.value)}
                className="w-full h-12 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#3F38CA] focus:ring-2 focus:ring-[#3F38CA]/10 transition-all"
                required
              >
                <option value="">Select Specialty</option>
                {specialties.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Medical License Number *
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="LIC-2026-9904"
                className="w-full h-12 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3F38CA] focus:ring-2 focus:ring-[#3F38CA]/10 transition-all"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Doctor Photo
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="
                  block w-full text-sm text-[#475569]
                  border border-[#E2E8F0]
                  rounded-xl
                  bg-[#F8FAFC]
                  file:mr-4
                  file:border-0
                  file:bg-[#EEF2FF]
                  file:text-[#3F38CA]
                  file:font-semibold
                  file:px-4
                  file:py-3
                  hover:file:bg-[#E0E7FF]
                  cursor-pointer
                "
              />

              <p className="mt-1.5 text-xs text-[#94A3B8]">
                JPG, PNG or WEBP. Maximum 2 MB.
              </p>
              {image && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Doctor preview"
                      className="w-16 h-16 rounded-xl object-cover border border-[#E2E8F0]"
                    />

                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">
                        {image.name}
                      </p>

                      <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="text-xs text-[#EF4444] mt-1"
                      >
                        Remove photo
                      </button>
                    </div>
                  </div>
                )}
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="h-12 px-6 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-6 bg-[#3F38CA] hover:bg-[#312E81] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <UserCheck className="w-5 h-5" />
                )}
                <span>Save Doctor</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors by name, email, or specialty..."
            className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#3F38CA]"
          />
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#3F38CA] animate-spin" />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-sm text-[#94A3B8] text-center py-8">No registered doctors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase text-sm">
                  <th className="pb-4 font-semibold">Doctor</th>
                  <th className="pb-4 font-semibold">Specialty</th>
                  <th className="pb-4 font-semibold">License Number</th>
                  <th className="pb-4 font-semibold">Contact</th>
                  <th className="pb-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredDoctors.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-[#F8FAFC] transition-colors duration-200"
                  >
                     <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {doc.image ? (
                          <img
                            src={doc.image}
                            alt={doc.name}
                            width="48"
                            height="48"
                            className="w-12 h-12 rounded-full object-cover"
                            onLoad={() => console.log("IMAGE LOADED:", doc.image)}
                            onError={(e) => {
                              console.error("IMAGE ERROR:", doc.image);
                              console.error(e);
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#DBEAFE] text-[#3F38CA] flex items-center justify-center font-bold">
                            {doc.name?.charAt(0)?.toUpperCase() || "D"}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-[#0F172A]">
                            {doc.name}
                          </p>

                          <p className="text-xs text-[#64748B]">
                            ID: #{doc.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Specialty */}
                    <td className="py-4 text-[#475569]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-[#EFF3FC] text-[#3F38CA]">
                        {doc.specialty?.name ||
                          doc.doctor_profile?.specialty?.name ||
                          'General'}
                      </span>
                    </td>

                    {/* License */}
                    <td className="py-4 text-[#475569] font-mono text-sm">
                      {doc.license_number ||
                        doc.doctor_profile?.license_number ||
                        'N/A'}
                    </td>

                    {/* Contact */}
                    <td className="py-4 text-[#475569]">
                      <span className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-[#94A3B8]" />
                        {doc.email}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <button
                          className="text-[#3F38CA] hover:text-[#1D4ED8] transition-colors"
                          onClick={() => handleUpdateDoctor(doc.id)}
                          title="Edit doctor"
                        >
                          <Edit className="w-6 h-6" />
                        </button>

                        <button
                          className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                          onClick={() => handleDeleteDoctor(doc.id)}
                          title="Delete doctor"
                        >
                          <Trash className="w-6 h-6" />
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
  );
}