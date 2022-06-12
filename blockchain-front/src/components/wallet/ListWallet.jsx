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
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import useHttp from "../../hooks/use-http";

function ListWallet() {
  const [wallet, setWallet] = useState();

  const transformData = data => {
    setWallet(data);
  };

  const { isLoading, error, sendRequest: fetchWallets } = useHttp();

  const fetchWalletHandler = useCallback(() => {
    fetchWallets({ url: "http://localhost:3001/wallet/all" }, transformData);
  }, [fetchWallets]);

  useEffect(() => {
    fetchWalletHandler();
  }, [fetchWalletHandler]);

  return (
    <>
      <CardContent>
        {isLoading && <CircularProgress />}
        {!isLoading && wallet && wallet.total === 0 && (
          <p>Nenhuma chave encontrada</p>
        )}
        {!isLoading && error && <p>{error}</p>}
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
                    <TableCell>x</TableCell>
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
    </>
  );
}

export default ListWallet;
