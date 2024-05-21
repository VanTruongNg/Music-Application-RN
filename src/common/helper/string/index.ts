export const isHttpsURL = (inputString: string) => {
    if (!inputString) return false;
    return inputString.startsWith('https://');
  };
  
  export const isFirebaseUrl = (inputString: string) => {
    if (!inputString) return false;
    return inputString.startsWith('https://firebasestorage');
  };
  export const formatKeywordParams = (keyword: string) => {
    if (!keyword) return '';
  
    return keyword.replace(/ /g, '%2520');
  };
  