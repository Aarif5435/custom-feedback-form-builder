'use client'

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  AlignLeft,
  ArrowLeft,
  ChevronLeft,
  Edit2,
  Hash,
  List,
  Radio,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import terrible from "../../../public/asset/terible.svg";
import bad from "../../../public/asset/bad.svg";
import okay from "../../../public/asset/okay.svg";
import good from "../../../public/asset/good.svg";
import great from "../../../public/asset/great.svg";
import smiley from "../../../public/asset/smiley_icon.png";
import {
  FormControlLabel,
  RadioGroup,
  Radio as Radiobtn,
  Button as MuiButton,
} from "@mui/material";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";

type Field = {
  id: string;
  type: string;
  label: string;
  options?: string[];
  category?: string[];
  required?: boolean;
  errorMessage?: string;
};

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([
    { id: "1", type: "textarea", label: "Textarea" },
    { id: "2", type: "numeric", label: "Numeric" },
    { id: "3", type: "star", label: "Star" },
    { id: "4", type: "emoji", label: "React" },
    { id: "5", type: "singleline", label: "One line" },
    { id: "6", type: "radio", label: "Radio", options: ["Yes", "No"] },
    {
      id: "7",
      type: "category",
      label: "Category",
      category: ["Yes", "No", "Both"],
    },
  ]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [urlCondition, setUrlCondition] = useState(false);
  const [dateCondition, setDateCondition] = useState(false);
  const [timeCondition, setTimeCondition] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [themeColor, setThemeColor] = useState("#000000");
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [formWidth, setFormWidth] = useState("900");
  const [formHeight, setFormHeight] = useState("800");
  const [isClient, setIsClient] = useState(false);

  const router = useRouter()

useEffect(() => {
  setIsClient(true); // Mark that we are now on the client
}, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", themeColor);
  }, [themeColor]);

  const emojis = [
    { src: terrible, alt: "Terrible", value: "terrible" },
    { src: bad, alt: "Bad", value: "bad" },
    { src: okay, alt: "Okay", value: "okay" },
    { src: good, alt: "Good", value: "good" },
    { src: great, alt: "Great", value: "great" },
  ];

  const availableFields = [
    { type: "textarea", label: "Textarea", icon: <AlignLeft /> },
    { type: "numeric", label: "Numeric rating", icon: <Hash /> },
    { type: "star", label: "Star rating", icon: <Star /> },
    { type: "smiley", label: "Smiley rating", icon: <AlignLeft /> },
    { type: "singleLine", label: "Single line input", icon: <AlignLeft /> },
    { type: "radio", label: "Radio button", icon: <Radio /> },
    { type: "categories", label: "Categories", icon: <List /> },
  ];

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  const handleEditField = (field: Field) => {
    setEditingField(field);
  };

  const handleUpdateField = (updatedField: Field) => {
    setFields(fields.map((f) => (f.id === updatedField.id ? updatedField : f)));
    setEditingField(null);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const handleIconClick = (value: string) => {
    setSelectedEmoji(value);
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea placeholder="Enter your text here..." className="w-full" />
        );
      case "numeric":
        return (
          <div className="flex space-x-2">
            {[...Array(10)].map((_, index) => (
              <label
                key={index}
                className="flex flex-col items-center cursor-pointer"
              >
                <input
                  key={index}
                  type="radio"
                  name={`rating-${field.id}`}
                  value={index + 1}
                  className="hidden peer"
                  onClick={(e: any) => console.log(e.target.value)}
                />
                <span className="w-12 h-12 flex items-center justify-center rounded-full border border-[var(--theme-color)] peer-checked:bg-[var(--theme-color)] peer-checked:text-white transition-all duration-200">
                  {index + 1}
                </span>
              </label>
            ))}
          </div>
        );
      case "star":
        return (
          <div className="mb-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`text-3xl cursor-pointer transition-colors duration-150 ${
                  hover >= star ? "text-[var(--theme-color)]" : "text-gray-300"
                }`}
                onMouseEnter={() => {
                  setHover(star);
                }}
                onMouseLeave={() => setHover(rating)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        );

      case "emoji":
        return (
          <div className="mb-4 flex justify-start gap-3">
            {emojis.map((emoji) => (
              <Image
                key={emoji.value}
                className={`transition-transform text-[var(--theme-color)] transform hover:scale-110 cursor-pointer ${
                  selectedEmoji === emoji.value ? "opacity-60" : ""
                }`}
                width={45}
                height={45}
                src={emoji.src}
                alt={emoji.alt}
                onClick={() => handleIconClick(emoji.value)}
              />
            ))}
          </div>
        );
      case "singleline":
        return (
          <div className="mb-4">
            <input
              type="text"
              className="flex min-h-[50px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your text here..."
            />
          </div>
        );

      case "radio":
        return (
          <div className="mb-4">
            <RadioGroup className="space-y-3">
              {field.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radiobtn color={"default"} />}
                  label={option}
                  className="text-gray-700"
                />
              ))}
            </RadioGroup>
          </div>
        );
      case "category":
        return (
          <div className="mb-4 flex flex-wrap gap-2">
            {field.category?.map((category, index) => (
              <Button
                key={index+category}
               variant="outline"
                className={`rounded-lg text-sm ${
                  selectedCategory?.includes(category)
                    ? "bg-[var(--theme-color)] text-white hover:text-white hover:bg-[var(--theme-color)]"
                    : "text-black hover:text-white hover:bg-[var(--theme-color)]"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    isClient && <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">FormFlow</h1>
        <div className="space-x-2">
          <Button variant="outline">Save</Button>
          <Button>Publish</Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Form Preview */}
        <div
          style={{
            width: `${formWidth}px`,
            height: `${formHeight}px`,
          }}
          className="w-2/3 pb-4 bg-white shadow-lg border-[1px] border-[var(--theme-color)] rounded-lg overflow-hidden"
        >
          <div className="bg-[var(--theme-color)] text-white p-4 flex items-center">
            <ChevronLeft onClick={()=>router.back() } className="mr-2 cursor-pointer" />
            <h2 className="text-xl font-semibold flex-grow text-center">
              Feedback Form
            </h2>
            <Edit2 />
          </div>

          <div 
            className="overflow-hidden" 
            style={{ height: `calc(100% - 60px)` }}
          >
            <div 
              className="overflow-y-scroll h-full"
              style={{ 
                paddingRight: '17px',
                boxSizing: 'content-box',
                width: '100%',
              }}
            >

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-4 h-[700px]"
                >
                  {fields.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4 p-4 bg-white border-[1px] border-[var(--theme-color)] shadow-lg rounded-lg"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{field.label}</h3>
                            <div className="space-x-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleEditField(field)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {renderField(field)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        </div>
        </div>

        {/* Field Selector and Conditions */}
        <div className="w-1/3">
          <div className="h-fit border-[1px] p-4 bg-white shadow-lg rounded-lg">
            {editingField ? (
              <EditFieldPanel
                field={editingField}
                onUpdate={handleUpdateField}
                onCancel={() => setEditingField(null)}
              />
            ) : (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Add fields</h3>
                <div className="grid grid-cols-2 gap-4">
                  {availableFields.map((f,ind) => (
                    <FieldButton
                      key={ind}
                      icon={f.icon}
                      label={f.label}
                      onClick={() => {}}
                    />
                  ))}
                  {/* <FieldButton icon={<Hash />} label="Numeric rating" onClick={()=>{}} />
                <FieldButton icon={<Star />} label="Star rating" onClick={()=>{}} />
                <FieldButton icon={<Radio />} label="Radio button" onClick={()=>{}} />
                <FieldButton icon={<List />} label="Categories" onClick={()=>{}} />
                <FieldButton icon={<AlignLeft />} label="Single line input" onClick={()=>{}} />
                <FieldButton icon={<AlignLeft />} label="Emoji" onClick={()=>{}} /> */}
                </div>
              </div>
            )}
          </div>

          <div className="h-fit border-[1px] mt-4 p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Form Size</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="form-width">Width (px)</Label>
                <Input
                  id="form-width"
                  type="number"
                  value={formWidth}
                  onChange={(e) => setFormWidth(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="form-height">Height (px)</Label>
                <Input
                  id="form-height"
                  type="number"
                  value={formHeight}
                  onChange={(e) => setFormHeight(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="h-fit mt-4 border-[1px] p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Display conditions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Show based on URL conditions</span>
                <Switch
                  checked={urlCondition}
                  onCheckedChange={setUrlCondition}
                />
              </div>
              {urlCondition && <Input placeholder="/about" />}

              <div className="flex items-center justify-between">
                <span>Show on a specific date</span>
                <Switch
                  checked={dateCondition}
                  onCheckedChange={setDateCondition}
                />
              </div>
              {dateCondition && <Input type="date" />}

              <div className="flex items-center justify-between">
                <span>Show on a specific time</span>
                <Switch
                  checked={timeCondition}
                  onCheckedChange={setTimeCondition}
                />
              </div>
              {timeCondition && <Input type="time" />}
            </div>
          </div>
          <div className="h-fit mt-4 border-[1px] p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Color Theme</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="color-picker">Choose theme color:</Label>
                <input
                  id="color-picker"
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-full h-10 rounded-md cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="color-input">Or enter color code:</Label>
                <Input
                  id="color-input"
                  type="text"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditFieldPanel: React.FC<{
  field: Field;
  onUpdate: (field: Field) => void;
  onCancel: () => void;
}> = ({ field, onUpdate, onCancel }) => {
  const [label, setLabel] = useState(field.label);
  const [required, setRequired] = useState(field.required);
  const [errorMessage, setErrorMessage] = useState(field.errorMessage);
  const [options, setOptions] = useState<string[]>(field.options || [])

  const handleSave = () => {
    onUpdate({ ...field, label, required, errorMessage });
  };
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleAddOption = () => {
    setOptions([...options, ''])
  }

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <ArrowLeft className="mr-2 cursor-pointer" onClick={onCancel} />
        <h3 className="text-lg font-semibold">Back to Add Fields</h3>
      </div>
      <div>
        <Label htmlFor="field-label">Label</Label>
        <Input
          id="field-label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Required</span>
        <Switch checked={required} onCheckedChange={setRequired} />
      </div>
      <div>
        <Label htmlFor="error-message">Error message</Label>
        <Input
          id="error-message"
          value={errorMessage}
          onChange={(e) => setErrorMessage(e.target.value)}
        />
      </div>
      {field.type === 'radio' && (
          <div>
            <Label>Options</Label>
            {options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                <Button type="button" variant="outline" onClick={() => handleRemoveOption(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddOption} className="mt-2">Add Option</Button>
          </div>
        )}
      <div className="flex justify-end space-x-2">
        <Button onClick={handleSave}>SAVE</Button>
        <Button variant="outline" onClick={onCancel}>
          CANCEL
        </Button>
      </div>
    </div>
  );
};

function FieldButton({
  icon,
  label,
  onClick,
}: {
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button variant="outline" className="h-20 flex-col" onClick={onClick}>
      {icon}
      <span className="mt-2">{label}</span>
    </Button>
  );
}

export default FormBuilder;
