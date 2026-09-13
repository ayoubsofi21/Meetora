// src/components/common/DoctorSearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

export default function DoctorSearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (location) params.append('location', location);
    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-3 shadow-xl shadow-slate-200/60 border border-slate-200/80">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Search Doctors / Conditions Input */}
        <div className="md:col-span-5 flex items-center bg-white px-4 py-3 rounded-xl border border-slate-200 focus-within:border-[#2563EB] transition-all">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search doctors, conditions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Location Input */}
        <div className="md:col-span-4 flex items-center bg-white px-4 py-3 rounded-xl border border-slate-200 focus-within:border-[#2563EB] transition-all">
          <MapPin className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full h-full min-h-[48px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow"
          >
            Find Care
          </button>
        </div>

      </form>
    </div>
  );
}