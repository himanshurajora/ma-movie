import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import "highlight.js/styles/atom-one-dark.css";
import "react-markdown-editor-lite/lib/index.css";
import MdEditor from "react-markdown-editor-lite";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
const MovieEditor = () => {
  // markdown parser
  const mdParser = new MarkdownIt({
    breaks: true,
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang, attrs) {
      lang = lang ? lang : "javascript";
      if (lang && hljs.getLanguage(lang)) {
        try {
          console.log(lang);
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
      return "";
    },
  });

  return (
    <>
      <Flex alignItems="center" gap="4">
        <Heading size="md">Write You Movie</Heading>
        <Button colorScheme="green">Save</Button>
      </Flex>
      <MdEditor
        style={{ height: "100%", width: "100%" }}
        renderHTML={(text: string) =>
          mdParser.render(text) || "Output HTML Here"
        }
      />
    </>
  );
};

export default MovieEditor;
