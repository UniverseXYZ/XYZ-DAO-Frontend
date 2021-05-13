import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Divider from 'components/antd/divider';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { XyzToken } from 'components/providers/known-tokens-provider';
import { useWallet } from 'wallets/wallet';

import PoolHarvestModal from '../../components/pool-harvest-modal';
import { useYFPools } from '../../providers/pools-provider';

import s from './s.module.scss';

const PoolRewards: React.FC = () => {
  const walletCtx = useWallet();
  const yfPoolsCtx = useYFPools();

  const [harvestModalVisible, showHarvestModal] = useState(false);

  const xyzContract = XyzToken.contract as Erc20Contract;

  const totalToClaim = yfPoolsCtx.yfPools.reduce((sum: BigNumber | undefined, { contract }) => {
    return (sum ?? BigNumber.ZERO).plus(contract.toClaim ?? BigNumber.ZERO);
  }, undefined);

  const totalPotentialReward = yfPoolsCtx.yfPools.reduce((sum: BigNumber | undefined, { contract }) => {
    if (contract.isPoolEnded !== false) {
      return sum;
    }

    return (sum ?? BigNumber.ZERO).plus(contract.potentialReward ?? BigNumber.ZERO);
  }, undefined);

  return (
    <div className={cn(s.component, 'pv-24 ph-64 sm-ph-16')}>
      <Text type="lb2" weight="semibold" color="primary">
        My Rewards
      </Text>

      <Grid flow="col" gap={24} className={s.items}>
        <Grid flow="row" gap={4}>
          <Text type="p2" color="secondary">
            Current reward
          </Text>
          <Grid flow="col" align="center">
            <Text type="h3" weight="bold" color="primary">
              {formatToken(totalToClaim?.unscaleBy(XyzToken.decimals)) ?? '-'}
            </Text>
            <Icon name={XyzToken.icon!} width={40} height={40} />
            {walletCtx.isActive && (
              <button
                type="button"
                className="button-text"
                style={{ color: totalToClaim?.gt(BigNumber.ZERO) ? 'red' : 'var(--theme-default-color)' }}
                // disabled={!totalToClaim?.gt(BigNumber.ZERO)}
                onClick={() => showHarvestModal(true)}>
                Claim
              </button>
            )}
          </Grid>
        </Grid>
        <Divider type="vertical" />
        <Grid flow="row" gap={4}>
          <Text type="p2" color="secondary">
            {XyzToken.symbol} Balance
          </Text>
          <Grid flow="col" gap={2} align="center">
            <Text type="h3" weight="bold" color="primary">
              {formatToken(xyzContract.balance?.unscaleBy(XyzToken.decimals)) ?? '-'}
            </Text>
            <Icon name={XyzToken.icon!} width={40} height={40} />
          </Grid>
        </Grid>
        <Divider type="vertical" />
        <Grid flow="row" gap={4}>
          <Grid flow="col" gap={8} align="center">
            <Hint text="This number shows the $BOND rewards you would potentially be able to harvest this epoch, but is subject to change - in case more users deposit, or you withdraw some of your stake.">
              <Text type="p2" color="secondary">
                Potential reward this epoch
              </Text>
            </Hint>
          </Grid>
          <Grid flow="col" gap={2} align="center">
            <Text type="h3" weight="bold" color="primary">
              {formatToken(totalPotentialReward) ?? '-'}
            </Text>
            <Icon name={XyzToken.icon!} width={40} height={40} />
          </Grid>
        </Grid>
      </Grid>

      {harvestModalVisible && <PoolHarvestModal onCancel={() => showHarvestModal(false)} />}
    </div>
  );
};

export default PoolRewards;
