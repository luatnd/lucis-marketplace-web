import {
  Button,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ArrowLeft, BookOpen } from "react-feather"
import Markdown from "react-markdown"
import { getAllDocs } from "src/lib/docs"

const Documents = (props) => {
  const { docs, index } = props

  const [menuVisible, setMenuVisible] = useState(true)

  const router = useRouter()

  const handleChangePost = (value) => {
    router.query.index = value
    router.push(router)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index])

  return (
    <div className="document-page">
      <Button
        className={`collapse-btn ${!menuVisible ? "collapsed-btn" : ""}`}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <Icon as={menuVisible ? ArrowLeft : BookOpen} />
      </Button>
      <Tabs
        index={+index}
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
            <TabPanel key={doc.slug} className="doc-content">
              <Markdown>{doc.content}</Markdown>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Documents

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const docs = getAllDocs()
  const index = ctx.query.index ?? 0
  return {
    props: {
      docs,
      index,
    },
  }
}
