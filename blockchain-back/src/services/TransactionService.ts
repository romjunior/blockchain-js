import Blockchain from "../core/Blockchain";
import Keys from "../core/Keys";
import Transaction from "../model/Transaction";

export const createTransactionService = async (fromAddress: string, toAddress: string, amount: number): Promise<void> => {
    const fromPublicAddress = Keys.getInstance().getPublic(fromAddress);
    const tr = new Transaction(fromPublicAddress, toAddress, amount);
    tr.signTransaction(fromAddress);
    return await Blockchain.getIstance().addTransaction(tr);
}