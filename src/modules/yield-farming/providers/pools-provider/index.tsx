import React, { FC, createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/web3Contract';

import {
  AaveToken,
  BondToken,
  CompToken,
  IlvToken,
  LinkToken,
  SnxToken,
  SushiToken,
  TokenMeta,
  UsdcXyzSLPToken,
  useKnownTokens,
} from 'components/providers/known-tokens-provider';
import config from 'config';
import { useReload } from 'hooks/useReload';
import { YfPoolContract } from 'modules/yield-farming/contracts/yfPool';
import { YfStakingContract } from 'modules/yield-farming/contracts/yfStaking';
import { useWallet } from 'wallets/wallet';

export enum YFPoolID {
  BOND = 'bond',
  AAVE = 'aave',
  COMP = 'comp',
  SNX = 'snx',
  SUSHI = 'sushi',
  LINK = 'link',
  ILV = 'ilv',
  USDC_XYZ_SLP = 'usdc-xyz-slp',
}

export type YFPoolMeta = {
  name: YFPoolID;
  label: string;
  icons: string[];
  colors: string[];
  tokens: TokenMeta[];
  contract: YfPoolContract;
};

export const BondYfPool: YFPoolMeta = {
  name: YFPoolID.BOND,
  label: 'BOND',
  icons: ['static/token-bond'],
  colors: ['var(--theme-red-color)'],
  tokens: [BondToken],
  contract: new YfPoolContract(config.contracts.yf.bond),
};

export const AaveYfPool: YFPoolMeta = {
  name: YFPoolID.AAVE,
  label: 'AAVE',
  icons: ['png/aave'],
  colors: ['var(--theme-red-color)'],
  tokens: [AaveToken],
  contract: new YfPoolContract(config.contracts.yf.aave),
};

export const CompYfPool: YFPoolMeta = {
  name: YFPoolID.COMP,
  label: 'COMP',
  icons: ['compound'],
  colors: ['var(--theme-red-color)'],
  tokens: [CompToken],
  contract: new YfPoolContract(config.contracts.yf.comp),
};

export const SnxYfPool: YFPoolMeta = {
  name: YFPoolID.SNX,
  label: 'SNX',
  icons: ['token-snx'],
  colors: ['var(--theme-red-color)'],
  tokens: [SnxToken],
  contract: new YfPoolContract(config.contracts.yf.snx),
};

export const SushiYfPool: YFPoolMeta = {
  name: YFPoolID.SUSHI,
  label: 'SUSHI',
  icons: ['png/sushi'],
  colors: ['var(--theme-red-color)'],
  tokens: [SushiToken],
  contract: new YfPoolContract(config.contracts.yf.sushi),
};

export const LinkYfPool: YFPoolMeta = {
  name: YFPoolID.LINK,
  label: 'LINK',
  icons: ['png/link'],
  colors: ['var(--theme-red-color)'],
  tokens: [LinkToken],
  contract: new YfPoolContract(config.contracts.yf.link),
};

export const IlvYfPool: YFPoolMeta = {
  name: YFPoolID.ILV,
  label: 'ILV',
  icons: ['png/ilv'],
  colors: ['var(--theme-red-color)'],
  tokens: [IlvToken],
  contract: new YfPoolContract(config.contracts.yf.ilv),
};

export const UsdcXyzSLPYfPool: YFPoolMeta = {
  name: YFPoolID.USDC_XYZ_SLP,
  label: 'USDC_XYZ_SUSHI_LP',
  icons: ['png/uslp'],
  colors: ['var(--theme-red-color)'],
  tokens: [UsdcXyzSLPToken],
  contract: new YfPoolContract(config.contracts.yf.usdcXyzSLP),
};

const KNOWN_POOLS: YFPoolMeta[] = [
  AaveYfPool,
  BondYfPool,
  CompYfPool,
  SnxYfPool,
  SushiYfPool,
  LinkYfPool,
  IlvYfPool,
  UsdcXyzSLPYfPool,
];

export function getYFKnownPoolByName(name: string): YFPoolMeta | undefined {
  return KNOWN_POOLS.find(pool => pool.name === name);
}

export type YFPoolsType = {
  yfPools: YFPoolMeta[];
  getYFKnownPoolByName: (name: string) => YFPoolMeta | undefined;
  stakingContract?: YfStakingContract;
  getPoolBalanceInUSD: (name: string) => BigNumber | undefined;
  getPoolEffectiveBalanceInUSD: (name: string) => BigNumber | undefined;
  getMyPoolBalanceInUSD: (name: string) => BigNumber | undefined;
  getMyPoolEffectiveBalanceInUSD: (name: string) => BigNumber | undefined;
  getYFTotalStakedInUSD: () => BigNumber | undefined;
  getYFTotalEffectiveStakedInUSD: () => BigNumber | undefined;
  getYFDistributedRewards: () => BigNumber | undefined;
  getYFTotalSupply: () => BigNumber | undefined;
};

const YFPoolsContext = createContext<YFPoolsType>({
  yfPools: KNOWN_POOLS,
  getYFKnownPoolByName: getYFKnownPoolByName,
  stakingContract: undefined,
  getPoolBalanceInUSD: () => undefined,
  getPoolEffectiveBalanceInUSD: () => undefined,
  getMyPoolBalanceInUSD: () => undefined,
  getMyPoolEffectiveBalanceInUSD: () => undefined,
  getYFTotalStakedInUSD: () => undefined,
  getYFTotalEffectiveStakedInUSD: () => undefined,
  getYFDistributedRewards: () => undefined,
  getYFTotalSupply: () => undefined,
});

export function useYFPools(): YFPoolsType {
  return useContext(YFPoolsContext);
}

const YFPoolsProvider: FC = props => {
  const { children } = props;

  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const [reload] = useReload();

  const stakingContract = useMemo(() => {
    const staking = new YfStakingContract(config.contracts.yf.staking);
    staking.on(Web3Contract.UPDATE_DATA, reload);

    return staking;
  }, []);

  useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      if (pool.contract.isPoolAvailable) {
        pool.contract.on(Web3Contract.UPDATE_DATA, reload);
        pool.contract.loadCommon().catch(Error);

        pool.tokens.forEach(tokenMeta => {
          if (tokenMeta.address) {
            stakingContract.loadCommonFor(tokenMeta.address).catch(Error);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.setProvider(walletCtx.provider);
    });

    stakingContract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  useEffect(() => {
    stakingContract.setAccount(walletCtx.account);

    KNOWN_POOLS.forEach(pool => {
      pool.contract.setAccount(walletCtx.account);

      if (walletCtx.isActive) {
        if (pool.contract.isPoolAvailable) {
          pool.contract.loadUserData().catch(Error);

          pool.tokens.forEach(tokenMeta => {
            if (tokenMeta.address) {
              stakingContract.loadUserDataFor(tokenMeta.address).catch(Error);
            }
          });
        }
      }
    });
  }, [walletCtx.account]);

  const getPoolBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      if (!pool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        if (!token.address) {
          return BigNumber.ZERO;
        }

        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.nextEpochPoolSize === undefined) {
          return undefined;
        }

        return knownTokensCtx.convertTokenInUSD(stakedToken.nextEpochPoolSize.unscaleBy(token.decimals), token.symbol);
      });
    },
    [stakingContract, knownTokensCtx.version],
  );

  const getPoolEffectiveBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      if (!pool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        if (!token.address) {
          return BigNumber.ZERO;
        }

        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.currentEpochPoolSize === undefined) {
          return undefined;
        }

        return knownTokensCtx.convertTokenInUSD(
          stakedToken.currentEpochPoolSize.unscaleBy(token.decimals),
          token.symbol,
        );
      });
    },
    [stakingContract, knownTokensCtx.version],
  );

  const getMyPoolBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      if (!pool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        if (!token.address) {
          return BigNumber.ZERO;
        }

        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.nextEpochUserBalance === undefined) {
          return undefined;
        }

        return knownTokensCtx.convertTokenInUSD(
          stakedToken.nextEpochUserBalance.unscaleBy(token.decimals),
          token.symbol,
        );
      });
    },
    [stakingContract, knownTokensCtx.version],
  );

  const getMyPoolEffectiveBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      if (!pool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        if (!token.address) {
          return BigNumber.ZERO;
        }

        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.currentEpochUserBalance === undefined) {
          return undefined;
        }

        return knownTokensCtx.convertTokenInUSD(
          stakedToken.currentEpochUserBalance.unscaleBy(token.decimals),
          token.symbol,
        );
      });
    },
    [stakingContract, knownTokensCtx.version],
  );

  const getYFTotalStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      return getPoolBalanceInUSD(yfPool.name);
    });
  }, [getPoolBalanceInUSD]);

  const getYFTotalEffectiveStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      return getPoolEffectiveBalanceInUSD(yfPool.name);
    });
  }, [getPoolEffectiveBalanceInUSD]);

  const getYFDistributedRewards = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      if (!yfPool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      const { distributedReward } = yfPool.contract;

      if (distributedReward === undefined) {
        return undefined;
      }

      return new BigNumber(distributedReward);
    });
  }, []);

  const getYFTotalSupply = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      if (!yfPool.contract.isPoolAvailable) {
        return BigNumber.ZERO;
      }

      const { totalSupply } = yfPool.contract;

      if (totalSupply === undefined) {
        return undefined;
      }

      return new BigNumber(totalSupply);
    });
  }, []);

  const value: YFPoolsType = {
    yfPools: KNOWN_POOLS,
    getYFKnownPoolByName,
    stakingContract,
    getYFTotalStakedInUSD,
    getYFTotalEffectiveStakedInUSD,
    getPoolBalanceInUSD,
    getPoolEffectiveBalanceInUSD,
    getMyPoolBalanceInUSD,
    getMyPoolEffectiveBalanceInUSD,
    getYFDistributedRewards,
    getYFTotalSupply,
  };

  return (
    <YFPoolsContext.Provider value={value}>
      {children}
      <ContractListener contract={stakingContract} />
      <ContractListener contract={BondYfPool.contract} />
      <ContractListener contract={AaveYfPool.contract} />
      <ContractListener contract={CompYfPool.contract} />
      <ContractListener contract={SnxYfPool.contract} />
      <ContractListener contract={SushiYfPool.contract} />
      <ContractListener contract={LinkYfPool.contract} />
      <ContractListener contract={IlvYfPool.contract} />
      <ContractListener contract={UsdcXyzSLPYfPool.contract} />
    </YFPoolsContext.Provider>
  );
};

export default YFPoolsProvider;
