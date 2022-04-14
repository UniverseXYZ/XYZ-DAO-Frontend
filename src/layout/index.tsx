import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import ErrorBoundary from 'components/custom/error-boundary';
import WarningProvider from 'components/providers/warning-provider';
import LayoutFooter from 'layout/components/layout-footer';
import LayoutHeader from 'layout/components/layout-header';

import YFPoolsProvider from '../modules/yield-farming/providers/pools-provider';
import ThemeSwitcher from './components/theme-switcher';

import s from './s.module.scss';

const YieldFarmingView = lazy(() => import('modules/yield-farming'));
const GovernanceView = lazy(() => import('modules/governance'));
const AirdropView = lazy(() => import('modules/airdrop'));

const LayoutView: React.FC = () => {
  return (
    <div className={s.layout}>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <WarningProvider>
          <YFPoolsProvider>
            <LayoutHeader />
            <main className={s.main}>
              <ErrorBoundary>
                <Suspense fallback={<AntdSpin className="pv-24 ph-64" style={{ width: '100%' }} />}>
                  <Switch>
                    <Route path="/yield-farming" component={YieldFarmingView} />
                    <Route path="/governance/:vt(\w+)" component={GovernanceView} />
                    <Route path="/governance" component={GovernanceView} />
                    <Route path="/airdrop" component={AirdropView} />
                    <Redirect from="/" to="/yield-farming" />
                  </Switch>
                </Suspense>
              </ErrorBoundary>
            </main>
            <LayoutFooter />
            <ThemeSwitcher />
          </YFPoolsProvider>
        </WarningProvider>
      </div>
    </div>
  );
};

export default LayoutView;
