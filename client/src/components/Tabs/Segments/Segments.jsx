import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useBearStore from "../../../hooks/useBearStore";

import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Spinner } from "@twilio-paste/core/spinner";
import { Separator } from "@twilio-paste/core/separator";
import { Table, THead, Tr, Th, TBody, Td } from "@twilio-paste/core/table";

import { getSegment } from "../../../utils/getSegment";

const Segments = ({ tab }) => {
  const [displayedSegments, setDisplayedSegments] = useState([]);
  const navigate = useNavigate();
  const { updateSegments } = useBearStore();
  const {
    data: { formattedSegments, activeSegments, publishedSegments, otherSegments } = {},
    isLoading,
    isLoadingError,
  } = useQuery({
    queryFn: getSegment,
    queryKey: ["segments"],
  });

  useEffect(() => {
    if (formattedSegments) {
      setDisplayedSegments(formattedSegments);
      updateSegments(publishedSegments);
    }
  }, [formattedSegments]);

  const activeSegmentsHandler = () => {
    setDisplayedSegments(activeSegments);
  };

  const publishedSegmentsHandler = () => {
    setDisplayedSegments(publishedSegments);
  };

  const otherSegmentsHandler = () => {
    setDisplayedSegments(otherSegments);
  };

  const cancelHandler = () => {
    navigate("/");
  };

  const nextHandler = () => {
    tab.select(2);
  };

  return (
    <>
      <Stack orientation="horizontal" spacing="space60">
        <Button variant="primary" onClick={activeSegmentsHandler}>
          Active Segments
        </Button>
        <Button variant="primary" onClick={publishedSegmentsHandler}>
          Published Segments
        </Button>
        <Button variant="primary" onClick={otherSegmentsHandler}>
          Other Segments
        </Button>
      </Stack>
      <Separator orientation="horizontal" verticalSpacing="space60" />
      {isLoadingError && (
        <Flex hAlignContent="center" vAlignContent="center">
          <Text fontSize="fontSize50" fontWeight="fontWeightExtrabold" color="colorTextDestructive">
            There was an error fetching Segment information!
          </Text>
        </Flex>
      )}
      {isLoading ? (
        <Flex hAlignContent="center" vAlignContent="center">
          <Stack orientation="vertical" spacing="space80">
            <Box display="flex" alignContent="center" justifyContent="center">
              <Spinner decorative={false} title="Loading" size="sizeIcon110" color="colorTextDecorative20" />
            </Box>
            <Text
              fontSize="fontSize50"
              fontWeight="fontWeightExtrabold"
              color="colorTextLinkStronger"
              textAlign="center"
            >
              Loading Segment information...
            </Text>
          </Stack>
        </Flex>
      ) : (
        <Box overflow="auto" maxHeight="50vh">
          <Table striped variant="default" tableLayout="fixed">
            <THead stickyHeader>
              <Tr>
                <Th>
                  <Text fontWeight="fontWeightExtrabold">Segment Name</Text>
                </Th>
                <Th>
                  <Text fontWeight="fontWeightExtrabold">Segment API Name</Text>
                </Th>
                <Th>
                  <Text fontWeight="fontWeightExtrabold">Segment ID</Text>
                </Th>
                <Th>
                  <Text fontWeight="fontWeightExtrabold">Segment Definition ID</Text>
                </Th>
                <Th>
                  <Text fontWeight="fontWeightExtrabold">Data Space</Text>
                </Th>
                <Th>
                  <Text fontWeight="fontWeightExtrabold">Segment Type</Text>
                </Th>
                <Th>
                  <Text fontWeight="fontWeightExtrabold">Segment Status</Text>
                </Th>
                <Th>
                  <Text fontWeight="fontWeightExtrabold">Publish Status</Text>
                </Th>
              </Tr>
            </THead>
            <TBody>
              {displayedSegments?.map((segment) => (
                <Tr key={segment.segmentId}>
                  <Td>{segment.name}</Td>
                  <Td>{segment.apiName}</Td>
                  <Td>{segment.segmentId}</Td>
                  <Td>{segment.segmentDefinitionId}</Td>
                  <Td>{segment.dataSpace}</Td>
                  <Td>{segment.segmentType}</Td>
                  <Td>
                    <Text
                      fontWeight="fontWeightExtrabold"
                      color={segment.segmentStatus === "ACTIVE" ? "colorTextDecorative20" : "colorTextError"}
                    >
                      {segment.segmentStatus}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      fontWeight="fontWeightExtrabold"
                      color={segment.publishStatus === "SUCCESS" ? "colorTextDecorative30" : "colorTextError"}
                    >
                      {segment.publishStatus}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </Box>
      )}
      <Separator orientation="horizontal" verticalSpacing="space80" />
      <Flex hAlignContent="right" vAlignContent="center">
        <Stack orientation="horizontal" spacing="space50">
          <Button variant="primary" onClick={nextHandler}>
            Next
          </Button>
          <Button variant="destructive_secondary" onClick={cancelHandler}>
            Cancel
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default Segments;
