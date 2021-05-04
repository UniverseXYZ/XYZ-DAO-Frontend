import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Button from 'components/antd/button';
import Popover from 'components/antd/popover';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/general-provider';
import logoSrc from 'resources/png/universe.png';
import ConnectedWallet from 'wallets/components/connected-wallet';

import s from './s.module.scss';

const LayoutHeader: React.FC = () => {
  const { navOpen, setNavOpen } = useGeneral();

  return (
    <div className={s.component}>
      <Link to="/" className={s.logoLink}>
        <Icon name="png/universe" width="auto" height="auto" src={logoSrc} className={s.logo} />
        <Text type="h2" weight="semibold" color="primary" className={s.title}>
          Universe
        </Text>
      </Link>
      <nav className={s.nav}>
        <Popover
          placement="bottom"
          trigger="click"
          noPadding
          content={
            <div className={cn('card', s.dropdown)}>
              <ExternalLink href="#" className={s.dropdownLink}>
                <Icon name="auction" width={20} height={20} className={s.dropdownIcon} />
                <span>Auction house</span>
              </ExternalLink>
              <ExternalLink className={s.dropdownLink} aria-disabled="true">
                <Icon name="marketplace" width={20} height={20} className={s.dropdownIcon} />
                <Tooltip title="Coming soon" placement="top" hint>
                  <span>NFT marketplace</span>
                </Tooltip>
              </ExternalLink>
              <ExternalLink className={s.dropdownLink} aria-disabled="true">
                <Icon name="social-media" width={20} height={20} className={s.dropdownIcon} />
                <Tooltip title="Coming soon" placement="top" hint>
                  <span>Social media</span>
                </Tooltip>
              </ExternalLink>
            </div>
          }>
          <Button type="link" className={s.navLink}>
            <Grid flow="col" align="center">
              <Text type="p1" color="primary" className="mr-4">
                Products
              </Text>
              <Icon name="dropdown-arrow" className={s.dropdownArrow} />
            </Grid>
          </Button>
        </Popover>
        <Popover
          placement="bottom"
          trigger="click"
          noPadding
          content={
            <div className={cn('card', s.dropdown)}>
              <ExternalLink href="#" className={s.dropdownLink}>
                <Icon name="about" width={20} height={20} className={s.dropdownIcon} />
                <span>About</span>
              </ExternalLink>
              <ExternalLink href="#" className={s.dropdownLink}>
                <Icon name="whitepaper" width={20} height={20} className={s.dropdownIcon} />
                <span>Whitepaper</span>
              </ExternalLink>
              <ExternalLink href="#" className={s.dropdownLink}>
                <Icon name="team" width={20} height={20} className={s.dropdownIcon} />
                <span>Team</span>
              </ExternalLink>
            </div>
          }>
          <Button type="link" className={s.navLink}>
            <Grid flow="col" align="center">
              <Text type="p1" color="primary" className="mr-4">
                Info
              </Text>
              <Icon name="dropdown-arrow" className={s.dropdownArrow} />
            </Grid>
          </Button>
        </Popover>
        <Popover
          placement="bottom"
          trigger="click"
          noPadding
          content={
            <div className={cn('card', s.dropdown)}>
              <ExternalLink href="#" className={s.dropdownLink}>
                <Icon name="governance" width={20} height={20} className={s.dropdownIcon} />
                <span>Governance</span>
              </ExternalLink>
              <ExternalLink href="#" className={s.dropdownLink}>
                <Icon name="yield-farming" width={20} height={20} className={s.dropdownIcon} />
                <span>Yield farming</span>
              </ExternalLink>
              <ExternalLink href="#" className={s.dropdownLink}>
                <Icon name="docs" width={20} height={20} className={s.dropdownIcon} />
                <span>Docs</span>
              </ExternalLink>
            </div>
          }>
          <Button type="link" className={s.navLink}>
            <Grid flow="col" align="center">
              <Text type="p1" color="primary" className="mr-4">
                DAO
              </Text>
              <Icon name="dropdown-arrow" className={s.dropdownArrow} />
            </Grid>
          </Button>
        </Popover>
      </nav>
      <ConnectedWallet />
      <Button type="link" className={s.burger} onClick={() => setNavOpen(prevState => !prevState)}>
        <Icon name={navOpen ? 'burger-close' : 'burger'} style={{ color: 'var(--theme-primary-color)' }} />
      </Button>
      <div className={cn(s.mobileMenu, { [s.open]: navOpen })}>
        <div className={s.mobileMenuInner}>
          <div className={s.mobileMenuBlock}>
            <h3>Products</h3>
            <ExternalLink href="#" className={s.dropdownLink}>
              <Icon name="auction" width={20} height={20} className={s.dropdownIcon} />
              <span>Auction house</span>
            </ExternalLink>
            <ExternalLink className={s.dropdownLink} aria-disabled="true">
              <Icon name="marketplace" width={20} height={20} className={s.dropdownIcon} />
              <Tooltip title="Coming soon" placement="top" hint>
                <span>NFT marketplace</span>
              </Tooltip>
            </ExternalLink>
            <ExternalLink className={s.dropdownLink} aria-disabled="true">
              <Icon name="social-media" width={20} height={20} className={s.dropdownIcon} />
              <Tooltip title="Coming soon" placement="top" hint>
                <span>Social media</span>
              </Tooltip>
            </ExternalLink>
          </div>
          <div className={s.mobileMenuBlock}>
            <h3>Info</h3>
            <ExternalLink href="#" className={s.dropdownLink}>
              <Icon name="about" width={20} height={20} className={s.dropdownIcon} />
              <span>About</span>
            </ExternalLink>
            <ExternalLink href="#" className={s.dropdownLink}>
              <Icon name="whitepaper" width={20} height={20} className={s.dropdownIcon} />
              <span>Whitepaper</span>
            </ExternalLink>
            <ExternalLink href="#" className={s.dropdownLink}>
              <Icon name="team" width={20} height={20} className={s.dropdownIcon} />
              <span>Team</span>
            </ExternalLink>
          </div>
          <div className={s.mobileMenuBlock}>
            <h3>DAO</h3>
            <ExternalLink href="#" className={s.dropdownLink}>
              <Icon name="governance" width={20} height={20} className={s.dropdownIcon} />
              <span>Governance</span>
            </ExternalLink>
            <ExternalLink href="#" className={s.dropdownLink}>
              <Icon name="yield-farming" width={20} height={20} className={s.dropdownIcon} />
              <span>Yield farming</span>
            </ExternalLink>
            <ExternalLink href="#" className={s.dropdownLink}>
              <Icon name="docs" width={20} height={20} className={s.dropdownIcon} />
              <span>Docs</span>
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
