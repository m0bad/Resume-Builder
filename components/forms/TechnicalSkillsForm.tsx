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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Skill } from "@/lib/types";
import { ResumeData } from "@/lib/types";

const skillSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Skill name must be at least 2 characters." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
});

const formSchema = z.object({
  skills: z
    .array(skillSchema)
    .min(1, { message: "At least one skill is required." }),
});

interface TechnicalSkillsFormProps {
  initialData: ResumeData["technicalSkills"];
  updateData: (values: ResumeData["technicalSkills"]) => void;
}

export function TechnicalSkillsForm({
  initialData,
  updateData,
}: TechnicalSkillsFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { skills: initialData },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  useEffect(() => {
    form.watch((value) => {
      if (form.formState.isValid) {
        updateData(value.skills as Skill[]);
      }
    });
  }, [form, updateData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[1fr,1fr,auto] items-end gap-4"
              >
                <FormField
                  control={form.control}
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., JavaScript" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`skills.${index}.level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-muted-foreground hover:text-destructive"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => append({ name: "", level: "Beginner" })}
            >
              Add Skill
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
