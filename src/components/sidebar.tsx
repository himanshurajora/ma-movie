import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Menu,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useOutsideClick,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { IMovie } from "../database";
import {
  deleteMovieByID,
  getAllMoviesCount,
  getPageOfMovies,
} from "../database/utils";
import CreateNewMoviePopover from "./forms/create-new-movie";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  ref: React.RefObject<HTMLDivElement>;
  setCurrentMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, setCurrentMovie }) => {
  const [page, setPage] = useState(1);
  const pageLength = 10;
  const [movies, setMovies] = useState<IMovie[]>([]);
  const movieCount = useRef(0);
  const toaster = useToast();
  const [currentXY, setCurrentXY] = useState<number[]>([0, 0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number>();
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: menuRef,
    handler: () => {
      setIsMenuOpen(false);
    },
  });

  const refetchMovies = (fresh: boolean = false) => {
    if (!fresh) {
      getPageOfMovies(page, pageLength)
        .then((dataMovies) => {
          setMovies([...movies, ...dataMovies]);
        })
        .catch((err) => {
          toaster({
            title: "Error",
            description: "Could Not Fetch Movies" || err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });

      getAllMoviesCount()
        .then((count) => {
          movieCount.current = count;
        })
        .catch((err) => {
          toaster({
            title: "Error",
            description: "Could Not Fetch Movies" || err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    refetchMovies();
  }, [page]);

  useEffect(() => {
    if (movies.length === 0) {
      refetchMovies();
    }
  }, [movies]);

  const handleDeleteMovie = async () => {
    if (itemToDelete) {
      await deleteMovieByID(itemToDelete);
      refetchMovies(true);
      setIsMenuOpen(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Ma Movie &nbsp;
          <CreateNewMoviePopover
            setCurrentMovie={setCurrentMovie}
            refetchMovies={refetchMovies}
          />
        </DrawerHeader>
        <DrawerBody>
          <Input placeholder="Search..." />
          <Spacer height="4" />
          {/* <ButtonGroup>
            <Button>All</Button>
            <Button>Favorites</Button>
            <Button>Watchlist</Button>
          </ButtonGroup> */}
          <Spacer height="4" />
          <VStack alignItems="start">
            {movies.map((movie, index) => (
              <Button
                key={movie.id}
                onClick={() => {
                  setCurrentMovie(movie);
                }}
                width="full"
                justifyContent="start"
                onContextMenu={(e) => {
                  e.preventDefault();
                  setCurrentXY([e.clientX, e.clientY]);
                  setIsMenuOpen(true);
                  setItemToDelete(movie.id);
                }}
              >
                {movie.remark.length > 15
                  ? movie.remark.slice(0, 15) + "..."
                  : movie.remark}{" "}
                <Text as="sup">{movie.date}</Text>
              </Button>
            ))}
            <Spacer height="4" />
            {movieCount.current > movies.length && (
              <Button
                colorScheme="green"
                width="full"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Load More
              </Button>
            )}
          </VStack>
          <Flex
            ref={menuRef}
            position="absolute"
            top={`${currentXY[1]}px`}
            left={`${currentXY[0]}px`}
          >
            <Menu isOpen={isMenuOpen}>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    handleDeleteMovie();
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Text>💻 Made By Vedik Devs</Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
