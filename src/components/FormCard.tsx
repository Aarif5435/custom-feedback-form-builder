import React from "react";
import Image from "next/image";
import notePade from "../../public/asset/survey-standard 1.svg";
import { Button } from "@mui/material";

interface FormCardProps {
  title: string;
  submissions: number;
  views: number;
  publishedDate: string;
  onEdit: () => void;
  onDelete: () => void;
  onViewSubmissions: () => void;
}

const FormCard: React.FC<FormCardProps> = ({
  title,
  submissions,
  views,
  publishedDate,
  onEdit,
  onDelete,
  onViewSubmissions,
}) => {
  return (
    <div className="w-72 max-w-xs bg-white shadow-md rounded-lg  m-4">
      <div className="w-full flex justify-center rounded-t-lg bg-[#F5D563] h-fit p-2">
        <Image src={notePade} alt={"notepade"} />
      </div>
      <div className="p-3">
        <h3 className="text-[#000000] text-xl font-bold">{title}</h3>
        <div className="mt-4 flex text-sm text-[#8E8E8E] justify-between">
          <p>Submitted:</p>{" "}
          <span className="text-[#000000] font-bold">{submissions}</span>
        </div>
        <div className="mt-4 flex text-sm text-[#8E8E8E] justify-between">
          <p>Viewed:</p>{" "}
          <span className="text-[#000000] font-bold">{views}</span>
        </div>
        <div className="mt-4 flex text-sm text-[#8E8E8E] justify-between">
          <p>Date Published:</p>{" "}
          <span className="text-[#000000] font-bold">{publishedDate}</span>
        </div>
        <div className="flex justify-center mt-10">
          <Button
            onClick={onViewSubmissions}
            variant="contained"
            color="secondary"
            size="large"
          >
            View Submissions
          </Button>
          {/* <button
            
            className="bg-[#9C27B0] text-white px-4 py-2 rounded"
          >
            View Submissions
          </button> */}
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <Button
            onClick={onEdit}
            variant="contained"
            color="success"
            size="large"
          >
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="contained"
            color="primary"
            size="large"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
