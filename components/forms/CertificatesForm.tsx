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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { ResumeData, Certificate } from "@/lib/types";
const certificateSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Certificate name must be at least 2 characters." }),
  month: z
    .number()
    .min(1, { message: "Month must be between 1 and 12." })
    .max(12, { message: "Month must be between 1 and 12." }),
  year: z
    .number()
    .min(1900, { message: "Year must be 1900 or later." })
    .max(new Date().getFullYear(), {
      message: "Year cannot be in the future.",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
});

const formSchema = z.object({
  certificates: z.array(certificateSchema),
});

interface CertificatesFormProps {
  initialData: ResumeData["certificates"];
  updateData: (values: ResumeData["certificates"]) => void;
}

export function CertificatesForm({
  initialData,
  updateData,
}: CertificatesFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { certificates: initialData },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  useEffect(() => {
    form.watch((value) => {
      if (form.formState.isValid) {
        updateData(value.certificates as Certificate[]);
      }
    });
  }, [form, updateData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certificates</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`certificates.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`certificates.${index}.month`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
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
                  name={`certificates.${index}.year`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
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
                  name={`certificates.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
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
                  Remove Certificate
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  month: 1,
                  year: new Date().getFullYear(),
                  description: "",
                })
              }
            >
              Add Certificate
            </Button>
            <Button type="submit">Save Certificates</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
