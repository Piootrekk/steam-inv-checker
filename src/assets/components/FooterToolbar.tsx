import { GridFooterContainer } from "@mui/x-data-grid";
import React from "react";
interface FooterToolbarProps {
  totalAmount: number;
  totalProfit: number;
  averageProfit: number;
}

const FooterToolbar: React.FC<FooterToolbarProps> = ({
  totalAmount,
  totalProfit,
  averageProfit,
}) => {
  return (
    <>
      <GridFooterContainer>
        <p>Total amount: {totalAmount}</p>
        <p>Total profit: {totalProfit}</p>
        <p> Average profit: {averageProfit}%</p>
      </GridFooterContainer>
    </>
  );
};

export default FooterToolbar;
