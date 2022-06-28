import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useRef } from "react";

function Blockchain() {
  const publicKeyRef = useRef();

  return (
    <Paper elevation={3}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", p: 3 }}>
        <CardContent>
          <Typography component="div" color="text.secondary" variant="h5">
            Minerar bloco
          </Typography>
          <Divider />
          <FormControl required={true} fullWidth={true} margin="normal">
            <InputLabel htmlFor="public-key">Chave Pública</InputLabel>
            <Input
              inputRef={publicKeyRef}
              id="public-key"
              aria-describedby="public-key-text"
            />
            <FormHelperText id="public-key-text">
              Deve ser a chave pública
            </FormHelperText>
          </FormControl>
        </CardContent>
        <CardActions>
        <Button variant="contained">Minerar</Button>
        </CardActions>
      </Box>
    </Paper>
  );
}

export default Blockchain;
