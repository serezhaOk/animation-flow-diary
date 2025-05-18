
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="mt-24 pb-32 max-w-2xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-medium mb-8">About Interaction Diary</h1>
      
      <div className="space-y-6 text-base md:text-lg">
        <p>
          Interaction Diary is a carefully curated collection of interface animations and micro-interactions 
          from iOS and beyond, designed as an educational resource for designers and developers.
        </p>
        
        <p>
          The site allows you to study animations frame-by-frame using the hover-to-scrub feature, 
          giving you complete control over the playback. Save your favorite animations to your bookmarks 
          for quick reference.
        </p>

        <p>
          All animations are shown in context within iPhone mockups to provide a realistic sense of 
          how they feel in actual use.
        </p>
        
        <h2 className="text-xl md:text-2xl font-medium mt-12 mb-4">Categories</h2>
        
        <ul className="space-y-2">
          <li>
            <Link to="/gestures" className="text-primary hover:opacity-80 transition-opacity">
              Gestures
            </Link> - Swipes, pinches, pulls and other gesture-based interactions
          </li>
          <li>
            <Link to="/ios" className="text-primary hover:opacity-80 transition-opacity">
              iOS
            </Link> - Animations specific to iOS interface elements
          </li>
          <li>
            <Link to="/microanimations" className="text-primary hover:opacity-80 transition-opacity">
              Micro-animations
            </Link> - Small, subtle animations that enhance the user experience
          </li>
        </ul>
        
        <h2 className="text-xl md:text-2xl font-medium mt-12 mb-4">Contact</h2>
        
        <p>
          Have a suggestion for an animation that should be featured? 
          Contact us at <a href="mailto:hello@interactiondiary.com" className="text-primary hover:opacity-80 transition-opacity">hello@interactiondiary.com</a>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
