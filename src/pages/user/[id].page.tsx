import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import Offering from "./Offering"
import Collected from "./Collected"
import Favorite from "./Favorite"
import OnSale from "./OnSale"
import Activities from "./Activities"
import { Divide } from "react-feather"
import { useRouter } from "next/router"

const MyNft = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="my-nft">
      {id == "my-nft" ? (
        <div className="account">
          <img className="left" src="/common/my-nft/account.png" alt="" />
          <div className="right">
            <div className="top">
              <h2>DONG CUONG</h2>
              <img src="/common/my-nft/account-rank.png" alt="" />
            </div>
            <div
              className="bottom"
              onClick={() => {
                navigator.clipboard.writeText("0X123466...X452")
              }}
            >
              <span>0X123466...X452</span>
              <img src="/common/my-nft/copy.png" alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className="account-other">
          <div className="info">
            <img className="left" src="/common/my-nft/account.png" alt="" />
            <div className="right">
              <div className="name-id">
                <h2>DONG CUONG</h2>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText("0X123466...X452")
                  }}
                >
                  <span>0X123466...X452</span>
                  <img src="/common/my-nft/copy.png" alt="" />
                </div>
              </div>
              <div className="social">
                <img
                  src="/common/my-nft/account-rank.png"
                  alt=""
                  className="vip"
                />
                <div className="list">
                  <img src="/icons/tele1.png" alt="" />
                  <img src="/icons/face.png" alt="" />
                  <img src="/icons/inta.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <button>contact</button>
        </div>
      )}

      <div className="container">
        <Tabs>
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
}
export default MyNft
