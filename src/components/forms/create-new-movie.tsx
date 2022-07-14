import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateMovieDto,
  createMovieSchema,
} from "../../validations/create-new-movie.schema";
import { database, IMovie } from "../../database";
interface MovieFormProps {
  onClose: () => void;
  setCurrentMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>;
  refetchMovies: (fresh?: boolean) => void;
}

const MovieForm: FC<MovieFormProps> = ({
  onClose,
  setCurrentMovie,
  refetchMovies,
}) => {
  const { register, formState, handleSubmit, reset } = useForm<CreateMovieDto>({
    mode: "onChange",
    resolver: yupResolver(createMovieSchema),
  });

  const onSubmit = async (data: CreateMovieDto) => {
    const id = await database.movies.add({
      remark: data.remark,
      content: "",
      date: new Date().toDateString(),
    });

    const movie = await database.movies.get(id);
    setCurrentMovie(movie);

    refetchMovies(true);
    reset();
    onClose();
  };

  return (
    <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!formState.errors["remark"]}>
        <FormLabel>Create New</FormLabel>
        <Input
          placeholder="Enter Remarks"
          {...register("remark")}
          autoComplete="off"
          colorScheme="green"
        />
        <FormErrorMessage>
          {!!formState.errors["remark"] && formState.errors["remark"].message}
        </FormErrorMessage>
        <FormHelperText>
          {!formState.errors["remark"] &&
            "Remark helps you to remember the movie."}
        </FormHelperText>
      </FormControl>
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!formState.isValid} colorScheme="teal" type="submit">
          Create
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

interface CreateNewMoviePopoverProps {
  setCurrentMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>;
  refetchMovies: () => void;
}
const CreateNewMoviePopover: FC<CreateNewMoviePopoverProps> = ({
  setCurrentMovie,
  refetchMovies,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton aria-label="Create New" size="sm" icon={<EditIcon />} />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <MovieForm
          onClose={onClose}
          setCurrentMovie={setCurrentMovie}
          refetchMovies={refetchMovies}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CreateNewMoviePopover;
