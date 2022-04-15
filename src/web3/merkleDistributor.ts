import { BigNumber as BN } from 'bignumber.js';
import { BigNumber, FixedNumber } from 'ethers';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import config from 'config';

import { getHumanValue } from './utils';

const ABI: AbiItem[] = [
  createAbiItem('isClaimed', ['uint256'], ['bool']),
  createAbiItem('claim', ['uint256', 'address', 'uint256', 'bytes32[]']),
  createAbiItem('calculateAdjustedAmount', ['uint256'], ['uint256', 'uint256', 'uint256']),
  createAbiItem('getBonus', [], ['uint256']),
  createAbiItem('initialPoolSize', [], ['uint256']),
  createAbiItem('currentPoolSize', [], ['uint256']),
  createAbiItem('bonusSum', [], ['uint256']),
  createAbiItem('percentageIndex', [], ['uint256']),
];

export default class MerkleDistributor extends Web3Contract {
  isAirdropClaimed?: boolean;
  claimIndex?: number;
  claimAmount?: number;
  adjustedAmount?: number;
  bonusPart?: number;
  initialPoolSize?: number;
  currentPoolSize?: number;
  totalBonus?: number;
  isFetched?: boolean = false;

  constructor(abi: AbiItem[], address: string) {
    super([...ABI, ...abi], address, '');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      if (!this.account) {
        this.isAirdropClaimed = false;
        this.claimIndex = -1;
        this.claimAmount = undefined;
        this.adjustedAmount = undefined;
        this.initialPoolSize = undefined;
        this.currentPoolSize = undefined;
        this.totalBonus = undefined;
        this.emit(Web3Contract.UPDATE_DATA);
      }
      let airdropData;
      config.isDev
        ? (airdropData = require(`../merkle-distributor/airdrop-test.json`))
        : (airdropData = require(`../merkle-distributor/airdrop.json`));
      const airdropAccounts = airdropData.map((drop: { address: any; earnings: any }) => ({
        account: drop.address,
        amount: BigNumber.from(FixedNumber.from(drop.earnings)),
      }));
      this.claimIndex = airdropAccounts.findIndex((o: { account: string | undefined }) => o.account === this.account);
      this.claimAmount =
        this.claimIndex !== -1 ? Number(this.getClaimAmount(this.account || '', airdropData)) : undefined;
      this.adjustedAmount = undefined;
      this.initialPoolSize = undefined;
    });
  }

  getClaimAmount(address: string, airdropData: any[]): string | undefined {
    return airdropData.find(e => e.address === address)?.earnings;
  }

  async loadUserData(): Promise<void> {
    const [initialPoolSize, currentPoolSize, bonusSum] = await this.batch([
      { method: 'initialPoolSize' },
      { method: 'currentPoolSize' },
      { method: 'bonusSum' },
    ]);
    this.initialPoolSize = +Number(getHumanValue(new BN(initialPoolSize), 18)).toFixed();
    this.currentPoolSize = +Number(getHumanValue(new BN(currentPoolSize), 18)).toFixed();
    this.totalBonus = +Number(getHumanValue(new BN(bonusSum), 18)).toFixed();
    const account = this.account;

    if (!account) {
      return;
    }

    const amount = this.claimAmount ? BigNumber.from(FixedNumber.from(this.claimAmount)) : 0;

    if (this.claimAmount !== null && this.claimIndex !== -1) {
      const [isClaimed, adjustedAmount] = await this.batch([
        { method: 'isClaimed', methodArgs: [this.claimIndex], callArgs: { from: account } },
        { method: 'calculateAdjustedAmount', methodArgs: [amount], callArgs: { from: account } },
      ]);

      this.isAirdropClaimed = isClaimed;
      this.adjustedAmount = +Number(getHumanValue(new BN(adjustedAmount[0]), 18)).toFixed();
      this.bonusPart = +Number(getHumanValue(new BN(adjustedAmount[2]), 18)).toFixed();
      this.emit(Web3Contract.UPDATE_DATA);
    }
    this.isFetched = true;
  }

  async claim(
    index: number | BigNumber | undefined,
    address: string,
    amount: string,
    merkleProof: string[],
  ): Promise<void> {
    return this.send('claim', [index, address, amount, merkleProof], {
      from: this.account,
    }).then(() => {
      this.isAirdropClaimed = true;
      this.claimIndex = -1;
      this.claimAmount = undefined;
      this.adjustedAmount = undefined;
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }
}
