import React from 'react';

export const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      role: 'Senior Video Editor',
      company: 'Creative Agency Co.',
      period: '2023 - Present',
      description: 'Lead video editor for commercial projects, managing a team of junior editors and handling end-to-end post-production for high-profile clients.',
    },
    {
      id: 2,
      role: 'Freelance Video Editor',
      company: 'Self-Employed',
      period: '2021 - 2023',
      description: 'Collaborated with various YouTube creators and small businesses to produce engaging social media content, resulting in significant audience growth.',
    },
    {
      id: 3,
      role: 'Video Editor Intern',
      company: 'Media Startup Inc.',
      period: '2020 - 2021',
      description: 'Assisted in editing promotional videos, color grading, and audio mixing. Gained hands-on experience in fast-paced production environments.',
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-16 bg-ivory-mist text-forest-green font-sans">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-16 text-forest-green">
          Experience
        </h2>

        <div className="flex flex-col gap-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="group flex flex-col md:flex-row gap-4 md:gap-12 border-t border-forest-green/20 pt-8 transition-colors hover:border-crimson-red/50">
              <div className="md:w-1/3 flex-shrink-0">
                <p className="text-crimson-red font-semibold mb-2">{exp.period}</p>
                <h3 className="text-2xl font-medium tracking-tight text-forest-green group-hover:text-crimson-red transition-colors">
                  {exp.company}
                </h3>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-xl font-medium mb-4">{exp.role}</h4>
                <p className="text-forest-green/80 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
