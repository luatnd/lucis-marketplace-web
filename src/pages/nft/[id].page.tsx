import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { ExternalLink, Eye, Heart } from "react-feather"

import { useStore } from "src/hooks/useStore"
import Activities from "./Activities"
import Auction from "./Auction"
import ReceivedOffer from "./ReceivedOffer"

const DetailsPage = () => {
  const NftStore = useStore("NftStore")
  const [contentModal, setContentModal] = useState(null)
  const [contentAlert, setContentAlert] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const alert = useDisclosure()

  const btnModal = React.useRef()
  const btnAlert = React.useRef()

  // useEffect(() => {
  //   setNft(NftStore.nft)
  // }, [])

  const detailsStats = [
    {
      key: "Staking Score",
      value: "Staking Score",
    },
    {
      key: "Type",
      value: "Type",
    },
    {
      key: "Horn",
      value: "Horn",
    },
    {
      key: "Color",
      value: "Color",
    },
    {
      key: "Background",
      value: "Background",
    },
    {
      key: "Opening Network",
      value: "Opening Network",
    },
    {
      key: "Specical",
      value: "Specical",
    },
    {
      key: "Glitter",
      value: "Glitter",
    },
    {
      key: "Birthday",
      value: "Birthday",
    },
    {
      key: "Booster",
      value: "Booster",
    },
  ]



  const handleOpenModal = (typeModal) => {
    let data = null
    switch (typeModal) {
      case 'auction':
        data = {
          header: 'Auction',
          footer: 'Apply',
          body: <>
            <Text className="price">Price</Text>
            <InputGroup>
              <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
            <Text className="desc">The minium auc price is 0.1785 BNB</Text>
          </>
        }
        break;
      case 'buy':
        data = {
          header: 'Buy',
          footer: 'Apply',
          body: <div className="form-buy">
            <p className="label-price">Price:</p>
            <Text className="price">
              {NftStore?.nft?.price}
              <p>($8.8)</p>
            </Text>
          </div>
        }
        break;
      case 'offer':
        data = {
          header: 'Offer',
          footer: 'Apply',
          body: <>
            <Text className="price">Price</Text>
            <InputGroup>
              <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
          </>
        }
        break;

      case 'fixedPrice':
        data = {
          size: 'lg',
          header: 'Fixed Price',
          footer: 'Approve',
          body: <div className="fixed-price">
          <div className="img">
            <img src="/icons/owner.png" alt="" />
            <p className="right">
              <p className="animverse">
                  Animverse
                  <img src="/common/my-nft/check.png" alt="" />
              </p>
                CUONG DOLLA NFT
            </p>
          </div>
            <Text className="price">Price</Text>
            <InputGroup>
              <Input type="tel" placeholder="0.0" colorScheme="#D7D7D7" />
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
            <p className="convert">0 BNB = $0</p>
            <p className="price-floor">The floor price is 0.0055 BNB. The item will be on sale until
              you cancelled.</p>
            <p className="fees">FEES</p>
            <p className="desc-fees">Listing is FREE! When the sale succeeds, the following fees will
              occour.</p>
            <div className="card-fees">
              <p>
                <span>To Lucis</span>
                <span>2.5%</span>
              </p>
              <p>
                <span>To Polychain Monsters</span>
                <span>2.5%</span>
              </p>
            </div>
          </div>
        }
        break;

      case 'ownerAuction':
        data = {
          size: 'lg',
          header: 'Auction',
          footer: 'Approve',
          body: <div className="fixed-price">
            <div className="img">
              <img src="/icons/owner.png" alt="" />
              <p className="right">
                <p className="animverse">
                  Animverse
                  <img src="/common/my-nft/check.png" alt="" />
                </p>
                CUONG DOLLA NFT
              </p>
            </div>
            <Text className="price">Price</Text>
            <InputGroup>
              <Input type="tel" placeholder="0.0" colorScheme="#D7D7D7" />
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
            <p className="convert">0 BNB = $0</p>
            <p className="price-floor">The floor price is 0.0055 BNB. The item will be on sale until
              you cancelled.</p>
            <Text className="price">Price</Text>
            <div className="card-price">
              <Button>1 Day</Button>
              <Button>3 Days</Button>
              <Button>5 Days</Button>
            </div>
            <p className="fees">FEES</p>
            <p className="desc-fees">Listing is FREE! When the sale succeeds, the following fees will
              occour.</p>
            <div className="card-fees">
              <p>
                <span>To Lucis</span>
                <span>2.5%</span>
              </p>
              <p>
                <span>To Polychain Monsters</span>
                <span>2.5%</span>
              </p>
            </div>
          </div>
        }
        break;

      case 'ownerSend':
        data = {
          size: 'lg',
          header: 'Send',
          footer: 'Approve',
          body: <div className="fixed-price">
            <div className="img">
              <img src="/icons/owner.png" alt="" />
              <p className="right">
                <p className="animverse">
                  Animverse
                  <img src="/common/my-nft/check.png" alt="" />
                </p>
                CUONG DOLLA NFT
              </p>
            </div>
            <Text className="price">Target wallet address</Text>
            <InputGroup>
              <Input type="tel" placeholder="0xadabc..." colorScheme="#D7D7D7" />
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
            <p className="convert">You won’t be able to take back the NFT after the transaction.</p>
          </div>
        }
        break;
        
      case 'changePrice':
        data = {
          size: 'lg',
          header: 'Send',
          footer: 'OK',
          body: <div className="fixed-price">
            <Text className="price">From</Text>
            <InputGroup>
              <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
            <Text className="price" mt={5}>To</Text>
            <InputGroup>
              <Input type="tel" placeholder="Price" colorScheme="#D7D7D7" />
              <InputRightAddon>BNB</InputRightAddon>
            </InputGroup>
          </div>
        }
        break;
      default:
        break;
    }
    setContentModal(data)
    onOpen()
  }

  const handleApply = () => {
    onClose()
    if (Math.random() < 0.5){
      setContentAlert({
        body: <div className="alert-content">
          <img src="/icons/congratulation.png" alt="" />
          <p className="title">Congratulation!</p>
          <p className="desc">You have successfully offer!</p>
        </div>
      })
    } else {
      setContentAlert({
        body: <div className="alert-content">
          <img src="/icons/sorry.png" alt="" />
          <p className="title">Error!</p>
          <p className="desc">Opp! something went wrong.</p>
        </div>
      })
    }
    alert.onOpen()
  }

  const _renderDetails = () => {
    let renderAction = null
    const nft = NftStore?.nft
    
    if (nft?.owner) { 
      if (!nft?.hidePrice && !nft?.auction) {
        renderAction = (
          <>
            <div className="buy-tray">
              <div className="buy-tray-body">
                <div className="price">
                  <span>Price</span>
                  <span>{nft?.price} BNB</span>
                  <span>($8.8)</span>
                </div>
                <div className="buy-nav flex-row">
                  <Button ref={btnModal} onClick={() => handleOpenModal('changePrice')}>Change price</Button>
                  <Button className="cancel" ref={btnModal} onClick={() => handleOpenModal('cancel')}>Cancel</Button>
                </div>
              </div>
            </div>
          </>
        ) 
      }else if(nft.hidePrice) {
        renderAction = (
            <div className="buy-tray-owner">
              <Button ref={btnModal} onClick={() => handleOpenModal('fixedPrice')}>Fixed Price</Button>
              <Button ref={btnModal} onClick={() => handleOpenModal('ownerAuction')}>Auction</Button>
              <Button ref={btnModal} onClick={() => handleOpenModal('ownerSend')}>Send</Button>
            </div>
          )
        }else {
        renderAction = (
          <>
            <div className="buy-tray">
              <div className="buy-tray-body">
                <div className="price">
                  <span>Price</span>
                  <span>{nft?.price} BNB</span>
                  <span>($8.8)</span>
                </div>
                <div className="buy-nav flex-row">
                  <Button className="cancel" ref={btnModal} onClick={() => handleOpenModal('cancel')}>Cancel</Button>
                </div>
              </div>
            </div>
            <p className="auction-end">Auction end in 10:00:00</p>
          </>
        )
        }
    }

    return (
      <div className="details">
        <div className="details-card">
          <div className="details-image">
            <img src="/nft-details/nft-details.png" />
            <Icon as={Heart} className="heart" />
          </div>
  
          <div className="nft-description">
            8888 NFT Astar Punks derivatives from CryptoPunks built on the Astar
            Network. It focuses on being a gateway and support for artists who
            wish to build their NFT collections on the Astar Network. It will
            build a DAO where the community will drive t
          </div>
        </div>
        <div className="details-content">
          <div className="provider">
            <img src="/nft-details/provider.png" />
            <span>Animverse</span>
          </div>
          <span className="name">{nft?.name}</span>
          <div className="owner">
            {
              !nft?.owner ? (
                <span>Preserved by Hlyman</span>
              ) : (
                <span>Preserved by Me</span>
              )
            }
            <div className="owner-stat">
              <span>100</span> <Icon as={Heart} />
              <span>100</span> <Icon as={Eye} />
            </div>
          </div>
            {
              !nft?.owner && (
                <>
                  <div className="buy-tray">
                    <div className="buy-tray-body">
                      <div className="price">
                        {
                        !nft?.hidePrice && !nft?.owner ? (
                            <>
                              <span>Price</span>
                              <span>{nft?.price} BNB</span>
                              <span>($8.8)</span>
                            </>
                          ) : (
                            <>
                              <span>Price</span>
                              <span>-</span>
                              <span>Waiting first offer</span>
                            </>
                          )
                        }
                      </div>
                      <div className="buy-nav">
                        {nft?.auction ? (
                          <Button ref={btnModal} onClick={ () => handleOpenModal('auction')}>AUC</Button>
                        ) : (
                          <>
                              <Button ref={btnModal} onClick={() => handleOpenModal('buy')} isDisabled={nft?.hidePrice}>BUY</Button>
                          </>
                        )}
                        {!nft?.auction ? <span ref={btnModal} onClick={() => handleOpenModal('offer')}>Or make offer other price</span> : null}
                      </div>
                    </div>
                  </div>
                  {nft?.auction && (
                    <p className="auction-end">Auction end in 10:00:00</p>
                  )}
                </>
              )
            }
            {renderAction}
            <div className="details-stats">
            <h1>Detail</h1>
            {detailsStats.map((stat) => (
              <div className="stat" key={stat.key}>
                <span>{stat.key}</span>
                <span>
                  {stat.value}
                  <Icon as={ExternalLink} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  

  const _renderModalConfirm = () => (
    <Modal size={contentModal?.size != undefined ? contentModal.size : 'sm'} finalFocusRef={btnModal} isOpen={isOpen} onClose={onClose} isCentered={false}>
      <ModalOverlay />
      <ModalContent className="dialog-confirm">
        <ModalHeader>{contentModal?.header}</ModalHeader>
        <ModalCloseButton>
          <img src="/icons/close.png" />
        </ModalCloseButton>
        <ModalBody className="form-auction">
          {contentModal?.body}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleApply}>
            {contentModal?.footer}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
  
  const _renderModalAlert = () => (
    <Modal size="sm" finalFocusRef={btnAlert} isOpen={alert.isOpen} onClose={alert.onClose} isCentered={false}>
      <ModalOverlay />
      <ModalContent className="dialog-confirm dialog-alert">
        <ModalHeader> </ModalHeader>
        <ModalCloseButton>
          <img src="/icons/close.png" />
        </ModalCloseButton>
        <ModalBody className="form-auction">
          {contentAlert?.body}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={alert.onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

const _renderTables = () => (
    <div className="tables">
      <Tabs>
        <TabList>
          <Tab className="tab-item">ACTIVITIES</Tab>
          <Tab className="tab-item">{NftStore?.nft?.auction ? 'AUCTIONS' : 'RECEIVED OFFER' }</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Activities/>
          </TabPanel >
          <TabPanel>
          {!NftStore?.nft?.auction ? (
            <ReceivedOffer/>
          ) : (
            <Auction/>
          )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )

  return (
    <div className="nft-details">
      {_renderDetails()}
      {_renderTables()}
      {_renderModalConfirm()}
      {_renderModalAlert()}
    </div>
  )
}

export default DetailsPage
