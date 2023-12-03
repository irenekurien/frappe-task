import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/system';

interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    varient?: "contained" | "text" | "outlined";
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    disabled,
    fullWidth = false,
    varient = 'contained',
}) => {
    return (
        <MuiButton
            type="submit"
            fullWidth={fullWidth}
            variant={varient}
            sx={{ mt: 3, mb: 2}}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
