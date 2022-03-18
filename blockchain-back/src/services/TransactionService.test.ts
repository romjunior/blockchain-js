import Blockchain from "../core/Blockchain";
import Keys from "../core/Keys";
import Transaction from "../model/Transaction";
import { createTransactionService } from "./TransactionService";

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
});