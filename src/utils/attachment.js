export const getFileName = (fileUrl) => {
  const splittedFileUrl = fileUrl.split('/');
  return splittedFileUrl[splittedFileUrl.length - 1];
};

export const getFileExtension = (fileUrl) => {
  const fileName = getFileName(fileUrl);
  const spliited = fileName.split('.');
  return spliited[spliited.length - 1];
};
