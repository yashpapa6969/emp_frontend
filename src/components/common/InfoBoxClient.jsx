import { Box, Button, Card, CardBody, Divider, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectClientId, clearClientId } from "../../store/slice/ClientSlice";
import { Segmented, Tag } from "antd";

const InfoBoxClient = () => {
  const clientId = useSelector(selectClientId);
  const [clientDetails, setClientDetails] = useState(null);
  const [segmentedValue, setSegmentedValue] = useState("Personal Information");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClientDetails = async () => {
      if (clientId) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE
            }/api/admin/getClientDetails/${clientId}`
          );
          const data = await response.json();
          setClientDetails(data);
          dispatch(clearClientId());
        } catch (error) {
          console.error("Error fetching client details:", error);
        }
      }
    };

    fetchClientDetails();
  }, [clientId]);

  return (
    <Box overflow="hidden" p="4">
      <Segmented options={['Personal Information', 'Business Information', 'Contact']} value={segmentedValue} onChange={setSegmentedValue} />
      {clientDetails ? (
        <div className="w-full flex flex-col gap-3 mt-6">
          {segmentedValue === 'Personal Information' && (<>
            <div className="flex gap-3 w-full">
              {clientDetails.clientName && (<Card className="w-1/3">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    Client Name:
                  </Heading>
                  <Divider mb={5} />
                  <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.clientName}</Text>
                </CardBody>
              </Card>)}
              {clientDetails.companyName && (<Card className="w-1/3">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    Company Name:
                  </Heading>
                  <Divider mb={5} />
                  <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.companyName}</Text>
                </CardBody>
              </Card>)}
              {clientDetails.enquiryDate && (<Card className="w-1/3">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    Enquiry Date:
                  </Heading>
                  <Divider mb={5} />
                  <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.enquiryDate}</Text>
                </CardBody>
              </Card>)}
            </div>
            {clientDetails.requirement && clientDetails.requirement.length > 0 && (<Card>
              <CardBody>
                <Heading pb={4} size='xs'>
                  Requirements:
                </Heading>
                <Divider mb={5} />
                <div className="flex gap-2">{clientDetails.requirement.map((el, index) => <Tag key={`req-${index}`} color="magenta" className="text-lg">{el}</Tag>)}</div>
              </CardBody>
            </Card>)}
            {clientDetails.source && (<Card>
              <CardBody>
                <Heading pb={4} size='xs'>
                  Sources:
                </Heading>
                <Divider mb={5} />
                <div className="flex gap-2">{clientDetails.source.map((el, index) => <Tag key={`req-${index}`} color="geekblue" className="text-lg">{el}</Tag>)}</div>
              </CardBody>
            </Card>)}
            <div className="flex gap-3">
              {clientDetails.additionalInformation && (<Card className="w-1/3">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    Additional Information:
                  </Heading>
                  <Divider mb={5} />
                  <Text textTransform={"capitalize"}>{clientDetails.additionalInformation}</Text>
                </CardBody>
              </Card>)}
              <Card className="w-full">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    Multiple Files:
                  </Heading>
                  <Divider mb={5} />
                  <div>
                    {clientDetails.multipleFiles.length > 0 ?
                    clientDetails.multipleFiles.map((data, index) => (
                      <Button
                        key={`data-${index}`}
                        as="a"
                        href={`${import.meta.env.VITE_API_BASE}/uploads/${data.singleFile.split("/")[4]
                          }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        textDecoration="none"
                        _hover={{ textDecoration: "none" }}
                        mb={2}
                        variant="solid"
                      >
                        View Single File
                      </Button>
                    )) : <>No file uploaded</>}
                  </div>
                </CardBody>
              </Card>
              )}
            </div>
          </>)}
          {segmentedValue === 'Business Information' && (<>
            {clientDetails.brandName && (<Card>
              <CardBody>
                <Heading pb={4} size='xs'>
                  Brand Name:
                </Heading>
                <Divider mb={5} />
                <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.brandName}</Text>
              </CardBody>
            </Card>)}
            {clientDetails.businessAddress && (<Card>
              <CardBody>
                <Heading pb={4} size='xs'>
                  Business Address:
                </Heading>
                <Divider mb={5} />
                <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.businessAddress}</Text>
              </CardBody>
            </Card>)}
            <div className="flex flex-col md:flex-row gap-3 w-full mt-4">
              {clientDetails.city && (<Card className="md:w-1/4 w-full">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    City:
                  </Heading>
                  <Divider mb={5} />
                  <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.city}</Text>
                </CardBody>
              </Card>)}
              {clientDetails.state && (<Card className="md:w-1/4 w-full">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    State:
                  </Heading>
                  <Divider mb={5} />
                  <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.state}</Text>
                </CardBody>
              </Card>)}
              {clientDetails.country && (<Card className="md:w-1/4 w-full">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    Country:
                  </Heading>
                  <Divider mb={5} />
                  <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.country}</Text>
                </CardBody>
              </Card>)}
              {clientDetails.pincode && (<Card className="md:w-1/4 w-full">
                <CardBody>
                  <Heading pb={4} size='xs'>
                    Pincode:
                  </Heading>
                  <Divider mb={5} />
                  <Text fontSize={18} textTransform={"capitalize"}>{clientDetails.pincode}</Text>
                </CardBody>
              </Card>)}
            </div>
          </>)}
          {segmentedValue === 'Contact' && (<>
            {(clientDetails.email1 || clientDetails.email2) && (<Card>
              <CardBody>
                <Heading pb={4} size='xs'>
                  Emails:
                </Heading>
                <Divider mb={5} />
                <Text fontSize={18}>{clientDetails.email1}</Text>
                {clientDetails.email2 && (<Text fontSize={18}>{clientDetails.email2}</Text>)}
              </CardBody>
            </Card>)}
            {(clientDetails.phone1 || clientDetails.phone2) && (<Card>
              <CardBody>
                <Heading pb={4} size='xs'>
                  Phone no:
                </Heading>
                <Divider mb={5} />
                <Text fontSize={18}>{clientDetails.phone1}</Text>
                {clientDetails.phone2 && (<Text fontSize={18}>{clientDetails.phone2}</Text>)}
              </CardBody>
            </Card>)}
            {clientDetails.website && (<Card>
              <CardBody>
                <Heading pb={4} size='xs'>
                  Website:
                </Heading>
                <Divider mb={5} />
                <Text fontSize={18}>{clientDetails.website}</Text>
              </CardBody>
            </Card>)}
          </>)}
        </div>
      ) : (
        <Text>No client details available</Text>
      )}
    </Box>
  );
};

export default InfoBoxClient;
