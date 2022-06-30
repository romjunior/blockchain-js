import {
  Alert,
  Box,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import useHttp from "../../hooks/use-http";

function Blockchain() {
  const publicKeyRef = useRef();
  const { isLoading, error, sendRequest: mineBlock } = useHttp();
  const [result, setResult] = useState();
  const [inputError, setInputError] = useState(false);

  const mineBlockHandler = () => {
    const publicKey = publicKeyRef.current.value;

    if (!publicKey) {
      setInputError(true);
      return;
    }

    mineBlock({
      url: `http://localhost:3001/blockchain/mine?publicKey=${publicKey}`,
    },
    (data) => setResult(data));
  };

  const inputFocus = () => {
    setInputError(false);
    setResult(null);
  }

  return (
    <Paper elevation={3}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", p: 3 }}>
        {isLoading && <CircularProgress />}
        {!isLoading && error && <Alert severity="error">{error}</Alert>}
        {!isLoading && result && <Alert severity="success">{result?.message}</Alert>}
        {!isLoading && (
          <>
            <CardContent>
              <Typography component="div" color="text.secondary" variant="h5">
                Minerar bloco
              </Typography>
              <Divider />
              <FormControl required={true} fullWidth={true} margin="normal">
                <InputLabel htmlFor="public-key">Chave Pública</InputLabel>
                <Input
                  onFocus={inputFocus}
                  inputRef={publicKeyRef}
                  id="public-key"
                  error={inputError}
                  aria-describedby="public-key-text"
                />
                <FormHelperText id="public-key-text">
                  Deve ser a chave pública
                </FormHelperText>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button onClick={mineBlockHandler} variant="contained">
                Minerar
              </Button>
            </CardActions>
          </>
        )}
      </Box>
    </Paper>
  );
}

export default Blockchain;
