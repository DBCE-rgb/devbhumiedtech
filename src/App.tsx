import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Admission from "./pages/Admission";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminTheme from "./pages/admin/AdminTheme";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/theme" element={<AdminTheme />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>

        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
