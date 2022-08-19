const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const getCategories = async () => {
    try {
      const url = `${server}/categories`
      const res = await fetch(url)
      const categories = res.json();
      return categories;
    } catch (error) {
      return error;
    }
  }