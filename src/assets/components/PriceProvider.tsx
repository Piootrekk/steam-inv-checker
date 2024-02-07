// const [updatedAssets, setUpdatedAssets] = useState<FinalAssets[]>([]);

// https://steamcommunity.com/inventory/${steamId}/252490/2?l=english&count=5000
// http://steamcommunity.com/market/priceoverview/?appid=730&currency=6&market_hash_name=HASHNAME
// 76561198090272581 76561198141466635
// https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Za7WLEfCk4nReh8DEiv5dbMag6r7MzSPm-PITFYik
// backup url: `https://cors-anywhere.herokuapp.com/https://steamcommunity.com/inventory/${inputValue}/252490/2?l=english&count=5000`,

// const fetchPrice = async (market_hash_name: string, autoComValue: string) => {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: `https://express-proxy-jnve.onrender.com/get/https://steamcommunity.com/market/priceoverview/?appid=${autoComValue}&currency=6&market_hash_name=${market_hash_name}`,
//     });
//     if (response.data.success === false) {
//       return {
//         volume: "0",
//         lowest_price: "0",
//       };
//     }
//     return response.data;
//   } catch (error) {
//     return {
//       volume: "0",
//       lowest_price: "0",
//     };
//   }
// };


 // const updatePrices = async () => {
  //   const updatedAssetsData: FinalAssets[] = [];
  //   for (const asset of assets) {
  //     const response = await fetchPrice(asset.market_hash_name, autoComValue);
  //     console.log(response);
  //     const volume: string = response.volume;
  //     console.log(volume);
  //     const price: string = response.lowest_price;
  //     console.log(price);
  //     if (price !== "0" || volume !== "0") {
  //       updatedAssetsData.push({
  //         ...asset,
  //         volume,
  //         price,
  //       });
  //     } else {
  //       console.log("no price or volume");
  //     }

  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //   }

  //   setUpdatedAssets(updatedAssetsData);
  // };

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     console.log("check");
  //     updatePrices();
  //   }
  // }, [isLoading, data]);