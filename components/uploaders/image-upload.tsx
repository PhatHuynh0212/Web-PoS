"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

// here is the problem of sidebar bug remove it and move to global css
// import "@uploadthing/react/styles.css";

interface ImageUploadProps {
  endpoint: "imageUploader";
  value: string | null;
  onChange: (url?: string) => void;
}
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export const ImageUpload: React.FC<ImageUploadProps> = ({
  endpoint,
  value,
  onChange,
}) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="relative ">
          <Image
            src={value}
            alt="upload"
            width={150}
            height={200}
            className="rounded-[10px]"
          />

          <Button
            onClick={() => onChange("")}
            type="button"
            variant={"destructive"}
            size={"icon"}
            className="absolute -top-4 -right-4 rounded-[50%] bg-[#FFB900]"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};
