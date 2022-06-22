import {
  Alert,
  Avatar,
  CardContent,
  CircularProgress,
  Divider,
  Fab,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import useHttp from "../../hooks/use-http";

function ListTransaction() {
  const publicKeyRef = useRef();
  const [transactions, setTransactions] = useState();
  const { isLoading, error, sendRequest: listTransactions } = useHttp();

  const transformData = (data) => {
    setTransactions(data);
  };

  const searchTransactionForPublicKey = () => {
    listTransactions(
      {
        url: `http://localhost:3001/transaction?publicKey=${publicKeyRef.current.value}`,
      },
      transformData
    );
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && transactions && transactions.count === 0 && (
        <p>Nenhuma Transação encontrada</p>
      )}
      {!isLoading && error && <Alert severity="error">{error}</Alert>}
      <CardContent>
        <FormControl required={true} fullWidth={true} margin="normal">
          <InputLabel htmlFor="public-key-search">Chave Pública</InputLabel>
          <Input inputRef={publicKeyRef} id="public-key-search" />
        </FormControl>
        <Fab
          onClick={searchTransactionForPublicKey}
          color="primary"
          aria-label="search"
        >
          <SearchIcon />
        </Fab>
        {!isLoading && !error && transactions && transactions.count > 0 && (
          <List>
            <Divider variant="inset" component="li" />
            {transactions.data.map((transaction) => (
              <>
                <ListItem key={transaction.timestamp} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar variant="rounded">{transaction.amount}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Para: " + transaction.fromAddress}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {"Data: " + transaction.timestamp}
                        </Typography>
                        {
                          " — Assinatura: " + transaction.signature
                        }
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        )}
      </CardContent>
    </>
  );
}

export default ListTransaction;
