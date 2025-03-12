'use client';
import { Suspense} from "react";
import EditPrompt from "@/components/update";

const UpdatePrompt = () => {
  return (
    <Suspense>
      <EditPrompt></EditPrompt>
    </Suspense>
  )
}

export default UpdatePrompt;