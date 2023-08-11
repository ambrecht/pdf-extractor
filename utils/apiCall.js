import axios from 'axios';

export const uploadFileToServer = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post('/api/test', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
