import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Filter,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import DoctorCard from "./DoctorCard";
import { publicApi } from "../../api/publicApi";

const FALLBACK_DOCTOR_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhAEfHfBG2vj3yt6umqIg60g4kXaKmATGoaMVYurUNw&s=10",
];

const getDoctorImage = (doc) => {
  if (doc.avatar_url?.trim()) return doc.avatar_url;
  if (doc.image?.trim()) return doc.image;

  const idNumber =
    typeof doc.id === "number"
      ? doc.id
      : doc.id
        ? String(doc.id).charCodeAt(0)
        : 0;

  const index = Math.abs(idNumber) % FALLBACK_DOCTOR_IMAGES.length;

  return FALLBACK_DOCTOR_IMAGES[index];
};

export default function DoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  const specialties = [
    "All",
    "General Practitioner",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Ophthalmologist",
  ];

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await publicApi.getDoctors();

      const data = response.data?.data || response.data || [];

      setDoctors(data);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);

      setError("Unable to load doctors from server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter doctors
  const filteredDoctors = doctors.filter((doc) => {
    const docSpecialty =
      doc.specialty?.name || doc.specialty_name || doc.specialty || "";

    const docName =
      doc.name ||
      (doc.user
        ? `${doc.user.first_name || ""} ${doc.user.last_name || ""}`
        : "");

    const docCity = doc.city || doc.location || doc.address || "";

    const matchesSpecialty =
      selectedSpecialty === "All" ||
      docSpecialty.toLowerCase() === selectedSpecialty.toLowerCase();

    const matchesSearch =
      docName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docSpecialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = docCity
      .toLowerCase()
      .includes(locationTerm.toLowerCase());

    return matchesSpecialty && matchesSearch && matchesLocation;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setLocationTerm("");
    setSelectedSpecialty("All");
  };

  return (
    <section id="doctors" className="bg-[#F8FAFC] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <div
              className="inline-flex items-center px-3 py-1
                rounded-full bg-[#EEF2FF]
                border border-[#E0E7FF]
                text-xs font-semibold text-[#3F38CA]
                mb-3"
            >
              Medical Team
            </div>

            <h2
              className="text-3xl sm:text-4xl
                font-extrabold text-[#0F172A]
                tracking-tight"
            >
              Top Rated Practitioners
            </h2>

            <p
              className="text-[#475569] text-sm
                mt-2 max-w-xl leading-relaxed"
            >
              Connect with certified healthcare experts. Filter by specialty,
              search by name, and schedule consultations.
            </p>
          </div>

          <a
            href="/doctors"
            className="inline-flex items-center gap-2
              text-sm font-semibold text-[#3F38CA]
              hover:text-[#312E81]
              transition-colors shrink-0"
          >
            Browse All Doctors
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Search & Filters */}
        <div
          className="bg-white rounded-2xl
            border border-[#E2E8F0]
            p-4 shadow-sm mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search */}
            <div
              className="md:col-span-6 h-11
                flex items-center
                bg-[#F8FAFC]
                border border-[#E2E8F0]
                rounded-xl px-4
                focus-within:border-[#3F38CA]
                focus-within:ring-2
                focus-within:ring-[#3F38CA]/10
                transition-all"
            >
              <Search
                className="w-4 h-4
                  text-[#94A3B8]
                  mr-2.5 shrink-0"
              />

              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent
                  text-sm text-[#0F172A]
                  outline-none
                  placeholder:text-[#94A3B8]"
              />
            </div>

            {/* Location */}
            <div
              className="md:col-span-4 h-11
                flex items-center
                bg-[#F8FAFC]
                border border-[#E2E8F0]
                rounded-xl px-4
                focus-within:border-[#3F38CA]
                focus-within:ring-2
                focus-within:ring-[#3F38CA]/10
                transition-all"
            >
              <MapPin
                className="w-4 h-4
                  text-[#94A3B8]
                  mr-2.5 shrink-0"
              />

              <input
                type="text"
                placeholder="City or state..."
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="w-full bg-transparent
                  text-sm text-[#0F172A]
                  outline-none
                  placeholder:text-[#94A3B8]"
              />
            </div>

            {/* Reset */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full h-11
                  bg-white
                  border border-[#E2E8F0]
                  hover:bg-[#F8FAFC]
                  text-[#475569]
                  hover:text-[#3F38CA]
                  text-xs font-semibold
                  rounded-xl
                  flex items-center justify-center
                  gap-2 transition-all"
              >
                <Filter className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          </div>

          {/* Specialties */}
          <div
            className="flex items-center gap-2
              overflow-x-auto pb-1 pt-1
              no-scrollbar"
          >
            {specialties.map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 h-9 rounded-xl
                  text-xs font-semibold
                  whitespace-nowrap
                  border transition-all ${
                    selectedSpecialty === spec
                      ? `
                        bg-[#3F38CA]
                        border-[#3F38CA]
                        text-white
                        shadow-sm
                      `
                      : `
                        bg-[#F8FAFC]
                        border-[#E2E8F0]
                        text-[#475569]
                        hover:text-[#3F38CA]
                        hover:border-[#C7D2FE]
                        hover:bg-[#EEF2FF]
                      `
                  }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
        {loading && (
          <div
            className="grid grid-cols-1
              sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl
                  p-5 border border-[#E2E8F0]
                  shadow-sm animate-pulse space-y-4"
              >
                <div
                  className="w-full h-48
                    bg-[#E2E8F0] rounded-xl"
                />

                <div
                  className="h-4 bg-[#E2E8F0]
                    rounded w-3/4"
                />
                <div
                  className="h-3 bg-[#E2E8F0]
                    rounded w-1/2"
                />
                <div
                  className="h-9 bg-[#F1F5F9]
                    rounded-xl"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className="h-10
                      bg-[#E2E8F0]
                      rounded-xl"
                  />
                  <div
                    className="h-10
                      bg-[#E2E8F0]
                      rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && error && (
          <div
            className="bg-white rounded-2xl
              border border-[#FCA5A5]
              p-10 text-center
              shadow-sm max-w-lg mx-auto"
          >
            <p
              className="text-sm font-medium
                text-[#DC2626] mb-4"
            >
              {error}
            </p>
            <button
              onClick={fetchDoctors}
              className="h-10 px-4
                inline-flex items-center
                justify-center gap-2
                bg-[#3F38CA]
                hover:bg-[#312E81]
                text-white text-xs
                font-semibold rounded-xl
                transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}
        {!loading && !error && filteredDoctors.length > 0 && (
          <div
            className="grid grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3 gap-6"
          >
            {filteredDoctors.map((doc) => {
              const formattedDoctor = {
                id: doc.id,
                name:
                  doc.name ||
                  (doc.user
                    ? `Dr. ${doc.user.first_name} ${doc.user.last_name}`
                    : "Dr. Medical Expert"),

                specialty:
                  doc.specialty?.name ||
                  doc.specialty_name ||
                  doc.specialty ||
                  "General Practitioner",

                city: doc.city || doc.location || "Consultation Center",

                rating: doc.rating || 4.9,

                reviews: doc.reviews_count || doc.reviews || 120,

                experience: doc.experience_years
                  ? `${doc.experience_years} yrs`
                  : doc.experience || "5+ yrs",

                nextAvailable:
                  doc.next_available || doc.nextAvailable || "Today Available",

                teleconsult: doc.teleconsult ?? true,

                image: getDoctorImage(doc),
              };

              return <DoctorCard key={doc.id} doctor={formattedDoctor} />;
            })}
          </div>
        )}
        {!loading && !error && filteredDoctors.length === 0 && (
          <div
            className="bg-white rounded-2xl
                p-12 text-center
                border border-[#E2E8F0]
                shadow-sm"
          >
            <h3
              className="text-lg font-bold
                  text-[#0F172A]"
            >
              No doctors found
            </h3>
            <p
              className="text-[#64748B]
                  text-sm mt-1"
            >
              Try adjusting your search terms or selecting a different
              specialty.
            </p>
          </div>
        )}
        {!loading && !error && doctors.length > 0 && (
          <div
            className="mt-10 flex flex-col
              sm:flex-row sm:items-center
              sm:justify-between gap-4
              bg-white px-5 py-4
              rounded-2xl
              border border-[#E2E8F0]
              shadow-sm"
          >
            <span className="text-xs text-[#64748B]">
              Showing{" "}
              <strong className="text-[#0F172A]">
                {filteredDoctors.length}
              </strong>{" "}
              of <strong className="text-[#0F172A]">{doctors.length}</strong>{" "}
              doctors
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled
                className="w-9 h-9 rounded-lg
                  border border-[#E2E8F0]
                  text-[#CBD5E1]
                  flex items-center justify-center
                  cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                className="w-9 h-9 rounded-lg
                  bg-[#3F38CA]
                  text-white font-semibold
                  flex items-center justify-center
                  shadow-sm"
              >
                1
              </button>

              <button
                className="w-9 h-9 rounded-lg
                  border border-[#E2E8F0]
                  text-[#475569]
                  hover:text-[#3F38CA]
                  hover:bg-[#F8FAFC]
                  flex items-center justify-center
                  transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
