"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { Education, ResumeData } from "@/lib/types";

const educationSchema = z.object({
  schoolName: z
    .string()
    .min(2, { message: "School name must be at least 2 characters." }),
  degree: z
    .string()
    .min(2, { message: "Degree must be at least 2 characters." }),
  startYear: z
    .number()
    .min(1900, { message: "Start year must be 1900 or later." })
    .max(new Date().getFullYear(), {
      message: "Start year cannot be in the future.",
    }),
  endYear: z
    .number()
    .min(1900, { message: "End year must be 1900 or later." })
    .max(new Date().getFullYear(), {
      message: "End year cannot be in the future.",
    }),
});

const formSchema = z.object({
  educations: z
    .array(educationSchema)
    .min(1, { message: "At least one education entry is required." }),
});

interface EducationFormProps {
  initialData: ResumeData["educations"];
  updateData: (values: ResumeData["educations"]) => void;
}

export function EducationForm({ initialData, updateData }: EducationFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { educations: initialData },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  useEffect(() => {
    form.watch((value) => {
      if (form.formState.isValid) {
        updateData(value.educations as Education[]);
      }
    });
  }, [form, updateData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`educations.${index}.schoolName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.startYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.endYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Remove Education
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                append({
                  schoolName: "",
                  degree: "",
                  startYear: new Date().getFullYear(),
                  endYear: new Date().getFullYear(),
                })
              }
            >
              Add Education
            </Button>
            <Button type="submit">Save Education</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
