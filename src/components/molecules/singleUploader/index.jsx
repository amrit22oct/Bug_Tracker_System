import React, { useState } from "react";
import uploadService from "../../../services/api/upload.service.js";
import PdfThumbnail from "./PdfThumbnail.jsx";
import PrimaryButton from "../../atoms/Buttons/PrimaryButton";

const FileUploader = ({ multiple = true, onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null); // { url, type }

  // const handleFileChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);

  //   const newFiles = selectedFiles.map((file) => ({
  //     file,
  //     progress: 0,
  //     uploading: true,
  //     response: null,
  //     error: null,
  //   }));

  //   setFiles((prev) => [...prev, ...newFiles]);

  //   newFiles.forEach(async (fileObj) => {
  //     const formData = new FormData();
  //     formData.append("file", fileObj.file);

  //     try {
  //       const res = await uploadService.uploadDocument(formData, {
  //         onUploadProgress: (event) => {
  //           const percent = Math.round((event.loaded * 100) / event.total);
  //           setFiles((prev) =>
  //             prev.map((f) =>
  //               f.file === fileObj.file ? { ...f, progress: percent } : f
  //             )
  //           );
  //         },
  //       });

  //       // Build fullPath for preview
  //       let fullPath = null;
  //       const originalPath = res?.data?.path || null; // <-- store original API path
  //       if (originalPath) {
  //         let path = originalPath;
  //         if (path.startsWith("/v1")) path = path.replace("/v1", "");
  //         const baseUrl = import.meta.env.VITE_API_URL.replace(/\/v1$/, "");
  //         fullPath = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  //       }
  //       console.log("full path", fullPath);
  //       setFiles((prev) => {
  //         const updated = prev.map((f) =>
  //           f.file === fileObj.file
  //             ? {
  //                 ...f,
  //                 response: {
  //                   ...res,
  //                   data: {
  //                     ...res.data,
  //                     fullPath, // add for preview
  //                     fileUrl: originalPath, // keep original API path
  //                   },
  //                 },
  //                 uploading: false,
  //                 progress: 100,
  //               }
  //             : f
  //         );

  //         if (onUploadComplete) {
  //           onUploadComplete(
  //             updated
  //               .filter((f) => f.response)
  //               .map((f) => ({
  //                 ...f.response.data, // now contains both fullPath & fileUrl
  //               }))
  //           );
  //         }

  //         return updated;
  //       });
  //     } catch (err) {
  //       setFiles((prev) =>
  //         prev.map((f) =>
  //           f.file === fileObj.file
  //             ? {
  //                 ...f,
  //                 error: err.response?.data?.message || "Upload failed",
  //                 uploading: false,
  //               }
  //             : f
  //         )
  //       );
  //     }
  //   });
  // };



  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
  
    const newFiles = selectedFiles.map((file) => ({
      file,
      progress: 0,
      uploading: true,
      response: null,
      error: null,
    }));
  
    setFiles((prev) => [...prev, ...newFiles]);
  
    newFiles.forEach(async (fileObj) => {
      const formData = new FormData();
      formData.append("file", fileObj.file);
  
      try {
        const res = await uploadService.uploadDocument(formData, {
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setFiles((prev) =>
              prev.map((f) =>
                f.file === fileObj.file ? { ...f, progress: percent } : f
              )
            );
          },
        });
  
        const uploadedData = res?.data || {};
  
        setFiles((prev) => {
          const updated = prev.map((f) =>
            f.file === fileObj.file
              ? {
                  ...f,
                  response: {
                    ...res,
                    data: uploadedData, // directly use API path
                  },
                  uploading: false,
                  progress: 100,
                }
              : f
          );
  
          if (onUploadComplete) {
            onUploadComplete(
              updated
                .filter((f) => f.response)
                .map((f) => ({
                  name: f.response.data.originalName,
                  fileType: f.response.data.mimeType,
                  fileUrl: f.response.data.path, // use path from API
                  uploadedAt: new Date(),
                }))
            );
          }

          console.log("data", updated)
          return updated;
        });
      } catch (err) {
        setFiles((prev) =>
          prev.map((f) =>
            f.file === fileObj.file
              ? {
                  ...f,
                  error: err.response?.data?.message || "Upload failed",
                  uploading: false,
                }
              : f
          )
        );
      }
    });
  };

  


  //     newFiles.forEach(async (fileObj) => {
  //       const formData = new FormData();
  //       formData.append("file", fileObj.file);

  //       try {
  //         const res = await uploadService.uploadDocument(formData, {
  //           onUploadProgress: (event) => {
  //             const percent = Math.round(
  //               (event.loaded * 100) / event.total
  //             );
  //             setFiles((prev) =>
  //               prev.map((f) =>
  //                 f.file === fileObj.file
  //                   ? { ...f, progress: percent }
  //                   : f
  //               )
  //             );
  //           },
  //         });

  //         // Build fullPath
  //         if (res?.data?.path) {
  //           let path = res.data.path;
  //           if (path.startsWith("/v1")) path = path.replace("/v1", "");
  //           const baseUrl = import.meta.env.VITE_API_URL.replace(/\/v1$/, "");
  //           res.data.fullPath = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  //         }
  //         console.log("file path", res.data.fullPath)

  //         setFiles((prev) => {
  //           const updated = prev.map((f) =>
  //             f.file === fileObj.file
  //               ? { ...f, response: res, uploading: false, progress: 100 }
  //               : f
  //           );

  //           if (onUploadComplete) {
  //             onUploadComplete(
  //               updated
  //                 .filter((f) => f.response)
  //                 .map((f) => f.response.data)
  //             );
  //           }

  //           return updated;
  //         });
  //       } catch (err) {
  //         setFiles((prev) =>
  //           prev.map((f) =>
  //             f.file === fileObj.file
  //               ? {
  //                   ...f,
  //                   error: err.response?.data?.message || "Upload failed",
  //                   uploading: false,
  //                 }
  //               : f
  //           )
  //         );
  //       }
  //     });
  //   };

  //   return (
  //     <div className="h-full w-full mx-auto flex flex-col items-center p-6 bg-gray-50">
  //       <h2 className="text-2xl font-semibold mb-6 "> Upload Files</h2>

  //       {/* File Input */}
  //       <input
  //         type="file"
  //         multiple={multiple}
  //         onChange={handleFileChange}
  //         className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition cursor-pointer"
  //       />

  //       {/* File Grid */}
  //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full">
  //         {files.map((f, idx) => {
  //           const isUploaded = f.response?.success;
  //           const mimeType = isUploaded ? f.response.data.mimeType : "";

  //           return (
  //             <div
  //               key={idx}
  //               className="p-4 border rounded-xl flex flex-col gap-3 bg-white"
  //             >
  //               {/* Thumbnail */}
  //               <div className="relative group w-full h-60 rounded-xl overflow-hidden bg-gray-100 border">
  //                 {isUploaded ? (
  //                   mimeType.startsWith("image/") ? (
  //                     <img
  //                       src={f.response.data.fullPath}
  //                       alt={f.file.name}
  //                       className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
  //                     />
  //                   ) : mimeType === "application/pdf" ? (
  //                     <PdfThumbnail url={f.response.data.fullPath} />
  //                   ) : (
  //                     <div className="flex flex-col items-center justify-center h-full text-gray-600">
  //                       <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center font-bold">
  //                         FILE
  //                       </div>
  //                     </div>
  //                   )
  //                 ) : (
  //                   <div className="w-full h-full bg-gray-200 animate-pulse" />
  //                 )}

  //                 {/* View Button */}
  //                 {isUploaded && (
  //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
  //                     <button
  //                       onClick={() =>
  //                         setPreview({
  //                           url: f.response.data.fullPath,
  //                           type: mimeType,
  //                         })
  //                       }
  //                       className="px-4 py-2 bg-white rounded-full font-medium shadow hover:bg-gray-100"
  //                     >
  //                        View
  //                     </button>
  //                   </div>
  //                 )}
  //               </div>

  //               {/* File Info */}
  //               <div>
  //                 <strong className="block text-gray-800 truncate">
  //                   {f.file.name}
  //                 </strong>
  //                 <span className="text-sm text-gray-500">
  //                   {Math.round(f.file.size / 1024)} KB
  //                 </span>
  //               </div>

  //               {/* Progress */}
  //               {f.uploading && (
  //                 <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
  //                   <div
  //                     className="h-2 bg-green-500 transition-all"
  //                     style={{ width: `${f.progress}%` }}
  //                   />
  //                 </div>
  //               )}

  //               {/* Error */}
  //               {f.error && (
  //                 <p className="text-red-600 text-sm">{f.error}</p>
  //               )}
  //             </div>
  //           );
  //         })}
  //       </div>

  //       {/* Preview Modal */}
  //       {preview && (
  //         <>
  //           <div
  //             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
  //             onClick={() => setPreview(null)}
  //           />

  //           <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6 shadow-xl">
  //             <button
  //               onClick={() => setPreview(null)}
  //               className="absolute top-4 right-4 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold hover:bg-red-700"
  //             >
  //               ×
  //             </button>

  //             {preview.type.startsWith("image/") ? (
  //               <img
  //                 src={preview.url}
  //                 alt="Preview"
  //                 className="w-full rounded-lg"
  //               />
  //             ) : (
  //               <iframe
  //                 src={preview.url}
  //                 title="Document Preview"
  //                 className="w-full h-[80vh] border-none"
  //               />
  //             )}
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   );

  return (
    <div className="h-full w-full justify-start bg-gradient-to-br from-gray-50 to-gray-100 p-6 ">
      <div className=" flex flex-col gap-4 ">
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

        {/* File Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {files.map((f, idx) => {
            const isUploaded = f.response?.success;
            const mimeType = isUploaded ? f.response.data.mimeType : "";

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative group h-56 rounded-t-2xl overflow-hidden bg-gray-100">
                  {isUploaded ? (
                    mimeType.startsWith("image/") ? (
                      <img
                        src={f.response.data.path}
                        alt={f.file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : mimeType === "application/pdf" ? (
                      <PdfThumbnail url={f.response.data.path} />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Unsupported File
                      </div>
                    )
                  ) : (
                    <div className="w-full h-full animate-pulse bg-gray-200" />
                  )}

                  {/* Overlay */}
                  {isUploaded && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      {/* <button
                       onClick={() =>
                         setPreview({
                           url: f.response.data.fullPath,
                           type: mimeType,
                         })
                       }
                       className="px-5 py-2 bg-white rounded-full text-sm font-semibold shadow hover:scale-105 transition"
                     >
                        View
                     </button> */}
                      <PrimaryButton
                        title="view"
                        handler={() =>
                          setPreview({
                            url: f.response.data.fullPath,
                            type: mimeType,
                          })
                        }
                        variant="outline"
                        className="max-w-40 bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-2">
                  <span className="font-medium text-gray-800 truncate">
                    {f.file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {Math.round(f.file.size / 1024)} KB
                  </span>

                  {/* Progress */}
                  {f.uploading && (
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                  )}

                  {/* Error */}
                  {f.error && <p className="text-sm text-red-600">{f.error}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setPreview(null)}
          />

          <div className="fixed z-50 inset-0 flex items-center justify-center p-6">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-fadeIn">
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition"
              >
                ×
              </button>

              {preview.type.startsWith("image/") ? (
                <img
                  src={preview.url}
                  alt="Preview"
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <iframe
                  src={preview.url}
                  title="Preview"
                  className="w-full h-[85vh]"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
