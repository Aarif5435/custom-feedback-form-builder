import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Slider,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import terrible from "../../public/asset/terible.svg";
import bad from "../../public/asset/bad.svg";
import okay from "../../public/asset/okay.svg";
import good from "../../public/asset/good.svg";
import great from "../../public/asset/great.svg";
import StarIcon from "@mui/icons-material/Star";
import {
  addFeedbackForm,
  Content,
  FeedbackList,
  updateFeedbackForm,
} from "@/redux/feedbackFormsSlice";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { Field, FeedbackForm, setFields } from "../redux/feedbackFormsSlice";
import { AppDispatch } from "../redux/store";

interface DynamicFeedbackFormProps {
  form: FeedbackForm;
  modalOpen: boolean;
  handleClose: () => void;
}

const emojis = [
  { src: terrible, alt: "Terrible", value: "terrible" },
  { src: bad, alt: "Bad", value: "bad" },
  { src: okay, alt: "Okay", value: "okay" },
  { src: good, alt: "Good", value: "good" },
  { src: great, alt: "Great", value: "great" },
];

export const FeedbackFormComponent: React.FC<DynamicFeedbackFormProps> = ({
  form,
  handleClose,
  modalOpen,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [feedbackList, setFeedbackList] = useState<Content[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const dispatch: AppDispatch = useDispatch();

  const currentForm = {
    ...form,
    submission: {
      ...form.submission,
      submitted:
        form.submission?.submitted !== undefined
          ? +form.submission.submitted + 1
          : 1,
      views:
        form.submission?.views !== undefined
          ? +form.submission.views + 1
          : 1,
      feedbackList: [
        {
          submittedDate: new Date().toISOString().split("T")[0],
          content: [...feedbackList],
        },
        ...(form.submission?.feedbackList || []),
      ],
    },
  };

  const handleInputChange = (
    fieldId: string,
    value: any,
    type: string,
    label: string
  ) => {
    if (type === "smiley") {
      setSelectedEmoji(value);
    }

    setFeedbackList((prevFeedbackList) => {
      const existingIndex = prevFeedbackList.findIndex(
        (feedback) => feedback.question === label
      );
      if (existingIndex !== -1) {
        const updatedFeedbackList = [...prevFeedbackList];
        updatedFeedbackList[existingIndex] = { question: label, answer: value };
        return updatedFeedbackList;
      } else {
        return [...prevFeedbackList, { question: label, answer: value }];
      }
    });
    setFormValues({
      ...formValues,
      [fieldId]: value,
    });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    form.fields.forEach((field) => {
      if (field.required && !formValues[field.id]) {
        errors[field.id] = field.errorMessage || "This field is required";
      }
    });

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const closeModal = () => {
    if (typeof window !== "undefined") {
      let storedIds = localStorage.getItem("submitedFormIds");
      let ids = storedIds ? JSON.parse(storedIds) : [];

      ids.push(form.id);

      localStorage.setItem("submitedFormIds", JSON.stringify(ids));
    }
    handleClose();
  };

  const handleCategoryClick = (category: string, fieldId: string) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
    setFormValues({
      ...formValues,
      [fieldId]: category,
    });
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      dispatch(updateFeedbackForm({ id: form.id, formData: currentForm }));
      closeModal();
    } else {
      console.log("Validation failed");
    }
  };

  const renderField = (field: Field, index: number) => (
    <div
      key={field.id}
      className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md"
    >
      {/* Top section with label and delete icon */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-lg text-gray-700">{field.label}</h4>
      </div>

      {/* Field Content */}
      {field.type === "textarea" && (
        <div className="mb-4">
          <textarea
            className={`w-full h-24 p-3 border border-gray-300 rounded-md ${
              formErrors[field.id] && "border-[2px] border-red-600"
            } `}
            placeholder="Enter your text here..."
            onChange={(e) =>
              handleInputChange(
                field.id,
                e.target.value,
                field.type,
                field.label
              )
            }
          ></textarea>
          {formErrors[field.id] && (
            <Typography color="error">{formErrors[field.id]}</Typography>
          )}
        </div>
      )}
      {field.type === "numeric" && (
        <div className={`mb-4 p-4`}>
          <div className={`flex justify-between`}>
            {[...Array(10)].map((_, index) => (
              <label
                key={index}
                className="flex flex-col items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name={`rating-${field.id}`}
                  value={index + 1}
                  className="hidden peer"
                  onChange={(e) =>
                    handleInputChange(
                      field.id,
                      e.target.value,
                      field.type,
                      field.label
                    )
                  }
                />
                <span className="w-11 h-10 -ml-2 flex items-center justify-center border border-gray-300 peer-checked:bg-blue-500 peer-checked:text-white">
                  {index + 1}
                </span>
              </label>
            ))}
          </div>
          {formErrors[field.id] && (
            <Typography color="error">{formErrors[field.id]}</Typography>
          )}
        </div>
      )}

      {field.type === "star" && (
        <div className="mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`text-4xl cursor-pointer ${
                (hover || rating) >= star ? "text-yellow-500" : "text-gray-400"
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(formValues[field.id] || 0)}
              onClick={() =>
                handleInputChange(field.id, star, field.type, field.label)
              }
            />
          ))}
          {formErrors[field.id] && (
            <Typography color="error">{formErrors[field.id]}</Typography>
          )}
        </div>
      )}
      {field.type === "smiley" && (
        <div className="mb-4">
          <div className="flex space-x-2 text-3xl relative">
            {emojis.map((emoji) => (
              <Image
                key={emoji.value}
                className={`transition-transform transform hover:scale-110 cursor-pointer ${
                  selectedEmoji === emoji.value ? "opacity-50" : ""
                }`}
                width={35}
                height={35}
                src={emoji.src}
                alt={emoji.alt}
                onClick={() =>
                  handleInputChange(
                    field.id,
                    emoji.value,
                    field.type,
                    field.label
                  )
                }
              />
            ))}
          </div>
          {formErrors[field.id] && (
            <Typography color="error">{formErrors[field.id]}</Typography>
          )}
        </div>
      )}
      {field.type === "singleLine" && (
        <div className="mb-4">
          <input
            type="text"
            className={`w-full p-3 border border-gray-300 rounded-md ${
              formErrors[field.id] && "border-[2px] border-red-600"
            }`}
            placeholder="Enter your text here..."
            onChange={(e) =>
              handleInputChange(
                field.id,
                e.target.value,
                field.type,
                field.label
              )
            }
          />
          {formErrors[field.id] && (
            <Typography color="error">{formErrors[field.id]}</Typography>
          )}
        </div>
      )}
      {field.type === "radio" && (
        <div className="mb-4">
          <RadioGroup
            value={formValues[field.id] || ""}
            onChange={(e) =>
              handleInputChange(
                field.id,
                e.target.value,
                field.type,
                field.label
              )
            }
            className="space-y-2"
          >
            {field.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio className="" />}
                label={option}
              />
            ))}
          </RadioGroup>
          {formErrors[field.id] && (
            <Typography color="error">{formErrors[field.id]}</Typography>
          )}
        </div>
      )}

      {field.type === "categories" && (
        <>
          <div className="flex flex-wrap space-x-2 mb-2">
            {field.category?.map((category, index) => (
              <Button
                key={index}
                variant={
                  selectedCategory?.includes(category)
                    ? "contained"
                    : "outlined"
                }
                onClick={() => handleCategoryClick(category, field.id)}
              >
                {category}
              </Button>
            ))}
          </div>
          {formErrors[field.id] && (
            <Typography color="error">{formErrors[field.id]}</Typography>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            className="custom-scrollbar"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "0px",
              width: "530px",
              maxHeight: "80%",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography
              className="w-full p-3 rounded-t-lg bg-[#5578F4]"
              variant="h5"
              color="textSecondary"
              gutterBottom
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
              }}
            >
              <div className="flex text-2xl p-1 text-white w-full justify-between">
                <span className="w-fit text-2xl">{form.title}</span>
                <button onClick={closeModal}>
                  <CloseIcon className="text-white mr-2 -mt-1" />
                </button>
              </div>
            </Typography>

            <Box
              component="form"
              onSubmit={submitForm}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
              }}
            >
              {form.fields?.map((field, index) => renderField(field, index))}
              <div
                style={{
                  position: "sticky",
                  bottom: 0,
                  zIndex: 1000,
                }}
                className="flex justify-center pb-5"
              >
                <Button
                  variant="contained"
                  type="submit"
                  className="bg-[#2196F3] w-[20%]"
                >
                  Submit
                </Button>
              </div>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};
