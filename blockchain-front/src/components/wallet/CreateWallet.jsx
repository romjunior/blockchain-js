import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  CardContent,
  CardActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import useHttp from "../../hooks/use-http";

function CreateWallet() {
  const [value, setValue] = useState();
  const [result, setResult] = useState();
  const { isLoading, error, sendRequest: createWallet } = useHttp();

  const onChangeValue = (e) => {
    setValue(e.target.value);
    setResult(null);
  };

  const transformData = (data) => {
    setResult(data);
  };

  const createWalletHandler = () => {
    createWallet(
      {
        url: `http://localhost:3001/wallet/create?alias=${value}`,
      },
      transformData
    );
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      <CardContent>
        {!isLoading && error && <Alert severity="error">{error}</Alert>}
        {!isLoading && result && !error && (
          <Alert severity="success">
            Your alias is: {result.alias}
            <br />
            Your private key is: {result.privateKey}
            <br />
            Your public key is: {result.publicKey}
            <br />
            {result.message}
          </Alert>
        )}
        <FormControl sx={{ width: "100%", 'margin-top': '20px' }}>
          <InputLabel htmlFor="my-input">Alias</InputLabel>
          <Input
            value={value}
            onChange={onChangeValue}
            id="my-input"
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Alias deve ser único
          </FormHelperText>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={createWalletHandler}>
          Criar Carteira
        </Button>
      </CardActions>
    </>
  );
}

export default CreateWallet;
