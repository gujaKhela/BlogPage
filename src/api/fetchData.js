// api.js

const fetchData = async () => {
  try {
    const response = await fetch(
      `https://api.blog.redberryinternship.ge/api/blogs`,
      {
        headers: {
          Authorization:
            "Bearer a6908d2c16e194d7775c053c7343041cc52efdae11424aa4ff3748955430e93a",
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
