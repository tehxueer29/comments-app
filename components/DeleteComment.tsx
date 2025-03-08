"use client";

import ContainerLayout from "@/layouts/ContainerLayout";
import DeleteIcon from "@/public/images/icon-delete.svg";
import Button from "@/UI/Button";
import { useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

import { deleteComment as deleteCommentApi } from "@/lib/axiosFetcher";
import useComment from "./useComment";
import { Comment } from "@prisma/client";

const ImageButton = dynamic(() => import("@/UI/ImageButton"), { ssr: false });

interface ModalProps {
  setShowModal: (value: boolean) => void;
  deleteComment: () => void;
}

const Modal = ({ setShowModal, deleteComment }: ModalProps) => (
  <div className="h-screen bg-black bg-opacity-60 fixed top-0 left-0 w-full px-4 mt-0 flex items-center z-50 justify-center">
    <ContainerLayout className="px-7 pb-6 space-y-4 max-w-96">
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
        <Button className="bg-red-500" onClick={deleteComment}>
          Yes, Delete
        </Button>
      </div>
    </ContainerLayout>
  </div>
);
interface DeleteCommentProps {
  commentID: string;
  postID: string;
}

export default function DeleteComment({
  commentID,
  postID,
}: DeleteCommentProps) {
  const {  mutate } = useComment({ postID });

  const [showModal, setShowModal] = useState(false);

  const deleteComment = async () => {
    await deleteCommentApi(commentID);

    setShowModal(false);

    mutate();
  };

  return (
    <>
      <ImageButton
        Icon={DeleteIcon}
        text="Delete"
        className="text-red-500"
        onClick={() => setShowModal((prevState: boolean) => !prevState)}
      />
      {showModal &&
        createPortal(
          <Modal setShowModal={setShowModal} deleteComment={deleteComment} />,
          document.body
        )}
    </>
  );
}
