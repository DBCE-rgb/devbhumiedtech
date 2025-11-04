import { Info, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground py-3 px-4 animate-in slide-in-from-top duration-500">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Info className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm md:text-base font-medium">
            <span className="font-bold">New Courses Available!</span> Enroll now in DCA, ADCA, Tally, and Advanced Computer courses. Limited seats remaining.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/courses">
            <Button 
              variant="secondary" 
              size="sm"
              className="font-semibold whitespace-nowrap"
            >
              View Courses
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 flex-shrink-0"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
