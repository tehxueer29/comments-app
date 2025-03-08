"use client";
import useSWR from "swr";
import { commentUrl, defaultParams, getAllComments } from "@/lib/axiosFetcher";

export default function useComment({ postID }: { postID: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    [commentUrl, postID, defaultParams],
    getAllComments
  );

  return {
    comments: data,
    isLoading,
    isError: error,
    mutate,
  };
}
