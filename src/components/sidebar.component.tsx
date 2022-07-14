import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  ref: React.RefObject<HTMLDivElement>;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  console.log(isOpen);
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Ma Movie</DrawerHeader>
        <DrawerBody>
          <Input placeholder="Type here..." />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
