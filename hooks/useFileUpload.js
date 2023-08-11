// hooks/useFileUpload.js
import { useCallback } from 'react';
import { setItemInLocalStorage } from '../utils/setLocalStorage.js';
import { uploadFileToServer } from '../utils/apiCall.js';

const useFileUpload = () => {
  const handleFileChange = useCallback(async (e) => {
    if (e.target.files[0]) {
      try {
        const response = await uploadFileToServer(e.target.files[0]);
        response.forEach((paragraph, index) => {
          setItemInLocalStorage(`paragraph_${index}`, paragraph);
        });
        alert('Upload erfolgreich!');
      } catch (error) {
        alert('Fehler beim Hochladen: ' + error.message);
      }
    }
  }, []);

  return handleFileChange;
};

export default useFileUpload;
