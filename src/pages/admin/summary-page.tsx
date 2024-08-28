import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Navbar from "@/components/Navbar";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackFormById } from "@/redux/feedbackFormsSlice";

const FeedbackDetailPage = () => {
  const feedbackData = [
    {
      id: 1,
      title: "Feedback 1",
      date: "10/08/2024",
      content: [
        {
          question: "Would you like to add a comment?",
          answer:
            "The website is user-friendly and easy to navigate. I found exactly what I was looking for without any hassle. The checkout process was quick, and I appreciate the seamless online shopping experience.",
        },
        {
          question:
            "How likely is it that you will recommend us to your family and friends?",
          answer: "5",
        },
        { question: "Give a star rating for the website.", answer: "2" },
        {
          question: "Do you have any suggestions to improve our website?",
          answer:
            "The website is user-friendly and easy to navigate. I found exactly what I was looking for without any hassle. The checkout process was quick, and I appreciate the seamless online shopping experience.",
        },
        { question: "Multiple choice - 1 answer", answer: "Radio 1" },
        {
          question: "Pick a subject and provide your feedback:",
          answer: "Bug",
        },
      ],
    }
  ];

  
  const dispatch: AppDispatch = useDispatch();
  const formById = useSelector((state: RootState) => state.feedbackForms.formById);
  const router = useRouter();
  const { id } = router.query;

  console.log('formById',formById, id)

  useEffect(()=>{
    if (typeof id === 'string') {
        dispatch(fetchFeedbackFormById(id));
      } 
  },[id])

  return (
    <>
      <Navbar/>

      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            backgroundColor: "#3F51B5",
            padding: "16px 24px",
            borderRadius: "4px 4px 0 0",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          <ArrowBackIosIcon
                  onClick={() => router.back()}
                  className="text-white -mt-1 cursor-pointer"
                />
            {formById?.title}
          </Typography>
          <Typography variant="body2">Created Date: {formById?.createdDate || '21/08/2024'}</Typography>
        </Box>
      </Box>
      <Box sx={{ padding: "24px" }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: "24px" }}
          className="p-10"
        >
          <div className="flex justify-between ml-24">
            <Grid item xs={4} textAlign="center">
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {typeof formById?.submission?.views === 'number' ? formById?.submission?.views : 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                VIEWS
              </Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {typeof formById?.submission?.submitted === 'number' ? formById?.submission?.submitted : 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Submitted
              </Typography>
            </Grid>
          </div>
          <div className="w-full mt-4">
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Page URL contains: {formById?.condition?.url || <span className="font-thin text-red-600">no url provided</span>}
              </Typography>
              <Typography variant="body2">Date: {formById?.condition?.date || <span className="font-thin text-red-600">no date mentioned</span>}</Typography>
              <Typography variant="body2">Time: {formById?.condition?.time || <span className="font-thin text-red-600">no date mentioned</span>}</Typography>
            </Grid>
          </div>
        </Grid>
        <Divider sx={{ marginBottom: "16px" }} />
        <Typography variant="h6" gutterBottom>
          Feedback List
        </Typography>
        {formById?.submission?.feedbackList !== undefined && formById?.submission?.feedbackList.map((feedback, ind) => (
          <Accordion key={ind} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="flex w-full justify-between">
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Feedback {ind +1}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
                {feedback.submittedDate}
              </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {feedback.content.map((item, index) => (
                <Box key={index} mb={2}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold" }}
                    color="textSecondary"
                  >
                    {item.question}
                  </Typography>
                  <Typography variant="body1">{item.answer}</Typography>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default FeedbackDetailPage;
