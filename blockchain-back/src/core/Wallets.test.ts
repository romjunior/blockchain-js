import * as WalletModule from "./Wallets";

jest.mock('./Keys', () => {
    return {
        getInstance: jest.fn().mockImplementation(() => {
            return {
                generateKeys: jest.fn().mockReturnValue(['private', 'public'])
            }
        })
    }
});

let underTestModule: typeof WalletModule

describe('Wallets', () => {

    beforeEach(() => {
        jest.resetModules();
        //jest.clearAllMocks();
        underTestModule = require('./Wallets');
    });

    it('deve criar uma chave com sucesso', async () => {
       const keys = await underTestModule.createWallet('test');

       const publicKey = await underTestModule.findPublicKeyByAlias('test');

       expect(keys).toStrictEqual(['private', 'public']);
       expect(publicKey).toBe('public');
    });

    it('deve retornar um erro de chave para alias duplicado', async() => {
        await underTestModule.createWallet('test');

        await expect(underTestModule.createWallet('test')).rejects.toThrow(Error);
        await expect(underTestModule.createWallet('test')).rejects.toThrow('Wallet alias already exists! choose other alias.');
    });
});