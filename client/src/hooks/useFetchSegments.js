import { useState, useEffect } from "react";

export const useFetchSegments = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/segment" : "/segment";
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        const formattedSegments = data.segments.map((segment) => ({
          name: segment.displayName,
          apiName: segment.apiName,
          dataSpace: segment.dataSpace,
          segmentDefinitionId: segment.marketSegmentDefinitionId,
          segmentId: segment.marketSegmentId,
          segmentStatus: segment.segmentStatus,
          publishStatus: segment.publishStatus ?? "NOT PUBLISHED",
          segmentType: segment.segmentType,
        }));

        const activeSegments = formattedSegments.filter((segment) => segment.segmentStatus === "ACTIVE");
        const publishedSegments = formattedSegments.filter((segment) => segment.publishStatus === "SUCCESS");
        const otherSegments = formattedSegments.filter(
          (segment) => segment.segmentStatus !== "ACTIVE" || segment.publishStatus !== "SUCCESS"
        );

        setData({ formattedSegments, activeSegments, publishedSegments, otherSegments });
        setError(null);
        setIsLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          setError(null);
        } else {
          console.error("Error loading segment data:", error);
          setError(error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return { data, isLoading, error };
};
