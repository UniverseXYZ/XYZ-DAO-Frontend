const config = {
  env: String(process.env.REACT_APP_ENV),
  isDev: String(process.env.REACT_APP_ENV) === 'development',
  isProd: String(process.env.REACT_APP_ENV) === 'production',
  isTestnet: String(process.env.REACT_APP_ENV) === 'testnet',
  api: {
    baseUrl: String(process.env.REACT_APP_BASE_API_URL),
  },
  contracts: {
    usdc: {
      token: String(process.env.REACT_APP_TOKEN_USDC_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_USDC_PRICE_ADDR).toLowerCase(),
    },
    xyz: {
      token: String(process.env.REACT_APP_TOKEN_XYZ_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_XYZ_PRICE_ADDR).toLowerCase(),
    },
    bond: {
      token: String(process.env.REACT_APP_TOKEN_BOND_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_BOND_PRICE_ADDR).toLowerCase(),
    },
    aave: {
      token: String(process.env.REACT_APP_TOKEN_AAVE_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_AAVE_PRICE_ADDR).toLowerCase(),
    },
    comp: {
      token: String(process.env.REACT_APP_TOKEN_COMP_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_COMP_PRICE_ADDR).toLowerCase(),
    },
    snx: {
      token: String(process.env.REACT_APP_TOKEN_SNX_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_SNX_PRICE_ADDR).toLowerCase(),
    },
    sushi: {
      token: String(process.env.REACT_APP_TOKEN_SUSHI_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_SUSHI_PRICE_ADDR).toLowerCase(),
    },
    link: {
      token: String(process.env.REACT_APP_TOKEN_LINK_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_LINK_PRICE_ADDR).toLowerCase(),
    },
    ilv: {
      token: String(process.env.REACT_APP_TOKEN_ILV_ADDR).toLowerCase(),
    },
    usdcXYZSushiLP: {
      token: String(process.env.REACT_APP_TOKEN_USDC_XYZ_SUSHI_LP_ADDR).toLowerCase(),
      price: String(process.env.REACT_APP_TOKEN_USDC_XYZ_SUSHI_LP_PRICE_ADDR).toLowerCase(),
    },
    yf: {
      staking: String(process.env.REACT_APP_CONTRACT_YF_STAKING_ADDR).toLowerCase(),
      bond: String(process.env.REACT_APP_CONTRACT_YF_BOND_ADDR).toLowerCase(),
      aave: String(process.env.REACT_APP_CONTRACT_YF_AAVE_ADDR).toLowerCase(),
      comp: String(process.env.REACT_APP_CONTRACT_YF_COMP_ADDR).toLowerCase(),
      snx: String(process.env.REACT_APP_CONTRACT_YF_SNX_ADDR).toLowerCase(),
      sushi: String(process.env.REACT_APP_CONTRACT_YF_SUSHI_ADDR).toLowerCase(),
      link: String(process.env.REACT_APP_CONTRACT_YF_LINK_ADDR).toLowerCase(),
      ilv: String(process.env.REACT_APP_CONTRACT_YF_ILV_ADDR).toLowerCase(),
      usdcXYZSushiLP: String(process.env.REACT_APP_CONTRACT_YF_USDC_XYZ_SUSHI_LP_ADDR).toLowerCase(),
    },
    dao: {
      governance: String(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR).toLowerCase(),
      barn: String(process.env.REACT_APP_CONTRACT_DAO_BARN_ADDR).toLowerCase(),
      reward: String(process.env.REACT_APP_CONTRACT_DAO_REWARD_ADDR).toLowerCase(),
    },
  },
  web3: {
    chainId: Number(process.env.REACT_APP_WEB3_CHAIN_ID),
    poolingInterval: Number(process.env.REACT_APP_WEB3_POLLING_INTERVAL),
    rpc: {
      wssUrl: String(process.env.REACT_APP_WEB3_RPC_WSS_URL),
      httpsUrl: String(process.env.REACT_APP_WEB3_RPC_HTTPS_URL),
    },
    etherscan: {
      apiKey: String(process.env.REACT_APP_ETHERSCAN_API_KEY),
    },
    wallets: {
      portis: {
        id: String(process.env.REACT_APP_WEB3_PORTIS_APP_ID),
      },
      walletConnect: {
        bridge: String(process.env.REACT_APP_WEB3_WALLET_CONNECT_BRIDGE),
      },
      coinbase: {
        appName: String(process.env.REACT_APP_WEB3_COINBASE_APP_NAME),
      },
      trezor: {
        email: String(process.env.REACT_APP_WEB3_TREZOR_EMAIL),
        appUrl: String(process.env.REACT_APP_WEB3_TREZOR_APP_URL),
      },
    },
  },
};

export const XYZ_MARKET_LINK = `https://app.sushi.com/swap?use=V2&inputCurrency=${config.contracts.xyz.token}&outputCurrency=${config.contracts.usdc.token}`;

export default config;
