import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import useFetch from "../hook/useFetch";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
  const { classes } = props;

  const { err, sendRequest, isauth } = useFetch();
  console.log(err);
  let navigate = useNavigate();

  const [loginpage, setLoginpage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfrim, setPasswordConfrim] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [hidePassword, sethidePassword] = useState(true);
  const [error, setError] = useState(null);
  const [erroropen, setErroropen] = useState(false);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (err) {
      setErroropen(true);
      setError(err);
    }
    if (isauth) {
      navigate("/authpage");
    }
  }, [err, isauth, navigate]);

  const errorClose = (e) => {
    setErroropen(false);
  };
  const toglepage = () => {
    setEmail("");
    setPassword("");
    setPasswordConfrim("");
    setFirstname("");
    setLastname("");
    setUsername("");

    setLoginpage((prevstate) => {
      return !prevstate;
    });
  };
  const handleChange = (name) => (e) => {
    name(e.target.value);
  };

  const passwordMatch = () => password === passwordConfrim;

  const showPassword = () => {
    sethidePassword(!hidePassword);
  };

  const isValid = () => {
    if (email === "" || !email) {
      return false;
    }
    return true;
  };

  const handleempty = (value) => {
    if (value.trim().length === 0 || !value) {
      return true;
    }

    return false;
  };
  const submitRegistration = (e) => {
    e.preventDefault();
    if (
      handleempty(firstname) ||
      handleempty(lastname) ||
      handleempty(username)
    ) {
      setErroropen(true);
      setError("value should not empty");
      return;
    }
    if (!email.includes("@")) {
      setErroropen(true);
      setError("email is not valid");
      return;
    }
    if (loginpage) {
      const user = {
        email,
        password,
        first_name: firstname,
        last_name: lastname,
        username,
      };
      sendRequest(user);
    } else {
      if (!passwordMatch()) {
        setErroropen(true);
        setError("password dont match");
        return;
      }

      const user = {
        email,
        password,
        first_name: firstname,
        last_name: lastname,
        username,
      };
      console.log(user);
    }
  };

  return (
    <div className={classes.main}>
      <CssBaseline />

      <Paper className={classes.paper}>
        <div className={classes.avatar} onClick={toglepage}>
          {/* <PeopleAltIcon className={classes.icon} /> */}
          {!loginpage && <h1>go to login </h1>}
          {loginpage && <h1>go to Register </h1>}
        </div>
        <form className={classes.form} onSubmit={() => submitRegistration}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="first_name" className={classes.labels}>
              first_name
            </InputLabel>
            <Input
              name="first_name"
              type="text"
              autoComplete="first_name"
              className={classes.inputs}
              disableUnderline={true}
              value={firstname}
              onChange={handleChange(setFirstname)}
            />
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="last_name" className={classes.labels}>
              last_name
            </InputLabel>
            <Input
              name="last_name"
              type="text"
              autoComplete="last_name"
              className={classes.inputs}
              disableUnderline={true}
              value={lastname}
              onChange={handleChange(setLastname)}
            />
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="username" className={classes.labels}>
              username
            </InputLabel>
            <Input
              name="username"
              type="email"
              autoComplete="username"
              className={classes.inputs}
              disableUnderline={true}
              value={username}
              onChange={handleChange(setUsername)}
            />
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="email" className={classes.labels}>
              e-mail
            </InputLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              className={classes.inputs}
              disableUnderline={true}
              value={email}
              onChange={handleChange(setEmail)}
            />
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="password" className={classes.labels}>
              password
            </InputLabel>
            <Input
              name="password"
              autoComplete="password"
              className={classes.inputs}
              disableUnderline={true}
              value={password}
              onChange={handleChange(setPassword)}
              type={hidePassword ? "password" : "input"}
              endAdornment={
                hidePassword ? (
                  <InputAdornment position="end">
                    <VisibilityOffTwoToneIcon
                      fontSize="medium"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <VisibilityTwoToneIcon
                      fontSize="medium"
                      className={classes.passwordEye}
                      onClick={showPassword}
                    />
                  </InputAdornment>
                )
              }
            />
          </FormControl>

          {!loginpage && (
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfrim" className={classes.labels}>
                confrim password
              </InputLabel>
              <Input
                name="passwordConfrim"
                autoComplete="passwordConfrim"
                className={classes.inputs}
                disableUnderline={true}
                onClick={showPassword}
                value={passwordConfrim}
                onChange={handleChange(setPasswordConfrim)}
                type={hidePassword ? "password" : "input"}
                endAdornment={
                  hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="medium"
                        className={classes.passwordEye}
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="medium"
                        className={classes.passwordEye}
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
          )}
          <Button
            disabled={!isValid()}
            disableRipple
            fullWidth
            variant="outlined"
            className={classes.button}
            type="submit"
            onClick={submitRegistration}
          >
            {loginpage ? "login" : "Register"}
          </Button>
        </form>

        {error ? (
          <Snackbar
            variant="error"
            key={error}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            open={erroropen}
            onClose={errorClose}
            autoHideDuration={3000}
          >
            <SnackbarContent
              className={classes.error}
              message={
                <div>
                  <span style={{ marginRight: "8px" }}>
                    <ErrorIcon fontSize="large" color="error" />
                  </span>
                  <span> {error} </span>
                </div>
              }
              action={[
                <IconButton key="close" aria-label="close" onClick={errorClose}>
                  <CloseIcon color="error" />
                </IconButton>,
              ]}
            />
          </Snackbar>
        ) : null}
      </Paper>
    </div>
  );
};

export default withStyles(register)(Registration);
