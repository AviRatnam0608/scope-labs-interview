export const convertToEmbed = (url: string) => {
  return url.replace("watch?v=", "embed/");
};

export const dateConvertor = (props: { date: string }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return <>{new Date(props.date).toLocaleString(undefined, options)}</>;
};

export const getUserID = (word: string) => {
  return word.toLowerCase().split(" ").join("_");
};

export const makeNameReadable = (name: string) => {
  return name
    ?.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
