// src/components/common/DoctorSearchBar.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';

export default function DoctorSearchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.append('search', search.trim());
    }

    if (location.trim()) {
      params.append('location', location.trim());
    }

    const queryString = params.toString();

    navigate(queryString ? `/doctors?${queryString}` : '/doctors');
  };

  return (
    <div
      className="w-full bg-white rounded-2xl p-3
        border border-[#E2E8F0] shadow-sm"
    >
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
      >
        {/* Search */}
        <div
          className="md:col-span-5 h-12
            flex items-center
            bg-[#F8FAFC]
            px-4 rounded-xl
            border border-[#E2E8F0]
            focus-within:border-[#3F38CA]
            focus-within:ring-2
            focus-within:ring-[#3F38CA]/10
            transition-all"
        >
          <Search
            className="w-5 h-5 text-[#94A3B8] mr-3 shrink-0"
            strokeWidth={1.75}
          />

          <input
            type="text"
            placeholder="Search doctors, conditions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent
              text-sm font-medium text-[#0F172A]
              outline-none
              placeholder:text-[#94A3B8]"
          />
        </div>

        {/* Location */}
        <div
          className="md:col-span-4 h-12
            flex items-center
            bg-[#F8FAFC]
            px-4 rounded-xl
            border border-[#E2E8F0]
            focus-within:border-[#3F38CA]
            focus-within:ring-2
            focus-within:ring-[#3F38CA]/10
            transition-all"
        >
          <MapPin
            className="w-5 h-5 text-[#94A3B8] mr-3 shrink-0"
            strokeWidth={1.75}
          />

          <input
            type="text"
            placeholder="City or location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent
              text-sm font-medium text-[#0F172A]
              outline-none
              placeholder:text-[#94A3B8]"
          />
        </div>

        {/* Search Button */}
        <div className="md:col-span-3">
          <button
            type="submit"
            className="group w-full h-12
              bg-[#3F38CA]
              hover:bg-[#312E81]
              text-white
              rounded-xl
              font-semibold text-sm
              flex items-center justify-center gap-2
              shadow-sm
              transition-all
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-[#3F38CA]/30
              focus:ring-offset-2"
          >
            <Search className="w-4 h-4" />

            <span>Find Care</span>

            <ArrowRight
              className="w-4 h-4 opacity-80
                group-hover:translate-x-0.5
                transition-transform"
            />
          </button>
        </div>
      </form>
    </div>
  );
}