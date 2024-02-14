import axios from "axios";

// https://steamcommunity.com/inventory/${steamId}/252490/2?l=english&count=5000
// http://steamcommunity.com/market/priceoverview/?appid=730&currency=6&market_hash_name=HASHNAME
// 76561198090272581 76561198141466635
// https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Za7WLEfCk4nReh8DEiv5dbMag6r7MzSPm-PITFYik
// backup url: `https://cors-anywhere.herokuapp.com` https://thingproxy.freeboard.io/fetch/
// https://express-proxy-jnve.onrender.com/
// https://thingproxy.freeboard.io/fetch/
const fetchData = async (url: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
    });
    return response.data;
  } catch (error) {
    console.error(`:C ${error}`);
  }
};

export const fetchInventory = async (
  inputValue: string,
  autoComValue: string
) => {
  const version = autoComValue === "322330" ? "1" : "2";
  const url = `https://thingproxy.freeboard.io/fetch/https://steamcommunity.com/inventory/${inputValue}/${autoComValue}/${version}?l=english&count=5000`;
  return await fetchData(url);
};

export const fetchPrice = async (
  market_hash_name: string,
  autoComValue: string
) => {
  const url = `https://express-proxy-jnve.onrender.com/get/https://steamcommunity.com/market/priceoverview/?appid=${autoComValue}&currency=6&market_hash_name=${market_hash_name}`;
  return await fetchData(url);
};
