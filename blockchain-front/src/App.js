import "./App.css";
import { Toolbar, AppBar, Typography, Container } from "@mui/material";
import Wallet from "./components/wallet/Wallet";
import Transaction from "./components/transaction/Transaction";
import Blockchain from "./components/blockchain/Blockchain";

function App() {

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h3" color="inherit" component="div">
            JsCoin
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="App">
        <Container sx={{ marginTop: "15px" }} maxWidth="xl">
          <Wallet />
        </Container>
        <Container sx={{ marginTop: "15px" }} maxWidth="xl">
          <Blockchain />
        </Container>
        <Container sx={{ marginTop: "15px" }} maxWidth="xl">
          <Transaction />
        </Container>
      </div>
    </>
  );
}

export default App;
