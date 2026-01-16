import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, BookOpen, Image } from "lucide-react";
import { useGallery, useTestimonials, useCourses } from "@/hooks/useAdminData";

type BannerSlide = {
  type: "gallery" | "testimonial" | "course";
  title: string;
  subtitle: string;
  image?: string;
  rating?: number;
};

export const PromoBanner = () => {
  const { data: gallery } = useGallery();
  const { data: testimonials } = useTestimonials();
  const { data: courses } = useCourses();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<BannerSlide[]>([]);

  useEffect(() => {
    const newSlides: BannerSlide[] = [];

    // Add gallery slides
    gallery?.slice(0, 3).forEach((item) => {
      newSlides.push({
        type: "gallery",
        title: item.title || "Our Academy",
        subtitle: item.description || "Explore our modern facilities",
        image: item.image_url,
      });
    });

    // Add testimonial slides
    testimonials?.slice(0, 3).forEach((item) => {
      newSlides.push({
        type: "testimonial",
        title: item.name,
        subtitle: `"${item.content?.slice(0, 80)}${(item.content?.length || 0) > 80 ? '...' : ''}"`,
        image: item.image_url,
        rating: item.rating || 5,
      });
    });

    // Add course slides
    courses?.slice(0, 3).forEach((item) => {
      newSlides.push({
        type: "course",
        title: item.title,
        subtitle: item.description?.slice(0, 60) + "..." || "Learn with experts",
      });
    });

    // Add default slides if no data
    if (newSlides.length === 0) {
      newSlides.push(
        {
          type: "course",
          title: "Web Development",
          subtitle: "Learn full-stack development with industry experts",
        },
        {
          type: "testimonial",
          title: "Happy Students",
          subtitle: '"Best computer institute in Solan!"',
          rating: 5,
        },
        {
          type: "gallery",
          title: "Modern Labs",
          subtitle: "State-of-the-art computer facilities",
        }
      );
    }

    setSlides(newSlides);
  }, [gallery, testimonials, courses]);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  const slide = slides[currentSlide];
  
  const getIcon = (type: string) => {
    switch (type) {
      case "gallery":
        return <Image className="h-4 w-4" />;
      case "testimonial":
        return <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
      case "course":
        return <BookOpen className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "gallery":
        return "Gallery";
      case "testimonial":
        return "Student Review";
      case "course":
        return "Popular Course";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Navigation - Left */}
          <button
            onClick={prevSlide}
            className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center gap-6 min-w-0">
            {/* Slide Image */}
            {slide.image && (
              <div className="hidden sm:block w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/30">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Slide Content */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 min-w-0">
              <div className="flex items-center gap-2">
                <span className="hidden sm:flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                  {getIcon(slide.type)}
                  {getTypeLabel(slide.type)}
                </span>
                <span className="font-semibold text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                  {slide.title}
                </span>
              </div>
              
              <span className="hidden md:block text-primary-foreground/80 text-sm truncate max-w-xs">
                {slide.subtitle}
              </span>

              {/* Star Rating for testimonials */}
              {slide.type === "testimonial" && slide.rating && (
                <div className="hidden lg:flex items-center gap-0.5">
                  {[...Array(slide.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
            </div>

            {/* Book Demo Button */}
            <Link to="/contact" className="flex-shrink-0">
              <Button
                size="sm"
                variant="secondary"
                className="font-semibold text-xs sm:text-sm whitespace-nowrap"
              >
                📞 Book Free Demo
              </Button>
            </Link>
          </div>

          {/* Navigation - Right */}
          <button
            onClick={nextSlide}
            className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-1 pb-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
