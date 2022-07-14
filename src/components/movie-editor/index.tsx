import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import "highlight.js/styles/atom-one-dark.css";
import "react-markdown-editor-lite/lib/index.css";
import MdEditor from "react-markdown-editor-lite";
import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { IMovie } from "../../database";
import { FC, useEffect, useState } from "react";
import { getMovieById, updateMovie } from "../../database/utils";

interface MovieEditorProps {
  currentMovie: IMovie | undefined;
  setCurrentMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>;
}
const MovieEditor: FC<MovieEditorProps> = ({
  currentMovie,
  setCurrentMovie,
}) => {
  const [movieContent, setMovieContent] = useState("");
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    getMovieById(currentMovie?.id!)
      .then((movie) => {
        setMovieContent(movie?.content!);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentMovie]);

  const toaster = useToast();
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
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
      return "";
    },
  });

  const saveMovie = async () => {
    try {
      const movieToSave = {
        ...currentMovie,
        content: movieContent,
      };
      await updateMovie(movieToSave as IMovie);
      setIsSaved(true);
      //   toaster({
      //     title: "Success",
      //     description: "Movie Saved Successfully",
      //     status: "success",
      //     duration: 2000,
      //     isClosable: true,
      //     position: "bottom-right",
      //   });
    } catch (err) {
      toaster({
        title: "Error",
        description: "Something went wrong" + (err as any).message,
        status: "error",
        duration: 4000,
        colorScheme: "red",
        position: "bottom-right",
      });
    }

    setIsSaved(true);
  };

  const handleChange = (mdObject: { text: string; html: string }) => {
    setIsSaved(false);
    setMovieContent(mdObject.text);
    saveMovie();
  };

  return (
    <>
      <Flex alignItems="center" gap="4">
        <Heading size="md">Write You Movie</Heading>
        <Button colorScheme="green" onClick={saveMovie} isDisabled={true}>
          (Auto Save)
        </Button>
      </Flex>
      <MdEditor
        style={{ height: "100%", width: "100%" }}
        renderHTML={(text: string) =>
          mdParser.render(text) || "Output HTML Here"
        }
        onChange={(mdObject) => {
          handleChange(mdObject);
        }}
        value={movieContent}
      />
    </>
  );
};

export default MovieEditor;
