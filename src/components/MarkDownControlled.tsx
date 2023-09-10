import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import MarkdownEditor from '@uiw/react-md-editor';

const MarkdownControlled: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="content"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <MarkdownEditor
          value={field.value}
          onChange={field.onChange}
          id="content"
          height={500}
          data-color-mode="light"
        />
      )}
    />
  );
};

export default MarkdownControlled;
