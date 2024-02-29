import { useState, useEffect } from "react";
import {
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { Tag } from "antd";
import { FaTrash } from "react-icons/fa6";
import SelectTag from "./common/SelectTag";

const CreateTag = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const [selectTagValue, setSelectTagValue] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllTags`
      );
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleAddTag = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/admin/addTag`,
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
        {/* <Input
          placeholder="Enter new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button px={6} colorScheme="blue" onClick={handleAddTag}>
          Add Tag
        </Button> */}
        <SelectTag selectTagValue={selectTagValue} setSelectTagValue={setSelectTagValue} />
      </div>
      <Box mt={6} p={4} boxShadow={"md"} rounded={"lg"} width={"full"} minH={"sm"}>
        {tags.map((tag) => (
          <>
            <Tag key={tag._id} className="px-2 py-1 mb-2 bg-purple-400 border-purple-600 text-[16px] font-semibold text-white">
              <div className="flex gap-5 items-center">
              {tag.tagName} <div className="p-[7px] transition-all bg-purple-500 hover:bg-purple-400 rounded-full cursor-pointer"> <FaTrash size={12} /> </div>
              </div>
            </Tag>
          </>
        ))}
      </Box>
    </div>
  );
};

export default CreateTag;
