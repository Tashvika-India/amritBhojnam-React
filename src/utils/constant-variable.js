export const orange = "#F26722";
export const baseURL = import.meta.env.VITE_BASE_API_URL;

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const formatDateTime = (dateString) => {
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




export const formatDeliveryDateCustom = (pinDate) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const date = new Date(pinDate);
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();

  return `${dayName}, ${monthName} ${day}`;
};


export const loginonWeb = localStorage.getItem("access") || localStorage.getItem("refresh");


export const getRandomColor = () => {
  // Generate a random color in hex format
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const isGreyColor = (color) => {
  // Check if the color is grey by comparing RGB values
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xFF;
  const g = (rgb >> 8) & 0xFF;
  const b = rgb & 0xFF;
  return r === g && g === b; // Check if all RGB components are equal
};

export const lightenColor = (color, percent) => {
  // Lighten the color by the given percentage
  const rgb = parseInt(color.slice(1), 16);
  let r = (rgb >> 16) & 0xFF;
  let g = (rgb >> 8) & 0xFF;
  let b = rgb & 0xFF;

  r = Math.min(255, r + (255 - r) * percent);
  g = Math.min(255, g + (255 - g) * percent);
  b = Math.min(255, b + (255 - b) * percent);

  return `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1)}`;
};

export const darkenColor = (color, percent) => {
  // Darken the color by the given percentage
  const rgb = parseInt(color.slice(1), 16);
  let r = (rgb >> 16) & 0xFF;
  let g = (rgb >> 8) & 0xFF;
  let b = rgb & 0xFF;

  r = Math.max(0, r - (r * percent));
  g = Math.max(0, g - (g * percent));
  b = Math.max(0, b - (b * percent));

  return `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1)}`;
};



export const transformApiData = (apiData) => {
  const monthMapping = {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec",
  };

  const months = Object.values(monthMapping);
  const currentYear = new Date().getFullYear();
  // Create a default dataset with all months set to 0
  const formattedData = months.map((month) => ({
    month,
    order: 0,
    year: currentYear,
  }));

  // Update default dataset with actual API data
  apiData.forEach(({ month, year, orders }) => {
    const formattedMonth = monthMapping[month.toLowerCase()];
    const index = formattedData.findIndex((item) => item.month === formattedMonth);
    if (index !== -1) {
      formattedData[index].order = orders;
    }
  });

  return formattedData;
};


export const transformRevenueData = (apiData) => {
  const monthMapping = {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec",
  };

  const months = Object.values(monthMapping);
  const currentYear = new Date().getFullYear();
  
  // Create a default dataset with all months set to 0
  const formattedData = months.map((month) => ({
    month,
    revenue: 0,
    year: currentYear,
  }));

  // Update default dataset with actual API data
  apiData.forEach(({ data, year, revenue }) => {
    const formattedMonth = monthMapping[data.toLowerCase()];
    const index = formattedData.findIndex((item) => item.month === formattedMonth);
    if (index !== -1) {
      formattedData[index].revenue = revenue;
    }
  });

  return formattedData;
};

export const transformApiDataRevenue = (apiData) => {
  const monthMapping = {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec",
  };

  const months = Object.values(monthMapping);
  const currentYear = new Date().getFullYear();
  // Create a default dataset with all months set to 0
  const formattedData = months.map((month) => ({
    month,
    revenue: 0,
    year: currentYear,
  }));

  // Update default dataset with actual API data
  apiData.forEach(({ month, year, revenue }) => {
    const formattedMonth = monthMapping[month?.toLowerCase()];
    console.log(formattedMonth)
    const index = formattedData.findIndex((item) => item.month === formattedMonth);
    if (index !== -1) {
      formattedData[index].order = revenue;
    }
  });

  return formattedData;
};

