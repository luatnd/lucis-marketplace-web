import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Switch,
  useToast,
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useStore } from "src/hooks/useStore"
import { getProfileOther, updateUserInfo } from "src/services/nft"
const Setting = observer(() => {
  const toast = useToast()
  const WalletController = useStore("WalletController")

  const [file, setFile] = useState(null)
  const [url, setUrl] = useState("/common/user.png")
  const [userName, setUserName] = useState(null)
  const [youtube, setYoutube] = useState(null)
  const [face, setFace] = useState(null)

  const onFileChange = (el) => {
    setFile(el.target.files[0])
    setUrl(URL.createObjectURL(el.target.files[0]))
  }

  const getInfo = async () => {
    const res = await getProfileOther(WalletController.address)
  }
  useEffect(() => {
    getInfo()
  }, [])

  const saveInfo = async () => {
    const token = await WalletController.getAuth()
    const res = await updateUserInfo(token, userName, file, youtube, face)
    if (res) {
      toast({
        description: "Update successful !",
        status: "success",
        duration: 3000,
        isClosable: false,
      })
    } else {
      toast({
        description: "Update failed !",
        status: "error",
        duration: 3000,
        isClosable: false,
      })
    }
  }

  return (
    <Tabs className="setting" align="center">
      <TabList>
        <Tab>
          <img src="/icons/user.png" alt="" /> Profile
        </Tab>
        <Tab>
          <img src="/icons/bell.png" alt="" /> Notification
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="profile">
          <h1>Profile</h1>
          <div className="info">
            <div className="border">
              <img src={url} alt="" />
            </div>
            <p>
              <input
                type={"file"}
                id="file"
                onChange={onFileChange}
                style={{ display: "none" }}
              ></input>
              <label htmlFor="file">Click here</label> to choose a image
            </p>
          </div>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type={"text"}
              placeholder={"Username"}
              value={userName}
              onChange={(el) => {
                setUserName(el.target.value)
              }}
            ></Input>
            <FormLabel>Intro</FormLabel>
            <Input type={"text"} placeholder={"Username"}></Input>
            <div className="social">
              <h6>Social Link</h6>
              <p>
                You would have more of your personal information exposed by
                providing social links on your profile page. If you are an
                influencer with more than 10K followers, you can contact us to
                verify your account.
              </p>
            </div>
            <FormLabel>Twitter</FormLabel>
            <Input type={"url"} placeholder={"Link"}></Input>
            <FormLabel>Youtube</FormLabel>
            <Input
              type={"url"}
              placeholder={"Link"}
              value={youtube}
              onChange={(el) => {
                setYoutube(el.target.value)
              }}
            ></Input>
            <FormLabel>Instagram</FormLabel>
            <Input type={"url"} placeholder={"Link"}></Input>
            <FormLabel>Homepage</FormLabel>
            <Input type={"url"} placeholder={"Link"}></Input>
            <Input type={"submit"} value={"Save"} onClick={saveInfo}></Input>
          </FormControl>
        </TabPanel>
        <TabPanel className="notification">
          <h1>Notification</h1>
          <div className="methods">
            <h3>Notification Methods</h3>
            <p>How do you would like to receive the notifications</p>
            <div className="row">
              <div className="left">
                <img src="/icons/tele.png" alt="" />
                <div className="left-right">
                  <h5>Telegram</h5>
                  <p>Connected</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
          <div className="methods">
            <h3>Notification Methods</h3>
            <p>How do you would like to receive the notifications</p>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>Liked item activity</h5>
                  <p>When any activities occurred on items you like</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>Listing activity</h5>
                  <p>When you list any item in fixed price or auction</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>Item Sold</h5>
                  <p>When someone purchases one of your items</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>Bid activity</h5>
                  <p>When the auction you started receives bids</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>Outbid</h5>
                  <p>When an offer you placed is exceeded by another user</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>Auction exporation</h5>
                  <p>When the auction you started ends without bids</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>Buy offer received</h5>
                  <p>When someone sends a buy offer to one of your items</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>My buy offer activity</h5>
                  <p>When your buy offer gets accepted or rejected</p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="row">
              <div className="left">
                <img src="/icons/bell1.png" alt="" />
                <div className="left-right">
                  <h5>Item transfer</h5>
                  <p>When you send or receive an item</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
          <div className="methods">
            <h3>Privacy</h3>
            <p>
              Options to protect your privacy. We’ll include the anti-phishing
              code in every message we send you.
              <div className="code">
                <h4>ANTI-PHISHING CODE</h4>
                <FormControl className="code-form">
                  <Input
                    type={"text"}
                    placeholder={"4-20 non-special characters"}
                  ></Input>
                  <Input type={"submit"} value={"Save"}></Input>
                </FormControl>
              </div>
              <div className="row">
                <div className="left">
                  <img src="/icons/eye.png" alt="" />
                  <div className="left-right">
                    <h5>Allow direct message</h5>
                    <p>Allow other users to ping you directly.</p>
                  </div>
                </div>
                <Switch />
              </div>
            </p>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
})
export default Setting
