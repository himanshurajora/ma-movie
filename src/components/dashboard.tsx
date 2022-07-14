import { HStack, Text, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { IMovie } from "../database";
import MovieEditor from "./movie-editor";

interface IDashboardProps {
  isSidebarOpen: boolean;
  sidebarRef: React.RefObject<HTMLDivElement>;
  currentMovie: IMovie | undefined;
  setCurrentMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>;
}
const Dashboard: FC<PropsWithChildren<IDashboardProps>> = ({
  isSidebarOpen,
  sidebarRef,
  children,
  setCurrentMovie,
  currentMovie,
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
        <Text size="xl">
          {!!currentMovie?.remark && currentMovie.remark}
          &nbsp;&nbsp;
          {!!currentMovie?.date && currentMovie.date}
        </Text>
      </HStack>
      <MovieEditor
        currentMovie={currentMovie}
        setCurrentMovie={setCurrentMovie}
      />
    </VStack>
  );
};

export default Dashboard;
