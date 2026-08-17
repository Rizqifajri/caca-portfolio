import React from 'react';

export const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      role: 'Video Editor',
      company: 'Seva',
      period: '2021 - Present',
      description: 'Spearheaded video editing and post-production for various promotional campaigns, ensuring high-quality visual storytelling and brand consistency.',
      align: 'right' // Company/Role on the right
    },
    {
      id: 2,
      role: 'Video Editor',
      company: 'Cretivox',
      period: '2017 - 2020',
      description: 'Handled end-to-end video production, focusing on engaging content creation, motion graphics, and dynamic pacing for digital platforms.',
      align: 'left' // Company/Role on the left
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-[#a82525] text-5xl md:text-8xl font-cursive italic tracking-wide">
            Experiences
          </h2>
        </div>

        <div className="flex flex-col">
          {/* Top dashed line */}
          <div className="w-full border-t-[2px] border-dashed border-gray-300"></div>

          {experiences.map((exp) => (
            <React.Fragment key={exp.id}>
              <div className="py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">

                {exp.align === 'right' ? (
                  <>
                    {/* Date and Description on Left */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <p className="text-[#2b5a2b] font-medium mb-3">{exp.period}</p>
                      <p className="text-[#2b5a2b] leading-relaxed max-w-md text-sm md:text-base">
                        {exp.description}
                      </p>
                    </div>
                    {/* Title on Right */}
                    <div className="w-full md:w-1/2 flex justify-start md:justify-end items-center">
                      <h3 className="text-4xl md:text-6xl font-cursive italic">
                        <span className="text-[#2b5a2b]">{exp.company}</span>
                        <span className="text-[#2b5a2b] font-sans mx-2 text-3xl">-</span>
                        <span className="text-[#a82525]">{exp.role}</span>
                      </h3>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Title on Left */}
                    <div className="w-full md:w-1/2 flex justify-start items-center order-2 md:order-1">
                      <h3 className="text-4xl md:text-6xl font-cursive italic">
                        <span className="text-[#2b5a2b]">{exp.company}</span>
                        <span className="text-[#2b5a2b] font-sans mx-2 text-3xl">-</span>
                        <span className="text-[#a82525]">{exp.role}</span>
                      </h3>
                    </div>
                    {/* Date and Description on Right */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center order-1 md:order-2 md:pl-12">
                      <p className="text-[#2b5a2b] font-medium mb-3">{exp.period}</p>
                      <p className="text-[#2b5a2b] leading-relaxed max-w-md text-sm md:text-base">
                        {exp.description}
                      </p>
                    </div>
                  </>
                )}

              </div>
              {/* Bottom dashed line */}
              <div className="w-full border-t-[2px] border-dashed border-gray-300"></div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};
