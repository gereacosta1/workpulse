import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { UploadedScheduleImage } from "../types/dashboard";

export function ScheduleUploadCard() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState<UploadedScheduleImage | null>(null);

  useEffect(() => {
    return () => {
      if (uploadedImage?.previewUrl) {
        URL.revokeObjectURL(uploadedImage.previewUrl);
      }
    };
  }, [uploadedImage]);

  function handleOpenFilePicker() {
    inputRef.current?.click();
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (uploadedImage?.previewUrl) {
      URL.revokeObjectURL(uploadedImage.previewUrl);
    }

    const previewUrl = URL.createObjectURL(file);

    setUploadedImage({
      fileName: file.name,
      previewUrl,
      fileType: file.type,
    });
  }

  function handleRemoveImage() {
    if (uploadedImage?.previewUrl) {
      URL.revokeObjectURL(uploadedImage.previewUrl);
    }

    setUploadedImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="grid gap-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={handleImageChange}
      />

      {!uploadedImage ? (
        <div className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/60 p-8 text-center">
          <p className="text-base font-medium text-zinc-900">Drop your weekly schedule here</p>
          <p className="mt-2 text-sm text-zinc-500">
            PNG, JPG, WEBP, or screenshot from your phone
          </p>

          <button
            type="button"
            onClick={handleOpenFilePicker}
            className="mt-5 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Upload image
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50">
            <img
              src={uploadedImage.previewUrl}
              alt="Uploaded work schedule preview"
              className="h-[320px] w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-900">{uploadedImage.fileName}</p>
              <p className="mt-1 text-sm text-zinc-500">{uploadedImage.fileType || "Image file"}</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleOpenFilePicker}
                className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
              >
                Change image
              </button>

              <button
                type="button"
                onClick={handleRemoveImage}
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}