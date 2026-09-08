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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch doctors and specialties
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [doctorsRes, specialtiesRes] = await Promise.all([
        adminApi.getDoctors(),
        adminApi.getSpecialties(),
      ]);

      setDoctors(doctorsRes.data.data || doctorsRes.data || []);
      setSpecialties(specialtiesRes.data.data || specialtiesRes.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load doctors or specialties.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Doctor Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !specialtyId || !licenseNumber) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await adminApi.createDoctor({
        name,
        email,
        password,
        role: 'doctor',
        specialty_id: specialtyId,
        license_number: licenseNumber,
      });

      // Reset Form
      setName('');
      setEmail('');
      setPassword('');
      setSpecialtyId('');
      setLicenseNumber('');
      setIsFormOpen(false);

      // Refresh Doctor List
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering doctor.');
    } finally {
      setIsSubmitting(false);
    }
  };
  //Handle Doctor Update
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
  // Handle Doctor Deletion
  const handleDeleteDoctor=async(id)=>{
    if(!window.confirm('are you sure you want to delete this doctor?')) return;
    try{
      await adminApi.deleteDoctor(id);
      setDoctors((prev)=>prev.filter((doc)=>doc.id!==id));
    }catch(err){
      setError(err.response?.data?.message || 'Error deleting doctor.');
    }
  }
  // Filtered doctors list
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
          className="h-11 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
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

      {/* Registration Form Collapsible Card */}
      {isFormOpen && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#2563EB]" />
            Register Practitioner
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Aris Vance"
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aris.vance@meetora.health"
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                required
              />
            </div>

            {/* Medical Specialty */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                Medical Specialty *
              </label>
              <select
                value={specialtyId}
                onChange={(e) => setSpecialtyId(e.target.value)}
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
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

            {/* License Number */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                Medical License Number *
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="LIC-2026-9904"
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                required
              />
            </div>

            {/* Submit Action */}
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="h-11 px-5 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
                <span>Save Doctor</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Table Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctors by name, email, or specialty..."
            className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Doctor List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-sm text-[#94A3B8] text-center py-8">No registered doctors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase text-xs">
                  <th className="pb-3">Doctor</th>
                  <th className="pb-3">Specialty</th>
                  <th className="pb-3">License Number</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredDoctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F8FAFC]">
                    {/* Name + Avatar */}
                    <td className="py-3.5 font-semibold text-[#0F172A] flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#DBEAFE] text-[#2563EB] font-bold flex items-center justify-center text-xs shrink-0">
                        {doc.name?.charAt(0) || 'D'}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">{doc.name}</p>
                        <p className="text-xs text-[#94A3B8]">ID: #{doc.id}</p>
                      </div>
                    </td>

                    {/* Specialty */}
                    <td className="py-3.5 text-[#475569]">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#EFF3FC] text-[#2563EB]">
                        <Stethoscope className="w-3.5 h-3.5" />
                        {doc.specialty?.name || doc.doctor_profile?.specialty?.name || 'General'}
                      </span>
                    </td>

                    {/* License Number */}
                    <td className="py-3.5 text-[#475569] font-mono text-xs">
                      {doc.license_number || doc.doctor_profile?.license_number || 'N/A'}
                    </td>

                    {/* Email */}
                    <td className="py-3.5 text-[#475569]">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Mail className="w-3.5 h-3.5 text-[#94A3B8]" />
                        {doc.email}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="text-[#2563EB] hover:text-[#1D4ED8]" 
                        onClick={()=>handleUpdateDoctor(doc.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-[#EF4444] hover:text-[#DC2626]" 
                          onClick={()=>handleDeleteDoctor(doc.id)}
                        > 
                          <Trash className="w-4 h-4" />
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