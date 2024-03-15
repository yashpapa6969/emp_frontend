import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  selectProjectId,
  clearProjectId,
} from "../../store/slice/ProjectSlice";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  Divider,
  useColorModeValue,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { Segmented, Tag } from "antd";

const GetProject = ({ modalFor }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const projectId = useSelector(selectProjectId);
  const dispatch = useDispatch();
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [segmentedValue, setSegmentedValue] = useState("Project Information");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE
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
    <>
      {/* // <Box>
    //   <Heading size="lg" mb={4}>
    //     Project Data
    //   </Heading>
    //   {loading && <Spinner />}
    //   {error && <Text>Error: {error.message}</Text>}
    //   {data && (
    //     <VStack>
    //       {Object.entries(data).map(([key, value]) => (
    //         <Box
    //           key={key}
    //           border="1px"
    //           borderColor={borderColor}
    //           p={4}
    //           borderRadius="md"
    //         >
    //           <Text fontWeight="bold">{key}</Text>
    //           <Text>{value}</Text>
    //         </Box>
    //       ))}
    //     </VStack>
    //   )}
    // </Box> */}
      <Box overflow="hidden" p="4">
        <Segmented options={['Project Information', 'Other Information']} value={segmentedValue} onChange={setSegmentedValue} />
        {data ? (
          <div className="w-full flex flex-col gap-3 mt-6">
            {segmentedValue === 'Project Information' && (<>
              <div className="flex gap-3 w-full">
                {data.projectName && (
                  <Card className="w-1/3">
                    <CardBody>
                      <Heading pb={4} size='xs'>
                        Project Name:
                      </Heading>
                      <Divider mb={5} />
                      <Text fontSize={18} textTransform={"capitalize"}>{data.projectName}</Text>
                    </CardBody>
                  </Card>
                )}
                {data.startDate && (
                  <Card className="w-1/3">
                    <CardBody>
                      <Heading pb={4} size='xs'>
                        Start Date:
                      </Heading>
                      <Divider mb={5} />
                      <Text fontSize={18} textTransform={"capitalize"}>{data.startDate}</Text>
                    </CardBody>
                  </Card>
                )}
                {data.deadline && (
                  <Card className="w-1/3">
                    <CardBody>
                      <Heading pb={4} size='xs'>
                        Deadline:
                      </Heading>
                      <Divider mb={5} />
                      <Text fontSize={18} textTransform={"capitalize"}>{data.deadline}</Text>
                    </CardBody>
                  </Card>
                )}
              </div>
              <div className="flex w-full">
                {data.description && (
                  <Card className="w-full">
                    <CardBody>
                      <Heading pb={4} size='xs'>
                        Description:
                      </Heading>
                      <Divider mb={5} />
                      <Text fontSize={18} textTransform={"capitalize"}>{data.description}</Text>
                    </CardBody>
                  </Card>
                )}
              </div>
              <div className="w-full flex gap-3">
                {data.priority && (
                  <Card className="w-1/3">
                    <CardBody>
                      <Heading pb={4} size='xs'>
                        Priority:
                      </Heading>
                      <Divider mb={5} />
                      <Text fontSize={18} textTransform={"capitalize"}>{data.priority}</Text>
                    </CardBody>
                  </Card>
                )}
                {data.brandName && (
                  <Card className="w-1/3">
                    <CardBody>
                      <Heading pb={4} size='xs'>
                        Brand Name:
                      </Heading>
                      <Divider mb={5} />
                      <Text fontSize={18} textTransform={"capitalize"}>{data.brandName}</Text>
                    </CardBody>
                  </Card>
                )}
                </div>
            </>)}
            {segmentedValue === 'Other Information' && (<>
              <div className="flex gap-3 w-full">
                {data.tags && (
                  <Card className="w-1/3">
                    <CardBody>
                      <Heading pb={4} size='xs'>
                        Tags:
                      </Heading>
                      <Divider mb={5} />
                      <div className="flex gap-3">
                        {data.tags.map((tag, index) => (
                          <Tag key={`tag-${index}`} color="gold">{tag.tagName}</Tag>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                )}
                {data.employees && (
                  <Card className="w-1/3">
                    <CardBody>
                      <Heading pb={4} size='xs'>
                        Employees:
                      </Heading>
                      <Divider mb={5} />
                      <div className="flex gap-3">
                        {data.employees.map((emp, index) => (
                          <Tag key={`emp-${index}`} color="purple">{emp}</Tag>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
            </>)}
          </div>
        ) : (
          <Text>No client details available</Text>
        )}
      </Box>
    </>
  );
};

export default GetProject;
