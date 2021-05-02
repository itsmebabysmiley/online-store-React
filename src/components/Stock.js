import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Navbar";
import { Redirect, Link, useHistory } from "react-router-dom";
function Stock() {
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("none");
  const [pId, setpId] = useState("none");
  const [searchType, setSearchType] = useState("none");
  const [pName, setpName] = useState("");
  const [price, setprice] = useState("");
  const [detail, setdetail] = useState("");
  const [Image, setImage] = useState("");
  const [type, setType] = useState("none");
  const [productList, setProductList] = useState([]);
  const [statusLogin, setstatusLogin] = useState(false);
  const [searchstatus, setSearchstatus] = useState(false);
  const [searchURL, setSearchURL] = useState("");
  //authorized user is login or not.
  useEffect(async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    await Axios.post("http://localhost:3001/isUserAuth", { token: token }).then(
      (res) => {
        //   console.log(res.data.status);
        if (res.data.status === false) {
          localStorage.removeItem("token");
          setstatusLogin(true);
        }
      }
    );
  }, []);
  // not login then redirect to login page.
  if (statusLogin) {
    return <Redirect to={"/"} />;
  }

  const searchallproduct = () => {
    var type = searchType === "none" ? "none" : "'" + searchType + "'";
    //I forgot why I need if, just ignore it.
    if (searchType) {
      let query = `name=none&sortByPrice=${sortPrice}&type=${type}`;
      setSearchURL(query);
      setSearchstatus(true);
    }
  };
  const searchproduct = () => {
    var searchname = search.trim();
    var searchid = pId.trim();
    if (searchname === "") {
      searchname = "none";
    }
    if (searchid === "") {
      searchid = "none";
    }
    if (searchname !== "none" && searchid != "none") {
      return alert("Enter Id or name (Not Both!)");
    }
    if (searchid === "none" && searchname === "none") {
      searchallproduct();
    } else if (searchid != "none") {
      let query = `id=${searchid}`;
      setSearchURL(query);
      setSearchstatus(true);
    } else if (searchname != "none") {
      var type = searchType === "none" ? "none" : "'" + searchType + "'";
      let query = `name=${searchname}&sortByPrice=${sortPrice}&type=${type}`;
      setSearchURL(query);
      setSearchstatus(true);
    }
  };
  //if user click, search or searchall it will redirect to stock results page.
  if (searchstatus) {
    return (
      <Redirect
        push
        to={{ pathname: "/productresults", search: `?${searchURL}` }}
      />
    );
  }
  const insertProduct = async() => {

    let product_info = {
      pName: pName,
      price: price,
      detail: detail,
      Image: Image,
      type: type,
    };
    let error = false;
    await Axios.post("http://localhost:3001/insertproducts", product_info).then(
      (res) => {
        alert(res.data.msg);
        if(res.data.err === true){
          error = true;
        }
        //show to update results.
      }
    );
    //if insert error do not thing.
    if(error == false){
      //leg of create table in database so I have to query all the product to get the pId again....
      await Axios.get("http://localhost:3001/results/none/none/none").then(res=>{
        let id = res.data.data[res.data.data.length-1].pId;
        console.log(id);
        setProductList([
          ...productList,
          {
            pId : id,
            pName: pName,
            price: price,
            detail: detail,
            Image: Image,
            type: type,
          },
        ]);
    })
    }
    
    
    // console.log(data.data.data.length);
    
  };

  const clear = (id) => {
    console.log(id);
    setProductList(
      productList.filter((val) => {
        return val.pId != id;
      })
    );
  };

  const result = () => {
    return (
      <div >
        <h1
          class="card-title"
          style={{
            backgroundColor: "#f2a154",
            color: "white",
            borderRadius: "20px",
            padding:"0rem 0rem 0rem 1rem"
          }}
        >
          New product
        </h1>
        {productList.map((val, key) => {
          return (
            <div>
              <div class="d-flex flex-row-reverse" >
                  <button
                    type="button"
                    class="btn-close text-reset "
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => {
                      clear(val.pId);
                    }}
                  ></button>
                </div>
              <div className="d-flex flex-column" style={{
                borderRadius:"40px", 
                backgroundColor:"white",
                padding:"2rem"}}>
                <div>
                  <img
                    style={{ display: "block", padding: "10px" }}
                    src={val.Image}
                    class="card-img-top"
                    alt="..."
                    width="317px" height="317px"
                  />
                </div>
                <div>
                  <h5 class="card-title">{val.pId}</h5>
                  <h5 class="card-title">{val.pName}</h5>
                  <hr></hr>
                  <p class="card-text d-flex">
                    <h5>Detail: &nbsp;</h5> {val.detail}{" "}
                  </p>
                  <p class="card-text d-flex">
                    <h5>Type: &nbsp;</h5> {val.type}
                  </p>
                  <p class="card-text d-flex">
                    <h5>Price: &nbsp;</h5> {val.price} ฿
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <h1 className="headerr" style={{ textAlign: "center" }}>
        Stock page
      </h1>
      <div className=" row d-flex flex-md-wrap" style={{ margin: "5rem" }}>
        <div className="col-8 align-self-start">
          <div className="row">
            <div
              className="cardstock col"
              style={{
                backgroundColor: "white",
                padding: "2rem",
              }}
            >
              <h3>Insert new product</h3>
              <hr></hr>
              <div className="d-flex flex-column justify-content-start">
                <div className="d-flex flex-column">
                  <label className="align-self-start">Products:&nbsp;</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    onChange={(e) => {
                      setpName(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-column">
                  <label className="align-self-start">Price:&nbsp;</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    onChange={(e) => {
                      setprice(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-column">
                  <label className="align-self-start">
                    Product Detail:&nbsp;
                  </label>
                  <textarea
                    type="text"
                    placeholder="Enter detail"
                    onChange={(e) => {
                      setdetail(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-column">
                  <label className="align-self-start">Image Link:&nbsp;</label>
                  <input
                    type="text"
                    placeholder="Image link"
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                  />
                </div>
                <br />
                <div className="d-flex">
                  <label className="align-self-center">Type:&nbsp;</label>
                  <select
                    cla
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    style={{
                      padding: "5px",
                      borderRadius: "20px",
                    }}
                  >
                    <option value="none">none</option>
                    <option value="cassette">Cassette</option>
                    <option value="film">Film</option>
                    <option value="vinyl">Vinyl</option>
                  </select>
                  <div style={{ width: "6rem" }}></div>
                  <button
                    className="btn"
                    onClick={() => {
                      insertProduct();
                    }}
                  >
                    insert
                  </button>
                </div>
              </div>
            </div>
            {/* end card stock */}
            <div
              className="card col cardstock2 text-center"
              style={{
                border: "none",
                padding: "2rem",
              }}
            >
              <div>
                <h3>Search product</h3>
                <hr />
              </div>
              <div className="d-flex flex-column">
                <div className="justify-content-center">
                  <input
                    style={{ width: "70px" }}
                    type="text"
                    placeholder=" ID "
                    onChange={(e) => {
                      setpId(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <b>OR</b>
                </div>
                <div className="justify-content-center">
                  <input
                    type="text"
                    placeholder="Product name"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className=" mt-4">
                <div className="d-flex ">
                  <label >
                    Type: &nbsp;
                  </label>
                  <select
                    className="flex-fill flex-grow-1"
                    value={searchType}
                    onChange={(e) => {
                      setSearchType(e.target.value);
                    }}
                    style={{
                      padding: "5px",
                      borderRadius: "20px",
                    }}
                  >
                    <option value="none">none</option>
                    <option value="cassette">Cassette</option>
                    <option value="film">Film</option>
                    <option value="vinyl">Vinyl</option>
                  </select>
                </div>
                <br />
                <div className="d-flex flex-row">
                  <label> Sort by price:&nbsp;</label>
                  <select
                    className="flex-grow-1"
                    value={sortPrice}
                    onChange={(e) => {
                      setSortPrice(e.target.value);
                    }}
                    style={{
                      margin: "0px 0px 0px 0px",
                      padding: "5px",
                      borderRadius: "20px",
                    }}
                  >
                    <option value="none">none</option>
                    <option value="ASC">low to high</option>
                    <option value="DESC">high to low</option>
                  </select>
                </div>
              </div>
              <div className="card-body">
                <button className="btn" onClick={() => searchproduct()}>
                  search
                </button>
                &nbsp;&nbsp;
                <button className="btn" onClick={() => searchallproduct()}>
                  search all
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4" style={{padding:"2rem"}}>{  result()  }</div>
      </div>
      <div className="footer">
        {/* footer */}
        <p>
          <strong>Group 3 | ITCS212 Web Programming</strong>
        </p>
        <p>
          <span>Copyright © 2021 Group3.co.</span>{" "}
          <span>All Rights Reserved.</span>
        </p>
      </div>
    </div>
  );
}

export default Stock;
