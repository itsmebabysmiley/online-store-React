import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios'
import Navbar from './Navbar'
import { Redirect,useLocation } from "react-router-dom";
function Stockresults() {
  const [productList, setProductList] = useState([]);
  const [newPrice, setNewPrice] = useState(0);
  const [statusLogin, setstatusLogin] = useState(true);
  const search = useLocation().search;
    useEffect(() => {
        //get the token from local storage and call API to check token is valid or not.
        const token = localStorage.getItem("token");

        const asyncCallback = async () =>{
            const data = await Axios.post("http://localhost:3001/isUserAuth",{token : token})
            setstatusLogin(data.data.status);
        }
        asyncCallback()
        if(!statusLogin){
            return <Redirect to={'/'}/>
        }
        if(statusLogin == true){
            //get query parameter from url and then call API to get the data.
            const id = new URLSearchParams(search).get('id');
            const name = new URLSearchParams(search).get('name');
            const type = new URLSearchParams(search).get('type');
            const sortByPrice = new URLSearchParams(search).get('sortByPrice');
            console.log(id,name,type,sortByPrice);
            // var apiURL = localStorage.getItem("productAPI");
            var apiURL = '';
            if(!id){
                apiURL = `http://localhost:3001/results/${name}/${sortByPrice}/${type}`;
            }else{
                apiURL = `http://localhost:3001/results/${id}`
            }
            
            localStorage.removeItem("productAPI");
            if (apiURL != '') {
                Axios.get(apiURL).then((res) => {
                    console.log(res.data.data);
                    setProductList(res.data.data);
                });
            }
        }
    },[]);
    //if token suck, redirect to login page.


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
        <div className="d-flex flex-wrap justify-content-center" >
            {productList.map((val, key) => {
                return (
                    <div className="card" style={{width:"20rem", margin:"3rem", borderRadius: "40px"}}>
                        <img src={val.Image} class="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">ID: {val.pId}</h5>
                            <h5 className="card-title">{val.pName}</h5>
                            <p className="card-text d-flex"><h5>Detail: &nbsp;</h5> {val.detail} </p>
                            <p className="card-text d-flex"><h5>Type: &nbsp;</h5> {val.type}</p>
                            <p className="card-text d-flex"><h5>Price: &nbsp;</h5> {val.price} ฿</p>
                        </div>
                        <div className="card-body">
                            <input type="number" placeholder="new price ฿" style={{width:"15rem"}} onChange={(e)=>{setNewPrice(e.target.value)}}/>
                            <button className="btn" onClick={()=>{updateProduct(val.pId)}}>update</button> &nbsp;
                            <button className="btn" style={{backgroundColor: "rgb(217, 83, 79)"}} onClick={()=>{deleteProduct(val.pId)}}>Delete</button><br/>
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
