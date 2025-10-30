import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    course: "Full Stack Web Development",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    rating: 5,
    comment: "Dev Bhumi Computer Education transformed my career! The instructors are highly knowledgeable and the hands-on training helped me land my first job as a web developer. Highly recommended!",
  },
  {
    name: "Rahul Verma",
    course: "Tally with GST",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    rating: 5,
    comment: "I completed my Tally course here and it was excellent. The practical approach to teaching made it easy to understand GST compliance. Now I'm working as an accountant in a reputed firm.",
  },
  {
    name: "Anjali Chauhan",
    course: "Digital Marketing",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    rating: 5,
    comment: "Best institute in Solan for digital marketing! I learned SEO, social media marketing, and Google Ads. The knowledge I gained here helped me start my own digital marketing agency.",
  },
  {
    name: "Vikram Singh",
    course: "Python Programming",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    rating: 5,
    comment: "Great learning environment with modern computer labs. The Python course was well-structured with real-world projects. Teachers are supportive and always ready to help.",
  },
  {
    name: "Neha Thakur",
    course: "Adobe Photoshop & CorelDRAW",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
    rating: 5,
    comment: "I'm now a professional graphic designer thanks to Dev Bhumi! The designing courses are comprehensive and the instructors are industry experts. Worth every penny!",
  },
  {
    name: "Amit Kumar",
    course: "MS Office & Tally",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    rating: 5,
    comment: "Affordable fees and quality education. I completed MS Office and Tally courses which helped me get a job in a private company. The staff is friendly and very helpful.",
  },
  {
    name: "Sonia Rana",
    course: "Java Programming",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sonia",
    rating: 5,
    comment: "Excellent teaching methodology! The Java course covered everything from basics to advanced concepts. The practical sessions were particularly helpful in understanding OOP concepts.",
  },
  {
    name: "Deepak Mehta",
    course: "Advanced Excel",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak",
    rating: 5,
    comment: "The Advanced Excel course was a game-changer for my career. I learned complex formulas, pivot tables, and data analysis techniques. Now I'm handling data analysis for a multinational company.",
  },
  {
    name: "Kavita Sharma",
    course: "Video Editing",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita",
    rating: 5,
    comment: "Amazing institute with state-of-the-art facilities! The video editing course taught me professional techniques in Premiere Pro. I'm now working as a freelance video editor.",
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Student Testimonials
            </h1>
            <p className="text-lg text-muted-foreground">
              Hear from our successful students who have transformed their careers with Dev Bhumi Computer Education
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Job Placement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  {/* Quote Icon */}
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="h-5 w-5 text-primary" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-muted-foreground italic">
                    "{testimonial.comment}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full bg-muted"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Join Our Success Stories
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey towards a successful career in technology. 
            Enroll today and be our next success story!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/admission">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Apply Now
              </button>
            </a>
            <a href="/contact">
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
