import React, { useState, useRef, useEffect } from "react";
import {
  FaTimes,
  FaDownload,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaUndo,
  FaRedo,
  FaSyncAlt,
} from "react-icons/fa";

const PreviewModal = ({ preview, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const [rotate, setRotate] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });

  const isImage = preview?.type?.startsWith("image/");
  const isPDF = preview?.type === "application/pdf";

  // ESC key closes modal, + and - zoom
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!preview) return null;

  // Zoom handlers
  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => {
    setZoom(1);
    setRotate(0);
    setPosition({ x: 0, y: 0 });
    setOrigin({ x: "50%", y: "50%" });
  };

  const rotateLeft = () => setRotate((prev) => prev - 90);
  const rotateRight = () => setRotate((prev) => prev + 90);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Scroll to zoom
  const handleWheel = (e) => {
    if (!isImage) return;
    e.preventDefault();
    const rect = imgRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setOrigin({
      x: ((offsetX / rect.width) * 100).toFixed(2) + "%",
      y: ((offsetY / rect.height) * 100).toFixed(2) + "%",
    });

    const delta = e.deltaY < 0 ? 0.25 : -0.25;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 5));
  };

  // Drag to move image
  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onDrag = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const stopDrag = () => setIsDragging(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-auto"
      >
        <div className="relative bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] animate-fadeIn scale-up">
          {/* Toolbar */}
          <div className="absolute top-4 left-4 flex gap-2 z-50">
            {isImage && (
              <>
                <button
                  onClick={zoomIn}
                  className="p-2 bg-gray-800 rounded-full shadow hover:bg-gray-700 transition"
                  title="Zoom In"
                >
                  <FaSearchPlus />
                </button>
                <button
                  onClick={zoomOut}
                  className="p-2 bg-gray-800 rounded-full shadow hover:bg-gray-700 transition"
                  title="Zoom Out"
                >
                  <FaSearchMinus />
                </button>
                <button
                  onClick={resetZoom}
                  className="p-2 bg-gray-800 rounded-full shadow hover:bg-gray-700 transition"
                  title="Reset"
                >
                  <FaSyncAlt />
                </button>
                <button
                  onClick={rotateLeft}
                  className="p-2 bg-gray-800 rounded-full shadow hover:bg-gray-700 transition"
                  title="Rotate Left"
                >
                  <FaUndo />
                </button>
                <button
                  onClick={rotateRight}
                  className="p-2 bg-gray-800 rounded-full shadow hover:bg-gray-700 transition"
                  title="Rotate Right"
                >
                  <FaRedo />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-gray-800 rounded-full shadow hover:bg-gray-700 transition"
                  title="Fullscreen"
                >
                  <FaExpand />
                </button>
              </>
            )}
            <a
              href={preview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full shadow hover:bg-gray-700 transition"
              title="Download"
            >
              <FaDownload />
            </a>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition z-50"
          >
            <FaTimes />
          </button>

          {/* Content */}
          <div
            className="w-full h-full flex items-center justify-center p-6 overflow-auto"
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {isImage ? (
              <img
                ref={imgRef}
                src={preview.url}
                alt="Preview"
                onWheel={handleWheel}
                onMouseDown={startDrag}
                onLoad={() => setLoading(false)}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotate}deg)`,
                  transformOrigin: `${origin.x} ${origin.y}`,
                  transition: isDragging ? "none" : "transform 0.15s ease-out",
                  maxWidth: "100%",
                  maxHeight: "85vh",
                  borderRadius: "1rem",
                  cursor: isDragging ? "grabbing" : "grab",
                }}
              />
            ) : isPDF ? (
              <iframe
                src={preview.url}
                title="Document Preview"
                className="w-full h-[85vh] border-none rounded-xl bg-white"
              />
            ) : (
              <div className="text-center text-gray-400">
                <p>Preview not available for this file type</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .scale-up {
          transform: scale(0.95);
          animation: scaleUp 0.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            transform: scale(0.95);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default PreviewModal;
