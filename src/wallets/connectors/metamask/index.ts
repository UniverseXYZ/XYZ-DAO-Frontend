import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

import MetaMaskLogo from 'resources/svg/wallets/metamask-logo.svg';

import { WalletConnector } from 'wallets/types';

type MetaMaskError = Error & {
  code: number;
};

export type MetamaskWatchAsset = {
  type: string;
  options: {
    address: string;
    symbol: string;
    decimals: number;
    image: string;
  };
};

export class MetamaskConnector extends InjectedConnector {
  addToken(info: MetamaskWatchAsset): Promise<boolean> {
    return this.getProvider().then(provider => {
      return provider.request({
        method: 'wallet_watchAsset',
        params: info,
      });
    });
  }
}

const MetaMaskWalletConfig: WalletConnector = {
  id: 'metamask',
  logo: MetaMaskLogo,
  name: 'MetaMask',
  factory(chainId: number): AbstractConnector {
    return new InjectedConnector({
      supportedChainIds: [chainId],
    });
  },
  onError(error: MetaMaskError): Error | undefined {
    if (error.code === -32002) {
      return new Error('MetaMask is already processing. Please verify MetaMask extension.');
    }

    return undefined;
  },
};

export default MetaMaskWalletConfig;
