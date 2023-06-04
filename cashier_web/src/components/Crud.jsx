import React, { useState, useEffect } from "react";
import "../styles/crud.css";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faDeleteLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export const Crud = () => {
  const url =
    "https://cashierapi-default-rtdb.asia-southeast1.firebasedatabase.app/foods.json";
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    price: "",
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(url);
        const dataArray = Object.values(response.data);
        setData(dataArray);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const takeImage = async (e) => {
    const formData = new FormData();
    formData.append("image", file);

    await fetch("https://api.imgur.com/3/image/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Client-ID 820772a5fc11262",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Image uploaded");
          console.log(res);
        } else {
          alert("Image upload failed");
          console.log(res);
        }
      })
      .catch((err) => {
        alert("Image upload failed");
        console.log(err);
      });
  };
  const editProductDelete = async (id) => {
    try {
      await Axios.delete(`${url}/${id}`);
      const updatedData = data.filter((product) => product.id !== id);
      setData(updatedData);
      console.log("Product deleted successfully.");
    } catch (error) {
      console.log("Failed to delete product:", error);
    }
  };
  return (
    <div className="outer">
      <div className="allWrap">
        <div className="partOne">
          <div className="boxWrapper">
            {data.map((item) => (
              <div className="boxProductCrud" key={item.id}>
                <div className="boxCrud">
                  <div
                    className="editProductDelete"
                    onClick={() => editProductDelete(item.id)}
                  >
                    <FontAwesomeIcon icon={faDeleteLeft} size="1x" />
                  </div>
                </div>
                <div className="productPicsCrud">
                  <img src={item.img} />
                </div>
                <div className="productName">
                  <h3>{item.name}</h3>
                  <p>Rp: {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="partCrud">
          <div className="crudHeader">
            <h1>Product Updates</h1>
          </div>
          <div className="createForm">
            <div className="inputName">
              <label>Nama Produk</label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="inputImage">
              <label>Gambar Produk</label>
              <input name="file" type="file" />
            </div>
            <div className="inputPrice">
              <label>Harga produk</label>
              <input
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                s
              />
            </div>
          </div>
          <div className="buttonSubmit">
            <button className="btnAdd" onClick={takeImage}>
              <h2>Add Product</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
