export const uploadFile = async (file) => {
  const url = 'https://api.cloudinary.com/v1_1/apps-nico-notnull/image/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);
  // const token = localStorage.getItem('token') || '';

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};
