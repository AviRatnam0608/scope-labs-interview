const dateConvertor = (props: { date: string }) => {
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

export default dateConvertor;
