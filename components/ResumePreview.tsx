import { ResumeData } from "@/lib/types";
import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <Card className="overflow-auto">
      <CardContent className="p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">{data.personalDetails.name}</h1>
          <h2 className="text-xl text-gray-600">
            {data.personalDetails.jobTitle}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">About Me</h3>
              <p>{data.personalDetails.summary}</p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Employment History</h3>
              {data.employments.map((job, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">
                    {job.jobTitle} at {job.companyName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formatDate(job.startDate)} -{" "}
                    {job.currentlyEmployed
                      ? "Present"
                      : formatDate(job.endDate!)}
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: job.description }} />
                </div>
              ))}
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              {data.educations.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p>
                    {edu.schoolName}, {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))}
            </section>
          </div>

          <div>
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />{" "}
                  {data.personalDetails.city}, {data.personalDetails.country}
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />{" "}
                  {data.personalDetails.phone}
                </p>
                <p className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> {data.personalDetails.email}
                </p>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.technicalSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill.name} - {skill.level}
                  </Badge>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Certificates</h3>
              {data.certificates.map((cert, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-sm flex items-center">
                    <Calendar className="mr-2 h-4 w-4" /> {cert.month}/
                    {cert.year}
                  </p>
                  <p>{cert.description}</p>
                </div>
              ))}
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">Languages</h3>
              {data.languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-1"
                >
                  <span>{lang.name}</span>
                  <Badge variant="outline">{lang.proficiency}</Badge>
                </div>
              ))}
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
