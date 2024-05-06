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
    "name": "Aave",
    "address": "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
    "symbol": "AAVE",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://etherscan.io/token/images/aave_32.png"
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
    "name": "Metaverse",
    "address": "0xA3c322Ad15218fBFAEd26bA7f616249f7705D945",
    "symbol": "MV",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://assets.coingecko.com/coins/images/23143/small/geno.png?1643626421"
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
    "name": "QuickSwap(NEW)",
    "address": "0xB5C064F955D8e7F38fE0460C556a72987494eE17",
    "symbol": "QUICK(NEW)",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.ibb.co/HGWTLM7/Quick-Icon-V2.png"
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
    "name": "Tether USD",
    "address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    "symbol": "USDT",
    "decimals": 6,
    "chainId": 137,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    "name": "Wrapped Matic",
    "address": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    "symbol": "WMATIC",
    "decimals": 18,
    "chainId": 137,
    "logoURI": "https://i.imgur.com/uIExoAr.png"
  },{
            "chainId": 137,
            "address": "0x0000000000000000000000000000000000001010",
            "name": "MATIC",
            "symbol": "MATIC",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/4713/thumb/polygon.png?1698233745"
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
