import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Link, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Popover from 'components/antd/popover';
import Tooltip from 'components/antd/tooltip';
import Badge from 'components/custom/badge';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/general-provider';
import { XyzToken } from 'components/providers/known-tokens-provider';
import { useWarning } from 'components/providers/warning-provider';
import ConnectedWallet from 'wallets/components/connected-wallet';
import { MetamaskConnector } from 'wallets/connectors/metamask';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const modalRoot = document.getElementById('modal-root') || document.body;

const LayoutHeader: React.FC = () => {
  const { navOpen, setNavOpen, toggleDarkTheme, isDarkTheme } = useGeneral();
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const [popper1visible, setPopper1visible] = useState<boolean>(false);
  const [popper2visible, setPopper2visible] = useState<boolean>(false);
  const [popper3visible, setPopper3visible] = useState<boolean>(false);
  const [popper4visible, setPopper4visible] = useState<boolean>(false);
  const [popper5visible, setPopper5visible] = useState<boolean>(false);
  const wallet = useWallet();
  const { warns } = useWarning();

  const { styles, attributes, forceUpdate, state } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    strategy: 'absolute',
  });

  useEffect(() => {
    forceUpdate?.();
  }, [warns.length]);

  useEffect(() => {
    if (navOpen && window.innerWidth > 768) {
      setNavOpen(false);
    }
  }, [window.innerWidth]);

  const isGovernancePage = useRouteMatch('/governance');
  const isYieldFarmingPage = useRouteMatch('/yield-farming');
  const isAirdropPage = useRouteMatch('/airdrop');

  async function handleAddProjectToken() {
    if (wallet.connector?.id === 'metamask') {
      try {
        const connector = new MetamaskConnector({ supportedChainIds: [] });
        await connector.addToken({
          type: 'ERC20',
          options: {
            address: XyzToken.address,
            symbol: XyzToken.symbol,
            decimals: XyzToken.decimals,
            image: `${window.location.origin}/android-chrome-192x192.png`,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div className={s.component} ref={setReferenceElement}>
      <ExternalLink href="https://universe.xyz/" target="_self">
        <Icon name="png/universe" width="auto" height="auto" className={s.logo} />
      </ExternalLink>
      <div className={s.titleDelimiter} />
      {isGovernancePage && (<h1 className={s.title}>Governance</h1>)}
      {isYieldFarmingPage && (<h1 className={s.title}>Yield Farming</h1>)}
      {isAirdropPage && (<h1 className={s.title}>Airdrop</h1>)}

      <nav className={s.nav}>
        <Popover
          visible={popper1visible}
          onVisibleChange={setPopper1visible}
          trigger={['click', 'hover']}
          noPadding
          content={
            <div className={cn('card', s.dropdown)}>
              <ExternalLink
                href="https://universe.xyz/marketplace"
                className={s.dropdownLink}
                onClick={() => setPopper4visible(false)}>
                <Icon name="marketplace" width={20} height={20} className={s.dropdownIcon} />
                <span className="mr-4">NFT marketplace</span>
                <Badge variant="primary">BETA</Badge>
              </ExternalLink>
              <ExternalLink
                href="https://universe.xyz/minting"
                className={s.dropdownLink}
                onClick={() => setPopper4visible(false)}>
                <Icon name="minting" width={20} height={20} className={s.dropdownIcon} />
                <span>Minting</span>
              </ExternalLink>
              <span className={s.dropdownLink} aria-disabled="true">
                <Icon name="auction" width={20} height={20} className={s.dropdownIcon} />
                <Tooltip title="Coming soon" placement="top" hint>
                  <span>Auction House</span>
                </Tooltip>
              </span>
              <span className={s.dropdownLink} aria-disabled="true">
                <Icon name="social-media" width={20} height={20} className={s.dropdownIcon} />
                <Tooltip title="Coming soon" placement="top" hint>
                  <span>Social media</span>
                </Tooltip>
              </span>
            </div>
          }>
          <Button type="link" className={s.navLink}>
            <Grid flow="col" align="center">
              <Text type="p1" weight="500" color="primary" className="mr-4">
                Products
              </Text>
              <Badge variant="primary" className="mr-4">
                NEW
              </Badge>
              <Icon name="dropdown-arrow" width={12} height={12} className={s.dropdownArrow} />
            </Grid>
          </Button>
        </Popover>
        <Popover
          visible={popper4visible}
          onVisibleChange={setPopper4visible}
          trigger={['click', 'hover']}
          noPadding
          content={
            <div className={cn('card', s.dropdown)}>
              <ExternalLink
                href="https://universe.xyz/polymorphs"
                className={s.dropdownLink}
                onClick={() => setPopper4visible(false)}>
                <Icon name="polymorphs" width={20} height={20} className={s.dropdownIcon} />
                <span>Polymorphs</span>
              </ExternalLink>
              <ExternalLink
                href="https://universe.xyz/lobby-lobsters"
                className={s.dropdownLink}
                onClick={() => setPopper4visible(false)}>
                <Icon name="lobby-lobsters" width={20} height={20} className={s.dropdownIcon} />
                <span>Lobby Lobsters</span>
              </ExternalLink>
              <span className={s.dropdownLink} aria-disabled="true">
                <Icon name="core-drops" width={20} height={20} className={s.dropdownIcon} />
                <Tooltip title="Coming soon" placement="top" hint>
                  <span>Core drops</span>
                </Tooltip>
              </span>
            </div>
          }>
          <Button type="link" className={s.navLink}>
            <Grid flow="col" align="center">
              <Text type="p1" weight="500" color="primary" className="mr-4">
                NFT drops
              </Text>
              <Icon name="dropdown-arrow" width={12} height={12} className={s.dropdownArrow} />
            </Grid>
          </Button>
        </Popover>
        <Popover
          visible={popper5visible}
          onVisibleChange={setPopper5visible}
          trigger={['click', 'hover']}
          noPadding
          content={
            <div className={cn('card', s.dropdown)}>
              <ExternalLink
                href="https://universe.xyz/polymorph-rarity"
                className={s.dropdownLink}
                onClick={() => setPopper5visible(false)}>
                <Icon name="rarity-chart" width={20} height={11} className={s.dropdownIcon} />
                <span>Polymorphs</span>
              </ExternalLink>
              <ExternalLink
                href="https://rarity.tools/lobby-lobsters"
                className={s.dropdownLink}
                onClick={() => setPopper5visible(false)}>
                <Icon name="rarity-chart" width={20} height={11} className={s.dropdownIcon} />
                <span>Lobby Lobsters</span>
              </ExternalLink>
            </div>
          }>
          <Button type="link" className={s.navLink}>
            <Grid flow="col" align="center">
              <Text type="p1" weight="500" color="primary" className="mr-4">
                Rarity charts
              </Text>
              <Icon name="dropdown-arrow" width={12} height={12} className={s.dropdownArrow} />
            </Grid>
          </Button>
        </Popover>
        <Popover
          visible={popper2visible}
          onVisibleChange={setPopper2visible}
          trigger={['click', 'hover']}
          noPadding
          content={
            <div className={cn('card', s.dropdown)}>
              <ExternalLink
                href="https://universe.xyz/about"
                className={s.dropdownLink}
                onClick={() => setPopper2visible(false)}>
                <Icon name="about" width={20} height={20} className={s.dropdownIcon} />
                <span>About</span>
              </ExternalLink>
              <ExternalLink
                href="https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper"
                className={s.dropdownLink}
                onClick={() => setPopper2visible(false)}>
                <Icon name="whitepaper" width={20} height={20} className={s.dropdownIcon} />
                <span>Whitepaper</span>
              </ExternalLink>
              <ExternalLink
                href="https://universe.xyz/team"
                className={s.dropdownLink}
                onClick={() => setPopper2visible(false)}>
                <Icon name="team" width={20} height={20} className={s.dropdownIcon} />
                <span>Team</span>
              </ExternalLink>
              <ExternalLink
                href="https://docs.universe.xyz/"
                className={s.dropdownLink}
                onClick={() => setPopper2visible(false)}>
                <Icon name="docs" width={20} height={20} className={s.dropdownIcon} />
                <span>Docs</span>
              </ExternalLink>
              <ExternalLink
                href="https://universe.freshdesk.com/support/home"
                className={s.dropdownLink}
                onClick={() => setPopper2visible(false)}>
                <Icon name="support" width={20} height={15} className={s.dropdownIcon} />
                <span>Support</span>
              </ExternalLink>
            </div>
          }>
          <Button type="link" className={s.navLink}>
            <Grid flow="col" align="center">
              <Text type="p1" weight="500" color="primary" className="mr-4">
                Info
              </Text>
              <Icon name="dropdown-arrow" width={12} height={12} className={s.dropdownArrow} />
            </Grid>
          </Button>
        </Popover>
        <Popover
          noPadding
          visible={popper3visible}
          trigger={['click', 'hover']}
          onVisibleChange={setPopper3visible}
          content={
            <div className={cn('card', s.dropdown)}>
              <Link to="/governance" className={s.dropdownLink} onClick={() => setPopper3visible(false)}>
                <Icon name="governance" width={20} height={20} className={s.dropdownIcon} />
                <span>Governance</span>
              </Link>
              <Link to="/yield-farming" className={s.dropdownLink} onClick={() => setPopper3visible(false)}>
                <Icon name="yield-farming" width={20} height={20} className={s.dropdownIcon} />
                <span>Yield Farming</span>
              </Link>
              <ExternalLink
                href="https://forum.universe.xyz/"
                className={s.dropdownLink}
                onClick={() => setPopper3visible(false)}>
                <Icon name="forum" width={20} height={15} className={s.dropdownIcon} />
                <span>Forum</span>
              </ExternalLink>
              <ExternalLink
                href="https://signal.universe.xyz/#/"
                className={s.dropdownLink}
                onClick={() => setPopper3visible(false)}>
                <Icon name="signal" width={20} height={20} className={s.dropdownIcon} />
                <span>Signal</span>
              </ExternalLink>
              <Link to="/airdrop" className={s.dropdownLink} onClick={() => setPopper3visible(false)}>
                <Icon name="airdrop" width={20} height={20} className={s.dropdownIcon} />
                <span>Airdrop</span>
              </Link>
            </div>
          }>
          <Button type="link" className={s.navLink}>
            <Grid flow="col" align="center">
              <Text type="p1" weight="500" color="primary" className="mr-4">
                DAO
              </Text>
              <Icon name="dropdown-arrow" width={12} height={12} className={s.dropdownArrow} />
            </Grid>
          </Button>
        </Popover>
      </nav>
      {!isMobile && wallet.isActive && wallet.connector?.id === 'metamask' && (
        <div className={s.addTokenWrapper}>
          <button type="button" onClick={handleAddProjectToken} className={s.addTokenButton}>
            <Icon name="static/add-token" width={28} height={28} />
          </button>
        </div>
      )}
      <ConnectedWallet />
      <Button type="link" className={s.burger} onClick={() => setNavOpen(prevState => !prevState)}>
        <Icon name={navOpen ? 'burger-close' : 'burger'} style={{ color: 'var(--theme-primary-color)' }} />
      </Button>
      {navOpen &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            className={cn(s.mobileMenu, { [s.open]: navOpen })}
            style={
              {
                ...styles.popper,
                bottom: 0,
                right: 0,
                '--top': `${state?.modifiersData?.popperOffsets?.y || 0}px`,
              } as React.CSSProperties
            }
            {...attributes.popper}>
            <div className={s.mobileInner}>
              <div className={s.mobileMenuInner}>
                <div className={s.mobileMenuBlock}>
                  <h3>Products</h3>
                  <ExternalLink
                    href="https://universe.xyz/marketplace"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="marketplace" width={20} height={20} className={s.dropdownIcon} />
                    <span className="mr-4">NFT marketplace</span>
                    <Badge variant="primary">BETA</Badge>
                  </ExternalLink>
                  <ExternalLink
                    href="https://universe.xyz/minting"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="minting" width={20} height={20} className={s.dropdownIcon} />
                    <span>Minting</span>
                  </ExternalLink>
                  <span className={s.dropdownLink} aria-disabled="true">
                    <Icon name="auction" width={20} height={20} className={s.dropdownIcon} />
                    <Tooltip title="Coming soon" placement="top" hint>
                      <span>Auction House</span>
                    </Tooltip>
                  </span>
                  <span className={s.dropdownLink} aria-disabled="true">
                    <Icon name="social-media" width={20} height={20} className={s.dropdownIcon} />
                    <Tooltip title="Coming soon" placement="top" hint>
                      <span>Social media</span>
                    </Tooltip>
                  </span>
                </div>
                <div className={s.mobileMenuBlock}>
                  <h3>NFT drops</h3>
                  <ExternalLink
                    href="https://universe.xyz/polymorphs"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="polymorphs" width={20} height={20} className={s.dropdownIcon} />
                    <span>Polymorphs</span>
                  </ExternalLink>
                  <ExternalLink
                    href="https://universe.xyz/lobby-lobsters"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="lobby-lobsters" width={20} height={20} className={s.dropdownIcon} />
                    <span>Lobby Lobsters</span>
                  </ExternalLink>
                  <span className={s.dropdownLink} aria-disabled="true">
                    <Icon name="core-drops" width={20} height={20} className={s.dropdownIcon} />
                    <Tooltip title="Coming soon" placement="top" hint>
                      <span>Core drops</span>
                    </Tooltip>
                  </span>
                </div>
                <div className={s.mobileMenuBlock}>
                  <h3>Rarity charts</h3>
                  <ExternalLink
                    href="https://universe.xyz/polymorph-rarity"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="rarity-chart" width={20} height={11} className={s.dropdownIcon} />
                    <span>Polymorphs</span>
                  </ExternalLink>
                  <ExternalLink
                    href="https://rarity.tools/lobby-lobsters"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="rarity-chart" width={20} height={11} className={s.dropdownIcon} />
                    <span>Lobby Lobsters</span>
                  </ExternalLink>
                </div>
                <div className={s.mobileMenuBlock}>
                  <h3>Info</h3>
                  <ExternalLink
                    href="https://universe.xyz/about"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="about" width={20} height={20} className={s.dropdownIcon} />
                    <span>About</span>
                  </ExternalLink>
                  <ExternalLink
                    href="https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="whitepaper" width={20} height={20} className={s.dropdownIcon} />
                    <span>Whitepaper</span>
                  </ExternalLink>
                  <ExternalLink
                    href="https://universe.xyz/team"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="team" width={20} height={20} className={s.dropdownIcon} />
                    <span>Team</span>
                  </ExternalLink>
                  <ExternalLink
                    href="https://docs.universe.xyz/"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="docs" width={20} height={20} className={s.dropdownIcon} />
                    <span>Docs</span>
                  </ExternalLink>
                  <ExternalLink
                    href="https://universe.freshdesk.com/support/home"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="support" width={20} height={15} className={s.dropdownIcon} />
                    <span>Support</span>
                  </ExternalLink>
                </div>
                <div className={s.mobileMenuBlock}>
                  <h3>DAO</h3>
                  <Link to="/governance" className={s.dropdownLink} onClick={() => setNavOpen(false)}>
                    <Icon name="governance" width={20} height={20} className={s.dropdownIcon} />
                    <span>Governance</span>
                  </Link>
                  <Link to="/yield-farming" className={s.dropdownLink} onClick={() => setNavOpen(false)}>
                    <Icon name="yield-farming" width={20} height={20} className={s.dropdownIcon} />
                    <span>Yield Farming</span>
                  </Link>
                  <ExternalLink
                    href="https://forum.universe.xyz/"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="forum" width={20} height={15} className={s.dropdownIcon} />
                    <span>Forum</span>
                  </ExternalLink>
                  <ExternalLink
                    href="https://signal.universe.xyz/#/"
                    className={s.dropdownLink}
                    onClick={() => setNavOpen(false)}>
                    <Icon name="signal" width={20} height={20} className={s.dropdownIcon} />
                    <span>Signal</span>
                  </ExternalLink>
                  <Link to="/airdrop" className={s.dropdownLink} onClick={() => setNavOpen(false)}>
                    <Icon name="airdrop" width={20} height={20} className={s.dropdownIcon} />
                    <span>Airdrop</span>
                  </Link>
                </div>
                {!wallet.isActive && !isMobile ? (
                  <div style={{ textAlign: 'center', padding: '0 20px', width: '100%' }}>
                    <Divider />
                    <button
                      type="button"
                      className="button-ghost"
                      onClick={() => {
                        setNavOpen(false);
                        wallet.showWalletsModal();
                      }}
                      style={{ margin: '20px auto 0' }}>
                      <span>Sign in</span>
                    </button>
                  </div>
                ) : null}
              </div>
              <button type="button" className={s.themeSwitcher} onClick={toggleDarkTheme}>
                <Icon name={isDarkTheme ? 'theme-switcher-sun' : 'theme-switcher-moon'} width={24} height={24} />
                <span>{isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}</span>
              </button>
            </div>
          </div>,
          modalRoot,
        )}
    </div>
  );
};

export default LayoutHeader;
