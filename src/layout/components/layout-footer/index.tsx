import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Antd from 'antd';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

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
      <div className={s.footerTop}>
        <div className={s.leftBlock}>
          <Link to="/" className={s.logoLink}>
            <Icon name="png/universe" width="auto" height="auto" className={s.logo} />
            <Icon name="universe-text" width="94" height="15" className={s.logoText} />
          </Link>
          <Text type="p2" weight="bold" color="white">
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
        <div className={s.rightBlock}>
          <nav className={s.navBlock}>
            <h3>Products</h3>
            <ExternalLink href="#" className={s.link}>
              Auction house
            </ExternalLink>
            <ExternalLink className={s.link} aria-disabled="true">
              <Tooltip title="Coming soon" placement="top" hint>
                NFT marketplace
              </Tooltip>
            </ExternalLink>
            <ExternalLink className={s.link} aria-disabled="true">
              <Tooltip title="Coming soon" placement="top" hint>
                Social media
              </Tooltip>
            </ExternalLink>
          </nav>
          <nav className={s.navBlock}>
            <h3>Info</h3>
            <ExternalLink href="#" className={s.link}>
              About
            </ExternalLink>
            <ExternalLink href="#" className={s.link}>
              Whitepaper
            </ExternalLink>
            <ExternalLink href="#" className={s.link}>
              Team
            </ExternalLink>
          </nav>
          <nav className={s.navBlock}>
            <h3>DAO</h3>
            <Link to="/governance" className={s.link}>
              Governance
            </Link>
            <Link to="/yield-farming" className={s.link}>
              Yield farming
            </Link>
            <ExternalLink href="https://docs.universe.xyz/" className={s.link}>
              Docs
            </ExternalLink>
          </nav>
        </div>
      </div>
      <div className={s.copyrightsBlock}>
        <Text type="p2" color="secondary">
          Universe.xyz © 2021. Open-sourced.
        </Text>
        <Text type="p2" color="secondary">
          Powered by xyzDAO.
        </Text>
        <div>
          <ExternalLink href="#" className={s.sLink}>
            <Icon name="twitter" width="20" height="20" />
          </ExternalLink>
          <ExternalLink href="#" className={s.sLink}>
            <Icon name="discord" width="20" height="20" />
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
