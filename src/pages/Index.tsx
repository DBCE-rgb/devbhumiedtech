import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Award, Users, Briefcase, BookOpen, Clock, GraduationCap } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold text-sm">Established September 2022</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Learn Digital Skills with <span className="text-primary">Dev Bhumi</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Quality computer education and certified training programs in Solan, Himachal Pradesh. 
                Empowering students, professionals, and entrepreneurs with industry-ready skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/admission">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={logo} 
                alt="Dev Bhumi Computer Education" 
                className="w-full max-w-md rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Dev Bhumi?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive computer education with hands-on training and industry certifications
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-16 w-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Certified Trainers</h3>
                <p className="text-muted-foreground">
                  Learn from industry-experienced instructors with professional certifications
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-16 w-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Hands-On Learning</h3>
                <p className="text-muted-foreground">
                  Practical training with real-world projects and modern computer labs
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-destructive transition-colors">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-16 w-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold">Job Assistance</h3>
                <p className="text-muted-foreground">
                  Career guidance and placement support to kickstart your professional journey
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Students Trained</div>
            </div>
            <div className="text-center">
              <GraduationCap className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-primary-foreground/80">Courses Offered</div>
            </div>
            <div className="text-center">
              <Award className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-foreground/80">Certified Programs</div>
            </div>
            <div className="text-center">
              <Clock className="h-10 w-10 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">2+</div>
              <div className="text-primary-foreground/80">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-accent/20 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              🎉 New Batch Starting Soon!
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Enroll now in our Advanced Web Development and Digital Marketing courses. 
              Limited seats available for the upcoming batch.
            </p>
            <Link to="/admission">
              <Button size="lg" className="mx-auto">
                Register Your Interest
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
