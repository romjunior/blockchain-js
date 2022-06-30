import Blockchain from "../core/Blockchain";
import Keys from "../core/Keys";
import Transaction from "../model/Transaction";
import { createTransactionService, listAllTransactionForWalletService } from "./TransactionService";

jest.mock('../core/Keys');
jest.mock('../core/Blockchain');

describe('TransactionService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a transaction with success', async () => {

        const mockGetPublic = jest.fn().mockResolvedValue('public');

        Keys.getInstance = jest.fn().mockImplementation(() => {
            return {
                getPublic: mockGetPublic
            }
        });

        jest.spyOn(Transaction.prototype, 'signTransaction').mockImplementation(() => {
            return;
        });

        const mockAdd = jest.fn();

        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                addTransaction: mockAdd
            }
        });

        await createTransactionService('from', 'to', 0);

        expect(mockAdd).toBeCalled();
        expect(mockGetPublic).toBeCalled();
        expect(Transaction.prototype.signTransaction).toBeCalled();
    });

    it('should list transactions from blockchain', async () => {

        const tx = new Transaction('from', 'to', 10);
        const tx2 = new Transaction('to', 'from', 15);

        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                getAllTransactionsForWallet: jest.fn().mockResolvedValue([ tx, tx2 ])
            }
        });
        const result = await listAllTransactionForWalletService('from');
        expect(result).toEqual({
            count: 2,
            data: [
                {
                    fromAddress: 'from',
                    toAddress: 'to',
                    amount: 10,
                    operation: 'negative',
                    timestamp: tx.getTimestamp,
                    signature: ''
                },
                {
                    fromAddress: 'to',
                    toAddress: 'from',
                    amount: 15,
                    operation: 'positive',
                    timestamp: tx2.getTimestamp,
                    signature: ''
                }
            ]
        });
    });

    it('should throw error when list all transactions', async () => {
        Blockchain.getIstance = jest.fn().mockImplementation(() => {
            return {
                getAllTransactionsForWallet: jest.fn().mockImplementation(() => {
                    throw new Error('error');
                })
            }
        });

        await expect(listAllTransactionForWalletService('public')).rejects.toThrow(Error);
        await expect(listAllTransactionForWalletService('public')).rejects.toThrow('error');
    });
});