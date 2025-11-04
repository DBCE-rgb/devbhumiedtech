import { Navigation } from "@/components/Navigation";
import { NotificationBar } from "@/components/NotificationBar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { X } from "lucide-react";

// Placeholder images for gallery
const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    title: "Computer Lab Session",
    category: "Workshops",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    title: "Coding Workshop",
    category: "Workshops",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    title: "Student Training",
    category: "Events",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    title: "Certificate Distribution",
    category: "Certificates",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80",
    title: "Practical Training",
    category: "Workshops",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    title: "Team Discussion",
    category: "Events",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80",
    title: "Design Workshop",
    category: "Workshops",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    title: "Success Stories",
    category: "Certificates",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(galleryImages.map(img => img.category)))];
  
  const filteredImages = filter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <NotificationBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground">
              Glimpses from our workshops, events, and student achievements at Dev Bhumi Computer Education
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-muted text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="group cursor-pointer overflow-hidden hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{image.title}</h3>
                      <p className="text-white/80 text-sm">{image.category}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white text-2xl font-semibold">{selectedImage.title}</h3>
              <p className="text-white/80 mt-2">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
