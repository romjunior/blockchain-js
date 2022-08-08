import {
  Alert,
  Avatar,
  Button,
  CardActions,
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
import { blue, red } from "@mui/material/colors";

function ListTransaction() {
  const publicKeyRef = useRef();
  const [transactions, setTransactions] = useState();
  const [balance, setBalance] = useState();
  const { isLoading, error, sendRequest: listTransactions } = useHttp();
  const { isLoadingBalance, errorBalance, sendRequest: getBalance } = useHttp();

  const searchTransactionForPublicKey = () => {

    const publicKey = publicKeyRef.current.value;

    if(!publicKey) {
      return;
    }

    listTransactions(
      {
        url: `http://localhost:3001/transaction?publicKey=${publicKey}`
      },
      (data) => setTransactions(data)
    );

    getBalance({
      url: `http://localhost:3001/balance?publicKey=${publicKey}`
    },
    (data) => setBalance(data.balance)
    );


  };

  const isPositive = (tx) => tx.operation === 'positive';

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && transactions && transactions.count === 0 && (
        <span>Nenhuma Transação encontrada</span>
      )}
      {!isLoading && (error || errorBalance) && <Alert severity="error">{error || errorBalance}</Alert>}
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
                    <Avatar variant="rounded" sx={isPositive(transaction) ? { bgcolor: blue[500] } : { bgcolor: red[500] }} >{transaction.amount}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={isPositive(transaction) ? "De: " + transaction.fromAddress : "Para: " + transaction.toAddress }
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
                        <br />
                        {
                          "Assinatura: " + transaction.signature
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
      <CardActions>
        {!isLoadingBalance && balance && <Button>Saldo: {balance}</Button>}
      </CardActions>
    </>
  );
}

export default ListTransaction;
