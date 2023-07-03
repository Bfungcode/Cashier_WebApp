import { useState, useEffect } from "react";
import Axios from "axios";

import logoImage from "../assets/logo-no-background.png";

export const Home = () => {
  function getImgUrl(name) {
    return new URL(`${name}`, import.meta.url).href;
  }
  const [data, setData] = useState([]);
  let imgSrc = "https://i.imgur.com/47Jtqh9.jpg";
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(
          "https://cashierapi-default-rtdb.asia-southeast1.firebasedatabase.app/foods.json"
        );
        const dataArray = Object.values(response.data);
        console.log(dataArray);
        setData(dataArray);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="bg-white w-5 flex flex-col p-2 justify-between items-center">
        <div className="logo flex flex-col gap-1 justify-center items-center">
          <img src={logoImage} alt="logo" className="w-60" />
          <div className="w-90 bg-black h-0.5"></div>
        </div>
        <div className="mb-6 flex flex-col gap-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="container bg-gray-100 w-75 h-full flex flex-column flex-wrap p-9 gap-5">
        <div id="header" className="w-full h-10 flex flex-col">
          <div
            id="upper"
            className="w-full flex flex-row items-center justify-between"
          >
            <div id="Welcome">
              <div className="text-5xl font-semibold">Welcome</div>
              <div className="text-sm font-light">
                Enjoy your life, enjoy your food.
              </div>
            </div>
            <div
              id="search"
              className="bg-white h-4/5 w-30 flex flex-row items-center pl-1 pr-1 gap-5 rounded-xl"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search Product...."
                  className="outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="content" className="w-full h-90 p-2">
          <div className="flex flex-wrap w-full justify-center mt-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-19 h-72 p-4 bg-white m-1 rounded-md box-border"
                // onClick={() => handleMenuClick(item)}
              >
                <div className="productPics">
                  <img
                    src={getImgUrl(item.img)}
                    alt="item.name"
                    className="object-cover w-full h-36 rounded-md"
                  />
                </div>
                <div className="productDesc w-full h-24 flex flex-row flex-wrap box-border">
                  <div className="font-bold text-sm breal-words overflow-hidden h-9 mt-1">
                    {item.name} Lorem, ipsum.
                  </div>
                  <div className="text-xs break-words h-12 overflow-hidden">
                    Lorem ipsum dolor sit amet consectetuing elit. Eligendi,
                    nihil.
                  </div>
                  <div className="font-medium text-yellow-500">
                    ${item.price}/pcs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white w-20"></div>
    </div>
  );
};
