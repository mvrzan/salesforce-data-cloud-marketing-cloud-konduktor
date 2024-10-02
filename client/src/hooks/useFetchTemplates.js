import { useEffect, useState } from "react";

export const useFetchTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const url =
          process.env.NODE_ENV === "development" ? "http://localhost:3000/email-templates" : "/email-templates";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        setTemplates(data);
      } catch (error) {
        console.error("Error fetching email templates from Marketing Cloud:", error);
      }
    };

    fetchTemplates();
  }, []);

  return { templates };
};
