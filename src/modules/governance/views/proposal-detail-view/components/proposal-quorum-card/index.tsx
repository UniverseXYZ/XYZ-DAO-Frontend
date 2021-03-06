import React from 'react';

import Grid from 'components/custom/grid';
import ProgressNew from 'components/custom/progress';
import { Hint, Text } from 'components/custom/typography';

import { useProposal } from '../../providers/ProposalProvider';

const ProposalQuorumCard: React.FC = () => {
  const proposalCtx = useProposal();

  const passed = (proposalCtx.quorum ?? 0) >= (proposalCtx.proposal?.minQuorum ?? 0);

  return (
    <div className="card">
      <div className="card-header">
        <Hint text="Quorum is the percentage of the amount of tokens staked in the DAO that support for a proposal must be greater than for the proposal to be considered valid. For example, if the Quorum % is set to 20%, then more than 20% of the amount of tokens staked in the DAO must vote to approve a proposal for the vote to be considered valid.">
          <Text type="p1" weight="semibold" color="primary" font="secondary">
            Quorum
          </Text>
        </Hint>
      </div>
      <Grid className="p-24" flow="row" gap={16}>
        <Grid flow="col" gap={8}>
          <Text type="p1" weight="semibold" color="primary">
            {proposalCtx.quorum?.toFixed(2)}%
          </Text>
          <Text type="p1" color="secondary">
            (&gt; {proposalCtx.proposal?.minQuorum}% required)
          </Text>
        </Grid>
        <ProgressNew
          percent={proposalCtx.quorum}
          acceptance={proposalCtx.proposal?.minQuorum}
          colors={{
            bg: passed ? 'rgba(var(--theme-green-color-rgb), 0.16)' : 'rgba(var(--theme-red-color-rgb), 0.16)',
            bar: passed ? 'var(--theme-green-color)' : 'var(--theme-red-color)',
            acceptance: passed ? 'var(--theme-green-color)' : 'rgba(var(--theme-red-color-rgb), 0.16)',
          }}
        />
      </Grid>
    </div>
  );
};

export default ProposalQuorumCard;
