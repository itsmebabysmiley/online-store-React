import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios'
import Navbar from './Navbar'
import { Redirect } from "react-router-dom";
function Stock() {
    const [search, setSearch] = useState('');
    const [sortPrice, setSortPrice] = useState('none');
    const [pId, setpId] = useState('none');
    const [searchType ,setSearchType] = useState('none');
    const [pName, setpName] = useState('');
    const [price, setprice] = useState('');
    const [detail, setdetail] = useState('');
    const [Image, setImage] = useState('');
    const [type, setType] = useState('none');
    const [productList ,setProductList] = useState([])
    const [statusLogin, setstatusLogin] = useState(false);
    const [searchstatus, setSearchstatus] = useState(false);
    //authorized user is login or not.
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
      });
      //not login then redirect to login page.
      if(statusLogin){
          return <Redirect to={'/'}/>
      }

    const searchallproduct = () =>{
        var type = (searchType === 'none')? 'none': "'"+searchType+"'"
        if(searchType){
            var temp = `http://localhost:3001/results/none/${sortPrice}/${type}`
            localStorage.setItem("productAPI",temp)
            setSearchstatus(true);
            
        }
        
    }
    const searchproduct = () =>{
        var searchname = search.trim();
        var searchid = pId.trim();
        if(searchname === ''){
            searchname = 'none'
        }
        if(searchid === ''){
            searchid = 'none'
        }
        // console.log(searchname,searchid,sortPrice,searchType);
        if(searchname !== 'none' && searchid != 'none'){
            return alert('Enter Id or name (Not Both!)')
        }
        if(searchid === 'none' && searchname === 'none'){
            searchallproduct();
        }
        else if(searchid != 'none'){
            // console.log(searchid);
            var temp = `http://localhost:3001/results/${searchid}`
            localStorage.setItem("productAPI",temp);
            setSearchstatus(true);

        }else if(searchname != 'none'){
            var type = (searchType === 'none')? 'none': "'"+searchType+"'"
            var temp = `http://localhost:3001/results/${searchname}/${sortPrice}/${type}`
            setSearchstatus(true);
            localStorage.setItem("productAPI",temp)

        }
        
    }
    //if user click, search or searchall it will redirect to stock results page.
    if(searchstatus){
        return <Redirect to={'/productresults'}/>
    }
    const insertProduct = () =>{
        let product_info = {
            pName : pName,
            price : price,
            detail : detail,
            Image : Image,
            type : type
        }
        // console.log(product_info)
        Axios.post("http://localhost:3001/insertproducts",product_info).then(res =>{
            // console.log(res.data.msg);   
            alert(res.data.msg);
            setProductList([...productList,{
                pName : pName,
                price : price,
                detail : detail,
                Image : Image,
                type : type
            }])
        })
    }

    const result = ()=>{
        return(
            <div>
                {productList.map((val,key)=>{
                    return(
                        <div>
                            <div style={{border:"1px solid", margin:"10px", padding:"10px"}}>
                            {/* <h3>ID: {val.pId}</h3> */}
                            <p>Name: {val.pName}</p>
                            <p>Price: {val.price}</p>
                            <p>detail: {val.detail}</p>
                            <p>Type: {val.type}</p>
                            <p>Image:</p>
                            <div className="container">
                                <img src={val.Image} alt="..." width="150px" height="150px"></img>
                            </div>
                            {/* <button onClick={()=>{deleteProduct(val.pId)}}>Delete</button><br/>
                            <input type="number" placeholder=".... Baht" onChange={(e)=>{setNewPrice(e.target.value)}}/>
                            <button onClick={()=>{updateProduct(val.pId)}}>update</button> */}
                        </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1 style={{textAlign: "center"}}>Stock page</h1>
                <div>
                    <h1>Insert new product</h1>
                    <input type="text" placeholder="Enter product name" onChange={(e)=>{setpName(e.target.value)}}/><br />
                    <input type="number" placeholder="Enter price" onChange={(e)=>{setprice(e.target.value)}}/><br />
                    <input type="text" placeholder="Enter detail" onChange={(e)=>{setdetail(e.target.value)}}/><br />
                    <input type="text" placeholder="Image link" onChange={(e)=>{setImage(e.target.value)}}/><br />
                    <label>Type:</label>
                    <select value={type} onChange={(e) =>{setType(e.target.value)}}>
                    <option value="none">none</option>
                        <option value="cassette">Cassette</option>
                        <option value="film">Film</option>
                        <option value="vinyl">Vinyl</option>
                    </select><br/>
                    <button onClick={()=>{insertProduct()}}>insert</button>
                </div>
                <div >
                    <h1>Search product</h1>
                    <input style={{width:"50px"}} type="text" placeholder=" ID " onChange={(e) =>{setpId(e.target.value)}}/>&nbsp; or &nbsp; 
                    <input type="text" placeholder="Product name" onChange={(e) =>{setSearch(e.target.value)}}/>
                    <label>Type:</label>
                    <select value={searchType} onChange={(e) =>{setSearchType(e.target.value)}}>
                        <option value="none">none</option>
                        <option value="cassette">Cassette</option>
                        <option value="film">Film</option>
                        <option value="vinyl">Vinyl</option>
                    </select>
                    <label>Sort by price:</label>
                    <select value={sortPrice} onChange={(e) =>{setSortPrice(e.target.value)}}>
                        <option value="none">none</option>
                        <option value="ASC">low to high</option>
                        <option value="DESC">high to low</option>
                    </select>&nbsp;
                    <button onClick={()=>(searchproduct())}>search</button>
                    <button onClick={()=>(searchallproduct())}>search all</button>
                </div>
                {result()}
            </div>  
        </div>
    )
}

export default Stock
