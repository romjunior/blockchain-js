import { useCallback, useEffect, useState } from "react";
import Button from "../UI/button/Button";

function Wallet() {
  const [wallet, setWallet] = useState();
  const [isLoading, setLoading] = useState();

  const fetchWalletHandler = useCallback(async () => {
    setLoading(true)
    const response = await fetch("http://localhost:3001/wallet/all");
    const data = await response.json();
    console.log(data);
    setWallet(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWalletHandler();
  }, [fetchWalletHandler]);

  return (
    <>
    {isLoading && <p>Carregando...</p>}
    {!isLoading && wallet && wallet.total === 0 && <p>Nenhuma chave encontrada</p>}
    {!isLoading && wallet && wallet.total > 0 && (
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
      <Button title="Criar Wallet" />
      <Button onClick={fetchWalletHandler} title="Buscar Wallets" />
    </>
  );
}

export default Wallet;
