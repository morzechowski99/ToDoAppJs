import { Divider, Grid, Typography } from "@mui/material";
import LoginForm from "components/LoginForm/LoginForm";
import { paths } from "config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "shared/services/Auth";

const Login = () => {
   const navigate = useNavigate();
   useEffect(() => {
      if (Auth.isAuthenticated()) {
         navigate(paths.main);
      }
   }, [navigate]);

   return (
      <Grid container justifyContent="center" alignItems="center">
         <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h3" textAlign="center">
               Sign in
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <LoginForm />
         </Grid>
      </Grid>
   );
};

export default Login;
