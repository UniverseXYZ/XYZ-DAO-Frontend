import { gql } from '@apollo/client';
import BigNumber from 'bignumber.js';

import config from 'config';

import { GraphClient } from '../../web3/graph/client';

import { PaginatedResult, queryfy } from 'utils/fetch';

export enum APIYFPoolActionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

export type APIYFPoolTransaction = {
  userAddress: string;
  tokenAddress: string;
  amount: BigNumber;
  transactionHash: string;
  actionType: APIYFPoolActionType;
  blockTimestamp: number;
};

export function fetchYFPoolTransactions(
  page = 1,
  limit = 10,
  tokenAddress: string,
  userAddress: string = 'all',
  actionType: string = 'all',
): Promise<PaginatedResult<APIYFPoolTransaction>> {
  return GraphClient.get({
    query: gql`
    query($actionType: String, $tokenAddress: String, $userAddress: String){
      transactions(first: 1000, orderBy: blockTimestamp, orderDirection: desc, where: {${
        actionType !== 'all' ? 'actionType: $actionType,' : ''
      }${tokenAddress !== 'all' ? 'tokenAddress: $tokenAddress,' : ''}${
      userAddress !== 'all' ? 'userAddress: $userAddress,' : ''
    }}){
        actionType,
        tokenAddress,
        userAddress,
        amount,
        transactionHash,
        blockTimestamp,
        tokenIds
      }
    }
  `,
    variables: {
      actionType: actionType,
      tokenAddress: tokenAddress !== 'all' ? tokenAddress : undefined,
      userAddress: userAddress !== 'all' ? userAddress : undefined,
    },
  })
    .catch(e => {
      console.log(e);
      return { data: [], meta: { count: 0, block: 0 } };
    })
    .then(result => {
      console.log(result);
      return {
        data: result.data.transactions.slice(limit * (page - 1), limit * page),
        meta: { count: result.data.transactions.length, block: page },
      };
    })
    .then((result: PaginatedResult<APIYFPoolTransaction>) => {
      return {
        ...result,
        data: (result.data ?? []).map((item: APIYFPoolTransaction) => ({
          ...item,
          amount: new BigNumber(item.amount),
        })),
      };
    });
}

export type APIYFPoolChart = {
  [tokenAddress: string]: {
    [point: number]: {
      sumDeposits: string;
      sumWithdrawals: string;
    };
  };
};

export function fetchYFPoolChart(
  tokenAddress: string[],
  start: number,
  end: number,
  scale?: string,
): Promise<APIYFPoolChart> {
  const query = queryfy({
    tokenAddress,
    start,
    end,
    scale,
  });

  const url = new URL(`/api/yieldfarming/staking-actions/chart?${query}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => {
      if (result.status !== 200) {
        return Promise.reject(new Error(result.data));
      }

      return result.data;
    });
}
