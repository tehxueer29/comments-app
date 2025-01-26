"use client";

import CommentLayout from "@/layouts/CommentLayout";
import DeleteIcon from "@/public/images/icon-delete.svg";
import Button from "@/UI/Button";
import ImageButton from "@/UI/ImageButton";
import { useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  setShowModal: (value: boolean) => void;
}

const Modal = ({ setShowModal }: ModalProps) => (
  <div className="h-screen bg-black bg-opacity-60 fixed top-0 left-0 w-full px-4 mt-0 flex items-center z-50">
    <CommentLayout className="px-7 pb-6 space-y-4">
      <div className="space-y-3">
        <h1 className="font-semibold text-lg">Delete comment</h1>
        <p className="opacity-80">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
      </div>
      <div className="flex justify-evenly">
        <Button className="bg-gray-800" onClick={() => setShowModal(false)}>
          No, Cancel
        </Button>
        <Button className="bg-red-500" onClick={() => {}}>
          Yes, Delete
        </Button>
      </div>
    </CommentLayout>
  </div>
);

export default function DeleteComment() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ImageButton
        Icon={DeleteIcon}
        text="Delete"
        className="text-red-500"
        onClick={() => setShowModal((prevState: boolean) => !prevState)}
      />
      {showModal &&
        createPortal(<Modal setShowModal={setShowModal} />, document.body)}
    </>
  );
}
