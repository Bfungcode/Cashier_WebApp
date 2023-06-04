import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";
import Axios from "axios";

import {
  faCircleUser,
  faHandshake,
  faPerson,
  faPersonCircleCheck,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const [data, setData] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [splitCount, setSplitCount] = useState(1);
  const [splitAmount, setSplitAmount] = useState(0);
  const [showSplit, setShowSplit] = useState(false);
  const totalBillAmount = totalPrice;
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentResult, setPaymentResult] = useState("");
  const [changeAmount, setChangeAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [chargeClicked, setChargeClicked] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          "https://cashierapi-default-rtdb.asia-southeast1.firebasedatabase.app/foods.json"
        );
        const dataArray = Object.values(response.data);
        setData(dataArray);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const handleMenuClick = (item) => {
    const selectedMenu = selectedMenus.find((menu) => menu.name === item.name);
    const updatedMenus = [...selectedMenus];

    if (selectedMenu) {
      selectedMenu.count += 1;
    } else {
      const newMenu = { ...item, count: 1 };
      updatedMenus.push(newMenu);
    }

    setSelectedMenus(updatedMenus);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
  };
  const clearSale = () => {
    setSelectedMenus([]);
    setTotalPrice(0);
  };

  const printBill = () => {
    const billElement = document.getElementById("bill");

    html2canvas(billElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("bill.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  const handleSplitClick = () => {
    setShowSplit(true);
  };

  const handleSplitCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setSplitCount(count);
  };

  const handleSplitSubmit = () => {
    const amountPerPerson = totalBillAmount / splitCount;
    setSplitAmount(amountPerPerson);
    setShowSplit(false);
  };
  const handlePaymentAmountChange = (event) => {
    setPaymentAmount(event.target.value);
  };
  const handleChargesClick = () => {
    const paymentValue = parseFloat(paymentAmount);
    if (paymentValue >= totalBillAmount) {
      const change = paymentValue - totalBillAmount;
      setChangeAmount(change);
      alert(`Payment Success, Changes: ${change}`);
    } else {
      alert(`Payment Fails`);
    }
    setOpen(false);
  };

  return (
    <div className="outer">
      <div className="allWrap">
        <div className="partOne">
          <div className="boxWrapper">
            {data.map((item, index) => (
              <div
                key={index}
                className="boxProduct"
                onClick={() => handleMenuClick(item)}
              >
                <div className="productPics">
                  <img src={item.img} alt="item.name" />
                </div>
                <div className="productName">
                  <h3>{item.name}</h3>
                  <p>Rp: {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="partTwo">
          <div className="profileHeader">
            <div className="customerLogo">
              <div className="iconLogo">
                <FontAwesomeIcon icon={faCircleUser} size="2x" />
                <span>username</span>
              </div>
            </div>
            <div className="headerHeadline">
              <h1>New Customer</h1>
            </div>
            <div className="billingLogo">
              <FontAwesomeIcon icon={faReceipt} size="2x" />
              <span>Biling List</span>
            </div>
          </div>
          <div className="profilBill" id="bill">
            <div className="dineOption">
              <h5>Dine in</h5>
            </div>
            <hr></hr>
            <div className="billWrap">
              {selectedMenus.map((menu, index) => (
                <div key={index} className="bill">
                  <div className="billFood">
                    <h4>{menu.name}</h4>
                  </div>
                  <div className="foodAmount">
                    <h4>x{menu.count}</h4>
                  </div>
                  <div className="billAMount">
                    <h4>Rp {menu.price * menu.count}</h4>
                  </div>
                </div>
              ))}
            </div>
            <hr></hr>
            <div className="billTotal">
              <h4>total: </h4>
              <h4>Rp. {totalPrice}</h4>
              <h4>Split Amount: Rp. {splitAmount}</h4>
            </div>
          </div>
          <div className="functionWrap">
            <div className="functionClear" onClick={clearSale}>
              <hr></hr>
              <h3>Clear Sale</h3>
              <hr></hr>
            </div>
            <div className="functionBill">
              <div className="saveBill">
                <h4>Save Bill</h4>
              </div>
              <div className="printbill" onClick={printBill}>
                <h4>Print Bill</h4>
              </div>
            </div>
            <div className="chargePay">
              <div className="handshakeLogo" onClick={handleSplitClick}>
                <FontAwesomeIcon icon={faHandshake} size="2x" />
                <span>Split Bill</span>
              </div>
              <div
                className="charges"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <h2>Charge Rp {totalPrice}</h2>
              </div>
            </div>
          </div>
          {open && (
            <div className="chargesPayment">
              <input
                type="number"
                placeholder="Enter payment amount"
                value={paymentAmount}
                onChange={handlePaymentAmountChange}
              />
              <button className="btnPayment" onClick={handleChargesClick}>
                Charge Rp {totalBillAmount}
              </button>
            </div>
          )}
          {showSplit && (
            <div className="popup">
              <h4>Input the number of people</h4>
              <div className="inputPerson">
                <input
                  type="number"
                  value={splitCount}
                  onChange={handleSplitCountChange}
                />
                <button className="btnPopUp" onClick={handleSplitSubmit}>
                  Calculate Split
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
