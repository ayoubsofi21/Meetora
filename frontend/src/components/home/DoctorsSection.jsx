// src/components/home/DoctorsSection.jsx
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, ArrowRight, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import DoctorCard from './DoctorCard';
import { publicApi } from '../../api/publicApi';

// Collection d'images de médecins professionnels HD (Libres de droits)
const FALLBACK_DOCTOR_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhAEfHfBG2vj3yt6umqIg60g4kXaKmATGoaMVYurUNw&s=10"
];

// Helper pour attribuer une image fixe et cohérente basée sur l'ID du médecin
const getDoctorImage = (doc) => {
  if (doc.avatar_url && doc.avatar_url.trim() !== '') return doc.avatar_url;
  if (doc.image && doc.image.trim() !== '') return doc.image;

  // Calcul du reste pour garder toujours la même image associée au même médecin
  const idNumber = typeof doc.id === 'number' ? doc.id : (doc.id ? String(doc.id).charCodeAt(0) : 0);
  const index = Math.abs(idNumber) % FALLBACK_DOCTOR_IMAGES.length;
  return FALLBACK_DOCTOR_IMAGES[index];
};

export default function DoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch doctors from backend database API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getDoctors();
      
      const data = response.data?.data || response.data || [];
      setDoctors(data);
    } catch (err) {
      console.error('Failed to fetch doctors from API:', err);
      setError('Unable to load doctors from server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter logic across fetched database items
  const filteredDoctors = doctors.filter((doc) => {
    const docSpecialty = doc.specialty?.name || doc.specialty_name || doc.specialty || '';
    const docName = doc.name || (doc.user ? `${doc.user.first_name || ''} ${doc.user.last_name || ''}` : '');
    const docCity = doc.city || doc.location || doc.address || '';

    const matchesSpecialty =
      selectedSpecialty === 'All' || docSpecialty.toLowerCase() === selectedSpecialty.toLowerCase();
    
    const matchesSearch =
      docName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docSpecialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = docCity.toLowerCase().includes(locationTerm.toLowerCase());

    return matchesSpecialty && matchesSearch && matchesLocation;
  });

  return (
    <section id="doctors" className="bg-[#F4F8FD] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
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

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
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

            {/* Location Input */}
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

            {/* Reset Button */}
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

          {/* Specialty Tabs */}
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

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-5 border border-slate-200/80 animate-pulse space-y-4">
                <div className="w-full h-48 bg-slate-200 rounded-2xl" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
                <div className="h-8 bg-slate-100 rounded-xl" />
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="h-10 bg-slate-200 rounded-xl" />
                  <div className="h-10 bg-slate-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-2xl p-12 text-center border border-rose-200 shadow-sm max-w-lg mx-auto">
            <p className="text-sm font-semibold text-rose-600 mb-4">{error}</p>
            <button
              onClick={fetchDoctors}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl shadow hover:bg-[#1D4ED8] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && !error && filteredDoctors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => {
              const formattedDoctor = {
                id: doc.id,
                name: doc.name || (doc.user ? `Dr. ${doc.user.first_name} ${doc.user.last_name}` : 'Dr. Medical Expert'),
                specialty: doc.specialty?.name || doc.specialty_name || doc.specialty || 'General Practitioner',
                city: doc.city || doc.location || 'Consultation Center',
                rating: doc.rating || 4.9,
                reviews: doc.reviews_count || doc.reviews || 120,
                experience: doc.experience_years ? `${doc.experience_years} yrs` : doc.experience || '5+ yrs',
                nextAvailable: doc.next_available || doc.nextAvailable || 'Today Available',
                teleconsult: doc.teleconsult ?? true,
                // Image gérée dynamiquement
                image: getDoctorImage(doc),
              };

              return <DoctorCard key={doc.id} doctor={formattedDoctor} />;
            })}
          </div>
        )}

        {/* Empty Search Results */}
        {!loading && !error && filteredDoctors.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
            <h3 className="text-lg font-bold text-slate-800">No doctors found</h3>
            <p className="text-slate-500 text-xs mt-1">
              Try adjusting your search terms or selecting a different specialty.
            </p>
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && !error && doctors.length > 0 && (
          <div className="mt-12 flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm text-xs font-medium text-slate-600">
            <span>Showing <strong>{filteredDoctors.length}</strong> of <strong>{doctors.length}</strong> doctors</span>
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
              <button className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}