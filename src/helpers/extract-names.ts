const extractNames = (collection = [] as { name: { common: string } }[]) => {
  return collection.map((el) => el.name.common);
};

export default extractNames;
