export const checkPropOfObject = (obj: any, prop: string, value: string) => {
  if (obj.hasOwnProperty(prop)) {
    return (obj[prop] = value);
  } else {
    return (obj[prop] = `ERROR`);
  }
};

export const setPropsToHardcodedString = (...args: any[]) => {
  return args.map((arg) => {
    return (arg = "ERROR");
  });
};
