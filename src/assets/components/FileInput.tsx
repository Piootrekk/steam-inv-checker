import React, { useRef, useState } from "react";
import { Button, Container } from "@mui/material";
import { FileInputStyles } from "./styles/FileInputStyles";
import {
  setDataToLocalStorage,
  isDataInLocalStorage,
} from "./utils/localStorage";

const FileUploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined
  );

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const fileContent = reader.result;
          if (fileContent) {
            const jsonData = JSON.parse(fileContent.toString());
            setDataToLocalStorage("jsonData", JSON.stringify(jsonData));
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container sx={FileInputStyles}>
      <h3>Upload invested items:</h3>
      <Button variant="contained" onClick={handleFileUpload} component="span">
        {isDataInLocalStorage("jsonData") ? "Replace .json" : "Upload .json"}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept=".json"
      />
      {selectedFile && <span>{selectedFile}</span>}
    </Container>
  );
};

export default FileUploadButton;
