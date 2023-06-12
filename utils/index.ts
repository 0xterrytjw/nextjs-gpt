export const formatURLs = (text: string) => {
  const urlRegex =
    /((?<![\w-])(https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="font-bold text-blue-500 underline hover:text-blue-400 transition-all">${url}</a>`
  );
};
