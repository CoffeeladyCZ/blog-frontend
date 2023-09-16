export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export const saveLanguageToLocalStorage = (language: string) => {
  localStorage.setItem('language', language);
};

export const getLanguageFromLocalStorage = () => {
  return localStorage.getItem('language');
};
