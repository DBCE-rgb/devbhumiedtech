import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Dev Bhumi Computer Education
            </h1>
            <p className="text-lg text-muted-foreground">
              Empowering Himachal Pradesh with quality computer education since September 2022
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Established in <strong className="text-foreground">September 2022</strong>, Dev Bhumi Computer Education was founded with a vision to bridge the digital literacy gap in Solan, Himachal Pradesh. Located in the heart of Kotla Nala, we have been dedicated to providing accessible, high-quality computer training to students, professionals, and entrepreneurs.
                </p>
                <p>
                  Our institute is strategically located at <strong className="text-foreground">Thakur Complex, 2nd Floor, Kotla Nala, opposite PNB Bank</strong>, making it easily accessible for learners across Solan district. What started as a small initiative has grown into a trusted name in computer education, with hundreds of successful students.
                </p>
                <p>
                  We believe that quality education should be affordable and accessible to everyone. Our experienced trainers bring industry expertise to the classroom, ensuring that our students receive practical, job-ready skills that employers value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower local students and professionals with industry-relevant computer skills through quality education, hands-on training, and personalized mentorship.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 bg-accent/10 rounded-full flex items-center justify-center">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                <p className="text-muted-foreground">
                  To make Himachal Pradesh digitally skilled and career-ready, creating opportunities for the youth to thrive in the technology-driven world.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-destructive/20">
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Values</h3>
                <p className="text-muted-foreground">
                  Excellence in teaching, integrity in operations, accessibility for all, and commitment to student success are the core values that drive us.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                      DB
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Founder's Message</h3>
                      <p className="text-muted-foreground">Director, Dev Bhumi Computer Education</p>
                    </div>
                  </div>
                  <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                    <p>
                      "When we started Dev Bhumi Computer Education in 2022, our goal was simple: to provide affordable, quality computer training that truly prepares students for the real world. Solan and the surrounding areas had limited options for comprehensive IT education, and we wanted to change that."
                    </p>
                    <p>
                      "Today, I'm proud to see hundreds of our students successfully building careers in technology, running their own businesses, and contributing to the digital economy. Our success is measured not by certificates issued, but by the lives we've transformed."
                    </p>
                    <p>
                      "We continue to evolve our curriculum, update our facilities, and train our instructors to ensure that every student who walks through our doors receives education that's relevant, practical, and career-focused. Thank you for trusting us with your education."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
