import React from 'react';

export const ContactSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Hanging Telephone */}
      <img 
        src="/icons/telephone.svg" 
        alt="Telephone" 
        className="absolute left-[5%] md:left-[10%] top-0 w-24 md:w-96 h-auto object-contain z-10 drop-shadow-xl" 
      />

      {/* Snoopy */}
      <img 
        src="/icons/snoopy.svg" 
        alt="Snoopy" 
        className="absolute right-[5%] md:right-[15%] bottom-[100px] md:bottom-[120px] w-32 md:w-56 h-auto object-contain z-20" 
      />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center justify-center mt-[-50px] px-4">
        
        {/* Title */}
        <h2 className="text-[#008000] text-6xl md:text-[7rem] font-cursive italic mb-16 md:mb-24">
          Get in Touch
        </h2>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-8 md:gap-y-12 text-center md:text-left text-[#008000] text-xl md:text-2xl font-sans font-medium">
          
          <div className="flex items-center justify-center md:justify-start">
            <p>@cantikafitriani</p>
          </div>
          
          <div className="flex items-center justify-center md:justify-start">
            <a href="mailto:cantika@mail.com" className="underline underline-offset-4 decoration-1 hover:text-[#a82525] transition-colors">
              cantika@mail.com
            </a>
          </div>
          
          <div className="flex items-center justify-center md:justify-start">
            <p>cantika fitriani</p>
          </div>
          
          <div className="flex items-center justify-center md:justify-start">
            <p>+62 83894631800</p>
          </div>

        </div>

      </div>

      {/* Bottom Border */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32 md:h-[150px] z-30 pointer-events-none" 
        style={{ 
          backgroundImage: 'url(/icons/kain-green.svg)', 
          backgroundSize: 'auto 100%', 
          backgroundRepeat: 'repeat-x', 
          backgroundPosition: 'bottom left' 
        }}
      />
      
    </section>
  );
};
