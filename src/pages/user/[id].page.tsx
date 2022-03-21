import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react"
import Offering from "./Offering"
import Collected from "./Collected"
import Favorite from "./Favorite"
import OnSale from "./OnSale"
import Activities from "./Activities"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { useStore } from "src/hooks/useStore"
import { formatAddress } from "./FormatAddress"
import { getProfileOther } from "src/services/nft"
import { useEffect, useState } from "react"

const MyNft = observer(() => {
  const [data, setData] = useState({
    name: "",
    avatar: "",
    ranking: "",
    social_network: {
      youtube: "",
      facebook: "",
    },
  })
  const router = useRouter()
  const toast = useToast()
  const WalletController = useStore("WalletController")
  const { address } = WalletController
  const { id } = router.query
  const myNft = id == address ? true : false
  const { tab } = router.query
  const handleChangeTab = (value) => {
    router.query.tab = value
    router.push(router)
  }
  const getData = async () => {
    if (id) {
      const res = await getProfileOther(id)
      setData({ ...res[0] })
    }
  }
  useEffect(() => {
    getData()
  }, [id])
  return (
    <div className="my-nft">
      {myNft ? (
        <div className="account">
          <div className="left-border">
            <img className="left" src={data.avatar?data.avatar:"/common/user.png"} alt="" />
          </div>
          <div className="right">
            <div className="top">
              <h2>{data.name}</h2>
              <img src={data.ranking} alt="" />
            </div>
            <div className="border">
              <div
                className="bottom"
                onClick={() => {
                  navigator.clipboard.writeText(String(id))
                  toast({
                    description: "User address has been copied to clipboard",
                    status: "success",
                    duration: 3000,
                    isClosable: false,
                  })
                }}
              >
                <span>
                  {String(id).slice(0, 8) +
                    "..." +
                    String(
                      String(id).slice(String(id).length - 4, String(id).length)
                    )}
                </span>
                <img src="/common/my-nft/copy.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="account-other">
          <div className="info">
            <div className="left-border">
              <img className="left" src={data.avatar?data.avatar:"/common/user.png"} alt="" />
            </div>
            <div className="right">
              <div className="name-id">
                <h2>{data.name}</h2>
                <div className="border">
                  <div
                    className="bottom"
                    onClick={() => {
                      navigator.clipboard.writeText(String(id))
                      toast({
                        description:
                          "User address has been copied to clipboard",
                        status: "success",
                        duration: 3000,
                        isClosable: false,
                      })
                    }}
                  >
                    <span>{formatAddress(id, 8, 4)}</span>
                    <img src="/common/my-nft/copy.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="social">
                <img src={data.ranking} alt="" className="vip" />
                <div className="list">
                  <img src="/icons/tele1.png" alt="" />
                  <a
                    href={data?.social_network?.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/icons/face.png" alt="" />
                  </a>
                  <img src="/icons/inta.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <button>contact</button>
        </div>
      )}

      <div className="container">
        <Tabs index={+(tab ?? 0)} onChange={handleChangeTab}>
          <TabList>
            <Tab>Offering</Tab>
            <Tab>On sale</Tab>
            <Tab>Collected</Tab>
            <Tab>Favorite</Tab>
            <Tab>Activities</Tab>
          </TabList>
          <h3>My NFT</h3>
          <TabPanels>
            <TabPanel>
              <Offering />
            </TabPanel>
            <TabPanel>
              <OnSale />
            </TabPanel>
            <TabPanel>
              <Collected />
            </TabPanel>
            <TabPanel>
              <Favorite />
            </TabPanel>
            <TabPanel>
              <Activities />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
})
export default MyNft
