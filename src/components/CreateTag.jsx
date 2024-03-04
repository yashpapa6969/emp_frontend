import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Tag } from "antd";
import { FaPlus, FaTrash } from "react-icons/fa6";

const CreateTag = () => {
  const [tags, setTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [sources, setSources] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newSource, setNewSource] = useState("");

  const toast = useToast();

  useEffect(() => {
    fetchTags();
    fetchProducts();
    fetchSources();
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/getAllProducts`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/admin/sourceGetAllTags`
      );
      setSources(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleAddTag = async () => {
    try {
      if (newTag === "") {
        toast({
          title: "Error",
          description: "Please fill all the fields",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
      else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE}/api/admin/addTag`,
          { tagName: newTag }
        );
        setNewTag("");
        fetchTags();
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      if (newProduct === "" || newProductPrice === 0) {
        toast({
          title: "Error",
          description: "Please fill all the fields",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
      else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE}/api/admin/addProducts`,
          { product: newProduct, unitPrice: newProductPrice }
        );
        setNewProduct("");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  }

  const handleAddSource = async () => {
    try {
      if (newSource === "") {
        toast({
          title: "Error",
          description: "Please fill all the fields",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
      else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE}/api/admin/sourceAddTag`,
          { sourceTagName: newSource }
        );
        setNewSource("");
        fetchSources();
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  }


  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Tags Management</h1>
      <h1 className="text-lg font-semibold mt-8 mb-4">Tag</h1>
      <div className="flex justify-start gap-2 max-w-[400px]">
        <Input
          placeholder="Enter new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button colorScheme="purple" variant={"outline"} onClick={handleAddTag}>
          <FaPlus />
        </Button>
      </div>
      <Box mt={6} p={4} boxShadow={"md"} rounded={"lg"} width={"full"}>
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

      <h1 className="text-lg font-semibold mt-10 mb-4">Product</h1>
      <div className="flex justify-start gap-2 max-w-[400px]">
        <Input
          placeholder="Enter new product"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <Input
          placeholder="Enter new product"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <Button colorScheme="cyan" variant={"outline"} onClick={handleAddProduct}>
          <FaPlus size={36} />
        </Button>
      </div>
      <Box mt={6} p={4} boxShadow={"md"} rounded={"lg"} width={"full"}>
        {products.map((product) => (
          <>
            <Tag key={product._id} className="px-2 py-1 mb-2 bg-cyan-400 border-cyan-600 text-[16px] font-semibold text-white">
              <div className="flex gap-5 items-center">
                {product.product} <div className="p-[7px] transition-all bg-cyan-500 hover:bg-cyan-400 rounded-full cursor-pointer"> <FaTrash size={12} /> </div>
              </div>
            </Tag>
          </>
        ))}
      </Box>

      <h1 className="text-lg font-semibold mt-10 mb-4">Source</h1>
      <div className="flex justify-start gap-2 max-w-[400px]">
        <Input
          placeholder="Enter new product"
          value={newSource}
          onChange={(e) => setNewSource(e.target.value)}
        />
        <Button colorScheme="orange" variant={"outline"} onClick={handleAddSource}>
          <FaPlus />
        </Button>
      </div>
      <Box mt={6} p={4} boxShadow={"md"} rounded={"lg"} width={"full"}>
        {sources.map((source) => (
          <>
            <Tag key={source._id} className="px-2 py-1 mb-2 bg-orange-400 border-orange-600 text-[16px] font-semibold text-white">
              <div className="flex gap-5 items-center">
                {source.sourceTagName} <div className="p-[7px] transition-all bg-orange-500 hover:bg-orange-400 rounded-full cursor-pointer"> <FaTrash size={12} /> </div>
              </div>
            </Tag>
          </>
        ))}
      </Box>
    </div>
  );
};

export default CreateTag;
