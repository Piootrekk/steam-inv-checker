export const checkPropOfObject = (obj: any, prop: string, value: string) => {
  if (obj.hasOwnProperty(prop)) {
    return (obj[prop] = value);
  } else {
    return (obj[prop] = `ERROR`);
  }
};

export const setPropsToHardcodedString = (...args: string[]) => {
  return args.map((arg) => {
    arg = `ERROR`;
    return args;
  });
};

export const ignoreCapInCompare = (str: string, str2: string) => {
  return str.toLowerCase() === str2.toLowerCase();
};
