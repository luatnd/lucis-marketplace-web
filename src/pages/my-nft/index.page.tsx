import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { Search } from "src/components/Nft-Ranking/Search"
import { Pagination } from "src/components/Nft-Ranking/Pagination"
import { useState } from "react"
const MyNft = () => {
  const offeringArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]
  return (
    <div className="my-nft">
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
      <div className="container">
        <Tabs>
          <TabList>
            <Tab>Offering</Tab>
            <Tab>On sale</Tab>
            <Tab>Collected</Tab>
            <Tab>Favorite</Tab>
            <Tab>Activities</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="offering">
                <h3>My NFT</h3>
                <div className="search">
                  <p>10 items</p>
                  <Search />
                </div>
                <div className="content">
                  {offeringArray.map((c) => (
                    <div key={c} className="item">
                      <img
                        className="top"
                        src={"/common/my-nft/item" + c + ".png"}
                        alt=""
                      />
                      <div className="name">
                        <div>
                          <span>Animverse</span>
                          <img src="/common/my-nft/check.png" alt="" />
                        </div>
                        <img
                          src="/common/my-nft/bua.png"
                          alt=""
                          className="right"
                        />
                      </div>
                      <h6>CUONG DOLLA NFT</h6>
                      <p>
                        END in <span>10:00:00</span>
                      </p>
                      <div className="bottom">
                        <img src="/common/my-nft/bnb.png" alt="" />
                        <span>0,99 BNB</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination />
              </div>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>four!</p>
            </TabPanel>
            <TabPanel>
              <p>five!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
export default MyNft
