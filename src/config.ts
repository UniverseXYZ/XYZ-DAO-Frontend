function toLowerCase(value: any): string {
  return String(value ?? '').toLowerCase();
}

const config = {
  env: String(process.env.REACT_APP_ENV),
  isDev: String(process.env.REACT_APP_ENV) === 'development',
  isProd: String(process.env.REACT_APP_ENV) === 'production',
  isTestnet: String(process.env.REACT_APP_ENV) === 'testnet',
  graph: {
    primaryUrl: String(process.env.REACT_APP_PRIMARY_GRAPH_URL),
    fallbackUrl: String(process.env.REACT_APP_FALLBACK_GRAPH_URL),
  },
  zapper: {
    baseUrl: String(process.env.REACT_APP_ZAPPER_URL),
    apiKey: String(process.env.REACT_APP_ZAPPER_API_KEY),
  },
  api: {
    baseUrl: String(process.env.REACT_APP_BASE_API_URL),
  },
  tokens: {
    usdc: toLowerCase(process.env.REACT_APP_TOKEN_USDC_ADDR),
    xyz: toLowerCase(process.env.REACT_APP_TOKEN_XYZ_ADDR),
    bond: toLowerCase(process.env.REACT_APP_TOKEN_BOND_ADDR),
    aave: toLowerCase(process.env.REACT_APP_TOKEN_AAVE_ADDR),
    comp: toLowerCase(process.env.REACT_APP_TOKEN_COMP_ADDR),
    snx: toLowerCase(process.env.REACT_APP_TOKEN_SNX_ADDR),
    sushi: toLowerCase(process.env.REACT_APP_TOKEN_SUSHI_ADDR),
    link: toLowerCase(process.env.REACT_APP_TOKEN_LINK_ADDR),
    ilv: toLowerCase(process.env.REACT_APP_TOKEN_ILV_ADDR),
    usdcXyzSLP: toLowerCase(process.env.REACT_APP_TOKEN_USDC_XYZ_SLP_ADDR),
  },
  contracts: {
    yf: {
      staking: toLowerCase(process.env.REACT_APP_CONTRACT_YF_STAKING_ADDR),
      bond: toLowerCase(process.env.REACT_APP_CONTRACT_YF_BOND_ADDR),
      aave: toLowerCase(process.env.REACT_APP_CONTRACT_YF_AAVE_ADDR),
      comp: toLowerCase(process.env.REACT_APP_CONTRACT_YF_COMP_ADDR),
      snx: toLowerCase(process.env.REACT_APP_CONTRACT_YF_SNX_ADDR),
      sushi: toLowerCase(process.env.REACT_APP_CONTRACT_YF_SUSHI_ADDR),
      link: toLowerCase(process.env.REACT_APP_CONTRACT_YF_LINK_ADDR),
      ilv: toLowerCase(process.env.REACT_APP_CONTRACT_YF_ILV_ADDR),
      usdcXyzSLP: toLowerCase(process.env.REACT_APP_CONTRACT_YF_USDC_XYZ_SLP_ADDR),
    },
    dao: {
      governance: toLowerCase(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR),
      barn: toLowerCase(process.env.REACT_APP_CONTRACT_DAO_BARN_ADDR),
      reward: toLowerCase(process.env.REACT_APP_CONTRACT_DAO_REWARD_ADDR),
    },
    merkleDistributor: toLowerCase(process.env.REACT_APP_CONTRACT_MERKLE_DISTRIBUTOR_ADDR),
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
  dao: {
    activationThreshold: Number(process.env.REACT_APP_DAO_ACTIVATION_THRESHOLD),
  },
};

export const XYZ_MARKET_LINK = `https://app.sushi.com/swap?inputCurrency=${config.tokens.usdc}&outputCurrency=${config.tokens.xyz}`;

export const XYZ_MARKET_LIQUIDITY_LINK = `https://app.sushi.com/add/${config.tokens.usdc}/${config.tokens.xyz}`;

export default config;
