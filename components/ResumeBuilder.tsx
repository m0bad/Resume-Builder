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

  const updateData = <T extends keyof ResumeData>(
    section: T,
    newData: ResumeData[T]
  ) => {
    setData((prevData) => {
      const newState = {
        ...prevData,
        [section]: newData,
      };
      return newState;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 p-4 overflow-y-auto">
        <div className="space-y-4">
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
      </div>

      <div className="w-1/2 p-4 sticky top-0 h-screen overflow-y-auto">
        <ResumePreview data={data} />
      </div>
    </div>
  );
}
