import React from "react";
import HeroCTA from "./HeroCTA";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Lewa strona - Główny tekst */}
          <div className="space-y-6">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl
                         text-text
                         font-medium">
              Perfectionizm and minimalism is what I like
            </h1>

            <div
              className="text-lg md:text-xl text-text-muted
                         leading-relaxed max-w-lg animate-slide-up border-l-4 border-primary pl-6 italic">
              <p className="mb-2">"Why do something manually in 1 hour when you can automate it in 10 hours?"</p>
              <span className="text-sm font-medium text-text-muted not-italic">— My development philosophy</span>
            </div>
          </div>

          {/* Prawa strona - Przyciski */}
          <HeroCTA />
        </div>

        {/* Scrolling indicator - umieszczony na dole */}
        <div className="flex justify-center mt-20">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
