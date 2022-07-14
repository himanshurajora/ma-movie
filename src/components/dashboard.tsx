import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import MovieEditor from "./movie-editor";

interface IDashboardProps {
  isSidebarOpen: boolean;
  sidebarRef: React.RefObject<HTMLDivElement>;
}
const Dashboard: FC<PropsWithChildren<IDashboardProps>> = ({
  isSidebarOpen,
  sidebarRef,
  children,
}) => {
  return (
    <VStack
      marginLeft={isSidebarOpen ? "320px" : "0"}
      padding="4"
      gap="4"
      alignItems="start"
      height="full"
      width="100%"
    >
      <HStack>
        {children}
        <Text size="xl">Some File Remark - {new Date().toDateString()}</Text>
      </HStack>
      <MovieEditor />
    </VStack>
  );
};

export default Dashboard;
