// api.js

const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.blog.redberryinternship.ge/api/blogs`,
        {
          headers: {
            Authorization:
              "Bearer 9bf9e1d01445670513eb7efd8efd8a54ec810ae9a16c1dc96929f885aeeff00e",
          },
        }
      );
  
      if (!response.ok) {
        console.error("Error fetching blogs:", response.statusText);
        return [];
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
      return [];
    }
  };
  
  export { fetchData };
  