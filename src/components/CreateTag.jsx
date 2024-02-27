import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  VStack,
  Tag,
  TagLabel,
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
      console.log(error)
      alert(response.data.message);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

const handleAddTag = async () => {
  try {
    const response = await axios.post(
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
    <Box p="4" boxShadow="md" borderRadius="md" bg="white" maxWidth="500px">
      <VStack spacing="4" align="stretch">
        <Input
          placeholder="Enter new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAddTag}>
          Add Tag
        </Button>
        <Flex wrap="wrap">
          {tags.map((tag) => (
            <Tag
              key={tag._id}
              size="md"
              borderRadius="full"
              variant="subtle"
              colorScheme="blue"
              m="1"
            >
              <TagLabel>{tag.tagName}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
};

export default CreateTag;
