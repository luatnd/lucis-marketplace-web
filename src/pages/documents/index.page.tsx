import {
  Button,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { getAllDocs } from "src/lib/docs"
import Markdown from "react-markdown"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ArrowLeft, BookOpen, Menu } from "react-feather"

const Documents = (props) => {
  const { docs } = props

  const [menuVisible, setMenuVisible] = useState(true)

  const router = useRouter()
  const { index } = router.query

  const handleChangePost = (value) => {
    router.query.index = value
    router.push(router)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [router.query.index])

  return (
    <div className="document-page">
      <Button
        className={`collapse-btn ${!menuVisible ? "collapsed-btn" : ""}`}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <Icon as={menuVisible ? ArrowLeft : BookOpen} />
      </Button>
      <Tabs
        index={+(index ?? 0)}
        orientation="vertical"
        align="start"
        onChange={handleChangePost}
      >
        <TabList className={`doc-menu ${!menuVisible ? "hide" : ""}`}>
          {docs.map((doc) => (
            <Tab justifyContent="flex-start" key={doc.slug}>
              {doc.slug.replace(/[0-9] - /g, "")}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="doc-content-wrapper">
          {docs.map((doc) => (
            <TabPanel className="doc-content">
              <Markdown children={doc.content} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Documents

export const getStaticProps = async (ctx) => {
  const docs = getAllDocs()
  return {
    props: {
      docs,
    },
  }
}
