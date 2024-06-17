const getUserID = (word: string) => {
  return word.toLowerCase().split(" ").join("_");
};

export default getUserID;
