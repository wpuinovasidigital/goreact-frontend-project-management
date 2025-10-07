export const getFileName = (fileUrl) => {
  const splittedFileUrl = fileUrl.split('/');
  return splittedFileUrl[splittedFileUrl.length - 1];
};
