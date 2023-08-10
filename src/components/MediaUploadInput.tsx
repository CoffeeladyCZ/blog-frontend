import React, { useState, ChangeEvent } from 'react';
import { Input } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

interface MediaUploadFormProps {
  onFileUpload: (file: File | null) => void;
  isLoading: boolean;
}

const StyledButton = styled(LoadingButton)`
  margin-left: 24px;
`;

const MediaUploadInput: React.FC<MediaUploadFormProps> = ({ onFileUpload, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    onFileUpload(selectedFile);
  };

  return (
    <div>
      <Input color="primary" type="file" onChange={handleFileChange} />
      <StyledButton
        disabled={selectedFile ? false : true}
        variant="outlined"
        size="small"
        color="primary"
        loading={isLoading}
        onClick={handleUpload}>
        Upload an image
      </StyledButton>
    </div>
  );
};

export default MediaUploadInput;
