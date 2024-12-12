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
import { Trash2 } from "lucide-react";

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

export function CertificatesForm({
  initialData,
  updateData,
}: {
  initialData: ResumeData["certificates"];
  updateData: (values: ResumeData["certificates"]) => void;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { certificates: initialData },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  const handleRemove = (index: number) => {
    remove(index);
    const currentCertificates = form.getValues("certificates");
    updateData(currentCertificates);
  };

  const handleNumberChange = (
    index: number,
    field: { onChange: (value: number) => void },
    value: string,
    fieldName: "month" | "year"
  ) => {
    const numValue = parseInt(value, 10);
    field.onChange(numValue);

    const currentCertificates = form.getValues("certificates");
    currentCertificates[index][fieldName] = numValue;
    updateData(currentCertificates);
  };

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
              <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                <FormField
                  control={form.control}
                  name={`certificates.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Certificate Name</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
                            handleNumberChange(
                              index,
                              field,
                              e.target.value,
                              "month"
                            )
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
                            handleNumberChange(
                              index,
                              field,
                              e.target.value,
                              "year"
                            )
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
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
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
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
