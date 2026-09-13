import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, ShieldCheck, ArrowRight, Video } from 'lucide-react';

export default function DoctorCard({ doctor }) {
  return (
    <div className="group relative bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-2xl ">
      
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" />
      <div>
        <div className="relative mb-4 rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Experience Pill */}
            <span className="bg-[#0F172A]/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1">
              <span>{doctor.experience} exp.</span>
            </span>
            {doctor.teleconsult && (
              <span className="bg-white/90 backdrop-blur-md text-[#2563EB] text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-100 shadow-sm flex items-center gap-1">
                <Video className="w-3 h-3 text-[#2563EB]" />
                <span>Teleconsult</span>
              </span>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{doctor.rating}</span>
            <span className="text-[10px] text-slate-500 font-medium">({doctor.reviews})</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors flex items-center gap-1.5 leading-snug">
              {doctor.name}
              <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
            </h3>
          </div>
          <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
            {doctor.specialty}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium truncate">{doctor.city}</span>
          </div>
        </div>
        <div className="mt-4 bg-[#F8FAFC] border border-slate-200/70 rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Next Slot
            </span>
          </div>
          
          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
            {doctor.nextAvailable}
          </span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5 text-xs font-bold">
        {/* Profile Link */}
        <Link
          to={`/doctors/${doctor.id}`}
          className="py-3 rounded-xl border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-slate-300 text-center transition-all flex items-center justify-center"
        >
          View Profile
        </Link>
        <Link
          to={`/doctors/${doctor.id}`}
          className="group/btn py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-center transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}