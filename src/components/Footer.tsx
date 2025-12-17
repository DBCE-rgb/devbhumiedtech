import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Dev Bhumi Computer Academy" className="h-16 w-16 object-contain" />
              <div>
                <div className="text-lg font-bold text-primary">Dev Bhumi</div>
                <div className="text-sm text-muted-foreground">Computer Academy</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering Himachal Pradesh with quality computer education since September 2022.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="/admission" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admission</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Thakur Complex, 2nd Floor, Kotla Nala, Opp. PNB Bank, Solan, HP – 173212</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+919805500827" className="hover:text-primary transition-colors">+91-9805500827</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:Devbhumicomputeracademy@gmail.com" className="hover:text-primary transition-colors">Devbhumicomputeracademy@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Dev Bhumi Computer Academy | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
