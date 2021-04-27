import React from 'react';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBONDValue } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import imgSrc from 'resources/png/universe.png';
import { useWallet } from 'wallets/wallet';

import PoolHarvestModal from '../../modals/pool-harvest-modal';

import s from './s.module.scss';

type PoolRewardsState = {
  showHarvestModal: boolean;
};

const InitialState: PoolRewardsState = {
  showHarvestModal: false,
};

const PoolRewards: React.FC = () => {
  const wallet = useWallet();
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<PoolRewardsState>(InitialState);

  return (
    <Grid flow="row" gap={16} padding={[24, 64]} className={s.component}>
      <Text type="lb2" weight="semibold" color="primary">
        My Rewards
      </Text>

      <Grid flow="col" gap={24}>
        <Grid flow="row" gap={4}>
          <Text type="p2" color="secondary">
            Current reward
          </Text>
          <Grid flow="col" align="center">
            <Text type="h3" weight="bold" color="primary">
              {formatBONDValue(web3c.aggregated.totalCurrentReward)}
            </Text>
            <Icon name="png/universe" src={imgSrc} width={40} height={40} />
            {wallet.isActive && (
              <Button
                type="primary"
                size="small"
                disabled={web3c.aggregated.totalCurrentReward?.isZero()}
                onClick={() => setState({ showHarvestModal: true })}
                style={{ marginLeft: 4 }}>
                Claim
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider type="vertical" />
        <Grid flow="row" gap={4}>
          <Text type="p2" color="secondary">
            KEK Balance
          </Text>
          <Grid flow="col" gap={2} align="center">
            <Text type="h3" weight="bold" color="primary">
              {formatBONDValue(web3c.bond.balance)}
            </Text>
            <Icon name="png/universe" src={imgSrc} width={40} height={40} />
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
              {formatBONDValue(web3c.aggregated.totalPotentialReward)}
            </Text>
            <Icon name="png/universe" src={imgSrc} width={40} height={40} />
          </Grid>
        </Grid>
      </Grid>

      {state.showHarvestModal && <PoolHarvestModal onCancel={() => setState({ showHarvestModal: false })} />}
    </Grid>
  );
};

export default PoolRewards;
