import { useState, useEffect } from "react"
import { Widget } from "@kyberswap/widgets"
import { init, useWallets, useConnectWallet,useSetChain } from "@web3-onboard/react"
import injectedModule from "@web3-onboard/injected-wallets"
import { ethers } from "ethers"
import walletConnectModule from "@web3-onboard/walletconnect"
import { Button } from "./Button";
const injected = injectedModule()
const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'aa967df559416cc835486e6bc0e6eaad',
  requiredChains: [137],
  dappUrl: 'https://www.catcoin.today'
}
const TOKEN_LIST = 'https://raw.githubusercontent.com/VndesTokenVDE/vExchange/master/tokenlist.json'
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
       title={<div><Button
         variant="outlined"  onClick={() => (wallet ? disconnect(wallet) : connect())} className="button" text="{!wallet ? "Connect Wallet" : "Disconnect"}">
            </Button></div>}
     />
   </div>
  )
}

export default Swap
