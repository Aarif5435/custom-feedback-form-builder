import React, { useEffect, useState } from "react";
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
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TextArea from "../../../public/asset/textarea_icon.png";
import Numeric from "../../../public/asset/numeric.png";
import star from "../../../public/asset/star_icon.png";
import smiley from "../../../public/asset/smiley_icon.png";
import singleLine from "../../../public/asset/single_line.png";
import radio from "../../../public/asset/radio_icon.png";
import category from "../../../public/asset/cate_icon.png";
import Image from "next/image";
import terrible from "../../../public/asset/terible.svg";
import bad from "../../../public/asset/bad.svg";
import okay from "../../../public/asset/okay.svg";
import good from "../../../public/asset/good.svg";
import great from "../../../public/asset/great.svg";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import Navbar from "@/components/Navbar";
import {
  addFeedbackForm,
  fetchFeedbackForms,
  updateFeedbackForm,
} from "@/redux/feedbackFormsSlice";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../redux/store";
import {
  setFields,
  Field,
  FeedbackFormState,
  FeedbackForm,
} from "../../redux/feedbackFormsSlice";
import { useRouter } from "next/router";
import FormTitleDialog from "@/components/popup";
import { AppDispatch } from "../../redux/store";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

interface State extends SnackbarOrigin {
  toastOpen: boolean;
  message: string;
}

const FormBuilder: React.FC = () => {
  // const [fields, setFields] = useState<Field[]>([]);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [state, setState] = React.useState<State>({
    toastOpen: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, toastOpen, message } = state;

  const dispatch: AppDispatch = useDispatch();
  const form = useSelector((state: RootState) => state.feedbackForms.forms);

  const router = useRouter();
  const { id, title, description, isEdit } = router.query;

  let currentForm = form.find((forms) => forms.id === id) || {
    id: id as string,
    title: title as string,
    description: description as string,
    fields: [],
    condition: {
      url: "",
      date: "",
      time: "",
    },
    isPublished: isPublished,
  };

  const [logicState, setLogicState] = useState({
    url:
      currentForm.condition &&
      currentForm.condition.url !== undefined &&
      currentForm.condition.url !== ""
        ? true
        : false,
    date:
      currentForm.condition &&
      currentForm.condition.date !== undefined &&
      currentForm.condition.date !== ""
        ? true
        : false,
    time:
      currentForm.condition &&
      currentForm.condition.time !== undefined &&
      currentForm.condition.time !== ""
        ? true
        : false,
  });

  const emojis = [
    { src: terrible, alt: "Terrible", value: "terrible" },
    { src: bad, alt: "Bad", value: "bad" },
    { src: okay, alt: "Okay", value: "okay" },
    { src: good, alt: "Good", value: "good" },
    { src: great, alt: "Great", value: "great" },
  ];

  const availableFields = [
    { type: "textarea", label: "Textarea", icon: TextArea },
    { type: "numeric", label: "Numeric rating", icon: Numeric },
    { type: "star", label: "Star rating", icon: star },
    { type: "smiley", label: "Smiley rating", icon: smiley },
    { type: "singleLine", label: "Single line input", icon: singleLine },
    { type: "radio", label: "Radio button", icon: radio },
    { type: "categories", label: "Categories", icon: category },
  ];

  useEffect(() => {
    dispatch(fetchFeedbackForms());
  }, []);

  const handleIconClick = (value: string) => {
    setSelectedEmoji(value);
  };

  const handleEditField = (field: Field) => {
    setEditingField(field);
  };

  const handleFieldUpdate = (key: keyof Field, value: any) => {
    if (editingField) {
      setEditingField({ ...editingField, [key]: value });
      const updatedFields = currentForm.fields.map((field) =>
        field.id === editingField.id ? { ...field, [key]: value } : field
      );
      dispatch(
        setFields({
          ...currentForm,
          fields: updatedFields,
        })
      );
    }
  };

  const handleAddField = (fieldType: string) => {
    const newField: Field = {
      id: Date.now().toString(),
      type: fieldType,
      label: fieldType.charAt(0).toUpperCase() + fieldType.slice(1),
      required: false,
      errorMessage: "",
      options: fieldType === "radio" ? ["Option 1", "Option 2"] : [],
      category: fieldType === "categories" ? ["Bug", "Content", "Other"] : [],
    };

    const updatedForm = {
      ...currentForm,
      fields: [...currentForm.fields, newField],
    };

    dispatch(setFields(updatedForm));
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const handleDeleteField = (fieldId: string) => {
    const updateForm = {
      ...currentForm,
      fields: currentForm.fields.filter((field) => field.id !== fieldId),
    };
    dispatch(setFields(updateForm));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(currentForm.fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);
    const updatedFields = {
      ...currentForm,
      fields: reorderedFields,
    };
    dispatch(setFields(updatedFields));
  };

  const handaleSave = (Btn: string) => {
    if (Btn === "PUBLISH") {
      currentForm = {
        ...currentForm,
        isPublished: true,
        createdDate: new Date().toISOString().split("T")[0]
      };
    }
    if (!isEdit) {
      dispatch(addFeedbackForm(currentForm)).then(() =>
        dispatch(fetchFeedbackForms())
      );
      setState({
        toastOpen: true,
        vertical: "top",
        horizontal: "center",
        message:
          Btn === "PUBLISH"
            ? "Form Published sucssfully"
            : "Form saved sucssfully ",
      });
      router.push({
        pathname: router.pathname,
        query: { ...router.query, isEdit: true },
      });
    } else {
      if (typeof id === "string") {
        let storedIds = localStorage.getItem("submitedFormIds");
        let ids = storedIds ? JSON.parse(storedIds) : [];
        let nids = ids.filter((item: any) => item !== id);

        localStorage.setItem("submitedFormIds", JSON.stringify(nids));
        dispatch(updateFeedbackForm({ id, formData: currentForm }));
        setState({
          toastOpen: true,
          vertical: "top",
          horizontal: "center",
          message:
            Btn === "PUBLISH"
              ? "Form Published sucssfully"
              : "Form update sucssfully ",
        });
      }
    }
  };

  const handleConditionChange = (key: 'url' | 'date' | 'time', value: any) => {
    dispatch(
      setFields({
        ...currentForm,
        condition: {
          ...currentForm.condition,
          [key]: logicState[key] ? value : "",
        },
      })
    );
  };

  const renderField = (field: Field, index: number) => (
    <Draggable key={field.id} draggableId={field.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
                className="w-full h-24 p-3 border border-gray-300 rounded-md"
                placeholder="Enter your text here..."
              ></textarea>
            </div>
          )}
          {field.type === "numeric" && (
            <div className="mb-4 p-4">
              <div className="flex justify-between">
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
                      onClick={(e: any) => console.log(e.target.value)}
                    />
                    <span className="w-11 h-10 -ml-2 flex items-center justify-center border border-gray-300 peer-checked:bg-blue-500 peer-checked:text-white">
                      {index + 1}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {field.type === "star" && (
            <div className="mb-4">
              
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`text-4xl cursor-pointer ${
                    (hover || rating) >= star
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                  onClick={() => setRating(star)}
                />
              ))}
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
                    onClick={() => handleIconClick(emoji.value)}
                  />
                ))}
              </div>
            </div>
          )}
          {field.type === "singleLine" && (
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your text here..."
              />
            </div>
          )}
          {field.type === "radio" && (
            <div className="mb-4">
              <RadioGroup className="space-y-2">
                {field.options?.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio className="" />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </div>
          )}

          {field.type === "categories" && (
            <div className="flex flex-wrap space-x-2 mb-2">
              {field.category?.map((category, index) => (
                <Button
                  key={index}
                  variant={
                    selectedCategory?.includes(category)
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
          <div className="flex justify-end items-center mb-3">
            <div className="flex space-x-2">
              <IconButton onClick={() => handleEditField(field)}>
                <CreateIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteField(field.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <>
      <Navbar
        rightContent={
          !currentForm.isPublished ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handaleSave("SAVE")}
                className="w-24"
                disabled={currentForm.fields.length === 0}
              >
                SAVE
              </Button>
              <Button
                variant="contained"
                onClick={(e) => {
                  handaleSave("PUBLISH");
                  setTimeout(()=>{
                    router.push('./dashboard')
                  },1000)
                }}
                className="w-24 bg-[#2E7D32] mr-5"
                disabled={
                  currentForm.fields.length === 0 || currentForm.isPublished
                }
              >
                PUBLISH
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handaleSave("SAVE")}
              className="w-24 ml-10"
              disabled={currentForm.fields.length === 0}
            >
              SAVE
            </Button>
          )
        }
      />
      <div style={{ display: "flex", height: "100vh" }}>
        {/* Left Side: Form Preview */}
        <div
          style={{
            flex: 1,
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F3F3F3",
          }}
        >
          <Box
            className="w-[31rem] scrollbar-hide"
            sx={{
              backgroundColor: "#fff",
              boxShadow: 3,
              borderRadius: 2,
              width: "70%",
              height: "90%",
              overflowY: "auto",
            }}
          >
            <Typography
              className="w-full p-3 rounded-t-lg bg-[#5578F4]"
              variant="h5"
              color="textSecondary"
              gutterBottom
              sx={{
                position: "sticky", // Makes the title sticky
                top: 0, // Sticks to the top
                zIndex: 1000, // Ensures it stays above other content when scrolling
              }}
            >
              <div className="flex text-white w-full">
                <ArrowBackIosIcon
                  onClick={() => router.push("./dashboard")}
                  className="text-white mt-1 cursor-pointer"
                />
                <span className="w-fit text-2xl">
                  {currentForm.title || title}
                </span>
                <CreateIcon
                  onClick={() => setOpen(true)}
                  className="text-white mt-1 ml-2 cursor-pointer"
                />
              </div>
            </Typography>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable type="group" droppableId="droppableFields">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {currentForm.fields?.length === 0 ? (
                      <div className="flex items-center h-96 justify-center">
                        <Typography
                          className="text-4xl font-semibold"
                          align="center"
                          color="textSecondary"
                        >
                          Add Fields
                        </Typography>
                      </div>
                    ) : (
                      currentForm?.fields.map((field, index) => (
                        <div className="p-2" key={field.id}>
                          {renderField(field, index)}
                        </div>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </div>

        {/* Right Side: Field Selector */}
        <Box
          sx={{
            width: "15%",
            backgroundColor: "#fff",
            padding: 3,
          }}
        >
          {editingField ? (
            <>
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => setEditingField(null)}
              >
                <ArrowBackIosIcon fontSize="small" />
                <Typography variant="body1">Back to Add Fields</Typography>
              </div>

              <TextField
                label="Label"
                value={editingField.label}
                onChange={(e) => handleFieldUpdate("label", e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editingField.required}
                    onChange={(e) =>
                      handleFieldUpdate("required", e.target.checked)
                    }
                  />
                }
                label="Required"
                className="mb-4"
              />
              {editingField.required && (
                <TextField
                  label="Error message"
                  value={editingField.errorMessage}
                  onChange={(e) =>
                    handleFieldUpdate("errorMessage", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                />
              )}

              {/* Option editing section for radio buttons or categories */}
              {editingField.type === "radio" ? (
                <>
                  <Typography variant="body2" className="mt-4 mb-2">
                    Options
                  </Typography>
                  {editingField.options?.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <TextField
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [
                            ...(editingField.options || []),
                          ];
                          updatedOptions[index] = e.target.value;
                          handleFieldUpdate("options", updatedOptions);
                        }}
                        fullWidth
                      />
                      <IconButton
                        onClick={() => {
                          const updatedOptions = editingField.options?.filter(
                            (_, i) => i !== index
                          );
                          handleFieldUpdate("options", updatedOptions);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<AddOutlinedIcon />}
                    onClick={() =>
                      handleFieldUpdate("options", [
                        ...(editingField.options || []),
                        "New Option",
                      ])
                    }
                    className="mb-4"
                  >
                    Add Option
                  </Button>
                </>
              ) : editingField.type === "categories" ? (
                <>
                  <Typography variant="body2" className="mt-4 mb-2">
                    Category fgds
                  </Typography>
                  {editingField.category?.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <TextField
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [
                            ...(editingField.category || []),
                          ];
                          updatedOptions[index] = e.target.value;
                          handleFieldUpdate("category", updatedOptions);
                        }}
                        fullWidth
                      />
                      <IconButton
                        onClick={() => {
                          const updatedOptions = editingField.category?.filter(
                            (_, i) => i !== index
                          );
                          handleFieldUpdate("category", updatedOptions);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<AddOutlinedIcon />}
                    onClick={() =>
                      handleFieldUpdate("category", [
                        ...(editingField.category || []),
                        "New Option",
                      ])
                    }
                    className="mb-4"
                  >
                    Add Category
                  </Button>
                </>
              ) : (
                <div></div>
              )}

              <div className="flex space-x-2 mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditingField(null)}
                  className="w-1/2"
                >
                  SAVE
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setEditingField(null)}
                  className="w-1/2"
                >
                  CANCEL
                </Button>
              </div>
            </>
          ) : (
            <>
              <Typography
                className="text-xl font-semibold text-[#000000]"
                variant="h6"
                gutterBottom
              >
                Add fields
              </Typography>
              <ul style={{ padding: 0, listStyle: "none" }}>
                {availableFields.map((field) => (
                  <li
                    key={field.type}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <span className="flex gap-2">
                      {" "}
                      <Image
                        width={22}
                        height={20}
                        src={field.icon}
                        alt={"icons"}
                      />{" "}
                      {field.label}
                    </span>
                    <AddOutlinedIcon
                      className="text-[#106EA4] cursor-pointer"
                      sx={{ fontSize: 28 }}
                      onClick={() => handleAddField(field.type)}
                    />
                  </li>
                ))}
              </ul>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={logicState.url}
                      onChange={(e) =>
                        setLogicState({
                          ...logicState,
                          url: e.target.checked,
                        })
                      }
                    />
                  }
                  label={
                    <div className="text-[#4C4545] text-sm">
                      Show based on URL conditions
                    </div>
                  }
                />
                {Boolean(logicState.url) && (
                  <TextField
                    fullWidth
                    placeholder="http://example.com"
                    margin="dense"
                    value={currentForm.condition?.url || ""}
                    onChange={(e) =>
                      handleConditionChange("url", e.target.value)
                    }
                  />
                )}

                <FormControlLabel
                  control={
                    <Switch
                      checked={logicState.date}
                      onChange={(e) =>
                        setLogicState({
                          ...logicState,
                          date: e.target.checked,
                        })
                      }
                    />
                  }
                  label={
                    <div className="text-[#4C4545] text-sm">
                      Show on a specific date
                    </div>
                  }
                />
                {Boolean(logicState.date) && (
                  <TextField
                    fullWidth
                    placeholder="MM/DD/YYYY"
                    type="date"
                    margin="dense"
                    value={currentForm.condition?.date || ""}
                    onChange={(e) =>
                      handleConditionChange("date", e.target.value)
                    }
                  />
                )}

                <FormControlLabel
                  control={
                    <Switch
                      checked={logicState.time}
                      onChange={(e) =>
                        setLogicState({
                          ...logicState,
                          time: e.target.checked,
                        })
                      }
                    />
                  }
                  label={
                    <div className="text-[#4C4545] text-sm">
                      Show on a specific time
                    </div>
                  }
                />
                {Boolean(logicState.time) && (
                  <TextField
                    fullWidth
                    type="time"
                    placeholder="hh:mm aa"
                    margin="dense"
                    value={currentForm.condition?.time || ""}
                    onChange={(e) =>
                      handleConditionChange("time", e.target.value)
                    }
                  />
                )}
              </div>
            </>
          )}
        </Box>
      </div>
      <FormTitleDialog
        currentValue={currentForm}
        open={open}
        setOpen={setOpen}
        currentTitle={currentForm.title}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={toastOpen}
        onClose={() => setState({ ...state, toastOpen: false })}
        message={message}
        key={vertical + horizontal}
      />
    </>
  );
};

export default FormBuilder;
