import "./App.css";
import { Toolbar, AppBar, Typography, Container } from "@mui/material";
import Wallet from "./components/wallet/Wallet";

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
        <Container sx={{ "margin-top": "10px" }} maxWidth="xl">
          <Wallet />
        </Container>
      </div>
    </>
  );
}

export default App;
