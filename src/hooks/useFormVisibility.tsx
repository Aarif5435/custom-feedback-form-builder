import { FeedbackForm, fetchFeedbackForms } from "@/redux/feedbackFormsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFormVisibility = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const forms: FeedbackForm[] = useSelector(
    (state: RootState) => state.feedbackForms.forms
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedbackForms());
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      const date = new Date();
      setCurrentDate(date.toISOString().split("T")[0]);
      setCurrentTime(date.toTimeString().split(" ")[0].slice(0, 5));
    }
  }, []);

  const getFormToShow = () => {
    return forms.find((form) => {
      const { url, date, time } = form.condition || {};

      const storedIds = localStorage.getItem("submitedFormIds");
      const submitFormIds = storedIds ? JSON.parse(storedIds) : [];

      if (submitFormIds.includes(form.id)) {
        return false;
      }

      const conditions: boolean[] = [];

      if (url !== undefined && url !== "") {
        conditions.push(currentUrl.includes(url));
      }

      if (date !== undefined && date !== "") {
        conditions.push(currentDate === date);
      }

      if (time !== undefined && time !== "") {
        conditions.push(currentTime >= time);
      }

      return conditions.every(Boolean);
    });
  };

  const formToShow = getFormToShow();

  useEffect(() => {
    if (formToShow) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [currentUrl, currentDate, currentTime, formToShow]);

  useEffect(() => {
    //   if (formToShow?.condition?.time) {

    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toTimeString().split(" ")[0].slice(0, 5));

      const formToShow = getFormToShow();
      if (formToShow) {
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }
    }, 30000);

    return () => clearInterval(interval);
    // }
  }, [currentUrl, currentDate, forms, formToShow]);

  const handleClose = () => {
    setModalOpen(false);
  };

  return { modalOpen, getFormToShow, handleClose };
};
