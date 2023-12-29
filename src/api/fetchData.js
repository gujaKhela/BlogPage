// api.js

const fetchData = async () => {
  try {
    const response = await fetch(
      `https://api.blog.redberryinternship.ge/api/blogs`,
      {
        headers: {
          Authorization:
            "Bearer 9ef0d6b55a8c8bf314146b2601b506eca81d51fc1109983ae787af7af1e35c23",
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
