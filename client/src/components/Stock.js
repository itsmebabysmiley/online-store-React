import React from 'react'
import { useState } from "react";
import Axios from 'axios'
import Navbar from './Navbar'
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
    const [newPrice, setNewPrice] = useState(0)
    const searchallproduct = () =>{
        var type = (searchType === 'none')? 'none': "'"+searchType+"'"
        if(searchType)
        Axios.get(`http://localhost:3001/results/none/${sortPrice}/${type}`).then(res=>{
            console.log(res.data.data);
            setProductList(res.data.data)
        })
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
        console.log(searchname,searchid,sortPrice,searchType);
        if(searchname !== 'none' && searchid != 'none'){
            return alert('Enter Id or name (Not Both!)')
        }
        if(searchid === 'none' && searchname === 'none'){
            searchallproduct();
        }
        else if(searchid != 'none'){
            console.log(searchid);
            Axios.get(`http://localhost:3001/results/${searchid}`).then(res=>{
            console.log(res.data.data);
            setProductList(res.data.data)
            })
        }else if(searchname != 'none'){
            var type = (searchType === 'none')? 'none': "'"+searchType+"'"
            Axios.get(`http://localhost:3001/results/${searchname}/${sortPrice}/${type}`).then(res=>{
                console.log(res.data.data);
                setProductList(res.data.data)
            })
        }
        
        
    }
    const insertProduct = () =>{
        let product_info = {
            pName : pName,
            price : price,
            detail : detail,
            Image : Image,
            type : type
        }
        console.log(product_info)
        Axios.post("http://localhost:3001/insertproducts",product_info).then(res =>{
            console.log(res.data.msg);
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
    const updateProduct = (id) =>{
        // console.log(newPrice,id);
        Axios.put("http://localhost:3001/updateproducts",{pId : id, price: newPrice}).then(res=>{
            console.log(res.data)
            setProductList(productList.map((val,key)=>{
                return (val.pId == id? {
                    pId : val.pId,
                    pName : val.pName,
                    price : newPrice,
                    detail : val.detail,
                    Image : val.Image,
                    type : val.type
                } : val)
            }))
        })
        

    }
    const deleteProduct = (id)=>{
        console.log(id)
        Axios.delete("http://localhost:3001/deleteproducts",{data: {pId: id}}).then(res =>{
            console.log(res.data.msg)
            alert(res.data.msg)
            setProductList(productList.filter((val)=>{
                return (val.pId != id);
            }))
        })

    }

    const result = ()=>{
        return(
            <div>
                {productList.map((val,key)=>{
                    return(
                        <div>
                            <div style={{border:"1px solid", margin:"10px", padding:"10px"}}>
                            <h3>ID: {val.pId}</h3>
                            <p>Name: {val.pName}</p>
                            <p>Price: {val.price}</p>
                            <p>detail: {val.detail}</p>
                            <p>Type: {val.type}</p>
                            <p>Image:</p>
                            <div className="container">
                                <img src={val.Image} alt="..." width="150px" height="150px"></img>
                            </div>
                            <button onClick={()=>{deleteProduct(val.pId)}}>Delete</button><br/>
                            <input type="number" placeholder=".... Baht" onChange={(e)=>{setNewPrice(e.target.value)}}/>
                            <button onClick={()=>{updateProduct(val.pId)}}>update</button>
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
