export interface FinalAssets {
  key: number;
  market_hash_name: string;
  amount: number;
  icon_url: string;
  name_color: string;
  marketable: boolean | number;
  price: string | number;
  volume: string | number;
  median_price: string | number;
}

export interface FinalAssetsDisplay extends FinalAssets {
  afteFee: number | null;
  boughtPrice: number | null;
  profit: number | null;
  profitPercent: number | null;
}
