import { Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface IDashboardProps {
  isSidebarOpen: boolean;
  sidebarRef: React.RefObject<HTMLDivElement>;
}
const DashBoard: FC<PropsWithChildren<IDashboardProps>> = ({
  isSidebarOpen,
  sidebarRef,
  children,
}) => {
  return (
    <Flex
      marginLeft={isSidebarOpen ? "320px" : "0"}
      padding="4"
      gap="4"
      alignItems="center"
    >
      {children}
      <Text size="xl">Dashboard</Text>
      {isSidebarOpen && <Text>Sidebar is open</Text>}
    </Flex>
  );
};

export default DashBoard;
