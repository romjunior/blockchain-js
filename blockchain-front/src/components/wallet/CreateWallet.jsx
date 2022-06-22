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
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import useHttp from "../../hooks/use-http";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function CreateWallet() {
  const [result, setResult] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, error, sendRequest: createWallet } = useHttp();
  const aliasRef = useRef();

  const handleClose = () => setOpenModal(false);

  const transformData = (data) => {
    setResult(data);
    setOpenModal(true);
  };

  const createWalletHandler = () => {
    createWallet(
      {
        url: `http://localhost:3001/wallet/create?alias=${aliasRef.current.value}`,
      },
      transformData
    );
    aliasRef.current.value = "";
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      <CardContent>
        {!isLoading && error && <Alert severity="error">{error}</Alert>}
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Chaves criadas com sucesso!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your alias is: {result?.alias}
              <br />
              Your private key is: {result?.privateKey}
              <br />
              Your public key is: {result?.publicKey}
              <br />
              {result?.message}
            </Typography>
          </Box>
        </Modal>
        <FormControl fullWidth={true} margin="normal">
          <InputLabel htmlFor="my-input">Alias</InputLabel>
          <Input
            inputRef={aliasRef}
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
