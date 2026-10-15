import Image from "next/image";
import Link from "next/link";

interface ServiceItemData {
  id: number;
  title: string;
  description: string;
  iconName: string;
  price?: string | null;
  isFeatured: boolean;
  order: number;
}

interface ServicesGridProps {
  services: ServiceItemData[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const getIconPath = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "clipper":
        return "/images/clipper.svg";
      case "razor":
        return "/images/razor.svg";
      case "scissors":
        return "/images/scissors.svg";
      case "chair":
        return "/images/chair.svg";
      case "wash":
        return "/images/wash.svg";
      case "massage":
        return "/images/massage.svg";
      case "spa":
        return "/images/spa.svg";
      case "color":
        return "/images/color.svg";
      default:
        return "/images/scissors.svg";
    }
  };

  return (
    <section id="services" className="pt-8 sm:pt-10 pb-20 sm:pb-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Section Header (Image 2 style) */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="font-display text-xs sm:text-sm font-bold tracking-[0.25em] text-[#D49A58] uppercase">
            OUR SERVICE
          </span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
            Service We <span className="text-[#D49A58]">Provide</span>
          </h2>
        </div>

        {/* 4 Cards Grid (Image 2 style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between p-7 rounded-[2px] bg-[#1C1D21]/75 backdrop-blur-md border border-[#D49A58]/35 hover:border-[#D49A58] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Gold Line-Art Icon */}
                <div className="w-12 h-12 flex items-center justify-start mb-6">
                  <div className="relative w-10 h-10">
                    <Image
                      src={getIconPath(item.iconName)}
                      alt={item.title}
                      fill
                      className="object-contain filter-[sepia(1)] group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-[#D49A58] transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Price Display */}
                {item.price && (
                  <div className="font-serif-accent text-xs font-semibold text-[#D49A58] mb-3">
                    {item.price}
                  </div>
                )}

                {/* Service Description */}
                <p className="font-body text-xs text-[#B5B5B7] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Action Link (Image 2 style: READ MORE >) */}
              <div className="pt-2">
                <Link
                  href="#footer"
                  className="inline-flex items-center text-xs font-display font-semibold tracking-[0.18em] text-[#D49A58] hover:text-[#E0A96B] transition-colors"
                >
                  READ MORE &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button: ALL SERVICES (Image 2 style) */}
        <div className="mt-14 text-center">
          <Link
            href="#services"
            className="inline-flex items-center px-8 py-2.5 border border-[#D49A58]/70 hover:border-[#D49A58] bg-[#1C1D21]/80 hover:bg-[#D49A58] text-white hover:text-[#121315] font-display font-bold text-xs tracking-[0.2em] uppercase rounded-[2px] transition-all duration-200"
          >
            ALL SERVICES
          </Link>
        </div>

      </div>
    </section>
  );
}
