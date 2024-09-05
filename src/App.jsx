import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  increaseAmount,
  saveToBasket,
} from "./store/ProductsSlices";
import { TbBasketPlus } from "react-icons/tb";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    axios("https://dummyjson.com/products").then((res) => {
      res.data.products.map((item) => {
        item.amount = 1;
      });
      dispatch(getAllProducts(res.data.products));
    });
  }, [dispatch]);

  const total = products.filter((item) => item.isSaved).reduce((acc, curr) => acc + curr.amount * curr.price, 0).toFixed(2)


  return (
    <section className=" bg-yellow-100 h-screen">
      <div className="container grid grid-cols-12 gap-6 py-10 h-screen overflow-y-auto">
        <div className="col-span-7">
          <div className="grid grid-cols-12 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-span-6 p-4 bg-white rounded-lg"
              >
                <div className="relative">
                  <img
                    src={product.images[0]}
                    className="!h-[200px] mx-auto"
                    alt=""
                  />
                  <button
                    onClick={() => dispatch(saveToBasket(product.id))}
                    className={`${
                      product.isSaved ? "bg-orange-500 text-white" : "bg-white "
                    } border-2 p-2 px-4 rounded-full absolute -bottom-10 left-1/3 -translate-x-1/4 flex items-center gap-3 border-orange-500 hover:bg-orange-500 hover:text-white duration-300`}
                  >
                    <TbBasketPlus className="scale-125" />
                    <p className="font-bold">
                      {product.isSaved ? "Added" : "Add Basket"}
                    </p>
                  </button>
                </div>
                <div className="mt-16">
                  <h1 className="text-lg font-bold">{product.title}</h1>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center">
                      {[...Array(Math.round(product.rating))].map((_, i) => (
                        <span key={i} className="inline-block">
                          <FaStar className=" text-yellow-500" />
                        </span>
                      ))}
                      {[...Array(Math.round(6 - product.rating))].map(
                        (_, i) => (
                          <span key={i} className="inline-block">
                            <FaStar className=" " />
                          </span>
                        )
                      )}
                    </div>

                    <p className="font-bold">{product.rating}</p>
                  </div>
                  <p className="mt-4 line-clamp-4">{product.description}</p>

                  <p className="font-bold text-xl text-orange-500">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 p-5 h-fit sticky top-0 bg-white rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="capitalize text-xl font-bold text-orange-500">
              your basket ({products.filter((item) => item.isSaved).length})
            </h1>
            <p>total: ${total}</p>
          </div>
          {products
            .filter((item) => item.isSaved)
            .map((item) => (
              <div
                key={item.id}
                className="rounded-md text-white mt-3 flex p-3 items-center justify-between bg-slate-400"
              >
                <img width={100} src={item.images[0]} alt="" />
                <div className="flex flex-col">
                  <p className="font-bold">{item.title}</p>
                  <div className="flex items-center">
                    <FaMinus />
                    <p className="font-bold">{item.amount}</p>
                    <FaPlus onClick={() => dispatch(increaseAmount(item.id))} />
                  </div>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default App;
