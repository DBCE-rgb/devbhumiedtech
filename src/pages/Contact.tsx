import { Navigation } from "@/components/Navigation";
import { NotificationBar } from "@/components/NotificationBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCreateInquiry, useCourses } from "@/hooks/useAdminData";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  mobile: z.string().min(10, "Please enter a valid phone number").max(15),
  course_interested: z.string().optional(),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();
  const { data: courses } = useCourses();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course_interested: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = inquirySchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    try {
      await createInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        course_interested: formData.course_interested || null,
        message: formData.message || null,
      });

      toast({
        title: "Message Received!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", mobile: "", course_interested: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your inquiry. Please try again or call us directly.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <NotificationBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Get in touch with us for course inquiries, admissions, or any questions about Dev Bhumi Computer Academy
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help you start your journey in computer education. 
                  Visit us, call us, or fill out the form and we'll respond promptly.
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Our Location</h3>
                      <p className="text-muted-foreground">
                        Thakur Complex, 2nd Floor<br />
                        Kotla Nala, Opp. PNB Bank<br />
                        Solan, Himachal Pradesh – 173212
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                      <a href="tel:+919805500827" className="text-muted-foreground hover:text-primary transition-colors">
                        +91-9805500827
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Email</h3>
                      <a href="mailto:devbhumicomputereducation@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        devbhumicomputereducation@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                      <Youtube className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">Phone Number *</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91-9805500827"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course_interested">Course Interested In</Label>
                    <Select 
                      value={formData.course_interested} 
                      onValueChange={(value) => setFormData({ ...formData, course_interested: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses?.filter(c => c.is_active).map((course) => (
                          <SelectItem key={course.id} value={course.title}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your inquiry..."
                      rows={5}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={createInquiry.isPending}
                  >
                    {createInquiry.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Send Message
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We'll respond within 24 hours
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Find Us on Map
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.8!2d77.1!3d31.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzAwLjAiTiA3N8KwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dev Bhumi Computer Academy Location"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
