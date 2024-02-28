import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Tag,
  TagLabel
} from "@chakra-ui/react";
import axios from "axios";

const CreateTag = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get(
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/getAllTags"
      );
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleAddTag = async () => {
    try {
      await axios.post(
        "https://w5dfhwejp7.execute-api.ap-south-1.amazonaws.com/api/admin/addTag",
        { tagName: newTag }
      );
      setNewTag("");
      fetchTags();
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };


  return (
    <div className="p-4">
      <div className="flex justify-start gap-2 w-[400px]">
        <Input
          placeholder="Enter new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button px={6} colorScheme="blue" onClick={handleAddTag}>
          Add Tag
        </Button>
      </div>
      <Box
        bg={"#172032"}
        mt={10}
        p={10}
        boxShadow={"md"}
        rounded={"lg"}
        width={"full"}
        minH={"lg"}
      >
        {tags.map((tag) => (
          <>
            <Tag key={tag._id} variant="subtle" colorScheme="cyan" mr={2} size={'lg'}>
              <TagLabel> {tag.tagName}</TagLabel>
            </Tag>
          </>
        ))}
      </Box>
    </div>
  );
};

export default CreateTag;
