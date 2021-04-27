import React from 'react';
import cn from 'classnames';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { formatBONDValue, formatUSDValue } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';

import { useSyPools } from '../../providers/sy-pools-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

const UNISWAP_EXCHANGE_LINK = `https://app.uniswap.org/#/swap?inputCurrency=${BONDTokenMeta.address}&outputCurrency=${USDCTokenMeta.address}`;

type Props = {
  className?: string;
};

const PoolStats: React.FC<Props> = ({ className }) => {
  const syPoolsCtx = useSyPools();
  const { aggregated, uniswap, staking } = useWeb3Contracts();
  const epochEnd = React.useMemo<number | undefined>(() => {
    const [, end] = staking.getEpochPeriod(staking.currentEpoch!) ?? [];
    return end;
  }, [staking]);

  const totalBondReward = formatBONDValue(aggregated.totalBondReward);

  return (
    <div className={cn(s.component, className)}>
      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Grid flow="col" align="center" justify="space-between">
            <Hint
              text={
                <Text type="p2">
                  This number shows the Total Value Locked across the staking pool(s). It is the USD and ETH conversion
                  of the amounts in the pool balance(s).
                </Text>
              }>
              <Text type="lb2" weight="semibold" color="primary">
                Total Value Locked
              </Text>
            </Hint>
          </Grid>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {formatUSDValue(aggregated.totalStaked?.plus(syPoolsCtx.totalPoolsBalance ?? 0), 0)}
            </Text>
            <Text type="p1" color="secondary">
              {formatUSDValue(aggregated.totalEffectiveStaked?.plus(syPoolsCtx.totalPoolsBalance ?? 0), 0)} effective
              locked
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Grid flow="col" align="center" justify="space-between">
            <Hint
              text={
                <Text type="p2">
                  This number shows the $KEK token rewards distributed so far out of the total of 2,800,000 that are
                  going to be available for Yield Farming.
                </Text>
              }>
              <Text type="lb2" weight="semibold" color="primary">
                KEK Rewards
              </Text>
            </Hint>
          </Grid>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {formatBONDValue(aggregated.bondReward)}
            </Text>
            <Text type="p1" color="secondary">
              out of {totalBondReward}
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Grid flow="col" align="center" justify="space-between">
            <Text type="lb2" weight="semibold" color="primary">
              KEK Price
            </Text>
          </Grid>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {formatUSDValue(uniswap.bondPrice)}
            </Text>
            <ExternalLink href={UNISWAP_EXCHANGE_LINK}>
              <Text type="p1" weight="semibold" color="var(--gradient-blue-safe)" textGradient="var(--gradient-blue)">
                Uniswap market
              </Text>
            </ExternalLink>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Grid flow="col" align="center" justify="space-between">
            <Hint
              text={
                <Text type="p2">
                  This counter shows the time left in the current week. The pool(s) below are synchronized and have
                  epochs that last a week. You can deposit to the pool(s) during the duration of an epoch and receive
                  rewards proportional to the time they are staked, but the funds must stay staked until the clock runs
                  out and the epoch ends in order to be able to harvest the rewards.
                </Text>
              }>
              <Text type="lb2" weight="semibold" color="primary">
                Time Left
              </Text>
            </Hint>
          </Grid>
          <Grid flow="row" gap={4}>
            <UseLeftTime end={epochEnd ?? 0} delay={1_000}>
              {leftTime => (
                <Text type="h2" weight="bold" color="primary">
                  {leftTime > 0 ? getFormattedDuration(0, epochEnd) : '0s'}
                </Text>
              )}
            </UseLeftTime>
            <Text type="p1" color="secondary">
              until next epoch
            </Text>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PoolStats;
