import { resumeData } from "@/lib/tempData";
import { ResumePreview } from "./ResumePreview";

export function ResumeBuilder() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 p-4">
        {/* Form will go here in the future */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Resume Form</h2>
          <p>Form components will be added here.</p>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <ResumePreview data={resumeData} />
      </div>
    </div>
  )
}

