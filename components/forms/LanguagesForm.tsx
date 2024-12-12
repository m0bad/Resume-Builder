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
import { useEffect } from "react";
import { Language } from "@/lib/types";
import { ResumeData } from "@/lib/types";
import { Trash2 } from "lucide-react";

const languageSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Language name must be at least 2 characters." }),
  proficiency: z.enum(["Basic", "Conversational", "Fluent", "Native"]),
});

const formSchema = z.object({
  languages: z.array(languageSchema),
});

export function LanguagesForm({
  initialData,
  updateData,
}: {
  initialData: ResumeData["languages"];
  updateData: (values: ResumeData["languages"]) => void;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { languages: initialData },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const handleRemove = (index: number) => {
    remove(index);
    const currentLanguages = form.getValues("languages");
    updateData(currentLanguages);
  };

  useEffect(() => {
    form.watch((value) => {
      if (form.formState.isValid) {
        updateData(value.languages as Language[]);
      }
    });
  }, [form, updateData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                <FormField
                  control={form.control}
                  name={`languages.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Language</FormLabel>
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
                  name={`languages.${index}.proficiency`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proficiency</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          const currentLanguages = form.getValues("languages");
                          updateData(currentLanguages);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select proficiency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Conversational">
                            Conversational
                          </SelectItem>
                          <SelectItem value="Fluent">Fluent</SelectItem>
                          <SelectItem value="Native">Native</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: "", proficiency: "Basic" })}
            >
              Add Language
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
