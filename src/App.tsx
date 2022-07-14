import { Button, ChakraProvider, Flex, useDisclosure } from "@chakra-ui/react";
import DashBoard from "./components/dashboard";
import Sidebar from "./components/sidebar.component";
import { theme } from "./utils/theme";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const sidebarRef = useRef<HTMLDivElement>(null);
  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <Sidebar ref={sidebarRef} onClose={onClose} isOpen={isOpen} />
        <DashBoard sidebarRef={sidebarRef} isSidebarOpen={isOpen}>
          <Button onClick={onOpen} display={isOpen ? "none" : "block"}>
            <HamburgerIcon />
          </Button>
        </DashBoard>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
