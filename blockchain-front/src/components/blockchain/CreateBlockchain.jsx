import {
  Alert,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import useHttp from "../../hooks/use-http";

function CreateBlockchain() {
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

    mineBlock(
      {
        url: `http://localhost:3001/blockchain/mine?publicKey=${publicKey}`,
      },
      (data) => setResult(data)
    );
  };

  const inputFocus = () => {
    setInputError(false);
    setResult(null);
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <CardContent>
            {!isLoading && error && <Alert severity="error">{error}</Alert>}
            {!isLoading && result && (
              <Alert severity="success">{result?.message}</Alert>
            )}
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
    </>
  );
}

export default CreateBlockchain;
