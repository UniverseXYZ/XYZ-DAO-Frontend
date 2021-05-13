import React, { FC, createContext, useContext } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { TokenIconNames } from 'components/custom/icon';
import { MainnetHttpsWeb3Provider } from 'components/providers/eth-web3-provider';
import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

import { formatUSD } from '../../../web3/utils';

export enum KnownTokens {
  ETH = 'ETH',
  BTC = 'BTC',
  WETH = 'WETH',
  WBTC = 'WBTC',
  REN_BTC = 'renBTC',
  USDC = 'USDC',
  XYZ = 'XYZ',
  BOND = 'BOND',
  AAVE = 'AAVE',
  COMP = 'COMP',
  SNX = 'SNX',
  SUSHI = 'SUSHI',
  LINK = 'LINK',
  ILV = 'ILV',
  USDC_XYZ_SUSHI_LP = 'USDC_XYZ_SUSHI_LP',
}

export type TokenMeta = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  priceFeed?: string;
  pricePath?: KnownTokens[];
  price?: BigNumber;
  icon?: TokenIconNames;
  contract?: Web3Contract;
};

export const UsdcToken: TokenMeta = {
  address: config.contracts.usdc.token,
  symbol: KnownTokens.USDC,
  name: 'USD Coin',
  decimals: 6,
  priceFeed: config.contracts.usdc.price, // USDC -> $
  icon: 'token-usdc',
  contract: new Erc20Contract([], config.contracts.usdc.token),
};

export const XyzToken: TokenMeta = {
  address: config.contracts.xyz.token,
  symbol: KnownTokens.XYZ,
  name: 'XYZ Governance Token',
  decimals: 18,
  priceFeed: config.contracts.xyz.price, // XYZ -> USDC
  pricePath: [KnownTokens.USDC],
  icon: 'png/universe' as any,
  contract: new Erc20Contract([], config.contracts.xyz.token),
};

export const BondToken: TokenMeta = {
  address: config.contracts.bond.token,
  symbol: KnownTokens.BOND,
  name: 'BarnBridge',
  decimals: 18,
  priceFeed: config.contracts.bond.price, // BOND -> USDC
  pricePath: [KnownTokens.USDC],
  icon: 'static/token-bond',
  contract: new Erc20Contract([], config.contracts.bond.token),
};

export const AaveToken: TokenMeta = {
  address: config.contracts.aave.token,
  symbol: KnownTokens.AAVE,
  name: 'Aave',
  decimals: 18,
  priceFeed: config.contracts.aave.price, // AAVE -> $
  icon: 'png/aave',
  contract: new Erc20Contract([], config.contracts.aave.token),
};

export const CompToken: TokenMeta = {
  address: config.contracts.comp.token,
  symbol: KnownTokens.COMP,
  name: 'Compound',
  decimals: 18,
  priceFeed: config.contracts.comp.price, // COMP -> $
  icon: 'compound',
  contract: new Erc20Contract([], config.contracts.comp.token),
};

export const SnxToken: TokenMeta = {
  address: config.contracts.snx.token,
  symbol: KnownTokens.SNX,
  name: 'Synthetix Network Token',
  decimals: 18,
  priceFeed: config.contracts.snx.price, // SNX -> $
  icon: 'token-snx',
  contract: new Erc20Contract([], config.contracts.snx.token),
};

export const SushiToken: TokenMeta = {
  address: config.contracts.sushi.token,
  symbol: KnownTokens.SUSHI,
  name: 'Sushi',
  decimals: 18,
  priceFeed: config.contracts.sushi.price, // SUSHI -> ETH
  pricePath: [KnownTokens.ETH],
  icon: 'png/sushi',
  contract: new Erc20Contract([], config.contracts.sushi.token),
};

export const LinkToken: TokenMeta = {
  address: config.contracts.link.token,
  symbol: KnownTokens.LINK,
  name: 'Chainlink',
  decimals: 18,
  priceFeed: config.contracts.link.price, // LINK -> $
  icon: 'png/link',
  contract: new Erc20Contract([], config.contracts.link.token),
};

export const IlvToken: TokenMeta = {
  address: config.contracts.ilv.token,
  symbol: KnownTokens.ILV,
  name: 'Illuvium',
  decimals: 18,
  icon: 'png/ilv',
  contract: new Erc20Contract([], config.contracts.ilv.token),
};

export const UsdcXYZSushiLPToken: TokenMeta = {
  address: config.contracts.usdcXYZSushiLP.token,
  symbol: KnownTokens.USDC_XYZ_SUSHI_LP,
  name: 'USDC XYZ SUSHI LP',
  decimals: 18,
  priceFeed: config.contracts.usdcXYZSushiLP.price, // USDC_XYZ_SUSHI_LP -> USDC
  pricePath: [KnownTokens.USDC],
  icon: 'token-usdc',
  contract: new Erc20Contract([], config.contracts.usdcXYZSushiLP.token),
};

const KNOWN_TOKENS: TokenMeta[] = [
  {
    address: '0x',
    symbol: KnownTokens.BTC,
    name: 'BTC',
    decimals: 0,
    priceFeed: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c', // BTC -> $
    icon: 'token-wbtc',
  },
  {
    address: '0x',
    symbol: KnownTokens.ETH,
    name: 'Ether',
    decimals: 0,
    priceFeed: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH -> $
    icon: 'token-eth',
  },
  {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    symbol: KnownTokens.WETH,
    name: 'Wrapped Ether',
    decimals: 18,
    pricePath: [KnownTokens.ETH],
    icon: 'token-weth',
  },
  {
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    symbol: KnownTokens.WBTC,
    name: 'Wrapped BTC',
    decimals: 8,
    pricePath: [KnownTokens.BTC],
    icon: 'token-wbtc',
  },
  {
    address: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
    symbol: KnownTokens.REN_BTC,
    name: 'renBTC',
    decimals: 8,
    pricePath: [KnownTokens.BTC],
    icon: 'token-renbtc',
  },
  UsdcToken,
  XyzToken,
  BondToken,
  AaveToken,
  CompToken,
  SnxToken,
  SushiToken,
  LinkToken,
  IlvToken,
  UsdcXYZSushiLPToken,
];

(window as any).KNOWN_TOKENS = KNOWN_TOKENS;

export function getKnownTokens(): TokenMeta[] {
  return [...KNOWN_TOKENS];
}

type ContextType = {
  tokens: TokenMeta[];
  getTokenBySymbol(symbol: string): TokenMeta | undefined;
  getTokenByAddress(address: string): TokenMeta | undefined;
  getTokenPriceIn(source: string, target: string): BigNumber | undefined;
  convertTokenIn(amount: BigNumber | undefined, source: string, target: string): BigNumber | undefined;
  convertTokenInUSD(amount: BigNumber | undefined, source: string): BigNumber | undefined;
};

const Context = createContext<ContextType>({
  tokens: [...KNOWN_TOKENS],
  getTokenBySymbol: () => undefined,
  getTokenByAddress: () => undefined,
  getTokenPriceIn: () => undefined,
  convertTokenIn: () => undefined,
  convertTokenInUSD: () => undefined,
});

export function useKnownTokens(): ContextType {
  return useContext<ContextType>(Context);
}

const PRICE_FEED_ABI: AbiItem[] = [
  createAbiItem('decimals', [], ['int8']),
  createAbiItem('latestAnswer', [], ['int256']),
];

const BOND_PRICE_FEED_ABI: AbiItem[] = [
  createAbiItem('decimals', [], ['int8']),
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('getReserves', [], ['uint112', 'uint112']),
  createAbiItem('token0', [], ['address']),
];

export function getTokenBySymbol(symbol: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.symbol === symbol);
}

export function getTokenByAddress(address: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
}

async function getFeedPrice(symbol: string): Promise<BigNumber> {
  const token = getTokenBySymbol(symbol);

  if (!token || !token.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(PRICE_FEED_ABI, token.priceFeed);
  priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider);

  const [decimals, latestAnswer] = await priceFeedContract.batch([
    { method: 'decimals', transform: Number },
    { method: 'latestAnswer', transform: value => new BigNumber(value) },
  ]);

  return latestAnswer.unscaleBy(decimals)!;
}

async function getBondPrice(): Promise<BigNumber> {
  const usdcToken = getTokenBySymbol(KnownTokens.USDC);
  const bondToken = getTokenBySymbol(KnownTokens.BOND);

  if (!usdcToken || !bondToken || !bondToken.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, bondToken.priceFeed);

  const [decimals, [reserve0, reserve1], token0] = await priceFeedContract.batch([
    { method: 'decimals', transform: Number },
    {
      method: 'getReserves',
      transform: ({ 0: reserve0, 1: reserve1 }) => [new BigNumber(reserve0), new BigNumber(reserve1)],
    },
    { method: 'token0', transform: value => value.toLowerCase() },
  ]);

  const bond = token0 === bondToken.address.toLowerCase() ? reserve0 : reserve1;
  const usdc = token0 === bondToken.address.toLowerCase() ? reserve1 : reserve0;

  const bondReserve = bond.unscaleBy(decimals)!;
  const usdcReserve = usdc.unscaleBy(usdcToken.decimals)!;

  if (bondReserve?.eq(BigNumber.ZERO)) {
    return BigNumber.ZERO;
  }

  return usdcReserve.dividedBy(bondReserve);
}

async function getUsdcXYZSushiLPPrice(): Promise<BigNumber> {
  const usdcToken = getTokenBySymbol(KnownTokens.USDC);
  const usdcXYZSushiLPToken = getTokenBySymbol(KnownTokens.USDC_XYZ_SUSHI_LP);

  if (!usdcToken || !usdcXYZSushiLPToken || !usdcXYZSushiLPToken.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, usdcXYZSushiLPToken.priceFeed);

  const [decimals, totalSupply, [reserve0, reserve1], token0] = await priceFeedContract.batch([
    { method: 'decimals', transform: Number },
    { method: 'totalSupply', transform: value => new BigNumber(value) },
    {
      method: 'getReserves',
      transform: ({ 0: reserve0, 1: reserve1 }) => [new BigNumber(reserve0), new BigNumber(reserve1)],
    },
    { method: 'token0', transform: value => value.toLowerCase() },
  ]);

  const usdcAmount = token0 === usdcToken.address.toLowerCase() ? reserve0 : reserve1;
  const usdcReserve = usdcAmount.unscaleBy(usdcToken.decimals)!;
  const supply = totalSupply.unscaleBy(decimals)!;

  return usdcReserve.dividedBy(supply).multipliedBy(2);
}

export function getTokenPrice(symbol: string): BigNumber | undefined {
  return getTokenBySymbol(symbol)?.price;
}

export function getTokenPriceIn(source: string, target: string): BigNumber | undefined {
  const sourcePrice = getTokenPrice(source);
  const targetPrice = getTokenPrice(target);

  if (!sourcePrice || !targetPrice) {
    return undefined;
  }

  return sourcePrice.dividedBy(targetPrice);
}

export function convertTokenIn(
  amount: BigNumber | number | undefined,
  source: string,
  target: string,
): BigNumber | undefined {
  if (amount === undefined || amount === null) {
    return undefined;
  }

  if (amount === 0 || BigNumber.ZERO.eq(amount)) {
    return BigNumber.ZERO;
  }

  const bnAmount = new BigNumber(amount);

  if (bnAmount.isNaN()) {
    return undefined;
  }

  if (source === target) {
    return bnAmount;
  }

  const price = getTokenPriceIn(source, target);

  if (!price) {
    return undefined;
  }

  return bnAmount.multipliedBy(price);
}

export function convertTokenInUSD(amount: BigNumber | number | undefined, source: string): BigNumber | undefined {
  return convertTokenIn(amount, source, KnownTokens.USDC);
}

const KnownTokensProvider: FC = props => {
  const { children } = props;

  const wallet = useWallet();
  const [reload] = useReload();

  React.useEffect(() => {
    (BondToken.contract as Erc20Contract).loadCommon().catch(Error);

    (async () => {
      await Promise.allSettled(
        KNOWN_TOKENS.map(async token => {
          switch (token.symbol) {
            case KnownTokens.BOND:
              token.price = await getBondPrice();
              break;
            case KnownTokens.USDC_XYZ_SUSHI_LP:
              token.price = await getUsdcXYZSushiLPPrice();
              break;
            default:
              token.price = await getFeedPrice(token.symbol);
              break;
          }
        }),
      );

      KNOWN_TOKENS.forEach(token => {
        if (token.priceFeed && token.price === undefined) {
          token.price = BigNumber.ZERO;
          return;
        }

        if (token.pricePath) {
          for (let path of token.pricePath) {
            const tk = getTokenBySymbol(path);

            if (!tk || !tk.price) {
              token.price = undefined;
              break;
            }

            token.price = token.price?.multipliedBy(tk.price) ?? tk.price;
          }
        }

        console.log(`[Token Price] ${token.symbol} = ${formatUSD(token.price)}`);
      });

      reload();
    })();
  }, []);

  React.useEffect(() => {
    KNOWN_TOKENS.forEach(token => {
      token.contract?.setProvider(wallet.provider);
    });
  }, [wallet.provider]);

  React.useEffect(() => {
    KNOWN_TOKENS.forEach(token => {
      token.contract?.setAccount(wallet.account);
    });

    // load xyz balance for connected wallet
    if (wallet.account) {
      (XyzToken.contract as Erc20Contract).loadBalance().then(reload).catch(Error);
    }
  }, [wallet.account]);

  const value = {
    tokens: [...KNOWN_TOKENS],
    getTokenBySymbol,
    getTokenByAddress,
    getTokenPriceIn,
    convertTokenIn,
    convertTokenInUSD,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default KnownTokensProvider;
