import { Navigation } from "@/components/Navigation";
import { NotificationBar } from "@/components/NotificationBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, FileCheck, Users, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const courses = [
  "MS Office (Word, Excel, PowerPoint)",
  "Tally with GST",
  "C Programming",
  "C++ Programming",
  "Java Programming",
  "Python Programming",
  "HTML, CSS & JavaScript",
  "Full Stack Web Development",
  "Adobe Photoshop",
  "CorelDRAW",
  "Adobe Illustrator",
  "Video Editing (Premiere Pro)",
  "Digital Marketing",
  "Networking Basics (CCNA)",
  "Advanced Excel for Business",
  "Data Entry & Office Automation",
  "Internet Basics & Email",
  "Typing (Hindi & English)",
  "Computer Fundamentals",
];

const Admission = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.course) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Show success message (static site - no backend)
    toast({
      title: "Application Submitted! ✅",
      description: "We've received your admission request. Our team will contact you within 24 hours at " + formData.phone,
    });

    // Reset form
    setFormData({ fullName: "", email: "", phone: "", course: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      course: value,
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
              Apply for Admission
            </h1>
            <p className="text-lg text-muted-foreground">
              Start your journey in computer education with Dev Bhumi. Fill out the form below and our team will guide you through the admission process.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <div className="h-14 w-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold">Easy Process</h3>
                <p className="text-sm text-muted-foreground">Simple admission procedure</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <div className="h-14 w-14 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                  <FileCheck className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold">No Documents</h3>
                <p className="text-sm text-muted-foreground">Start learning immediately</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <div className="h-14 w-14 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                  <Users className="h-7 w-7 text-destructive" />
                </div>
                <h3 className="font-semibold">Small Batches</h3>
                <p className="text-sm text-muted-foreground">Personal attention guaranteed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <div className="h-14 w-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold">Flexible Timing</h3>
                <p className="text-sm text-muted-foreground">Morning & evening batches</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Admission Application Form</CardTitle>
                <p className="text-center text-muted-foreground">
                  Fill in your details and we'll contact you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
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

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91-9805500827"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-foreground mb-2">
                      Select Course *
                    </label>
                    <Select onValueChange={handleSelectChange} value={formData.course} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Additional Information (Optional)
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your background, goals, or any questions..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Submit Application
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting this form, you agree to be contacted by Dev Bhumi Computer Academy regarding your admission inquiry.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Our admission team is here to help you choose the right course and guide you through the enrollment process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919805500827">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Call Us: +91-9805500827
              </Button>
            </a>
            <a href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Visit Our Office
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admission;
