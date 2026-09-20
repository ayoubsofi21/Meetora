import DoctorSearchBar from "../common/DoctorSearchBar";
import heroImage from "../../assets/images/Hero.png";

export default function HeroSection() {
  return (
    <section className="bg-[#F8FAFC] pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6 text-left">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5
                rounded-full bg-[#EEF2FF] border border-[#E0E7FF]
                text-xs font-semibold text-[#3F38CA] mb-5"
            ></div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl
                font-extrabold text-[#0F172A]
                tracking-tight leading-[1.1]"
            >
              Healthcare management,{" "}
              <span className="relative inline-block text-[#3F38CA]">
                simplified.
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3
                    text-[#C7D2FE] -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
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
            <p
              className="text-base sm:text-lg text-[#475569]
                font-normal leading-relaxed max-w-xl mt-6"
            >
              A unified platform designed for modern medical professionals.
              Streamline patient records, automate scheduling, and elevate your
              practice&apos;s efficiency.
            </p>
            <div className="mt-7 max-w-xl">
              <DoctorSearchBar />
            </div>
            <div className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  className="h-9 w-9 rounded-full
                    ring-2 ring-white object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdZzwnrud_JHXC_GXsoQCMpItd0Ys27PXhSVNprLRAJQ&s=10"
                  alt="Medical professional"
                />

                <img
                  className="h-9 w-9 rounded-full
                    ring-2 ring-white object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl2kyQV4psqeZi6WTQmf2IarzLj7qLuXtDkrgm_oAWA&s=10"
                  alt="Medical professional"
                />

                <img
                  className="h-9 w-9 rounded-full
                    ring-2 ring-white object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxhzGTHImgvfWo3GjYpEm3CT6p0e7M3T2vh8Z1Zz_EA&s=10"
                  alt="Medical professional"
                />
                <div
                  className="h-9 w-9 rounded-full
                    ring-2 ring-white
                    bg-[#EEF2FF] text-[#3F38CA]
                    flex items-center justify-center
                    text-[10px] font-bold"
                >
                  +10K
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#0F172A]">
                  Trusted by 10,000+ professionals
                </p>

                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Modern healthcare teams trust Meetora
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div
              className="absolute -top-6 -right-6
                w-40 h-40 rounded-full
                bg-[#EEF2FF] blur-3xl
                pointer-events-none"
            />
            <div
              className="absolute -bottom-8 -left-8
                w-40 h-40 rounded-full
                bg-[#E0E7FF]/60 blur-3xl
                pointer-events-none"
            />
            <div
              className="relative w-full
                h-[420px] sm:h-[460px] lg:h-[520px]
                rounded-2xl overflow-hidden
                bg-white
                border border-[#E2E8F0]
                shadow-lg"
            >
              <img
                src={heroImage}
                alt="Medical professional using Meetora platform"
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0
                  bg-gradient-to-t
                  from-[#0F172A]/10
                  via-transparent
                  to-transparent
                  pointer-events-none"
              />
            </div>
            <div
              className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6
                bg-white/95 backdrop-blur-md
                border border-white
                rounded-xl shadow-lg
                px-4 py-3
                flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl
                  bg-[#EEF2FF]
                  flex items-center justify-center"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full
                    bg-[#059669]"
                />
              </div>

              <div>
                <p className="text-xs font-bold text-[#0F172A]">
                  Practice Connected
                </p>

                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Secure healthcare management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
