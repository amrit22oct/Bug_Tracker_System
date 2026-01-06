import React, { useState } from "react";
import uploadService from "../../../services/api/upload.service.js";
import PdfThumbnail from "./PdfThumbnail.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";
import PreviewModal from "../PreviewModal/index.jsx";

const FileUploader = ({ multiple = true }) => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);

  /* ================= PROGRESS ENGINE ================= */

  const startProgress = (file) => {
    let progress = 0;
  
    const interval = setInterval(() => {
      progress += Math.random() * 12; // 🔥 faster
      if (progress >= 95) progress = 95;
  
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file ? { ...f, progress } : f
        )
      );
    }, 60); // 🔥 faster
  
    return interval;
  };
  
  const finishProgress = (file) => {
    let progress = 95;
  
    const interval = setInterval(() => {
      progress += 2.5; // 🔥 faster
  
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file ? { ...f, progress } : f
        )
      );
  
      if (progress >= 100) {
        clearInterval(interval);
  
        // Lock at 100
        setFiles((prev) =>
          prev.map((f) =>
            f.file === file
              ? { ...f, progress: 100, uploading: false }
              : f
          )
        );
  
        // 🔒 Short delay to allow bar animation
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.file === file ? { ...f, showSuccess: true } : f
            )
          );
        }, 150); // 🔥 shorter delay
      }
    }, 20); // 🔥 faster
  };
  

  /* ================= UPLOAD ================= */

  const uploadFile = async (fileObj) => {
    const progressInterval = startProgress(fileObj.file);

    const formData = new FormData();
    formData.append("file", fileObj.file);

    try {
      const res = await uploadService.uploadDocument(formData);

      setFiles((prev) =>
        prev.map((f) =>
          f.file === fileObj.file ? { ...f, response: res } : f
        )
      );

      clearInterval(progressInterval);
      finishProgress(fileObj.file);
    } catch (err) {
      clearInterval(progressInterval);

      setFiles((prev) =>
        prev.map((f) =>
          f.file === fileObj.file
            ? {
                ...f,
                uploading: false,
                error: "Upload failed",
              }
            : f
        )
      );
    }
  };

  /* ================= FILE INPUT ================= */

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newFiles = selectedFiles.map((file) => ({
      file,
      progress: 0,
      uploading: true,
      response: null,
      error: null,
      showSuccess: false,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach(uploadFile);
  };

  /* ================= RETRY ================= */

  const retryUpload = (file) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.file === file
          ? {
              ...f,
              progress: 0,
              uploading: true,
              error: null,
              showSuccess: false,
              response: null,
            }
          : f
      )
    );

    uploadFile({ file });
  };

  /* ================= UI ================= */

  return (
    <div className="h-full w-full justify-start bg-gradient-to-br from-gray-50 to-gray-100 p-6 ">
      {/* Upload box */}
      <div className="flex items-center justify-center">
          {/* Upload Box */}
          <label className="relative flex w-full max-w-sm items-center justify-center p-5 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-gray-400 transition cursor-pointer group">
            <input
              type="file"
              multiple={multiple}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center  gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl group-hover:bg-gray-200 transition">
                📁
              </div>
              <p className="text-sm font-medium text-gray-700">Upload files</p>
              <span className="text-xs text-gray-500">
                PNG, JPG, PDF (10MB)
              </span>
            </div>
          </label>
        </div>

      {/* Files */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {files.map((f, idx) => {
          const mimeType = f.response?.data?.mimeType;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border shadow hover:shadow-lg transition"
            >
              {/* Preview */}
              <div className="relative h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
                {f.showSuccess ? (
                  mimeType?.startsWith("image/") ? (
                    <img
                      src={f.response.data.path}
                      className="w-full h-full object-contain"
                    />
                  ) : mimeType === "application/pdf" ? (
                    <PdfThumbnail url={f.response.data.path} />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      FILE
                    </div>
                  )
                ) : (
                  <div className="h-full w-full animate-pulse bg-gray-200" />
                )}

                {f.showSuccess && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center">
                    <PrimaryButton
                      title="View"
                      variant="outline"
                      
                        className="max-w-40 bg-white"
                      handler={() =>
                        setPreview({
                          url: f.response.data.path,
                          type: mimeType,
                        })
                      }
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="truncate font-medium">{f.file.name}</p>

                {/* Progress */}
                {f.uploading && (
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                )}

                {/* Success */}
                {f.showSuccess && (
                  <p className="mt-2 text-sm font-medium text-green-600">
                    ✔ Upload successful
                  </p>
                )}

                {/* Error */}
                {f.error && (
  <div className="flex items-center gap-3 mt-2 justify-around">
    <span className="text-sm text-red-600">{f.error}</span>

    <PrimaryButton
      title="Retry"
      handler={() => retryUpload(f.file)}
      variant="outline"
      className="max-w-40 bg-white"
    />
  </div>
)}
              </div>
            </div>
          );
        })}
      </div>

      <PreviewModal preview={preview} onClose={() => setPreview(null)} />
    </div>
  );
};

export default FileUploader;
