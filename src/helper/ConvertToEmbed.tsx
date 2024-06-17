const convertToEmbed = (url: string) => {
  return url.replace("watch?v=", "embed/");
};

export default convertToEmbed;
