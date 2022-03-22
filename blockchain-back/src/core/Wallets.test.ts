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

    it('deve retornar chave publica pelo alias pesquisado', async() => {
        await underTestModule.createWallet('test');

        const result = await underTestModule.findPublicKeyByAlias('test');

        expect(result).toBe('public');
    });

    it('deve retornar undefined se não possuir chave publica pelo alias pesquisado', async() => {
        const result = await underTestModule.findPublicKeyByAlias('test');

        expect(result).toBe(undefined);
    });

    it('deve listar todas as carteiras cadastradas', async() => {
        await underTestModule.createWallet('test');

        const result = await underTestModule.listAllWallets();

        expect(result).toStrictEqual([
            {
                alias: 'test',
                publicKey: 'public'
            }
        ])
    });
});