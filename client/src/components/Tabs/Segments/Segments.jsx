import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Flex } from "@twilio-paste/core/flex";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Separator } from "@twilio-paste/core/separator";

import Segment from "./Segment";
import { getSegment } from "../../../utils/getSegment";

const Segments = () => {
  const [segments, setSegments] = useState([]);
  const [displayedSegments, setDisplayedSegments] = useState([]);
  const navigate = useNavigate();

  const activeSegmentsHandler = () => {
    setDisplayedSegments(segments.filter((segment) => segment.segmentStatus === "ACTIVE"));
  };

  const publishedSegmentsHandler = () => {
    setDisplayedSegments(segments.filter((segment) => segment.publishStatus === "SUCCESS"));
  };

  const otherSegmentsHandler = () => {
    setDisplayedSegments(
      segments.filter((segment) => segment.segmentStatus !== "ACTIVE" || segment.publishStatus !== "SUCCESS")
    );
  };

  const cancelHandler = () => {
    navigate("/");
  };

  const nextHandler = () => {
    console.log("Next button clicked");
  };

  useEffect(() => {
    const fetchSegments = async () => {
      const fetchedSegments = await getSegment();
      setSegments(fetchedSegments);
      setDisplayedSegments(fetchedSegments);
    };

    fetchSegments();
  }, []);

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
      {displayedSegments?.map((segment, index) => (
        <Segment key={index} segment={segment} />
      ))}
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
