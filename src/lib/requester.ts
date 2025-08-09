import { NEXT_PUBLIC_BASE_URL } from "@utils/constants";

export const requester = async (url: string) => {
  try {
    if (NEXT_PUBLIC_BASE_URL === undefined) {
      // throw new Error("Base url not defined!");
      console.warn("⚠️ Base URL is not defined. Returning mock data.");

      // Обход
      return {
        data: "Mock response",
      };
    }

    // Обход
    const fullUrl = `${NEXT_PUBLIC_BASE_URL}${url}`;

    const response = await fetch(fullUrl, { next: { revalidate: 120 } });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Request error:", error);
  }
};
