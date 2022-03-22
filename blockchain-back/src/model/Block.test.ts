import { SHA256 } from "crypto-js";
import Block from "./Block";
import Transaction from "./Transaction";


jest.mock('crypto-js');
const mockSHA = SHA256 as jest.MockedFunction<typeof SHA256>;

describe('Block', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('deve criar um bloco com trasacoes validas', () => {
        mockSHA.mockReturnValue({
            words: [1, 2, 3],
            sigBytes: 1,
            toString: jest.fn().mockReturnValue('00teste'),
            concat: jest.fn(),
            clamp: jest.fn(),
            clone: jest.fn()
        });

        const tr1 = new Transaction('from', 'to', 10);

        jest.spyOn(tr1, 'isValid').mockReturnValue(true);

        const blockDate = new Date();

        const result = new Block(blockDate, [tr1], 'nada');

        expect(result.getData).toEqual([tr1]);
        expect(result.getHash).toEqual('00teste');
        expect(result.getPreviousHash).toEqual('nada');
        expect(result.hasValidTransactions()).toBe(true);
        expect(result).toEqual({
            hash: '00teste',
            data: [tr1],
            nonce: 0,
            previousHash: "nada",
            timestamp: blockDate
        });
    });

    it('deve criar um bloco com trasacoes invalidas', () => {
        mockSHA.mockReturnValue({
            words: [1, 2, 3],
            sigBytes: 1,
            toString: jest.fn().mockReturnValue('00teste'),
            concat: jest.fn(),
            clamp: jest.fn(),
            clone: jest.fn()
        });

        const tr1 = new Transaction('from', 'to', 10);

        jest.spyOn(tr1, 'isValid').mockReturnValue(false);

        const blockDate = new Date();

        const result = new Block(blockDate, [tr1], 'nada');

        expect(result.hasValidTransactions()).toBe(false);
    });

    it('deve calcular o hash do bloco ate encontrar o valido', () => {
        mockSHA.mockReturnValue({
            words: [1, 2, 3],
            sigBytes: 1,
            toString: jest.fn().mockReturnValueOnce('02932').mockReturnValueOnce('10d3e3').mockReturnValue('00teste'),
            concat: jest.fn(),
            clamp: jest.fn(),
            clone: jest.fn()
        });
        const tr1 = new Transaction('from', 'to', 10);
        const blockDate = new Date();
        const difficulty = 2;

        const result = new Block(blockDate, [tr1], 'nada');

        result.mineBlock(difficulty);

        expect(result.getHash).toEqual('00teste');
        expect(result).toEqual({
            hash: '00teste',
            data: [tr1],
            nonce: 2,
            previousHash: "nada",
            timestamp: blockDate
        });
    });
});