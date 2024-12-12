"use client"

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const jobSchema = z.object({
  jobTitle: z.string().min(2, { message: "Job title must be at least 2 characters." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format. Use YYYY-MM-DD." }),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format. Use YYYY-MM-DD." }).optional(),
  currentlyEmployed: z.boolean(),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
})

const formSchema = z.object({
  employments: z.array(jobSchema).min(1, { message: "At least one employment entry is required." })
})

export function EmploymentHistoryForm({ initialData, updateData }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { employments: initialData },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "employments",
  })

  function onSubmit(values) {
    updateData(values.employments)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`employments.${index}.jobTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`employments.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`employments.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`employments.${index}.currentlyEmployed`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Currently Employed</FormLabel>
                    </FormItem>
                  )}
                />
                {!form.watch(`employments.${index}.currentlyEmployed`) && (
                  <FormField
                    control={form.control}
                    name={`employments.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name={`employments.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove Job</Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ jobTitle: '', companyName: '', startDate: '', endDate: '', currentlyEmployed: false, description: '' })}>Add Job</Button>
            <Button type="submit">Save Employment History</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
