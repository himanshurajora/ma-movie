import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, ChakraProvider, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/sidebar";
import { IMovie } from "./database";
import { getLastMovie } from "./database/utils";
import { theme } from "./utils/theme";
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    // get most last movie
    getLastMovie().then((movie) => {
      setCurrentMovie(movie);
    });
  }, []);

  const sidebarRef = useRef<HTMLDivElement>(null);
  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh">
        <Sidebar ref={sidebarRef} onClose={onClose} isOpen={isOpen} />
        <Dashboard sidebarRef={sidebarRef} isSidebarOpen={isOpen}>
          <Button onClick={onOpen} display={isOpen ? "none" : "block"}>
            <HamburgerIcon />
          </Button>
        </Dashboard>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
