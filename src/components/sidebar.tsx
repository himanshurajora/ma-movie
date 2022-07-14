import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import CreateNewMoviePopover from "./forms/create-new-movie";
import CreateNewMovieForm from "./forms/create-new-movie";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  ref: React.RefObject<HTMLDivElement>;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Ma Movie &nbsp;
          <CreateNewMoviePopover />
        </DrawerHeader>
        <DrawerBody>
          <Input placeholder="Search..." />
          <Spacer height="4" />
          <ButtonGroup>
            <Button>All</Button>
            <Button>Favorites</Button>
            <Button>Watchlist</Button>
          </ButtonGroup>
          <Spacer height="4" />
          <VStack>
            {Array(13)
              .fill(1)
              .map((item, index) => (
                <Button width="full" key={index}>
                  {item}
                </Button>
              ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Text>💻 Made By Vedik Devs</Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
