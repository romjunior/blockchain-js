import {
    Alert,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { useRef, useState } from "react";
import useHttp from "../../hooks/use-http";

function CreateTransaction() {
  const privateKeyRef = useRef();
  const publicKeyRef = useRef();
  const valueRef = useRef();
  const { isLoading, error, sendRequest: createTransaction } = useHttp();
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [result, setResult] = useState();

  const resultHandler = (data) => {
    setResult(data.message);
  }

  const createTransactionHandler = () => {
    const fromAddress = privateKeyRef.current.value;
    const toAddress = publicKeyRef.current.value;
    const amount = Number.parseFloat(valueRef.current.value);

    if(!fromAddress) {
        setFromError(true);
        return;
    }

    if(!toAddress) {
        setToError(true);
        return;
    }

    if(!amount || amount <= 0) {
        setAmountError(true);
        return;
    }

    createTransaction({
        url: 'http://localhost:3001/transaction',
        method: 'POST',
        body: {
            fromAddress,
            toAddress,
            amount
        }
    }, resultHandler);

    
  }

  const inputFocus = () => {
    setFromError(false);
    setToError(false);
    setAmountError(false);
    setResult(null);
  }

  return (
    <>
      {isLoading && <CircularProgress />}
      <CardContent>
        {!isLoading && error && <Alert severity="error">{error}</Alert>}
        {!isLoading && result && <Alert severity="success">{result}</Alert>}
        <FormControl required={true} fullWidth={true} margin="normal">
          <InputLabel htmlFor="private-key">Quem vai transferir?</InputLabel>
          <Input
            inputRef={privateKeyRef}
            onFocus={inputFocus}
            id="private-key"
            error={fromError}
            aria-describedby="private-key-text"
          />
          <FormHelperText id="private-key-text">
            Deve ser a chave privada
          </FormHelperText>
        </FormControl>
        <FormControl required={true} fullWidth={true} margin="normal">
          <InputLabel htmlFor="public-key">Quem vai receber?</InputLabel>
          <Input
            inputRef={publicKeyRef}
            onFocus={inputFocus}
            id="public-key"
            error={toError}
            aria-describedby="public-key-text"
          />
          <FormHelperText id="public-key-text">
            Deve ser a chave pública
          </FormHelperText>
        </FormControl>
        <FormControl required={true} fullWidth={true} margin="normal">
          <InputLabel htmlFor="value">Qual valor?</InputLabel>
          <Input
            inputRef={valueRef}
            onFocus={inputFocus}
            type="number"
            id="value"
            error={amountError}
            aria-describedby="value-text"
          />
          <FormHelperText id="value-text">Valor positivo</FormHelperText>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={createTransactionHandler}>Transferir</Button>
      </CardActions>
    </>
  );
}

export default CreateTransaction;
