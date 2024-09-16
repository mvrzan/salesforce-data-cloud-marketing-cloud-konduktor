export const getSegment = async () => {
  try {
    const url = "/segment";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch segment");
    }

    const data = await response.json();
    const formattedSegments = data.segments.map((segment) => ({
      name: segment.displayName,
      segmentDefinitionId: segment.marketSegmentDefinitionId,
      segmentId: segment.marketSegmentId,
    }));

    return formattedSegments;
  } catch (error) {
    console.error("Error loading design", error);
    return [];
  }
};
