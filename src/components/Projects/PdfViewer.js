import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { styled } from "styled-components";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

export default function PdfViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const pdfRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Wrapper>
      <PdfWrapper>
        <Document
          inputRef={pdfRef}
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onError={(err) => {
            console.log(err);
          }}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={1.0}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </PdfWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
const PdfWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;
const PageBtnWrapper = styled.div`
  width: 100%;
  border-radius: 0.3125rem;
  border: 1px solid #d9d9d9;
  background: #f9fafc;
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const PageBtn = styled.button``;
