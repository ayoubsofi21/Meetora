import DoctorSearchBar from '../common/DoctorSearchBar';
import heroImage from '../../assets/images/Hero.png';

export default function HeroSection() {
  return (
    <section className="bg-[#F4F8FD] lg:pt-16 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              Healthcare management,{' '}
              <span className="relative inline-block text-[#2563EB]">
                simplified.
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#BFDBFE]/80 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 50 0, 100 15"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              A unified platform designed for modern medical professionals. Streamline patient records, automate scheduling, and elevate your practice's efficiency.
            </p>
            <div className="pt-2 max-w-xl">
              <DoctorSearchBar />
            </div>
            <div className="pt-4 flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZzwnrud_JHXC_GXsoQCMpItd0Ys27PXhSVNprLRAJQ&s=10"
                  alt="Doctor"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl2kyQV4psqeZi6WTQmf2IarzLj7qLuXtDkrgm_oAWA&s=10"
                  alt="Doctor"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxhzGTHImgvfWo3GjYpEm3CT6p0e7M3T2vh8Z1Zz_EA&s=10"
                  alt="Doctor"
                />
              </div>
              <span className="text-xs font-semibold text-slate-600">
                Trusted by 10,000+ medical professionals
              </span>
            </div>

          </div>

          {/* Right Column Visual Banner */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full h-[460px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Medical Professional using Meetora Platform"
                className=" w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}