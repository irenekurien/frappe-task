import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFrappeAuth } from "frappe-react-sdk";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Input } from "../../components";

type FormDataType = {
  name?: string;
  username: string;
  password: string;
};

export default function AuthForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const { login, currentUser } = useFrappeAuth();

  if(currentUser) {
    navigate('/dashboard');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = async () => {
    login(formData.username, formData.password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <Box component="form" onSubmit={handleClick} noValidate sx={{ mt: 1 }}>
          {isSignUp ? (
            <Input
              label="Name"
              type="name"
              value={formData?.name || ""}
              onChange={handleChange}
            />
          ) : (
            ""
          )}
          <Input
            label="Email Address"
            type="email"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button fullWidth onClick={handleClick}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? "Already a user? Sign In"
                  : "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
