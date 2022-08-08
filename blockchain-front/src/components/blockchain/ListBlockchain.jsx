import { Alert, Avatar, Button, CardActions, CardContent, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useHttp from "../../hooks/use-http";

function ListBlockchain() {
    const [chain, setChain] = useState();

    const transformData = (data) => {
        console.log(data);
        setChain(data);
    };

    const { isLoading, error, sendRequest: fetchChain } = useHttp();

    const fetchChainHandler = useCallback(() => {
        fetchChain({ url: 'http://localhost:3001/blockchain/chain' }, transformData);
    }, [fetchChain]);

    useEffect(() => {
        fetchChainHandler();
    }, [fetchChainHandler]);

    return (
        <>
          {isLoading && <CircularProgress />}
          {!isLoading && chain?.chain && chain?.chain.length === 0 && (
            <span>Nenhum bloco criado ainda</span>
          )}
          {!isLoading && error && <Alert severity="error">{error}</Alert>}
          <CardContent>
            {!isLoading && !error && chain?.chain && chain?.chain.length > 0 && (
              <List>
                <Divider variant="inset" component="li" />
                {chain?.chain.map((block) => (
                  <>
                    <ListItem key={block.timestamp} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar variant="rounded">{block.data.length}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Hash: " + block.hash}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {"Hash Anterior: " + block.previousHash}
                            </Typography>
                            <br />
                            {
                              "Nonce: " + block.nonce
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
          <Button variant="contained" onClick={fetchChainHandler}>
          <AutorenewIcon />
        </Button>
        {!isLoading && chain?.chain && <Button>Tamanho da Cadeira {chain?.chain.length} - {chain.valid ? 'Cadeia Válida' : 'Cadeia Não Válida'}</Button>}
          </CardActions>
        </>
      );
}

export default ListBlockchain;