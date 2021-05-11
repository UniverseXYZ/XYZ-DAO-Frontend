import React from 'react';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import * as ReCharts from 'recharts';
import { useWeb3Contracts } from 'web3/contracts';
import { formatUSDValue } from 'web3/utils';

import Select, { SelectOption } from 'components/antd/select';
import Grid from 'components/custom/grid';
import IconsSet from 'components/custom/icons-set';
import { Text } from 'components/custom/typography';
import PoolTxChartProvider, { usePoolTxChart } from 'modules/yield-farming/providers/pool-tx-chart-provider';
import { ReactComponent as EmptyChartSvg } from 'resources/svg/empty-chart.svg';

import { PoolTypes, getPoolIcons, getPoolNames } from 'modules/yield-farming/utils';

import s from './s.module.scss';

const PoolFilters: SelectOption[] = [
  {
    value: PoolTypes.AAVE,
    label: getPoolNames(PoolTypes.AAVE).join('/'),
  },
  {
    value: PoolTypes.BOND,
    label: getPoolNames(PoolTypes.BOND).join('/'),
  },
  {
    value: PoolTypes.COMP,
    label: getPoolNames(PoolTypes.COMP).join('/'),
  },
  {
    value: PoolTypes.SNX,
    label: getPoolNames(PoolTypes.SNX).join('/'),
  },
  {
    value: PoolTypes.SUSHI,
    label: getPoolNames(PoolTypes.SUSHI).join('/'),
  },
  {
    value: PoolTypes.LINK,
    label: getPoolNames(PoolTypes.LINK).join('/'),
  },
  {
    value: PoolTypes.ILV,
    label: getPoolNames(PoolTypes.ILV).join('/'),
  },
];

const TypeFilters: SelectOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: 'deposits', label: 'Deposits' },
  { value: 'withdrawals', label: 'Withdrawals' },
];

type Props = {
  className?: string;
};

const PoolTxChartInner: React.FC<Props> = props => {
  const web3c = useWeb3Contracts();
  const poolTxChart = usePoolTxChart();

  const PeriodFilters = React.useMemo<SelectOption[]>(() => {
    const filters = [
      {
        value: 'all',
        label: 'All weeks',
      },
    ];

    let currentEpoch = 0;
    let startEpoch = 0;

    if (poolTxChart.poolFilter === PoolTypes.STABLE) {
      currentEpoch = web3c.yf.currentEpoch ?? 0;
    } else if (poolTxChart.poolFilter === PoolTypes.UNILP) {
      currentEpoch = web3c.yfLP.currentEpoch ?? 0;
      startEpoch = 1;
    } else if (poolTxChart.poolFilter === PoolTypes.BOND) {
      currentEpoch = web3c.yfBOND.currentEpoch ?? 0;
    }

    for (let i = startEpoch; i <= currentEpoch; i += 1) {
      filters.push({
        value: String(i),
        label: `Epoch ${i}`,
      });
    }

    return filters;
  }, [web3c.yf, web3c.yfLP, web3c.yfBOND, poolTxChart.poolFilter]);

  const chartData = React.useMemo(() => {
    const price = web3c.getPoolUsdPrice(poolTxChart.poolFilter as PoolTypes);

    if (!price) {
      return poolTxChart.summaries;
    }

    return poolTxChart.summaries.map(summary => {
      const deposits = new BigNumber(summary.deposits).multipliedBy(price).toNumber();
      const withdrawals = new BigNumber(summary.withdrawals).multipliedBy(price).multipliedBy(-1).toNumber();

      return {
        ...summary,
        deposits,
        withdrawals,
      };
    });
  }, [web3c, poolTxChart.summaries]);

  React.useEffect(() => {
    poolTxChart.changePoolFilter(PoolTypes.BOND);
    poolTxChart.changePeriodFilter(undefined);
    poolTxChart.changeTypeFilter(undefined);
  }, []);

  const ChartEmpty = (
    <Grid flow="row" gap={24} align="center" justify="center" padding={[54, 0]}>
      <EmptyChartSvg />
      <Text type="p1" color="secondary">
        Not enough data to plot a graph
      </Text>
    </Grid>
  );

  return (
    <div className={cn('card', props.className)} style={{ overflowX: 'auto' }}>
      <Grid className={cn('card-header', s.chartTitleContainer)} flow="col" align="center" justify="space-between">
        <Grid flow="col" gap={8}>
          <IconsSet icons={getPoolIcons(poolTxChart.poolFilter as PoolTypes)} />
          <Select
            options={PoolFilters}
            value={poolTxChart.poolFilter}
            onSelect={value => {
              poolTxChart.changePoolFilter(value as string);
            }}
          />
        </Grid>
        <Grid flow="col" gap={8} className={s.chartTitleFilters}>
          <Select
            label="Period"
            options={PeriodFilters}
            value={poolTxChart.periodFilter ?? 'all'}
            disabled={poolTxChart.loading}
            onSelect={value => {
              poolTxChart.changePeriodFilter(value !== 'all' ? (value as string) : undefined);
            }}
          />
          <Select
            label="Show"
            options={TypeFilters}
            value={poolTxChart.typeFilter ?? 'all'}
            disabled={poolTxChart.loading}
            onSelect={value => {
              poolTxChart.changeTypeFilter(value !== 'all' ? (value as string) : undefined);
            }}
          />
        </Grid>
      </Grid>

      <div className="p-24">
        <Spin spinning={poolTxChart.loading}>
          {chartData.length ? (
            <ReCharts.ResponsiveContainer width="100%" height={350}>
              <ReCharts.BarChart
                data={chartData}
                stackOffset="sign"
                margin={{
                  top: 20,
                  right: 0,
                  left: 60,
                  bottom: 12,
                }}>
                <defs>
                  <linearGradient id="gradient-red" gradient-transform="rotate(135deg)">
                    <stop offset="0%" stopColor="#FF7439" />
                    <stop offset="100%" stopColor="#FF39BC" />
                  </linearGradient>
                  <linearGradient id="gradient-blue" gradient-transform="rotate(135deg) matrix(1, 0, 0, -1, 0, 0)">
                    <stop offset="0%" stopColor="#914FE6" />
                    <stop offset="100%" stopColor="#316CDF" />
                  </linearGradient>
                </defs>
                <ReCharts.CartesianGrid vertical={false} stroke="var(--theme-border-color)" strokeDasharray="3 3" />
                <ReCharts.XAxis dataKey="timestamp" stroke="var(--theme-border-color)" />
                <ReCharts.YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: any) => formatUSDValue(value, 2, 0)}
                />
                <ReCharts.Tooltip
                  separator=" "
                  wrapperClassName={s.chart_tooltip}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                  formatter={(value: any, name: string) => [formatUSDValue(value), name]}
                />
                <ReCharts.Legend
                  align="right"
                  verticalAlign="top"
                  iconType="circle"
                  wrapperStyle={{
                    top: 0,
                    right: 12,
                    color: 'var(--theme-color-primary)',
                  }}
                />
                <ReCharts.ReferenceLine y={0} stroke="#43484D" />
                {(poolTxChart.typeFilter === undefined || poolTxChart.typeFilter === 'deposits') && (
                  <ReCharts.Bar
                    dataKey="deposits"
                    name="Deposits"
                    stackId="stack"
                    fill="url(#gradient-red)"
                    fontSize={23}
                    radius={[4, 4, 0, 0]}
                  />
                )}
                {(poolTxChart.typeFilter === undefined || poolTxChart.typeFilter === 'withdrawals') && (
                  <ReCharts.Bar
                    dataKey="withdrawals"
                    name="Withdrawals"
                    stackId="stack"
                    fill="url(#gradient-blue)"
                    fontSize={23}
                    radius={[4, 4, 0, 0]}
                  />
                )}
              </ReCharts.BarChart>
            </ReCharts.ResponsiveContainer>
          ) : (
            !poolTxChart.loading && ChartEmpty
          )}
        </Spin>
      </div>
    </div>
  );
};

const PoolTxChart: React.FC<Props> = props => (
  <PoolTxChartProvider>
    <PoolTxChartInner {...props} />
  </PoolTxChartProvider>
);

export default PoolTxChart;
