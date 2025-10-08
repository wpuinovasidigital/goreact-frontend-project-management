import { CloudUpload } from '@mui/icons-material';
import { Button, FormControl } from '@mui/material';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const Upload = ({ control, name, ...props }) => {
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: {} }) => {
        const handleChange = (e) => {
          const files = [];
          for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i]);
          }
          onChange(files);
          setFilesData(files);
          e.target.value = '';
        };
        return (
          <FormControl>
            <Button
              type="button"
              component="label"
              role="button"
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              {value && value.length > 0 
                ? `Upload ${value.length} file`
                : 'Upload attachment'}
              <input
                type="file"
                style={{
                  width: 1,
                  display: 'none',
                }}
                name={name}
                onChange={handleChange}
                onBlur={onBlur}
                {...props}
              />
            </Button>
          </FormControl>
        );
      }}
    />
  );
};

export default Upload;
