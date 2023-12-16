const fetchData = async (url: string, init: RequestInit | undefined) => {
  const res = await fetch(url, init);
  const data = await res.json();

  return data;
};

export default fetchData;
