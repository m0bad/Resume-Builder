"use client"

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skillSchema = z.object({
  name: z.string().min(2, { message: "Skill name must be at least 2 characters." }),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
})

const formSchema = z.object({
  skills: z.array(skillSchema).min(1, { message: "At least one skill is required." })
})

export function TechnicalSkillsForm({ initialData, updateData }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { skills: initialData },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  })

  function onSubmit(values) {
    updateData(values.skills)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end space-x-2">
                <FormField
                  control={form.control}
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={() => append({ name: '', level: 'Beginner' })}>Add Skill</Button>
            <Button type="submit">Save Technical Skills</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
