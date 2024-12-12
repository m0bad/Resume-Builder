"use client";

import { useState } from "react";
import { ResumePreview } from "./ResumePreview";
import { PersonalDetailsForm } from "./forms/PersonalDetailsForm";
import { TechnicalSkillsForm } from "./forms/TechnicalSkillsForm";
import { EmploymentHistoryForm } from "./forms/EmploymentHistoryForm";
import { EducationForm } from "./forms/EducationForm";
import { CertificatesForm } from "./forms/CertificatesForm";
import { LanguagesForm } from "./forms/LanguagesForm";
import { resumeData } from "@/lib/tempData";
import { ResumeData } from "@/lib/types";

export function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(resumeData);

  const updateData = (section: keyof ResumeData, newData: any) => {
    setData((prevData) => ({
      ...prevData,
      [section]: newData,
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 p-4 space-y-4 overflow-y-auto">
        <PersonalDetailsForm
          initialData={data.personalDetails}
          updateData={(newData) => updateData("personalDetails", newData)}
        />
        <TechnicalSkillsForm
          initialData={data.technicalSkills}
          updateData={(newData) => updateData("technicalSkills", newData)}
        />
        <EmploymentHistoryForm
          initialData={data.employments}
          updateData={(newData) => updateData("employments", newData)}
        />
        <EducationForm
          initialData={data.educations}
          updateData={(newData) => updateData("educations", newData)}
        />
        <CertificatesForm
          initialData={data.certificates}
          updateData={(newData) => updateData("certificates", newData)}
        />
        <LanguagesForm
          initialData={data.languages}
          updateData={(newData) => updateData("languages", newData)}
        />
      </div>
      <div className="w-1/2 p-4">
        <ResumePreview data={data} />
      </div>
    </div>
  );
}
