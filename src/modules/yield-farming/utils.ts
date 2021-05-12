import React from 'react';
import memoize from 'lodash/memoize';
import { AAVETokenMeta } from 'web3/contracts/aave';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { COMPTokenMeta } from 'web3/contracts/comp';
import { DAITokenMeta } from 'web3/contracts/dai';
import { ILVTokenMeta } from 'web3/contracts/ilv';
import { LINKTokenMeta } from 'web3/contracts/link';
import { SNXTokenMeta } from 'web3/contracts/snx';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { SUSHITokenMeta } from 'web3/contracts/sushi';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { USDCKEKSUSHILPTokenMeta } from 'web3/contracts/usdckeksushilp';

export enum PoolTypes {
  STABLE = 'stable',
  UNILP = 'unilp',

  AAVE = 'aave',
  BOND = 'bond',
  COMP = 'comp',
  SNX = 'snx',
  SUSHI = 'sushi',
  LINK = 'link',
  ILV = 'ivl',
  USDC_KEK_SUSHI_LP = 'USDC_KEK_SUSHI_LP',
}

export enum PoolActions {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export const getPoolIcons = memoize((poolType: PoolTypes): React.ReactNode[] => {
  switch (poolType) {
    case PoolTypes.STABLE:
      return [USDCTokenMeta.icon, DAITokenMeta.icon, SUSDTokenMeta.icon];
    case PoolTypes.UNILP:
      return [UNISWAPTokenMeta.icon];
    case PoolTypes.BOND:
      return [BONDTokenMeta.icon];
    case PoolTypes.AAVE:
      return [AAVETokenMeta.icon];
    case PoolTypes.COMP:
      return [COMPTokenMeta.icon];
    case PoolTypes.SNX:
      return [SNXTokenMeta.icon];
    case PoolTypes.SUSHI:
      return [SUSHITokenMeta.icon];
    case PoolTypes.LINK:
      return [LINKTokenMeta.icon];
    case PoolTypes.ILV:
      return [ILVTokenMeta.icon];
    case PoolTypes.USDC_KEK_SUSHI_LP:
      return [USDCKEKSUSHILPTokenMeta.icon];
    default:
      return [];
  }
});

export const getPoolNames = memoize((poolType: PoolTypes): string[] => {
  switch (poolType) {
    case PoolTypes.STABLE:
      return [USDCTokenMeta.name, DAITokenMeta.name, SUSDTokenMeta.name];
    case PoolTypes.UNILP:
      return [UNISWAPTokenMeta.name];
    case PoolTypes.BOND:
      return [BONDTokenMeta.name];
    case PoolTypes.AAVE:
      return [AAVETokenMeta.name];
    case PoolTypes.COMP:
      return [COMPTokenMeta.name];
    case PoolTypes.SNX:
      return [SNXTokenMeta.name];
    case PoolTypes.SUSHI:
      return [SUSHITokenMeta.name];
    case PoolTypes.LINK:
      return [LINKTokenMeta.name];
    case PoolTypes.ILV:
      return [ILVTokenMeta.name];
    case PoolTypes.USDC_KEK_SUSHI_LP:
      return [USDCKEKSUSHILPTokenMeta.name];
    default:
      return [];
  }
});
