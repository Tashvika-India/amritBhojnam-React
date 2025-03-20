import { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";

const useURLFilters = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search);


  const [filters, setFilters] = useState({
    product_id: search.get("product_id") || "",
    category_id: search.get("category_id") || "",
    name: search.get("name") || "",
    search: search.get("search") || "",
    minPrice : search.get("minPrice") || 0,
    maxPrice : search.get("maxPrice") || 500,
    rating : search.get("rating") || ""
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const parsedFilters = {
      search: searchParams.get("search") || "",
      product_id: searchParams.get("product_id") || "",
      category_id: searchParams.get("category_id") || "",
      name: searchParams.get("name") || "",
      minPrice: searchParams.get("minPrice") || 0,
      maxPrice: searchParams.get("maxPrice") || 500,
      rating: searchParams.get("rating") || "",
    };
  
    // Only update state if filters have actually changed
    setFilters((prevFilters) => {
      if (JSON.stringify(prevFilters) !== JSON.stringify(parsedFilters)) {
        return parsedFilters;
      }
      return prevFilters;
    });
  }, [location.search]);
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    const searchParams = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        if (Array.isArray(newFilters[key])) {
          searchParams.set(key, newFilters[key].join(","));
        } else {
          searchParams.set(key, newFilters[key]);
        }
      }
    });
    const newSearch = searchParams.toString();
    return newSearch;
  };

  return [filters, updateFilters];
};

export default useURLFilters;