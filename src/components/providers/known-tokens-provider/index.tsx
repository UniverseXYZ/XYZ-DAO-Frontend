import React, { FC, createContext, useContext, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/erc20Contract';
import { formatUSD } from 'web3/utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { TokenIconNames } from 'components/custom/icon';
import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export enum KnownTokens {
  XYZ = 'XYZ',
  USDC = 'USDC',
  BOND = 'BOND',
  AAVE = 'AAVE',
  COMP = 'COMP',
  SNX = 'SNX',
  SUSHI = 'SUSHI',
  LINK = 'LINK',
  ILV = 'ILV',
  USDC_XYZ_SLP = 'USDC_XYZ_SUSHI_LP',
}

export type TokenMeta = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon?: TokenIconNames;
  coinGeckoId?: string;
  contract?: Web3Contract;
  price?: BigNumber;
};

export const XyzToken: TokenMeta = {
  address: config.tokens.xyz,
  symbol: KnownTokens.XYZ,
  name: 'XYZ Governance Token',
  decimals: 18,
  icon: 'png/universe' as any,
  contract: new Erc20Contract([], config.tokens.xyz),
};

export const UsdcToken: TokenMeta = {
  address: config.tokens.usdc,
  symbol: KnownTokens.USDC,
  name: 'USD Coin',
  decimals: 6,
  icon: 'token-usdc',
  coinGeckoId: 'usd-coin',
  contract: new Erc20Contract([], config.tokens.usdc),
};

export const BondToken: TokenMeta = {
  address: config.tokens.bond,
  symbol: KnownTokens.BOND,
  name: 'BarnBridge',
  decimals: 18,
  icon: 'static/token-bond',
  coinGeckoId: 'barnbridge',
  contract: new Erc20Contract([], config.tokens.bond),
};

export const AaveToken: TokenMeta = {
  address: config.tokens.aave,
  symbol: KnownTokens.AAVE,
  name: 'Aave',
  decimals: 18,
  icon: 'png/aave',
  coinGeckoId: 'aave',
  contract: new Erc20Contract([], config.tokens.aave),
};

export const CompToken: TokenMeta = {
  address: config.tokens.comp,
  symbol: KnownTokens.COMP,
  name: 'Compound',
  decimals: 18,
  icon: 'compound',
  coinGeckoId: 'compound-governance-token',
  contract: new Erc20Contract([], config.tokens.comp),
};

export const SnxToken: TokenMeta = {
  address: config.tokens.snx,
  symbol: KnownTokens.SNX,
  name: 'Synthetix Network Token',
  decimals: 18,
  icon: 'token-snx',
  coinGeckoId: 'havven',
  contract: new Erc20Contract([], config.tokens.snx),
};

export const SushiToken: TokenMeta = {
  address: config.tokens.sushi,
  symbol: KnownTokens.SUSHI,
  name: 'Sushi',
  decimals: 18,
  icon: 'png/sushi',
  coinGeckoId: 'sushi',
  contract: new Erc20Contract([], config.tokens.sushi),
};

export const LinkToken: TokenMeta = {
  address: config.tokens.link,
  symbol: KnownTokens.LINK,
  name: 'Chainlink',
  decimals: 18,
  icon: 'png/link',
  coinGeckoId: 'chainlink',
  contract: new Erc20Contract([], config.tokens.link),
};

export const IlvToken: TokenMeta = {
  address: config.tokens.ilv,
  symbol: KnownTokens.ILV,
  name: 'Illuvium',
  decimals: 18,
  icon: 'png/ilv',
  coinGeckoId: 'illuvium',
  contract: new Erc20Contract([], config.tokens.ilv),
};

export const UsdcXyzSLPToken: TokenMeta = {
  address: config.tokens.usdcXyzSLP,
  symbol: KnownTokens.USDC_XYZ_SLP,
  name: 'USDC XYZ SUSHI LP',
  decimals: 18,
  icon: 'png/uslp',
  contract: new Erc20Contract([], config.tokens.usdcXyzSLP),
};

const KNOWN_TOKENS: TokenMeta[] = [
  XyzToken,
  UsdcToken,
  BondToken,
  AaveToken,
  CompToken,
  SnxToken,
  SushiToken,
  LinkToken,
  IlvToken,
  UsdcXyzSLPToken,
];

(window as any).KNOWN_TOKENS = KNOWN_TOKENS;

export function getKnownTokens(): TokenMeta[] {
  return [...KNOWN_TOKENS];
}

type ContextType = {
  tokens: TokenMeta[];
  version: number;
  getTokenBySymbol(symbol: string): TokenMeta | undefined;
  getTokenByAddress(address: string): TokenMeta | undefined;
  getTokenPriceIn(source: string, target: string): BigNumber | undefined;
  convertTokenIn(amount: BigNumber | undefined, source: string, target: string): BigNumber | undefined;
  convertTokenInUSD(amount: BigNumber | undefined, source: string): BigNumber | undefined;
};

const Context = createContext<ContextType>({
  tokens: [...KNOWN_TOKENS],
  version: 0,
  getTokenBySymbol: () => undefined,
  getTokenByAddress: () => undefined,
  getTokenPriceIn: () => undefined,
  convertTokenIn: () => undefined,
  convertTokenInUSD: () => undefined,
});

export function useKnownTokens(): ContextType {
  return useContext<ContextType>(Context);
}

export function getTokenBySymbol(symbol: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.symbol === symbol);
}

export function getTokenByAddress(address: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
}

const LP_PRICE_FEED_ABI: AbiItem[] = [
  createAbiItem('decimals', [], ['int8']),
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('getReserves', [], ['uint112', 'uint112']),
  createAbiItem('token0', [], ['address']),
];

async function getXyzPrice(): Promise<BigNumber> {
  const priceFeedContract = new Erc20Contract(LP_PRICE_FEED_ABI, UsdcXyzSLPToken.address);

  const [token0, { 0: reserve0, 1: reserve1 }] = await priceFeedContract.batch([{ method: 'token0' }, { method: 'getReserves' }]);

  let xyzReserve;
  let usdcReserve;

  if (String(token0).toLowerCase() === XyzToken.address) {
    xyzReserve = new BigNumber(reserve0).unscaleBy(XyzToken.decimals);
    usdcReserve = new BigNumber(reserve1).unscaleBy(UsdcToken.decimals);
  } else {
    xyzReserve = new BigNumber(reserve1).unscaleBy(XyzToken.decimals);
    usdcReserve = new BigNumber(reserve0).unscaleBy(UsdcToken.decimals);
  }

  if (!usdcReserve || !xyzReserve || xyzReserve.eq(BigNumber.ZERO)) {
    return BigNumber.ZERO;
  }

  return usdcReserve.dividedBy(xyzReserve);
}

async function getUsdcXyzSLPPrice(): Promise<BigNumber> {
  const priceFeedContract = new Erc20Contract(LP_PRICE_FEED_ABI, UsdcXyzSLPToken.address);

  const [decimals, totalSupply, token0, { 0: reserve0, 1: reserve1 }] = await priceFeedContract.batch([
    { method: 'decimals', transform: Number },
    { method: 'totalSupply', transform: value => new BigNumber(value) },
    { method: 'token0' },
    { method: 'getReserves' },
  ]);

  let usdcReserve;

  if (String(token0).toLowerCase() === XyzToken.address) {
    usdcReserve = new BigNumber(reserve1).unscaleBy(UsdcToken.decimals);
  } else {
    usdcReserve = new BigNumber(reserve0).unscaleBy(UsdcToken.decimals);
  }

  const supply = totalSupply.unscaleBy(decimals);

  if (!usdcReserve || !supply || supply.eq(BigNumber.ZERO)) {
    return BigNumber.ZERO;
  }

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
  const [reload, version] = useReload();

  useEffect(() => {
    (XyzToken.contract as Erc20Contract).loadCommon().catch(Error);

    (async () => {
      XyzToken.price = await getXyzPrice().catch(() => undefined);
      UsdcXyzSLPToken.price = await getUsdcXyzSLPPrice().catch(() => undefined);

      const ids = KNOWN_TOKENS.map(tk => tk.coinGeckoId)
        .filter(Boolean)
        .join(',');

      try {
        const prices = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
        ).then(res => res.json());

        KNOWN_TOKENS.forEach(token => {
          if (token.coinGeckoId) {
            const price = prices[token.coinGeckoId]?.usd;

            if (price) {
              token.price = new BigNumber(price);
            }
          }

          console.log(`[Token Price] ${token.symbol} = ${formatUSD(token.price)}`);
        });
      } catch {}

      reload();
    })();
  }, []);

  useEffect(() => {
    KNOWN_TOKENS.forEach(token => {
      token.contract?.setProvider(wallet.provider);
    });
  }, [wallet.provider]);

  useEffect(() => {
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
    version,
    getTokenBySymbol,
    getTokenByAddress,
    getTokenPriceIn,
    convertTokenIn,
    convertTokenInUSD,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default KnownTokensProvider;
