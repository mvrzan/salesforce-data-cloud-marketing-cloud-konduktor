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

    return { formattedSegments, activeSegments, publishedSegments, otherSegments };
  } catch (error) {
    console.error("Error loading design", error);
    return [];
  }
};
