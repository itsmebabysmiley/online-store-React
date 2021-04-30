import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios'
import Navbar from './Navbar'
import { Redirect } from "react-router-dom";
function Stockresults() {
  const [productList, setProductList] = useState([]);
  const [newPrice, setNewPrice] = useState(0);
  const [statusLogin, setstatusLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.log(token);
        Axios.post("http://localhost:3001/isUserAuth",{token : token}).then((res) => {
        //   console.log(res.data.status);
        if(res.data.status === false){
            localStorage.removeItem('token');
            setstatusLogin(true)
        }  
        });

        var apiURL = localStorage.getItem("productAPI");
        localStorage.removeItem("productAPI");
        console.log("ok");
        if (apiURL) {
        Axios.get(apiURL).then((res) => {
            console.log(res.data.data);
            setProductList(res.data.data);
        });
        }
    });

    if(statusLogin){
        return <Redirect to={'/'}/>
    }

    const updateProduct = (id) => {
        // console.log(newPrice,id);
        Axios.put("http://localhost:3001/updateproducts", {
        pId: id,
        price: newPrice,
        }).then((res) => {
        alert(res.data.msg)
        setProductList(
            productList.map((val, key) => {
            return val.pId == id
                ? {
                    pId: val.pId,
                    pName: val.pName,
                    price: newPrice,
                    detail: val.detail,
                    Image: val.Image,
                    type: val.type,
                }
                : val;
            })
        );
        });
    };
    const deleteProduct = (id) => {
        // console.log(id)
        Axios.delete("http://localhost:3001/deleteproducts", {
        data: { pId: id },
        }).then((res) => {
        // console.log(res.data.msg)
        alert(res.data.msg);
        setProductList(
            productList.filter((val) => {
            return val.pId != id;
            })
        );
        });
    };
    const result = () => {
        return (
        <div>
            {productList.map((val, key) => {
            return (
                <div>
                <div
                    style={{ border: "1px solid", margin: "10px", padding: "10px" }}
                >
                    <h3>ID: {val.pId}</h3>
                    <p>Name: {val.pName}</p>
                    <p>Price: {val.price}</p>
                    <p>detail: {val.detail}</p>
                    <p>Type: {val.type}</p>
                    <p>Image:</p>
                    <div className="container">
                    <img
                        src={val.Image}
                        alt="..."
                        width="150px"
                        height="150px"
                    ></img>
                    </div>
                    <button onClick={()=>{deleteProduct(val.pId)}}>Delete</button><br/>
                            <input type="number" placeholder=".... Baht" onChange={(e)=>{setNewPrice(e.target.value)}}/>
                            <button onClick={()=>{updateProduct(val.pId)}}>update</button>
                </div>
                </div>
            );
            })}
        </div>
        );
    };
    return (
        <div>
            <Navbar/>
            <h1 style={{ textAlign: "center" }}>This is stock results</h1>
            {result()}
        </div>
    );
}

export default Stockresults;
