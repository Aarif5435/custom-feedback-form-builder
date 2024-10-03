import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Plus, Pencil, Trash2, Star, Hash, AlignLeft, Radio, List, Calendar, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function FormBuilder() {
  const [formFields, setFormFields] = useState([
    { type: 'textarea', label: 'Textarea' },
    { type: 'numeric', label: 'Numeric' },
    { type: 'star', label: 'Star' },
  ])

  const addField = (type: string) => {
    setFormFields([...formFields, { type, label: type.charAt(0).toUpperCase() + type.slice(1) }])
  }

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">User Feedback</h1>
        <div className="space-x-2">
          <Button variant="outline">Save</Button>
          <Button>Publish</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                <span>Feedback Form</span>
                <Pencil className="w-5 h-5 ml-auto" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 border-2">
              {formFields.map((field, index) => (
                <FormField key={index} {...field} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add fields</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <FieldButton icon={<AlignLeft />} label="Textarea" onClick={() => addField('textarea')} />
                <FieldButton icon={<Hash />} label="Numeric rating" onClick={() => addField('numeric')} />
                <FieldButton icon={<Star />} label="Star rating" onClick={() => addField('star')} />
                <FieldButton icon={<Radio />} label="Radio button" onClick={() => addField('radio')} />
                <FieldButton icon={<List />} label="Categories" onClick={() => addField('categories')} />
                <FieldButton icon={<AlignLeft />} label="Single line input" onClick={() => addField('input')} />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Display conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="url-condition">Show based on URL conditions</Label>
                  <Switch id="url-condition" />
                </div>
                <Input placeholder="/about" />
                <div className="flex items-center justify-between">
                  <Label htmlFor="date-condition">Show on a specific date</Label>
                  <Switch id="date-condition" />
                </div>
                <Input type="date" />
                <div className="flex items-center justify-between">
                  <Label htmlFor="time-condition">Show on a specific time</Label>
                  <Switch id="time-condition" />
                </div>
                <Input type="time" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FormField({ type, label }: {type: string, label: string}) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        {type === 'textarea' && <Textarea placeholder="Enter your text here..." />}
        {type === 'numeric' && (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <Button key={num} variant="outline" size="sm">
                {num}
              </Button>
            ))}
          </div>
        )}
        {type === 'star' && (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star key={num} className="w-6 h-6 text-muted-foreground" />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button size="icon" variant="ghost">
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function FieldButton({ icon, label, onClick }:{icon: any, label: string, onClick: ()=> void}) {
  return (
    <Button variant="outline" className="h-20 flex-col" onClick={onClick}>
      {icon}
      <span className="mt-2">{label}</span>
    </Button>
  )
}