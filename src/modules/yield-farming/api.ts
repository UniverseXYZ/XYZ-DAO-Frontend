import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import BigNumber from 'bignumber.js';

import config from 'config';

import { PaginatedResult } from 'utils/fetch';

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
  const client = new ApolloClient({
    uri: config.graph.yfGraphUrl,
    cache: new InMemoryCache(),
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
        skip: limit * (page - 1),
      },
    })
    .then(result => {
      return { data: result.data.transactions, meta: { count: (result.data.transactions.length < limit) ? (limit * (page - 1)) + (result.data.transactions.length) : limit * page + 1, block: page } }
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
