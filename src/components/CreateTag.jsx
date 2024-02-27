import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Grid,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { Space, Tag } from "antd";

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
      <div className="flex gap-2 max-w-[400px]">
        <Input
          placeholder="Enter new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAddTag}>
          Add Tag
        </Button>
      </div>
      <div className="max-w-[600px] mt-6">
        {tags.map((tag) => (
          <>
            <Tag key={tag._id} color="gold">
              {tag.tagName}
            </Tag>
          </>
        ))}
      </div>
    </div>
  );
};

export default CreateTag;
