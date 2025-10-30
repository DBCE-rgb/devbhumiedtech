import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, BarChart } from "lucide-react";

const courses = [
  // Basic Computer Education
  {
    category: "Basic Computer Education",
    title: "MS Office (Word, Excel, PowerPoint)",
    description: "Master essential office productivity tools for professional documentation, data analysis, and presentations.",
    duration: "2 Months",
    level: "Beginner",
  },
  {
    category: "Basic Computer Education",
    title: "Internet Basics & Email Management",
    description: "Learn web browsing, online safety, email communication, and digital etiquette.",
    duration: "1 Month",
    level: "Beginner",
  },
  {
    category: "Basic Computer Education",
    title: "Typing (Hindi & English)",
    description: "Improve typing speed and accuracy with professional typing techniques.",
    duration: "1 Month",
    level: "Beginner",
  },
  {
    category: "Basic Computer Education",
    title: "Computer Fundamentals",
    description: "Understanding hardware, software, operating systems, and basic troubleshooting.",
    duration: "1.5 Months",
    level: "Beginner",
  },
  
  // Accounting & Business
  {
    category: "Accounting & Business",
    title: "Tally with GST",
    description: "Comprehensive accounting software training with GST compliance and inventory management.",
    duration: "3 Months",
    level: "Beginner",
  },
  {
    category: "Accounting & Business",
    title: "Advanced Excel for Business",
    description: "Data analysis, pivot tables, VLOOKUP, macros, and business intelligence with Excel.",
    duration: "2 Months",
    level: "Advanced",
  },
  
  // Programming
  {
    category: "Programming",
    title: "C Programming",
    description: "Foundation of programming with C language, algorithms, and problem-solving.",
    duration: "3 Months",
    level: "Beginner",
  },
  {
    category: "Programming",
    title: "C++ Programming",
    description: "Object-oriented programming concepts with C++ and real-world applications.",
    duration: "3 Months",
    level: "Beginner",
  },
  {
    category: "Programming",
    title: "Java Programming",
    description: "Learn Java fundamentals, OOP concepts, and build robust applications.",
    duration: "4 Months",
    level: "Advanced",
  },
  {
    category: "Programming",
    title: "Python Programming",
    description: "Modern programming with Python for automation, data analysis, and web development.",
    duration: "3 Months",
    level: "Beginner",
  },
  {
    category: "Programming",
    title: "HTML, CSS & JavaScript",
    description: "Build responsive websites with modern web technologies and interactive features.",
    duration: "3 Months",
    level: "Beginner",
  },
  
  // Designing & Multimedia
  {
    category: "Designing & Multimedia",
    title: "Adobe Photoshop",
    description: "Professional photo editing, graphic design, and digital art creation.",
    duration: "2 Months",
    level: "Beginner",
  },
  {
    category: "Designing & Multimedia",
    title: "CorelDRAW",
    description: "Vector graphics design for logos, brochures, and marketing materials.",
    duration: "2 Months",
    level: "Beginner",
  },
  {
    category: "Designing & Multimedia",
    title: "Adobe Illustrator",
    description: "Create stunning vector graphics, illustrations, and professional designs.",
    duration: "2 Months",
    level: "Beginner",
  },
  {
    category: "Designing & Multimedia",
    title: "Video Editing (Premiere Pro)",
    description: "Professional video editing, color grading, and post-production techniques.",
    duration: "3 Months",
    level: "Advanced",
  },
  
  // Advanced IT & Digital Skills
  {
    category: "Advanced IT & Digital Skills",
    title: "Full Stack Web Development",
    description: "Complete web development with frontend, backend, and database technologies.",
    duration: "6 Months",
    level: "Advanced",
  },
  {
    category: "Advanced IT & Digital Skills",
    title: "Digital Marketing",
    description: "SEO, social media marketing, Google Ads, content marketing, and analytics.",
    duration: "3 Months",
    level: "Beginner",
  },
  {
    category: "Advanced IT & Digital Skills",
    title: "Networking Basics (CCNA)",
    description: "Computer networks, routing, switching, and network security fundamentals.",
    duration: "4 Months",
    level: "Advanced",
  },
  {
    category: "Advanced IT & Digital Skills",
    title: "Data Entry & Office Automation",
    description: "Professional data entry skills with speed, accuracy, and office tools.",
    duration: "1 Month",
    level: "Beginner",
  },
];

const Courses = () => {
  const categories = Array.from(new Set(courses.map(c => c.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive computer training programs designed for students, professionals, and entrepreneurs. 
              All courses include hands-on practice and industry-recognized certifications.
            </p>
          </div>
        </div>
      </section>

      {/* Courses by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {categories.map((category) => (
            <div key={category} className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 pb-4 border-b-2 border-primary">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((course) => course.category === category)
                  .map((course, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <div className="flex gap-2 flex-wrap pt-2">
                          <Badge variant={course.level === "Beginner" ? "secondary" : "default"}>
                            <BarChart className="h-3 w-3 mr-1" />
                            {course.level}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{course.description}</p>
                        <Link to="/admission">
                          <Button className="w-full">Enroll Now</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join hundreds of successful students who have transformed their careers with our training programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admission">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Apply for Admission
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
