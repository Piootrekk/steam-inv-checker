import React from "react";
interface CustomFooterPaginationProps {
  totalAmount: number;
  totalProfit: number;
  totalPriceAfterFee: number;
}

const CustomFooterPagination: React.FC<CustomFooterPaginationProps> = ({
  totalAmount,
  totalProfit,
  totalPriceAfterFee,
}) => {
  return (
    <>
      <p>Total amount: {totalAmount}</p>
      <p>Total profit: {totalProfit} PLN</p>
      <p> Total after fees: {totalPriceAfterFee} PLN</p>
    </>
  );
};

export default CustomFooterPagination;
