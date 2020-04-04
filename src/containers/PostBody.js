import React from "react"
import ReactMarkdown from "react-markdown/with-html"
import CodeBlock from "../components/CodeBlock"
import HeadingBlock from "../components/HeadingBlock"
import Skeleton from "@material-ui/lab/Skeleton"

const PostBody = ({post}) => {
  return <div>
    {
      post ?
        <ReactMarkdown source={post.content} escapeHtml={false} renderers={{
          code: CodeBlock,
          heading: HeadingBlock
        }}/>
        :
        <Skeleton variant="rect" height={'60vh'}/>
    }
  </div>
};

export default PostBody
