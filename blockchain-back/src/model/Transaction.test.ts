import { SHA256 } from "crypto-js";
import Transaction from './Transaction';
import Keys from '../core/Keys';

jest.mock('crypto-js');
jest.mock('../core/Keys');
const mockSHA = SHA256 as jest.MockedFunction<typeof SHA256>;

describe('Transaction', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should create a valid transaction with from, to and amount', () => {

        const fromAddress = 'from';
        const toAddress = 'to';
        const amount = 10;

        const tr = new Transaction(fromAddress, toAddress, amount);

        expect(tr.getFromAddress).toEqual(fromAddress);
        expect(tr.getToAddress).toEqual(toAddress);
        expect(tr.getAmount).toEqual(amount);
    });

    it('Should generate a valid hash', () => {
        mockSHA.mockReturnValue({
            words: [1, 2, 3],
            sigBytes: 1,
            toString: jest.fn().mockReturnValue('00teste'),
            concat: jest.fn(),
            clamp: jest.fn(),
            clone: jest.fn()
        });

        const tr = new Transaction('', '', 10);

        expect(tr.calculateHash()).toEqual('00teste');
    });

    it('Should throw error when de public key is different fromAddress', () => {
        const mockGetPublic = jest.fn().mockReturnValue('public');

        Keys.getInstance = jest.fn().mockImplementation(() => {
            return {
                getPublic: mockGetPublic
            }
        });

        const tr = new Transaction('from', 'to', 10);

        try {
            tr.signTransaction('chaveficticia');
        } catch (e) {
            expect(e).toStrictEqual(Error('You cannot sign transactions for other wallets'));
        }
    });

    it('Should sign transaction with success', () => {
        const mockGetPublic = jest.fn().mockReturnValue('from');
        const mockSignData = jest.fn().mockReturnValue('sign');
        Keys.getInstance = jest.fn().mockImplementation(() => {
            return {
                getPublic: mockGetPublic,
                signData: mockSignData
            }
        });

        const tr = new Transaction('from', 'to', 10);
        jest.spyOn(tr, 'calculateHash').mockReturnValue('hash');
        tr.signTransaction('chaveficticia');
    });

    it('Transaction should be valid when has an empty fromAddress', () => {
        const tr = new Transaction('', 'to', 10);

        expect(tr.isValid()).toEqual(true);
    });

    it('Transaction should be invalid when it not has signature', () => {
        const tr = new Transaction('from', 'to', 10);

        try {
            tr.isValid();
        } catch (e) {
            expect(e).toStrictEqual(Error('No Signature for this transaction'));
        }

    });

    it('Transaction should be valid when sign is valid', () => {
        const mockGetPublic = jest.fn().mockReturnValue('from');
        const mockSignData = jest.fn().mockReturnValue('sign');
        const mockVerifySignData = jest.fn().mockReturnValue(true);
        Keys.getInstance = jest.fn().mockImplementation(() => {
            return {
                verifySignData: mockVerifySignData,
                getPublic: mockGetPublic,
                signData: mockSignData
            }
        });

        const tr = new Transaction('from', 'to', 10);
        tr.signTransaction('chave');
        jest.spyOn(tr, 'calculateHash').mockReturnValue('hash');
        expect(tr.isValid()).toBe(true);
    });

    it('Transaction should be invalid when sign not equals with the data', () => {
        const mockGetPublic = jest.fn().mockReturnValue('from');
        const mockSignData = jest.fn().mockReturnValue('sign');
        const mockVerifySignData = jest.fn().mockReturnValue(false);
        Keys.getInstance = jest.fn().mockImplementation(() => {
            return {
                verifySignData: mockVerifySignData,
                getPublic: mockGetPublic,
                signData: mockSignData
            }
        });

        const tr = new Transaction('from', 'toInvalid', 10);
        tr.signTransaction('chave');
        jest.spyOn(tr, 'calculateHash').mockReturnValue('hash');
        expect(tr.isValid()).toBe(false);
    });

});