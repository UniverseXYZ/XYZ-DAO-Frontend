import BigNumber from 'bignumber.js';

import config from 'config';
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

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
  // const query = queryfy({
  //   page: String(page),
  //   limit: String(limit),
  //   userAddress,
  //   actionType,
  //   tokenAddress,
  // });

  const client = new ApolloClient({
    uri: 'http://34.118.119.85:8000/subgraphs/name/enterdao/YieldFarmingGraph',
    cache: new InMemoryCache()
  });

  return client
    .query({
      query: gql`
      query($actionType: String, $tokenAddress: String, $userAddress: String, $first: Int, $skip: Int){
        transactions(first: $first, skip: $skip, where: {${(actionType != "all") ? "actionType: $actionType," : ""}${(tokenAddress != "all") ? "tokenAddress: $tokenAddress," : ""}${(userAddress != "all") ? "userAddress: $userAddress," : ""}}){
          actionType,
          tokenAddress,
          userAddress,
          amount,
          transactionHash,
          blockTimestamp
        }
      }
    `,
      variables: {
        actionType: (actionType != "all") ? actionType : undefined,
        tokenAddress: (tokenAddress != "all") ? tokenAddress : undefined,
        userAddress: (userAddress != "all") ? userAddress : undefined,
        first: limit,
        skip: limit * (page - 1)
      }
    })
    .then(result => {
      console.log(result);
      return { data: result.data.transactions, meta: { count: (result.data.transactions.length < limit) ? result.data.transactions.length : limit * page + 1, block: page } }
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
