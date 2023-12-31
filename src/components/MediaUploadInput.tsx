import React, { useState, ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

type MediaUploadFormProps = {
  onFileUpload: (file: File | null) => void;
  isLoading: boolean;
};

const StyledButton = styled(LoadingButton)`
  margin-left: 24px;
`;

const MediaUploadInput: React.FC<MediaUploadFormProps> = ({ onFileUpload, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    control,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    onFileUpload(selectedFile);
  };

  return (
    <>
      <Controller
        name="selectedFile"
        control={control}
        rules={{ required: true }}
        render={() => (
          <TextField
            data-testid="addFile"
            color="primary"
            type="file"
            error={Boolean(errors.selectedFile)}
            helperText={errors.selectedFile ? t('errorMessage.item') : ''}
            onChange={handleFileChange}
          />
        )}
      />

      <StyledButton
        disabled={selectedFile ? false : true}
        data-testid="uploadFileButton"
        variant="outlined"
        size="small"
        color="primary"
        loading={isLoading}
        onClick={handleUpload}>
        {t('uploadImage')}
      </StyledButton>
    </>
  );
};

export default MediaUploadInput;
