import axios from 'axios';

// Generic Axios function
const fetchData = async (url: string, method: string = 'GET', params: any = {}) => {
  try {
    const response = await axios({
      url,
      method,
      params,
    });

    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getImageInBase64 = async (imageUrl: string) => {
  let res = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  return `data:image/png;base64,${Buffer.from(res.data).toString("base64")}`
}

export default fetchData;