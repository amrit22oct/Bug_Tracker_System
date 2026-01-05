import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfThumbnail = ({ url }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const renderPdf = async () => {
      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // ✅ 125% zoom
      const zoom = 0.59;

      // ✅ Retina-safe rendering
      const dpr = window.devicePixelRatio || 1;

      const viewport = page.getViewport({ scale: zoom });

      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;

      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      if (!cancelled) {
        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full justify-center items-center h-full object-cover"
    />
  );
};

export default PdfThumbnail;
