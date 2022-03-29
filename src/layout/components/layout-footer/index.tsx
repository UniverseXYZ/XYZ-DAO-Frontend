import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Antd from 'antd';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import Badge from 'components/custom/badge';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { XYZ_MARKET_LINK, XYZ_MARKET_LIQUIDITY_LINK } from 'config';

import s from './s.module.scss';

const LayoutFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handlerSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    fetch(`https://shielded-sands-48363.herokuapp.com/addContact?email=${email}`)
      .then(() => {
        setEmail('');
        Antd.notification.success({
          message: 'Thank you for subscribing!',
        });
      })
      .catch(error => {
        console.log(error);
        Antd.notification.error({
          message: 'Sorry, something went wrong.',
        });
      });

    setLoading(false);
  };

  return (
    <footer className={s.footer}>
      <div className="container-limit">
        <div className={s.row}>
          <div className={s.logoWrap}>
            <Link to="/" className={s.logoLink}>
              <Icon name="png/universe" width="auto" height="auto" className={s.logo} />
              <Icon name="universe-text" width="94" height="15" className={s.logoText} />
            </Link>
            <Text className={s.logoSubText} type="p3">
              Launch your own community-driven NFT universe baked with social tools, media services, and distribution -
              underpinned by the native $XYZ token.
            </Text>
          </div>
          <div className={s.subscribeBlock}>
            <Text type="p3" weight="bold" color="white" font="secondary">
              Stay up to date with our newsletter
            </Text>
            <form className={s.subscribeWrap} onSubmit={handlerSubscribe}>
              <input
                value={email}
                type="email"
                name="email"
                placeholder="Enter your email"
                className={s.subscribeInput}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <button className={cn(s.subscribeButton, 'button-primary')} disabled={loading}>
                {loading && <AntdSpin style={{ marginRight: 8 }} spinning />}
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className={cn(s.row, s.navWrap)}>
          <div className={s.navBlocksWrap}>
            <nav className={s.navBlock}>
              <Text type="p3" color="white" font="secondary" weight="bold" className={s.navTitle}>
                Products
              </Text>
              <ExternalLink href="https://universe.xyz/marketplace" className={s.link}>
                <span className="mr-4">NFT marketplace</span>
                <Badge variant="primary">BETA</Badge>
              </ExternalLink>
              <ExternalLink href="https://universe.xyz/minting" className={s.link}>
                Minting
              </ExternalLink>
              <span className={s.link} aria-disabled="true">
                <Tooltip title="Coming soon" placement="top" hint>
                  Auction house
                </Tooltip>
              </span>
              <span className={s.link} aria-disabled="true">
                <Tooltip title="Coming soon" placement="top" hint>
                  Social media
                </Tooltip>
              </span>
            </nav>
            <nav className={s.navBlock}>
              <Text type="p3" color="white" font="secondary" weight="bold" className={s.navTitle}>
                NFT Drops
              </Text>
              <ExternalLink href="https://universe.xyz/polymorphs" className={s.link}>
                Polymorphs
              </ExternalLink>
              <ExternalLink href="https://universe.xyz/lobby-lobsters" className={s.link}>
                Lobby Lobsters
              </ExternalLink>
              <span className={s.link} aria-disabled="true">
                <Tooltip title="Coming soon" placement="top" hint>
                  Core Drops
                </Tooltip>
              </span>
            </nav>
            <nav className={s.navBlock}>
              <Text type="p3" color="white" font="secondary" weight="bold" className={s.navTitle}>
                Rarity charts
              </Text>
              <ExternalLink href="https://universe.xyz/polymorph-rarity" className={s.link}>
                Polymorphs
              </ExternalLink>
              <ExternalLink href="https://rarity.tools/lobby-lobsters" className={s.link}>
                Lobby Lobsters
              </ExternalLink>
            </nav>
            <nav className={s.navBlock}>
              <Text type="p3" color="white" font="secondary" weight="bold" className={s.navTitle}>
                Info
              </Text>
              <ExternalLink href="https://universe.xyz/about" className={s.link}>
                About
              </ExternalLink>
              <ExternalLink href="https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper" className={s.link}>
                Whitepaper
              </ExternalLink>
              <ExternalLink href="https://universe.xyz/team" className={s.link}>
                Team
              </ExternalLink>
              <ExternalLink href="https://docs.universe.xyz/" className={s.link}>
                Docs
              </ExternalLink>
              <ExternalLink href="https://universe.freshdesk.com/support/home" className={s.link}>
                Support
              </ExternalLink>
            </nav>
            <nav className={s.navBlock}>
              <Text type="p3" color="white" font="secondary" weight="bold" className={s.navTitle}>
                DAO
              </Text>
              <Link to="/governance" className={s.link}>
                Governance
              </Link>
              <Link to="/yield-farming" className={s.link}>
                Yield farming
              </Link>
              <ExternalLink href="https://forum.universe.xyz/" className={s.link}>
                Forum
              </ExternalLink>
              <ExternalLink href="https://signal.universe.xyz/" className={s.link}>
                Signal
              </ExternalLink>
              <Link to="/airdrop" className={s.link}>
                Airdrop
              </Link>
            </nav>
          </div>
        </div>
        <div className={cn(s.row, s.copyrightsBlock)}>
          <div className={s.copyrightLink}>Universe.xyz © {new Date().getFullYear()}. Open-sourced.</div>
          <div className={s.copyrightLinks}>
            <ExternalLink href={XYZ_MARKET_LIQUIDITY_LINK} className={s.copyrightLink}>
              Add liquidity to SushiSwap USDC/XYZ pool
            </ExternalLink>
            <ExternalLink href={XYZ_MARKET_LINK} className={s.copyrightLink}>
              SushiSwap USDC/XYZ market
            </ExternalLink>
          </div>

          <div className={s.sBlock}>
            <div className={s.sLinksWrap}>
              <ExternalLink href="https://twitter.com/universe_xyz" className={s.sLink}>
                <Icon name="twitter" width="20" height="20" />
              </ExternalLink>
              <ExternalLink href="https://discord.com/invite/vau77wXCD3" className={s.sLink}>
                <Icon name="discord" width="20" height="20" />
              </ExternalLink>
              <ExternalLink href="https://www.coingecko.com/en/coins/universe-xyz" className={s.sLink}>
                <Icon name="coingecko" width="20" height="20" />
              </ExternalLink>
              <ExternalLink
                href="https://www.youtube.com/channel/UCWt00md9T2b4iTsHWp_Fapw?sub_confirmation=1"
                className={s.sLink}>
                <Icon name="youtube" width="20" height="20" />
              </ExternalLink>
              <ExternalLink href="https://medium.com/universe-xyz" className={s.sLink}>
                <Icon name="medium" width="20" height="20" />
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
