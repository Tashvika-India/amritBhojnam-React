export const orange = "#F26722";
export const baseURL = import.meta.env.VITE_BASE_API_URL;

export const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
export  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
  
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format
    };
  
    return date.toLocaleString("en-US", options).replace(",", "");
  };