import { ResumeData } from "./types";

export const resumeData: ResumeData = {
  personalDetails: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 555-1234",
    country: "USA",
    city: "New York",
    address: "123 Main St, Apt 4B",
    jobTitle: "Senior Frontend Developer",
    summary: `Results-driven Senior Frontend Developer with 5+ years of experience specializing in React and TypeScript.
Proven track record of leading engineering teams and delivering high-impact web applications.
Strong expertise in building accessible, performant, and scalable user interfaces.
Experienced in modern frontend architectures, state management, and responsive design patterns.
Passionate about mentoring developers and implementing best practices for code quality.`,
  },
  technicalSkills: [
    { name: "React", level: "Expert" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Node.js", level: "Advanced" },
    { name: "CSS", level: "Expert" },
    { name: "GraphQL", level: "Intermediate" },
  ],
  employments: [
    {
      jobTitle: "Senior Frontend Developer",
      companyName: "TechCorp Inc",
      startDate: "2020-06-01",
      currentlyEmployed: true,
      description: `<p>
• Led and mentored a team of 6 frontend engineers, implementing agile methodologies and improving team velocity by 40%
• Architected and developed a modern SaaS platform using React, TypeScript, and GraphQL, serving 100k+ monthly active users
• Implemented comprehensive component library and design system, reducing development time by 60%
• Optimized application performance, achieving 30% improvement in load times and 95+ Lighthouse scores
• Established frontend testing practices, achieving 85% code coverage using Jest and React Testing Library</p>`,
    },
    {
      jobTitle: "Frontend Engineer",
      companyName: "WebWorks LLC",
      startDate: "2018-01-01",
      endDate: "2020-05-31",
      currentlyEmployed: false,
      description: `<p>
• Developed and maintained responsive web applications using React, Redux, and TypeScript
• Improved web accessibility compliance to WCAG 2.1 AA standards, increasing accessibility score by 45%
• Reduced bundle size by 35% through code splitting and lazy loading implementation
• Collaborated with UX team to implement new design system, improving consistency across products
• Built reusable component library used across 3 different product lines</p>`,
    },
  ],
  educations: [
    {
      schoolName: "University of Example",
      degree: "B.S. in Computer Science",
      startYear: 2014,
      endYear: 2018,
    },
  ],
  certificates: [
    {
      name: "AWS Certified Solutions Architect",
      month: 5,
      year: 2021,
      description:
        "Demonstrated knowledge in designing scalable AWS solutions.",
    },
    {
      name: "Scrum Master Certification",
      month: 9,
      year: 2019,
      description:
        "Showed expertise in agile methodologies and team leadership.",
    },
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Spanish", proficiency: "Fluent" },
    { name: "French", proficiency: "Conversational" },
  ],
};
