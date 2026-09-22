import React from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function DoctorCard({ doctor }) {
  return (
    <div
      className="group relative bg-white rounded-2xl p-5
        border border-[#E2E8F0] shadow-sm
        hover:shadow-lg hover:border-[#C7D2FE]
        transition-all duration-300"
    >
      <div className="relative mb-4 rounded-xl overflow-hidden aspect-[4/3] bg-[#F1F5F9]">
       {doctor.image ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-top
              group-hover:scale-105
              transition-transform duration-500 ease-out"
          />
        ) : (
          <div
            className="w-full h-full
              flex flex-col items-center justify-center
              bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF]"
          >
            <div
              className="w-24 h-24 rounded-full
                bg-white border border-[#C7D2FE]
                shadow-sm
                flex items-center justify-center"
            >
              <span className="text-3xl font-bold text-[#3F38CA]">
                {getInitials(doctor.name)}
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-[#64748B]">
              Medical Practitioner
            </p>
          </div>
        )}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span
            className="bg-[#0F172A]/75 backdrop-blur-md
              text-white text-[11px] font-semibold
              px-3 py-1 rounded-full
              border border-white/20 shadow-sm"
          >
            {doctor.experience} exp.
          </span>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-16
            bg-gradient-to-t from-[#0F172A]/60
            to-transparent pointer-events-none"
        />
        <div
          className="absolute bottom-3 left-3
            flex items-center gap-1
            bg-white/95 backdrop-blur-md
            px-2.5 py-1 rounded-lg
            text-xs font-bold text-[#0F172A]
            shadow-sm"
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{doctor.rating}</span>
          <span className="text-[10px] text-[#64748B] font-medium">
            ({doctor.reviews})
          </span>
        </div>
      </div>
      <div>
        <div className="space-y-1">
          <h3
            className="text-base font-bold text-[#0F172A]
              group-hover:text-[#3F38CA]
              transition-colors
              flex items-center gap-1.5"
          >
            {doctor.name}

            <ShieldCheck
              className="w-4 h-4 text-[#3F38CA] shrink-0"
            />
          </h3>

          <p
            className="text-xs font-semibold
              text-[#3F38CA] uppercase tracking-wide"
          >
            {doctor.specialty}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-[#64748B] pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />

            <span className="font-medium truncate">
              {doctor.city}
            </span>
          </div>
        </div>
      </div>
      <div
        className="mt-5 pt-4
          border-t border-[#E2E8F0]
          grid grid-cols-2 gap-2.5"
      >
        <Link
          to={`/doctors/${doctor.id}`}
          className="h-11 rounded-xl
            border border-[#E2E8F0]
            text-[#475569]
            hover:text-[#3F38CA]
            hover:bg-[#F8FAFC]
            hover:border-[#C7D2FE]
            text-sm font-semibold
            flex items-center justify-center
            transition-all"
        >
          View Profile
        </Link>
        <Link
          to={`/doctors/${doctor.id}`}
          className="group/btn h-11 rounded-xl
            bg-[#3F38CA]
            hover:bg-[#312E81]
            text-white
            text-sm font-semibold
            shadow-sm
            flex items-center justify-center gap-1.5
            transition-all
            active:scale-[0.98]"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Visit</span>
          <ArrowRight
            className="w-4 h-4 opacity-80
              group-hover/btn:translate-x-0.5
              transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}