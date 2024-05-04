import { useState, useEffect } from "react"
import { Widget } from "@kyberswap/widgets"
import { init, useWallets, useConnectWallet,useSetChain } from "@web3-onboard/react"
import injectedModule from "@web3-onboard/injected-wallets"
import { ethers } from "ethers"
import walletConnectModule from "@web3-onboard/walletconnect"
const injected = injectedModule()
const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'aa967df559416cc835486e6bc0e6eaad',
  requiredChains: [137],
  dappUrl: 'https://www.catcoin.today'
}
const TOKEN_LIST = [
  {
    "name": "VNDES",
    "address": "0xD6ba705DA1713F66925C46EbB9f6A9548c9E4213",
    "symbol": "VDE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/VndesTokenVDE/vExchange/master/public/vndes.png"
  },
  {
    "name": "3A Utility Token",
    "address": "0x58c7B2828e7F2B2CaA0cC7fEef242fA3196d03df",
    "symbol": "A3A",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://1453456140-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FGbmVIsiJFchsVf8GkrQQ%2Fuploads%2FRgMuxRx6ZSaL6tvYjz18%2FA3A%20Black%20Logo.svg?alt=media&token=874a31a9-323c-4541-8634-1c097a8993c0"
  },
  {
    "name": "A51 Finance",
    "address": "0xe9E7c09e82328c3107d367f6c617cF9977e63ED0",
    "symbol": "A51",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/kdnL2QJ.png"
  },
  {
    "name": "Aave",
    "address": "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
    "symbol": "AAVE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://etherscan.io/token/images/aave_32.png"
  },
  {
    "name": "Adamant",
    "address": "0xc3FdbadC7c795EF1D6Ba111e06fF8F16A20Ea539",
    "symbol": "ADDY",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://adamant.finance/img/adamant.png"
  },
  {
    "name": "Algebra",
    "address": "0x0169eC1f8f639B32Eec6D923e24C2A2ff45B9DD6",
    "symbol": "ALGB",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/19580/small/13211.png?1635469023"
  },
  {
    "name": "Artificial Liquid Intelligence Token",
    "address": "0xbFc70507384047Aa74c29Cdc8c5Cb88D0f7213AC",
    "symbol": "ALI",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/WxPZm2m.png"
  },
  {
    "name": "Aavegotchi ALPHA",
    "address": "0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2",
    "symbol": "ALPHA",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/24738/small/alpha.png?1648769768"
  },
  {
    "name": "AMBO",
    "address": "0x9B8B6A1298d34B3c4bBDDce8a7fF0149121592C1",
    "symbol": "AMBO",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://sheertopia.io/_next/image?url=%2FSheertopia-logo.png&w=256&q=75"
  },
  {
    "name": "Avalanche Token",
    "address": "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b",
    "symbol": "AVAX",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818"
  },
  {
    "name": "Axelar",
    "address": "0x6e4E624106Cb12E168E6533F8ec7c82263358940",
    "symbol": "AXL",
    "decimals": 6,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/27277/small/V-65_xQ1_400x400.jpeg?1663121730"
  },
  {
    "name": "Axelar Wrapped USDC",
    "address": "0x750e4C4984a9e0f12978eA6742Bc1c5D248f40ed",
    "symbol": "axlUSDC",
    "decimals": 6,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "b0rder1ess",
    "address": "0xF36f79feb5d97e18C69078d8D13d941CaE447A04",
    "symbol": "b01",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/9GESEM3.jpeg"
  },
  {
    "name": "Bag",
    "address": "0x73b29199a8e4C146E893EB95f18dAc41738a88c6",
    "symbol": "BAG",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/vmct5ZL.png"
  },
  {
    "name": "Banana",
    "address": "0xbC91347e80886453F3f8bBd6d7aC07C122D87735",
    "symbol": "BANANA",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/17521/small/banana-token-cg.png?1646285527"
  },
  {
    "name": "BLOK",
    "address": "0x229b1b6C23ff8953D663C4cBB519717e323a0a84",
    "symbol": "BLOK",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://pbs.twimg.com/profile_images/1443182135410634754/l1wH-p3b_400x400.jpg"
  },
  {
    "name": "Borderless Money",
    "address": "0xc59132FBdF8dE8fbE510F568a5D831C991B4fC38",
    "symbol": "BOM",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://www.borderless.money/logo-200x200.png"
  },
  {
    "name": "Bullieverse",
    "address": "0x9f95e17b2668AFE01F8fbD157068b0a4405Cc08D",
    "symbol": "BULL",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/La2jNVp.png"
  },
  {
    "name": "Catheon Gaming",
    "address": "0x7e7737C40878e720b32e7bC9CD096259f876d69f",
    "symbol": "CATHEON",
    "decimals": 9,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/28052/small/_removal.ai__tmp-635fe0271d6a3%281%29.png?1667286253"
  },
  {
    "name": "Coinbase Wrapped Staked ETH",
    "address": "0x4b4327dB1600B8B1440163F667e199CEf35385f5",
    "symbol": "cbETH",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://dynamic-assets.coinbase.com/55517c7b84cff054d0bf84f6d82680b5368915854f855ec4fe0178478a637b18a985ec85b87387beb2ae2a1b276fcb320ac7451c358302ceebb179c58934ff65/asset_icons/93aa525880c2df46f3d5404cff1844a42f1a5d1fc812128ae3f70f2ce4a882e1.png"
  },
  {
    "name": "Carbify",
    "address": "0xB6a5ae40e79891E4DeAdAd06C8A7cA47396Df21C",
    "symbol": "CBY",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://s3.coinmarketcap.com/static-gravity/image/bac2ec73cdbb4eaf9920a534498d43b1.png"
  },
  {
    "name": "Chain Games",
    "address": "0xd55fCe7CDaB84d84f2EF3F99816D765a2a94a509",
    "symbol": "CHAIN",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/8WP8qFm.jpeg"
  },
  {
    "name": "NFT Champions",
    "address": "0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f",
    "symbol": "CHAMP",
    "decimals": 8,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/19536/small/champ.png?1635905981"
  },
  {
    "name": "BitCone",
    "address": "0xbA777aE3a3C91fCD83EF85bfe65410592Bdd0f7c",
    "symbol": "CONE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/Pg3FdXt.png"
  },
  {
    "name": "Crypto Crew Token",
    "address": "0xEd198DB07571DD3Be19bFCf86A990c2137DD8648",
    "symbol": "CREW",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/WkMZqNl.jpeg"
  },
  {
    "name": "CULO",
    "address": "0x74dD45dd579caD749f9381D6227e7e02277C944B",
    "symbol": "CULO",
    "decimals": 9,
    "chainId": 137,
    "logoURI": "https://i.postimg.cc/qBWpKF3r/IMG-20240123-225021-225.png"
  },
  {
    "name": "Dai Stablecoin",
    "address": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "Digital Fitness",
    "address": "0x428360b02C1269bc1c79fbC399ad31d58C1E8fdA",
    "symbol": "DEFIT",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/FhKKgTM.png"
  },
  {
    "name": "DeRace Token",
    "address": "0xB35fcBCF1fD489fCe02Ee146599e893FDCdC60e6",
    "symbol": "DERC",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://d19z9f49qtk8r2.cloudfront.net/assets/derc-logo-white-200x200.png"
  },
  {
    "name": "decentral.games",
    "address": "0xef938b6da8576a896f6E0321ef80996F4890f9c4",
    "symbol": "DG",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://polygonscan.com/token/images/decentralgame_32.png?v=5"
  },
  {
    "name": "DOGAMI",
    "address": "0x2F3E306d9F02ee8e8850F9040404918d0b345207",
    "symbol": "DOGA",
    "decimals": 5,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/24510/standard/doga_logo.png?1696523689"
  },
  {
    "name": "DOSE",
    "address": "0x81382e9693dE2aFc33F69B70a6C12CA9B3a73F47",
    "symbol": "DOSE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/18847/small/dose.PNG?1633590548"
  },
  {
    "name": "Dragon QUICK(NEW)",
    "address": "0x958d208Cdf087843e9AD98d23823d32E17d723A1",
    "symbol": "dQUICK(NEW)",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.ibb.co/HGWTLM7/Quick-Icon-V2.png"
  },
  {
    "name": "Davos",
    "address": "0xEC38621e72D86775a89C7422746de1f52bbA5320",
    "symbol": "DUSD",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.ibb.co/RpQ65xN/imgonline-com-ua-Resize-s-Hpa1-XPD6-NKFN4-P.png"
  },
  {
    "name": "Ethernity CLOUD",
    "address": "0xc6920888988cAcEeA7ACCA0c96f2D65b05eE22Ba",
    "symbol": "ECLD",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://pbs.twimg.com/profile_images/1663893983578279941/ZStnNJ8m_400x400.png"
  },
  {
    "name": "Dogelon",
    "address": "0xE0339c80fFDE91F3e20494Df88d4206D86024cdF",
    "symbol": "ELON",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/14962/small/6GxcPRo3_400x400.jpg?1619157413"
  },
  {
    "name": "Quadrant Protocol",
    "address": "0xDAB625853c2B35D0a9C6bD8e5a097a664ef4CcFb",
    "symbol": "eQUAD",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/3625.png"
  },
  {
    "name": "Ether",
    "address": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    "symbol": "ETH",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  },
  {
    "name": "EURO3",
    "address": "0xA0e4c84693266a9d3BBef2f394B33712c76599Ab",
    "symbol": "EURO3",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://1453456140-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FGbmVIsiJFchsVf8GkrQQ%2Fuploads%2FJFuzcTfT6VY07JRY5cX7%2FEURO3%20Black%20Logo.svg?alt=media&token=c3cdfe3d-e847-4ff2-a2fa-d738a1386453"
  },
  {
    "name": "FireBotToken",
    "address": "0xD125443F38A69d776177c2B9c041f462936F8218",
    "symbol": "FBX",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://polygonscan.com/token/images/firebottoken_32.png"
  },
  {
    "name": "first choice coin",
    "address": "0xb6C3C00D730ACcA326dB40e418353f04f7444e2B",
    "symbol": "fcc",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/HjLOAFX.png"
  },
  {
    "name": "FireStarter",
    "address": "0x22e3f02f86Bc8eA0D73718A2AE8851854e62adc5",
    "symbol": "FLAME",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/17359/small/Logo_black_%282%29.png?1634095075"
  },
  {
    "name": "Aavegotchi FOMO",
    "address": "0x44A6e0BE76e1D9620A7F76588e4509fE4fa8E8C8",
    "symbol": "FOMO",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/24737/small/fomo.png?1648769659"
  },
  {
    "name": "FoodChain Global",
    "address": "0x6F06e6beD64cF4c4187c06Ee2a4732f6a171BC4e",
    "symbol": "FOOD",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/23755/small/food.png?1645347956"
  },
  {
    "name": "Aavegotchi FUD",
    "address": "0x403E967b044d4Be25170310157cB1A4Bf10bdD0f",
    "symbol": "FUD",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/24736/small/fud.png?1648769512"
  },
  {
    "name": "Fuse",
    "address": "0x6b021b3f68491974bE6D4009fEe61a4e3C708fD6",
    "symbol": "FUSE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/tl2Mxnt.png"
  },
  {
    "name": "Virtuswap Token",
    "address": "0x57999936fC9A9EC0751a8D146CcE11901Be8beD0",
    "symbol": "fxVRSW",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/mnJXy8O.jpeg"
  },
  {
    "name": "Affyn",
    "address": "0x3B56a704C01D650147ADE2b8cEE594066b3F9421",
    "symbol": "FYN",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/23275/small/fyn.png?1643526250"
  },
  {
    "name": "Global Coin Research",
    "address": "0xa69d14d6369E414a32a5C7E729B7afbAfd285965",
    "symbol": "GCR",
    "decimals": 4,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/UBjdemW.png"
  },
  {
    "name": "Giddy Token",
    "address": "0x67eB41A14C0fe5CD701FC9d5A3D6597A72F641a6",
    "symbol": "GDDY",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/24960/small/gddy.png?1649573862"
  },
  {
    "name": "Geodnet Token",
    "address": "0xAC0F66379A6d7801D7726d5a943356A172549Adb",
    "symbol": "GEOD",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/IaXOx7E.jpeg"
  },
  {
    "name": "Aavegotchi GHST Token",
    "address": "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7",
    "symbol": "GHST",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/7046.png"
  },
  {
    "name": "GIB",
    "address": "0x3EFcD659b7A45D14DDA8A102836ce4b765C42324",
    "symbol": "GIB",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/UilDOtk.png"
  },
  {
    "name": "GAX Liquidity Token Reward",
    "address": "0x3801C3B3B5c98F88a9c9005966AA96aa440B9Afc",
    "symbol": "GLTR",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.ibb.co/qMMwsK7/gltr-token.png"
  },
  {
    "name": "Gains Network",
    "address": "0xE5417Af564e4bFDA1c483642db72007871397896",
    "symbol": "GNS",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://gains.trade/images/logo.png"
  },
  {
    "name": "GONE",
    "address": "0x162539172b53E9a93b7d98Fb6c41682De558a320",
    "symbol": "GONE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/AeegcxP.png"
  },
  {
    "name": "Decentral Games ICE",
    "address": "0xc6C855AD634dCDAd23e64DA71Ba85b8C51E5aD7c",
    "symbol": "ICE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/18110/small/ice-poker.png?1630500966"
  },
  {
    "name": "ICHI",
    "address": "0x111111517e4929D3dcbdfa7CCe55d30d4B6BC4d6",
    "symbol": "ICHI",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/jO4wPoF.png"
  },
  {
    "name": "IQ Protocol Token",
    "address": "0x41084fDc569099d9E527ccf126e12d9C7c688ec3",
    "symbol": "IQT",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/HeEYuVS.jpeg"
  },
  {
    "name": "PlanetIX",
    "address": "0xE06Bd4F5aAc8D0aA337D13eC88dB6defC6eAEefE",
    "symbol": "IXT",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/20927/small/IXT_SYMBOL_SVG_RGB_BLACK.png?1637934555"
  },
  {
    "name": "Aavegotchi KEK",
    "address": "0x42E5E06EF5b90Fe15F853F59299Fc96259209c5C",
    "symbol": "KEK",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/24739/small/kek.png?1648769879"
  },
  {
    "name": "Forest Knight",
    "address": "0x4455eF8B4B4A007a93DaA12DE63a47EEAC700D9D",
    "symbol": "KNIGHT",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/18441/small/Coin_Forest_Knight_200x200.png?1632480031"
  },
  {
    "name": "Kommunitas",
    "address": "0xC004e2318722EA2b15499D6375905d75Ee5390B8",
    "symbol": "KOM",
    "decimals": 8,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/KTS2F7I.png"
  },
  {
    "name": "Lucidao",
    "address": "0xc2A45FE7d40bCAc8369371B08419DDAFd3131b4a",
    "symbol": "LCD",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/23693/small/lcd-icon-color-200px.png?1645450706"
  },
  {
    "name": "Lido DAO Token",
    "address": "0xC3C7d422809852031b44ab29EEC9F1EfF2A58756",
    "symbol": "LDO",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png?1609873644"
  },
  {
    "name": "Longinus",
    "address": "0xeB51D9A39AD5EEF215dC0Bf39a8821ff804A0F01",
    "symbol": "LGNS",
    "decimals": 9,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/egPMCht.png"
  },
  {
    "name": "ChainLink Token",
    "address": "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
    "symbol": "LINK",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png"
  },
  {
    "name": "MAI",
    "address": "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1",
    "symbol": "MAI",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/lH3Kpzh.png"
  },
  {
    "name": "Decentraland MANA",
    "address": "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4",
    "symbol": "MANA",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png"
  },
  {
    "name": "MASQ",
    "address": "0xEe9A352F6aAc4aF1A5B9f467F6a93E0ffBe9Dd35",
    "symbol": "MASQ",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/13699/small/MASQ_Logo_Blue_Solo_Transparent.png?1616661801"
  },
  {
    "name": "Liquid Staking Matic",
    "address": "0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6",
    "symbol": "MaticX",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.ibb.co/9bHbFsB/2022-04-26-11-53-13.jpg"
  },
  {
    "name": "MCHCoin",
    "address": "0xee7666aACAEFaa6efeeF62ea40176d3eB21953B9",
    "symbol": "MCHC",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/15399/small/MCHC.jpg?1620721307"
  },
  {
    "name": "MEE Governance Token",
    "address": "0xEB7eaB87837f4Dad1bb80856db9E4506Fc441f3D",
    "symbol": "MEE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/JnwWka0.png"
  },
  {
    "name": "Milk",
    "address": "0x1599fE55Cda767b1F631ee7D414b41F5d6dE393d",
    "symbol": "MILK",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.ibb.co/6FDxmPG/milk-coin.png"
  },
  {
    "name": "Ocean Token",
    "address": "0x282d8efCe846A88B159800bd4130ad77443Fa1A1",
    "symbol": "mOCEAN",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://oceanprotocol.com/static/4ad704a150d436a1f32d495413fc47cd/favicon-white.png"
  },
  {
    "name": "MoonEdge",
    "address": "0x7E4c577ca35913af564ee2a24d882a4946Ec492B",
    "symbol": "MOONED",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/17393/small/ME_logo_200_200.png?1627526275"
  },
  {
    "name": "SHEESHA POLYGON",
    "address": "0x88C949b4eB85a90071f2C0beF861BDDEe1a7479D",
    "symbol": "mSHEESHA",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://pbs.twimg.com/profile_images/1427241161417060359/uHXKH64w_400x400.jpg"
  },
  {
    "name": "Metaverse",
    "address": "0xA3c322Ad15218fBFAEd26bA7f616249f7705D945",
    "symbol": "MV",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/23143/small/geno.png?1643626421"
  },
  {
    "name": "Metavault Trade",
    "address": "0x2760E46d9BB43dafCbEcaad1F64b93207f9f0eD7",
    "symbol": "MVX",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://res.cloudinary.com/metavault/image/upload/v1668603846/brand-assets/brandLogos/MVX-COIN_Simple_jikqce.png"
  },
  {
    "name": "Mysterium",
    "address": "0x1379E8886A944d2D9d440b3d88DF536Aea08d9F3",
    "symbol": "MYST",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/757/small/mysterium.png?1547034503"
  },
  {
    "name": "Nakamoto.Games",
    "address": "0x311434160D7537be358930def317AfB606C0D737",
    "symbol": "NAKA",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://s3.coinmarketcap.com/static-gravity/image/b75b09929e244c6ab9806bd2ca0b20db.jpg"
  },
  {
    "name": "NEAR",
    "address": "0x72bd80445b0db58ebe3E8dB056529D4C5FAF6F2f",
    "symbol": "NEAR",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/10365/small/near_icon.png?1601359077"
  },
  {
    "name": "NFTBOOKS",
    "address": "0x6396252377F54ad33cFF9131708Da075b21d9B88",
    "symbol": "NFTBS",
    "decimals": 9,
    "chainId": 137,
    "logoURI": "https://pbs.twimg.com/profile_images/1743447563016269824/FoUy5NOH_400x400.jpg"
  },
  {
    "name": "Nitro",
    "address": "0x695FC8B80F344411F34bDbCb4E621aA69AdA384b",
    "symbol": "NITRO",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/21668/small/_X6vYBDM_400x400.jpg?1639705848"
  },
  {
    "name": "Nova DAO",
    "address": "0x119fd89E56e3845B520644dCEDf4A86Cd0B66aA6",
    "symbol": "NOVA",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://novadao.io/token/nova-128.png"
  },
  {
    "name": "NASDEX Token",
    "address": "0xE8d17b127BA8b9899a160D9a07b69bCa8E08bfc6",
    "symbol": "NSDX",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/18634/small/nadex.PNG?1632727863"
  },
  {
    "name": "Pleasure Coin",
    "address": "0x8f006D1e1D9dC6C98996F50a4c810F17a47fBF19",
    "symbol": "NSFW",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/15315/small/pleasurecoin-icon.png?1648724879"
  },
  {
    "name": "OM",
    "address": "0xC3Ec80343D2bae2F8E680FDADDe7C17E71E114ea",
    "symbol": "OM",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/lB49ZJ1.png"
  },
  {
    "name": "Orbs",
    "address": "0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff",
    "symbol": "ORBS",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/4630/small/Orbs.jpg?1547039896"
  },
  {
    "name": "pBORA",
    "address": "0x0EF39E52704Ad52E2882BBfA6781167E1b6c4510",
    "symbol": "pBORA",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/Qt6iIQ8.png"
  },
  {
    "name": "PolyDoge",
    "address": "0x8A953CfE442c5E8855cc6c61b1293FA648BAE472",
    "symbol": "PolyDoge",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://polydoge.com/doge-webpage_files/doge.png"
  },
  {
    "name": "QuickSwap(NEW)",
    "address": "0xB5C064F955D8e7F38fE0460C556a72987494eE17",
    "symbol": "QUICK(NEW)",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.ibb.co/HGWTLM7/Quick-Icon-V2.png"
  },
  {
    "name": "QuickSwap(OLD)",
    "address": "0x831753DD7087CaC61aB5644b308642cc1c33Dc13",
    "symbol": "QUICK(OLD)",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/sameepsi/quickswap-interface/master/public/favicon.jpeg"
  },
  {
    "name": "DappRadar",
    "address": "0xdCb72AE4d5dc6Ae274461d57E65dB8D50d0a33AD",
    "symbol": "RADAR",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://static.dappradar.com/grc-public-assets/uploads/radar-logo-256.png"
  },
  {
    "name": "REVV",
    "address": "0x70c006878a5A50Ed185ac4C87d837633923De296",
    "symbol": "REVV",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/12373/small/REVV_TOKEN_Refined_2021_%281%29.png?1627652390"
  },
  {
    "name": "EverRise",
    "address": "0xC17c30e98541188614dF99239cABD40280810cA3",
    "symbol": "RISE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://data.everrise.com/icons/smartchain/0xc17c30e98541188614df99239cabd40280810ca3.png"
  },
  {
    "name": "StaFi rMATIC",
    "address": "0x9f28e2455f9FFcFac9EBD6084853417362bc5dBb",
    "symbol": "rMATIC",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/200x200/24232.png"
  },
  {
    "name": "ROND Coin",
    "address": "0x204820B6e6FEae805e376D2C6837446186e57981",
    "symbol": "ROND",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/27601/small/rond.png?1664716228"
  },
  {
    "name": "Revolt 2 Earn",
    "address": "0x5d301750cc9719f00872E33Ee81f9C37aBa242F4",
    "symbol": "RVLT",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/19893.png"
  },
  {
    "name": "SAND",
    "address": "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683",
    "symbol": "SAND",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg?1597397942"
  },
  {
    "name": "Sunflower Land",
    "address": "0xD1f9c58e33933a993A3891F8acFe05a68E1afC05",
    "symbol": "SFL",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/25514/small/download.png?1652164203"
  },
  {
    "name": "Slingshot",
    "address": "0xfc9Fa9771145fbB98D15C8c2cc94B837a56D554C",
    "symbol": "SLING",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.slingshotdao.com/logos/Slingshot+DAO+icon+Alpha.png"
  },
  {
    "name": "SOL",
    "address": "0x7DfF46370e9eA5f0Bad3C4E29711aD50062EA7A4",
    "symbol": "SOL",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/4128/small/coinmarketcap-solana-200.png?1616489452"
  },
  {
    "name": "Saiyan PEPE",
    "address": "0xfcA466F2fA8E667a517C9C6cfa99Cf985be5d9B1",
    "symbol": "SPEPE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/gwmgrf0.png"
  },
  {
    "name": "Staked MATIC",
    "address": "0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4",
    "symbol": "stMATIC",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/24185/small/stMATIC.png?1646789287"
  },
  {
    "name": "SwissCheese Token",
    "address": "0x3ce1327867077B551ae9A6987bF10C9fd08edCE1",
    "symbol": "SWCH",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/0dF6221.png"
  },
  {
    "name": "TakiToken",
    "address": "0xe78aeE6CCb05471a69677fB74da80F5d251c042B",
    "symbol": "TAKI",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/swpJ2Wx.png"
  },
  {
    "name": "Polygon tBTC v2",
    "address": "0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b",
    "symbol": "tBTC",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/zLHm2qE.png"
  },
  {
    "name": "Telcoin",
    "address": "0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32",
    "symbol": "TEL",
    "decimals": 2,
    "chainId": 137,
    "logoURI": "https://etherscan.io/token/images/telcoin_28.png"
  },
  {
    "name": "teleBTC",
    "address": "0x3BF668Fe1ec79a84cA8481CEAD5dbb30d61cC685",
    "symbol": "TELEBTC",
    "decimals": 8,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/rjH0eOe.png"
  },
  {
    "name": "THX Network",
    "address": "0x2934b36ca9A4B31E633C5BE670C8C8b28b6aA015",
    "symbol": "THX",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/YTalkPn.png"
  },
  {
    "name": "TOWER",
    "address": "0x2bC07124D8dAc638E290f401046Ad584546BC47b",
    "symbol": "TOWER",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/14134/small/tower-circular-1000.png?1632195469"
  },
  {
    "name": "Ubuntu",
    "address": "0x78445485A8d5b3BE765e3027bc336e3c272a23c9",
    "symbol": "UBU",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://cloudfront.africarare.io/website/img/afri-token-icon.png"
  },
  {
    "name": "UnirisToken",
    "address": "0x3C720206bFaCB2d16fA3ac0ed87D2048Dbc401Fc",
    "symbol": "UCO",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/12330/small/e353ZVj.png?1599112996"
  },
  {
    "name": "Uniswap",
    "address": "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
    "symbol": "UNI",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/sameepsi/quickswap-interface/master/public/favicon1.png"
  },
  {
    "name": "USDC",
    "address": "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Bridged USDC",
    "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    "symbol": "USDC.e",
    "decimals": 6,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Tether USD",
    "address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "USDV",
    "address": "0x323665443CEf804A3b5206103304BD4872EA4253",
    "symbol": "USDV",
    "decimals": 6,
    "chainId": 137,
    "logoURI": "https://usdv.money/static/features/media-kit/TokenIcon_Black.png"
  },
  {
    "name": "Verse",
    "address": "0xc708D6F2153933DAA50B2D0758955Be0A93A8FEc",
    "symbol": "VERSE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/28424/large/verselogo.png?1696527421"
  },
  {
    "name": "Volt Inu",
    "address": "0x7f792db54B0e580Cdc755178443f0430Cf799aCa",
    "symbol": "VOLT",
    "decimals": 9,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/g7mzfRz.png"
  },
  {
    "name": "VOXEL Token",
    "address": "0xd0258a3fD00f38aa8090dfee343f10A9D4d30D3F",
    "symbol": "VOXEL",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/21260/small/voxies.png?1638789903"
  },
  {
    "name": "Wrapped BTC",
    "address": "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    "symbol": "WBTC",
    "decimals": 8,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
  },
  {
    "name": "Wefi",
    "address": "0xfFA188493C15DfAf2C206c97D8633377847b6a52",
    "symbol": "WEFI",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://wefi-web-resources.s3.ap-south-1.amazonaws.com/wefi-128.png"
  },
  {
    "name": "FABWELT",
    "address": "0x23E8B6A3f6891254988B84Da3738D2bfe5E703b9",
    "symbol": "WELT",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/20505/small/welt.PNG?1637143324"
  },
  {
    "name": "WiFi Map",
    "address": "0xE238Ecb42C424E877652AD82d8A939183A04C35f",
    "symbol": "WIFI",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/xmpexhx.png"
  },
  {
    "name": "Wrapped Matic",
    "address": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    "symbol": "WMATIC",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/uIExoAr.png"
  },
  {
    "name": "Wicrypt Network",
    "address": "0x82a0E6c02b91eC9f6ff943C0A933c03dBaa19689",
    "symbol": "WNT",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/200x200/11649.png"
  },
  {
    "name": "Wootrade Network",
    "address": "0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603",
    "symbol": "WOO",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/sameepsi/quickswap-default-token-list/master/assets/wootrade_w.svg"
  },
  {
    "name": "Wrapped liquid staked Ether 2.0",
    "address": "0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD",
    "symbol": "wstETH",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/13442/small/steth_logo.png?1608607546"
  },
  {
    "name": "Wormhole Taki",
    "address": "0xd872b7fFca41a67eDA85b04A9185c6b270006b58",
    "symbol": "wTAKI",
    "decimals": 9,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/2iBGbwS.png"
  },
  {
    "name": "Asmatch",
    "address": "0xCd5d6dE3fdBce1895F0Dac13A065673599ED6806",
    "symbol": "ASM",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://i.imgur.com/grd3qpW.png"
  },
  {
    "name": "Dai Stablecoin",
    "address": "0x1c466b9371f8aBA0D7c458bE10a62192Fcb8Aa71",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "GAI",
    "address": "0xcd91716ef98798A85E79048B78287B13ae6b99b2",
    "symbol": "GAI",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://raw.githubusercontent.com/Goku-Money/Media-kit/main/token_GAI.png"
  },
  {
    "name": "GOK",
    "address": "0x387660BC95682587efC12C543c987ABf0fB9778f",
    "symbol": "GOK",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://raw.githubusercontent.com/Goku-Money/Media-kit/main/token_GOK.png"
  },
  {
    "name": "Manta",
    "address": "0x95CeF13441Be50d20cA4558CC0a27B601aC544E5",
    "symbol": "MANTA",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://i.imgur.com/QMlGUKa.png"
  },
  {
    "name": "Matic",
    "address": "0x0f52A51287f9b3894d73Df05164D0Ee2533ccBB4",
    "symbol": "MATIC",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://i.imgur.com/uIExoAr.png"
  },
  {
    "name": "Liquid Staking Matic",
    "address": "0x01D27580C464d5B3B26F78Bee12E684901dbC02a",
    "symbol": "MaticX",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://i.ibb.co/9bHbFsB/2022-04-26-11-53-13.jpg"
  },
  {
    "name": "QuickSwap",
    "address": "0xE22E3D44Ea9Fb0A87Ea3F7a8f41D869C677f0020",
    "symbol": "QUICK",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://quickswap.exchange/static/media/0xb5c064f955d8e7f38fe0460c556a72987494ee17.536e9161.png"
  },
  {
    "name": "StakeStone Ether",
    "address": "0xEc901DA9c68E90798BbBb74c11406A32A70652C3",
    "symbol": "STONE",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://storage.googleapis.com/ks-setting-1d682dca/dee351e5-ff61-4a8f-994d-82f3078119661696785945490.png"
  },
  {
    "name": "USD Coin",
    "address": "0xb73603C5d87fA094B7314C74ACE2e64D165016fb",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 169,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Tether USD",
    "address": "0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 169,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Wrapped BTC",
    "address": "0x305E88d809c9DC03179554BFbf85Ac05Ce8F18d6",
    "symbol": "WBTC",
    "decimals": 8,
    "chainId": 169,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
  },
  {
    "name": "Wrapped Ether",
    "address": "0x0Dc808adcE2099A9F62AA87D9670745AbA741746",
    "symbol": "WETH",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  },
  {
    "name": "Wrapped liquid staked Ether 2.0",
    "address": "0x2FE3AD97a60EB7c79A976FC18Bb5fFD07Dd94BA5",
    "symbol": "wstETH",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://assets.coingecko.com/coins/images/18834/large/wstETH.png?1633565443"
  },
  {
    "name": "Wrapped Mountain Protocol",
    "address": "0xbdAd407F77f44F7Da6684B416b1951ECa461FB07",
    "symbol": "wUSDM",
    "decimals": 18,
    "chainId": 169,
    "logoURI": "https://assets.coingecko.com/coins/images/33785/standard/wUSDM_PNG_240px.png?1702981552"
  },
  {
    "name": "USDC",
    "address": "0xcD65196488b2e2fbcbc3E5d675B3108f4935e64a",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 195,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Wrapped OKB",
    "address": "0x87A851C652E5d772ba61ec320753c6349bb3C1E3",
    "symbol": "WOKB",
    "decimals": 18,
    "chainId": 195,
    "logoURI": "https://i.imgur.com/fnWzJB3.png"
  },
  {
    "name": "Dai Stablecoin",
    "address": "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 196,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "USDC",
    "address": "0x74b7F16337b8972027F6196A17a631aC6dE26d22",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 196,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Tether USD",
    "address": "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 196,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Wrapped BTC",
    "address": "0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1",
    "symbol": "WBTC",
    "decimals": 8,
    "chainId": 196,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
  },
  {
    "name": "Wrapped Ether",
    "address": "0x5A77f1443D16ee5761d310e38b62f77f726bC71c",
    "symbol": "WETH",
    "decimals": 18,
    "chainId": 196,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  },
  {
    "name": "Wrapped OKB",
    "address": "0xe538905cf8410324e03A5A23C1c177a474D59b2b",
    "symbol": "WOKB",
    "decimals": 18,
    "chainId": 196,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/3897.png"
  },
  {
    "name": "ETH",
    "address": "0x1249C65AfB11D179FFB3CE7D4eEDd1D9b98AD006",
    "symbol": "ETH",
    "decimals": 18,
    "chainId": 199,
    "logoURI": "https://bttcscan.com/token/images/ethereum_32.png"
  },
  {
    "name": "TRX",
    "address": "0xEdf53026aeA60f8F75FcA25f8830b7e2d6200662",
    "symbol": "TRX",
    "decimals": 6,
    "chainId": 199,
    "logoURI": "https://bttcscan.com/token/images/tronnetwork_32.png"
  },
  {
    "name": "USD Coin_Ethereum",
    "address": "0xAE17940943BA9440540940DB0F1877f101D39e8b",
    "symbol": "USDC.e",
    "decimals": 6,
    "chainId": 199,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "USD Coin_TRON",
    "address": "0x935faA2FCec6Ab81265B301a30467Bbc804b43d3",
    "symbol": "USDC.t",
    "decimals": 6,
    "chainId": 199,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Tether USD_Ethereum",
    "address": "0xE887512ab8BC60BcC9224e1c3b5Be68E26048B8B",
    "symbol": "USDT.e",
    "decimals": 6,
    "chainId": 199,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Tether USD_TRON",
    "address": "0xdB28719F7f938507dBfe4f0eAe55668903D34a15",
    "symbol": "USDT.t",
    "decimals": 6,
    "chainId": 199,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Wrapped BTT",
    "address": "0x23181F21DEa5936e24163FFABa4Ea3B316B57f3C",
    "symbol": "WBTT",
    "decimals": 18,
    "chainId": 199,
    "logoURI": "https://assets.coingecko.com/coins/images/24933/standard/TKfjV9RNKJJCqPvBtK8L7Knykh7DNWvnYt.png?1696524089"
  },
  {
    "name": "Aave",
    "address": "0x68791CFE079814c46e0E25C19Bcc5BFC71A744f7",
    "symbol": "AAVE",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://cryptologos.cc/logos/aave-aave-logo.png"
  },
  {
    "name": "Curve DAO Token",
    "address": "0x3d5320821BfCa19fb0B5428F2c79d63bd5246f89",
    "symbol": "CRV",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/7GDZAKECXJBL3NVA2GUEWFZE2E.png"
  },
  {
    "name": "Legacy Dai Stablecoin",
    "address": "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "Dai Stablecoin",
    "address": "0x744C5860ba161b5316F7E80D9Ec415e2727e5bD5",
    "symbol": "DAI.E",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "Davos.xyz USD",
    "address": "0x819d1Daa794c1c46B841981b61cC978d95A17b8e",
    "symbol": "DUSD",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://i.ibb.co/RpQ65xN/imgonline-com-ua-Resize-s-Hpa1-XPD6-NKFN4-P.png"
  },
  {
    "name": "Frax",
    "address": "0xFf8544feD5379D9ffa8D47a74cE6b91e632AC44D",
    "symbol": "FRAX",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://assets.coingecko.com/coins/images/13422/small/FRAX_icon.png?1679886922"
  },
  {
    "name": "Frax Ether",
    "address": "0xCf7eceE185f19e2E970a301eE37F93536ed66179",
    "symbol": "frxETH",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://assets.coingecko.com/coins/images/28284/small/frxETH_icon.png?1679886981"
  },
  {
    "name": "Frax Share",
    "address": "0x6b856a14CeA1d7dCfaF80fA6936c0b75972cCacE",
    "symbol": "FXS",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://assets.coingecko.com/coins/images/13423/small/Frax_Shares_icon.png?1679886947"
  },
  {
    "name": "Legacy USD Coin",
    "address": "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
    "symbol": "Legacy USDC",
    "decimals": 6,
    "chainId": 1101,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "ChainLink",
    "address": "0x4B16e4752711A7ABEc32799C976F3CeFc0111f2B",
    "symbol": "LINK",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/200x200/1975.png"
  },
  {
    "name": "Mai Stablecoin",
    "address": "0x615B25500403Eb688Be49221b303084D9Cf0E5B4",
    "symbol": "MAI",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://i.imgur.com/lH3Kpzh.png"
  },
  {
    "name": "Matic",
    "address": "0xa2036f0538221a77A3937F1379699f44945018d0",
    "symbol": "MATIC",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://i.imgur.com/uIExoAr.png"
  },
  {
    "name": "QuickSwap",
    "address": "0x68286607A1d43602d880D349187c3c48c0fD05E6",
    "symbol": "QUICK",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://i.ibb.co/HGWTLM7/Quick-Icon-V2.png"
  },
  {
    "name": "Staked MATIC",
    "address": "0x83b874c1e09D316059d929da402dcB1A98e92082",
    "symbol": "stMATIC",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://assets.coingecko.com/coins/images/24185/small/stMATIC.png?1646789287"
  },
  {
    "name": "USD Coin",
    "address": "0x37eAA0eF3549a5Bb7D431be78a3D99BD360d19e5",
    "symbol": "USDC.E",
    "decimals": 6,
    "chainId": 1101,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Tether USD",
    "address": "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 1101,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Wrapped BTC",
    "address": "0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1",
    "symbol": "WBTC",
    "decimals": 8,
    "chainId": 1101,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
  },
  {
    "name": "Wrapped eETH",
    "address": "0xcD68DFf4415358c35a28f96Fd5bF7083B22De1D6",
    "symbol": "weETH",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://etherfi-membership-metadata.s3.ap-southeast-1.amazonaws.com/weETH.png"
  },
  {
    "name": "Wrapped Ether",
    "address": "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9",
    "symbol": "WETH",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  },
  {
    "name": "Wrapped liquid staked Ether 2.0",
    "address": "0xbf6De60Ccd9D22a5820A658fbE9fc87975EA204f",
    "symbol": "wstETH",
    "decimals": 18,
    "chainId": 1101,
    "logoURI": "https://assets.coingecko.com/coins/images/18834/large/wstETH.png?1633565443"
  },
  {
    "name": "Tether USD",
    "address": "0x7379a261bC347BDD445484A91648Abf4A2BDEe5E",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 1442,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Dogechain Token",
    "address": "0x7B4328c127B85369D9f82ca0503B000D09CF9180",
    "symbol": "DC",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://i.imgur.com/llRjxRL.png"
  },
  {
    "name": "DCGOD",
    "address": "0x91cd28e57b92e34124C4540eE376C581D188B53E",
    "symbol": "DCGOD",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://i.imgur.com/WH22eKZ.png"
  },
  {
    "name": "Doge Dragon",
    "address": "0x582DaEF1F36D6009f64b74519cFD612a8467Be18",
    "symbol": "DD",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://i.imgur.com/qCzBBC4.png"
  },
  {
    "name": "Dogira",
    "address": "0xF480f38C366dAaC4305dC484b2Ad7a496FF00CeA",
    "symbol": "DOGIRA",
    "decimals": 9,
    "chainId": 2000,
    "logoURI": "https://i.imgur.com/X753Wko.jpg"
  },
  {
    "name": "DogeTools",
    "address": "0xB9fcAa7590916578087842e017078D7797Fa18D0",
    "symbol": "DTools",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://i.ibb.co/yFTgzps/photo-2022-08-13-01-52-27-1.jpg"
  },
  {
    "name": "Ether",
    "address": "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
    "symbol": "ETH",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  },
  {
    "name": "Matic",
    "address": "0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98",
    "symbol": "MATIC",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://i.imgur.com/uIExoAr.png"
  },
  {
    "name": "QuickSwap",
    "address": "0xb12c13e66AdE1F72f71834f2FC5082Db8C091358",
    "symbol": "QUICK",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://i.ibb.co/HGWTLM7/Quick-Icon-V2.png"
  },
  {
    "name": "TDH",
    "address": "0x35EA0c670eD9f54Ac07B648aCF0F2EB173A6012D",
    "symbol": "TDH",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://i.imgur.com/CLrv6GK.png"
  },
  {
    "name": "USDoge",
    "address": "0xD95086Fe465a2DC59F989B927472a901E2e05ff2",
    "symbol": "USDO",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "http://novadao.io/usdo/usdo-64.png"
  },
  {
    "name": "Wrapped Bitcoin",
    "address": "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f",
    "symbol": "WBTC",
    "decimals": 6,
    "chainId": 2000,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
  },
  {
    "name": "Wrapped WDOGE",
    "address": "0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101",
    "symbol": "WWDOGE",
    "decimals": 18,
    "chainId": 2000,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png"
  },
  {
    "name": "Astar",
    "address": "0xdf41220C7e322bFEF933D85D01821ad277f90172",
    "symbol": "ASTR",
    "decimals": 18,
    "chainId": 3776,
    "logoURI": "https://i.imgur.com/JzAwnk1.png"
  },
  {
    "name": "Dai Stablecoin",
    "address": "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 3776,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "Mother of Memes",
    "address": "0xA84DBE4602cBAcfe8Cd858Fe910b88ba0e8b8B18",
    "symbol": "HAHA",
    "decimals": 18,
    "chainId": 3776,
    "logoURI": "https://raw.githubusercontent.com/niklabh/sample-nft/main/HAHA.jpg"
  },
  {
    "name": "Matic",
    "address": "0xa2036f0538221a77A3937F1379699f44945018d0",
    "symbol": "MATIC",
    "decimals": 18,
    "chainId": 3776,
    "logoURI": "https://i.imgur.com/uIExoAr.png"
  },
  {
    "name": "StakeStone Ether",
    "address": "0x80137510979822322193FC997d400D5A6C747bf7",
    "symbol": "STONE",
    "decimals": 18,
    "chainId": 3776,
    "logoURI": "https://storage.googleapis.com/ks-setting-1d682dca/dee351e5-ff61-4a8f-994d-82f3078119661696785945490.png"
  },
  {
    "name": "USD Coin",
    "address": "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 3776,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Tether USD",
    "address": "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 3776,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Bifrost Voucher ASTR",
    "address": "0x7746ef546d562b443AE4B4145541a3b1a3D75717",
    "symbol": "vASTR",
    "decimals": 18,
    "chainId": 3776,
    "logoURI": "https://cdn.liebi.com/vtoken/vASTR.png"
  },
  {
    "name": "Wrapped BTC",
    "address": "0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1",
    "symbol": "WBTC",
    "decimals": 8,
    "chainId": 3776,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
  },
  {
    "name": "Wrapped Ether",
    "address": "0xE9CC37904875B459Fa5D0FE37680d36F1ED55e38",
    "symbol": "WETH",
    "decimals": 18,
    "chainId": 3776,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  },
  {
    "name": "Wrapped liquid staked Ether 2.0",
    "address": "0x5D8cfF95D7A57c0BF50B30b43c7CC0D52825D4a9",
    "symbol": "wstETH",
    "decimals": 18,
    "chainId": 3776,
    "logoURI": "https://assets.coingecko.com/coins/images/18834/large/wstETH.png?1633565443"
  },
  {
    "name": "Guild of Guardians",
    "address": "0xb00ed913aAFf8280C17BfF33CcE82fE6D79e85e8",
    "symbol": "GOG",
    "decimals": 18,
    "chainId": 13371,
    "logoURI": "https://i.imgur.com/aoXxQmo.jpeg"
  },
  {
    "name": "USD Coin",
    "address": "0x6de8aCC0D406837030CE4dd28e7c08C5a96a30d2",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 13371,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Tether USD",
    "address": "0x68bcc7F1190AF20e7b572BCfb431c3Ac10A936Ab",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 13371,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Wrapped BTC",
    "address": "0x235F9A2Dc29E51cE7D103bcC5Dfb4F5c9c3371De",
    "symbol": "WBTC",
    "decimals": 8,
    "chainId": 13371,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
  },
  {
    "name": "Wrapped Ether",
    "address": "0x52A6c53869Ce09a731CD772f245b97A4401d3348",
    "symbol": "WETH",
    "decimals": 18,
    "chainId": 13371,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  },
  {
    "name": "Wrapped IMX",
    "address": "0x3A0C2Ba54D6CBd3121F01b96dFd20e99D1696C9D",
    "symbol": "WIMX",
    "decimals": 18,
    "chainId": 13371,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/10603.png"
  },
  {
    "name": "USDC",
    "address": "0xB9aFAa5c407DdebA5098193F31CE23D21cFD9657",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 13473,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Wrapped IMX",
    "address": "0x1CcCa691501174B4A623CeDA58cC8f1a76dc3439",
    "symbol": "WIMX",
    "decimals": 18,
    "chainId": 13473,
    "logoURI": "https://s2.coinmarketcap.com/static/img/coins/64x64/10603.png"
  },
  {
    "name": "Dai Stablecoin",
    "address": "0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1",
    "symbol": "DAI",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    "name": "Ether",
    "address": "0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323",
    "symbol": "ETH",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  },
  {
    "name": "SAND",
    "address": "0xE03489D4E90b22c59c5e23d45DFd59Fc0dB8a025",
    "symbol": "SAND",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg?1597397942"
  },
  {
    "name": "Tether USD",
    "address": "0x3813e82e6f7098b9583FC0F33a962D02018B6803",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Wrapped Matic",
    "address": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    "symbol": "WMATIC",
    "decimals": 18,
    "chainId": 80001,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png"
  },
  {
    "name": "Shibuya Token",
    "address": "0xEaFAF3EDA029A62bCbE8a0C9a4549ef0fEd5a400",
    "symbol": "LSBY",
    "decimals": 18,
    "chainId": 1261120,
    "logoURI": "https://github.com/AstarNetwork/brand-assets/blob/main/Astar%20Identity/logo/symbol/Astar_ring.png"
  },
  {
    "name": "USD Coin",
    "address": "0xE5a02c2Be08406c3fB36F9Aa29bF7C7A09CAe50B",
    "symbol": "USDC",
    "decimals": 6,
    "chainId": 1261120,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    "name": "Wrapped Ether",
    "address": "0xd2480162Aa7F02Ead7BF4C127465446150D58452",
    "symbol": "WETH",
    "decimals": 18,
    "chainId": 1261120,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
  }
]
// initialize the module with options
const walletConnect = walletConnectModule(wcInitOptions)

// can also initialize with no options...

// initialize Onboard
init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: "0x89",
      token: "MATIC",
      label: "Polygon",
      rpcUrl: "https://polygon-rpc.com/"
    }
  ]
})

function Swap() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any")
  }

  const connectedWallets = useWallets()

  const [chainId, setChainId] = useState(56)

  useEffect(() => {
    setChain({ chainId: 137 })
    ethersProvider?.getNetwork().then(res => setChainId(res.chainId))
  }, [ethersProvider])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets, wallet])

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets") || "[]"
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        const walletConnected = await connect({
          autoSelect: previouslyConnectedWallets[0]
        })
      }
      setWalletFromLocalStorage()
    }
  }, [connect])

  const lightTheme = {
    text: "#222222",
    subText: "#5E5E5E",
    primary: "#FFFFFF",
    dialog: "#FBFBFB",
    secondary: "#F5F5F5",
    interactive: "#E2E2E2",
    stroke: "#505050",
    accent: "#28E0B9",
    success: "#189470",
    warning: "#FF9901",
    error: "#FF537B",
    fontFamily: "Work Sans",
    borderRadius: "16px",
    buttonRadius: "999px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)"
  }

  const darkTheme = {
    text: "#FFFFFF",
    subText: "#A9A9A9",
    primary: "#1C1C1C",
    dialog: "#313131",
    secondary: "#0F0F0F",
    interactive: "#292929",
    stroke: "#505050",
    accent: "#28E0B9",
    success: "#189470",
    warning: "#FF9901",
    error: "#FF537B",
    fontFamily: "Work Sans",
    borderRadius: "16px",
    buttonRadius: "999px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)"
  }

  const [theme, setTheme] = useState(darkTheme)
  const [enableRoute, setEnableRoute] = useState(true)
  const [enableDexes, setEnableDexes] = useState("")
const MY_TOKEN_LIST = [
      {
      "name": "Matic",
      "address": "0x0f52A51287f9b3894d73Df05164D0Ee2533ccBB4",
      "symbol": "MATIC",
      "decimals": 18,
      "chainId": 169,
      "logoURI": "https://i.imgur.com/uIExoAr.png"
    },
      {
      "name": "Tether USD",
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "symbol": "USDT",
      "decimals": 18,
      "chainId": 56,
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
    },
    {
      "name": "VNDES",
      "address": "0xD6ba705DA1713F66925C46EbB9f6A9548c9E4213",
      "symbol": "VDE",
      "decimals": 18,
      "chainId": 137,
      "logoURI": "https://raw.githubusercontent.com/VndesTokenVDE/vExchange/master/public/vndes.png"
    },
  ]


  const [feeSetting, setFeeSetting] = useState({
    feeAmount: 0,
    feeReceiver: "",
    chargeFeeBy: "currency_in",
    isInBps: true
  })

  const [showRate, setShowRate] = useState(true)
  const [showDetail, setShowDetail] = useState(true)

  return (
  
   <div className="App">
   
      
     <Widget
       client="bbcatcoin"
       theme={theme}
       tokenList={TOKEN_LIST}
       provider={ethersProvider}
       defaultTokenOut='0xD6ba705DA1713F66925C46EbB9f6A9548c9E4213'
       feeSetting={
         feeSetting.feeAmount && feeSetting.feeReceiver
           ? feeSetting
           : undefined
       }
       enableRoute={enableRoute}
       enableDexes={enableDexes}
       showDetail={showDetail}
       showRate={showRate}
       title={<div><button
         class="py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[10px]"
         variant="outlined"
         onClick={() => (wallet ? disconnect(wallet) : connect())} >{!wallet ? 'Connect Wallet' : 'Disconnect'}</button>
           </div>}
     />
   </div>
  )
}

export default Swap
