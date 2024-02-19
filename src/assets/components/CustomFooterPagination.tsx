import React from "react";
interface CustomFooterPaginationProps {
  totalAmount: number;
  totalProfit: number;
  averageProfit: number;
}

const CustomFooterPagination: React.FC<CustomFooterPaginationProps> = ({
  totalAmount,
  totalProfit,
  averageProfit,
}) => {
  return (
    <>
      <p>Total amount: {totalAmount}</p>
      <p>Total profit: {totalProfit}</p>
      <p> Average profit: {averageProfit}%</p>
    </>
  );
};

export default CustomFooterPagination;
