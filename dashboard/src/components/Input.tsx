import React from 'react';
import TextField from '@mui/material/TextField';

interface InputProps {
  label: string;
  type: string;
  value: string | number;
  helperText?: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

const Input: React.FC<InputProps> = ({ value, label, type, helperText, onChange, ...props }) => {
  return <TextField
  error={typeof(helperText)=='string'}
  helperText={helperText}
  margin="normal"
  fullWidth
  id={label}
  label={label}
  name={type}
  type={type}
  value={value}
  autoFocus
  {...props}
  onChange={onChange}
/>
};

export default Input;
