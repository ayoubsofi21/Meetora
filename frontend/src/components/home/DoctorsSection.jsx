// src/components/home/DoctorsSection.jsx
import React, { useState } from 'react';
import { Search, MapPin, Filter, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import DoctorCard from './DoctorCard';

export default function DoctorsSection() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');

  const specialties = [
    'All',
    'General Practitioner',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Ophthalmologist',
  ];

  const doctorsData = [
    {
      id: 1,
      name: 'Dr. Sarah Martin',
      specialty: 'Cardiologist',
      city: 'New York, NY',
      rating: 4.9,
      reviews: 142,
      experience: '12 yrs',
      nextAvailable: 'Today 14:00',
      teleconsult: true,
      image: 'https://images.unsplash.com/photo-1594824813566-78a95357320f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Dr. Alexandre Martin',
      specialty: 'General Practitioner',
      city: 'Boston, MA',
      rating: 4.8,
      reviews: 98,
      experience: '15 yrs',
      nextAvailable: 'Tomorrow 09:30',
      teleconsult: false,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'Dr. Yasmine El Amrani',
      specialty: 'Dermatologist',
      city: 'Chicago, IL',
      rating: 4.9,
      reviews: 178,
      experience: '9 yrs',
      nextAvailable: 'Today 16:15',
      teleconsult: true,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      name: 'Dr. Sophie Laurent',
      specialty: 'Pediatrician',
      city: 'Seattle, WA',
      rating: 4.9,
      reviews: 156,
      experience: '8 yrs',
      nextAvailable: 'Oct 15, 11:00',
      teleconsult: true,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 5,
      name: 'Dr. David Chen',
      specialty: 'Neurologist',
      city: 'San Francisco, CA',
      rating: 4.7,
      reviews: 89,
      experience: '14 yrs',
      nextAvailable: 'Tomorrow 15:00',
      teleconsult: false,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 6,
      name: 'Dr. Elena Rostova',
      specialty: 'Ophthalmologist',
      city: 'Miami, FL',
      rating: 4.9,
      reviews: 210,
      experience: '11 yrs',
      nextAvailable: 'Today 17:30',
      teleconsult: true,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
  ];

  // Filter logic
  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = doc.city
      .toLowerCase()
      .includes(locationTerm.toLowerCase());
    return matchesSpecialty && matchesSearch && matchesLocation;
  });
  return (
    <section id="doctors" className="bg-[#F4F8FD]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-xs font-semibold text-[#2563EB] mb-3">
              <span>Medical Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Top Rated Practitioners
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Connect with certified healthcare experts. Filter by specialty, search by name, and schedule instant consultations.
            </p>
          </div>
          <a
            href="/doctors"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <span>Browse All Doctors</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 flex items-center bg-[#F8FAFC] px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:border-[#2563EB] transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="md:col-span-4 flex items-center bg-[#F8FAFC] px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:border-[#2563EB] transition-all">
              <MapPin className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="City or state..."
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setLocationTerm('');
                  setSelectedSpecialty('All');
                }}
                className="w-full h-full min-h-[42px] bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Specialty Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSpecialty === spec
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'bg-[#F8FAFC] text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
            <h3 className="text-lg font-bold text-slate-800">No doctors found</h3>
            <p className="text-slate-500 text-xs mt-1">
              Try adjusting your search terms or selecting a different specialty.
            </p>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="mt-12 flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm text-xs font-medium text-slate-600">
          <span>Showing <strong>{filteredDoctors.length}</strong> of <strong>{doctorsData.length}</strong> doctors</span>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-2 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#2563EB] text-white font-bold flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center">
              2
            </button>
            <button className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}