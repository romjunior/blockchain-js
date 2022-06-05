import { useState } from "react";
import Button from "../UI/button/Button";

function Wallet() {
  const [wallet, setWallet] = useState();

  const fetchWalletHandler = () => {
    fetch("http://localhost:3001/wallet/all")
      .then((response) => response.json())
      .then((data) => setWallet(data));
    console.log(wallet);
  };

  return (
    <>
      {wallet && (
        <table>
          <thead>
            <tr>
              <th>Alias</th>
              <th>Public Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wallet.wallets.map((w) => (
              <tr key={w.alias}>
                <td>{w.alias}</td>
                <td>{w.publicKey}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td>
                <span>Total: {wallet.total}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      <Button onClick={fetchWalletHandler} title="Buscar Wallets" />
    </>
  );
}

export default Wallet;
