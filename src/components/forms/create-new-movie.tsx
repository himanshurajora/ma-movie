import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
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
import { database } from "../../database";
interface MovieFormProps {
  onClose: () => void;
}

const MovieForm: FC<MovieFormProps> = ({ onClose }) => {
  const { register, formState, handleSubmit } = useForm<CreateMovieDto>({
    mode: "onTouched",
    resolver: yupResolver(createMovieSchema),
  });

  const onSubmit = async (data: CreateMovieDto) => {
    const id = await database.movies.add({
      remark: data.remark,
      content: "",
      date: new Date().toDateString(),
    });

    console.log(id);
  };

  return (
    <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Create New</FormLabel>
        <Input placeholder="Enter Remarks" {...register("remark")} />
        <FormErrorMessage>
          {formState.errors["remark"] && formState.errors["remark"].message}
        </FormErrorMessage>
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

const CreateNewMoviePopover = () => {
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
        <MovieForm onClose={onClose} />
      </PopoverContent>
    </Popover>
  );
};

export default CreateNewMoviePopover;
