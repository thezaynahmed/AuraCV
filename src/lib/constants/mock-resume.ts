import { Resume } from "@/lib/types/resume";

export const MOCK_RESUME: Resume = {
  id: "mock-resume-id",
  profile: {
    name: "Zain Ahmed",
    email: "hello@zainahmed.net",
    phone: "647-920-1877",
    url: "linkedin.com/in/zainahmed", // Using url for LinkedIn
    location: "Toronto, ON",
    title: "Senior Cloud Engineer", // Added missing title
    summary:
      "Senior Cloud Infrastructure Engineer with 7 years of proven expertise in architecting and automating secure, enterprise-scale Azure environments. Specialized in designing resilient cloud solutions, implementing robust CI/CD pipelines, and driving DevSecOps best practices. Adept at leveraging Infrastructure as Code (IaC) to streamline deployments and enhance operational efficiency.",
  },
  sections: {
    experience: [
      {
        id: "exp-1",
        company: "PivotalBuild",
        position: "Senior Cloud, DevOps/DevSecOps Engineer",
        startDate: "2023-10",
        endDate: "Present",
        current: true,
        location: "Remote",
        description:
          "<ul><li>Architected migration from GCP-centric v1 to scalable multi-cloud (AWS, Azure, GCP).</li><li>Operationalized elite DevSecOps CI/CD strategy with GitLab CI & GitHub Actions.</li></ul>",
      },
      {
        id: "exp-2",
        company: "MapleGenix",
        position: "Cloud & DevOps Engineer",
        startDate: "2024-10",
        endDate: "Present",
        current: true,
        location: "Remote",
        description:
          "<ul><li>Engineered high-velocity CI/CD pipeline achieving 10x reduction in manual overhead.</li></ul>",
      },
    ],
    education: [
      {
        id: "edu-1",
        institution: "Aptech Institute",
        degree: "Advanced Diploma",
        fieldOfStudy: "Software Engineering",
        startDate: "2015-01",
        endDate: "2017-01",
        current: false,
        location: "",
        description: "Graduated with Honors", // Changed score to description
      },
    ],
    skills: [
      { id: "skill-1", name: "Azure Platform", level: "Advanced" }, // Changed category/items to name/level
      { id: "skill-2", name: "AKS", level: "Expert" },
      { id: "skill-3", name: "Monitor", level: "Intermediate" },
      { id: "skill-4", name: "Policy", level: "Advanced" },
      { id: "skill-5", name: "RBAC", level: "Advanced" },
      { id: "skill-6", name: "IaC", level: "Advanced" },
      { id: "skill-7", name: "Bicep", level: "Expert" },
      { id: "skill-8", name: "Terraform", level: "Expert" },
      { id: "skill-9", name: "Ansible", level: "Advanced" },
      { id: "skill-10", name: "CI/CD", level: "Advanced" },
      { id: "skill-11", name: "Azure DevOps", level: "Expert" },
      { id: "skill-12", name: "GitHub Actions", level: "Expert" },
      { id: "skill-13", name: "Security", level: "Advanced" },
      { id: "skill-14", name: "Azure Defender", level: "Intermediate" },
      { id: "skill-15", name: "Vault", level: "Intermediate" },
    ],
    projects: [
      {
        id: "proj-1",
        name: "Cloud Migration Project",
        description: "Migrated on-premise infrastructure to Azure, resulting in 30% cost savings and improved scalability.",
        url: "https://example.com/project1",
        technologies: ["Azure", "Terraform", "Ansible"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  settings: {
    fontFamily: "Helvetica",
    theme: "modern",
    accentColor: "#000000",
    documentSize: "LETTER",
  },
};
