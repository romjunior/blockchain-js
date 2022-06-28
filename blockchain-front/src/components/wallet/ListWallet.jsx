import { useState, useCallback, useEffect } from "react";
import {
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Snackbar,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useHttp from "../../hooks/use-http";

function ListWallet() {
  const [wallet, setWallet] = useState();
  const [open, setOpen] = useState(false);

  const transformData = (data) => {
    setWallet(data);
  };

  const { isLoading, error, sendRequest: fetchWallets } = useHttp();

  const fetchWalletHandler = useCallback(() => {
    fetchWallets({ url: "http://localhost:3001/wallet/all" }, transformData);
  }, [fetchWallets]);

  const handleClose = (event , reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const copyClipboard = (data) => {
    console.log(data);
    navigator.clipboard.writeText(data);
    setOpen(true);
  };

  useEffect(() => {
    fetchWalletHandler();
  }, [fetchWalletHandler]);

  return (
    <>
      <CardContent>
        {isLoading && <CircularProgress />}
        {!isLoading && wallet && wallet.total === 0 && (
          <span>Nenhuma chave encontrada</span>
        )}
        {!isLoading && error && <span>{error}</span>}
        {!isLoading && !error && wallet && wallet.total > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Alias</TableCell>
                  <TableCell>Chave Pública</TableCell>
                  <TableCell>Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallet.wallets.map((w) => (
                  <TableRow key={w.alias}>
                    <TableCell>{w.alias}</TableCell>
                    <TableCell>{w.publicKey}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => copyClipboard(w.publicKey)}
                      >
                        <ContentCopyIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={fetchWalletHandler}>
          <AutorenewIcon />
        </Button>
        {!isLoading && wallet && <Button>Total {wallet.total}</Button>}
      </CardActions>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Copiado para área de transferência com sucesso!"
      />
    </>
  );
}

export default ListWallet;
