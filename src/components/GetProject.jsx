import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { selectProjectId,clearProjectId } from "../store/slice/ProjectSlice";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const GetProject = ({ modalFor }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const projectId = useSelector(selectProjectId);
  const dispatch = useDispatch();
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE
          }/api/admin/getProjectDetails/${projectId}`
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchData();
    }

    return () => {
      dispatch(clearProjectId());
    };
  }, [projectId, dispatch]);

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Project Data
      </Heading>
      {loading && <Spinner />}
      {error && <Text>Error: {error.message}</Text>}
      {data && (
        <VStack>
          {Object.entries(data).map(([key, value]) => (
            <Box
              key={key}
              border="1px"
              borderColor={borderColor}
              p={4}
              borderRadius="md"
            >
              <Text fontWeight="bold">{key}</Text>
              <Text>{value}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default GetProject;
