export const parseToNumber = (value: string) => {
  try {
    return parseFloat(value.replace(",", ".").replace(/[^\d.-]/g, ""));
  } catch (error) {
    return value;
  }
};

export const volumeAdjust = (volume: string) => {
  try {
    return parseInt(volume.replace(",", ""));
  } catch (error) {
    return volume;
  }
};

export const steamMarketFeeCalc = (price: number) => {
  let fee = 0;
  switch (true) {
    case price >= 0.2:
      fee = price / 1.15 + 0.01;
      break;
    case price < 0.2 && price >= 0.12:
      fee = price / 1.15;
      break;
    case price < 0.2 && price > 0.03:
      fee = price / 1.15 - 0.01;
      break;
    case price === 0.03:
      fee = 0.01;
      break;
    default:
      fee = 0;
  }
  return Math.round(fee * 100) / 100;
};
