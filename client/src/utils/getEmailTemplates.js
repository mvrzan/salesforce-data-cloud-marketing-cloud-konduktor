export const getEmailTemplates = async () => {
  try {
    const url = "/email-templates";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch segment");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading design", error);
    return [];
  }
};