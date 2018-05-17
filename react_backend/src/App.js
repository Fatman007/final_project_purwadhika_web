import React, { Component } from 'react';
import {Redirect, Link, Route} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Userreg from "./components/Userreg"
import Main from "./components/Main";
import Category from "./components/Category";
import Category2 from "./components/Category2";
import Product from "./components/Product";
import Detail from "./components/Detail";
import Cart from "./components/Cart";
import EditCart from "./components/EditCart";
import Invoice from "./components/Invoice";
import Invoice_history from "./components/Invoice_history";
import ProductSearch from "./components/ProductSearch";
import Datadiri from "./components/Datadiri";
import Footer from "./components/Footer";


class App extends Component 
{

  constructor() {
    super();
    this.state = {
      // season: [],
      category: [], 
      product: [], 
      product_detail: [], 
      color: [], 
      size: [], 
      user_name: [], 
      user_id: [], 
      status_login: [], 
      tempCartId: [], 
      tempInvoiceId: [],
      productstate : [],
      product_id : [],
      redirect_search: false,
      redirect_login: false, 
      redirect_register: false, 
      redirect_home: false, 
      redirect_cart: false, 
      redirect_inv: false };
  }

  // componentWillMount()
  // {
  //   axios.get("http://localhost:3001/seasons")
  //   //seasons ini dari node.js
  //   .then ((homeData) =>
  //   {
  //     this.setState({season: homeData.data});
  //     // console.log(homeData.data);
  //   })
  // }

  componentWillMount()
  {
    
      this.setState({redirect_home: true});
    
  }

  getseasonid = (id) => {

    axios.get("http://localhost:3001/category/"+id)
    .then ((homeCategory) =>
    {
      // console.log(homeCategory);
      this.setState({category: homeCategory.data})
      // console.log(this.state);
    })
  }

  getcategoryid = (id) => {

    axios.get("http://localhost:3001/product/"+id)
    .then ((homeProduct) =>
    {
      // console.log(homeProduct.data);
      this.setState({product: homeProduct.data})
      // console.log(this.state);
    })
  }

  getdetailid = (id) => {

    this.setState({product_id:id})

    axios.get("http://localhost:3001/detail/"+id)
    .then ((homeDetail) =>
    {
      // console.log(homeDetail.data);
      this.setState({product_detail: homeDetail.data.rows1, color: homeDetail.data.rows2})
      // console.log(this.state);
    })

  }

  getcolorid = (id, name_id) => {

    var a = name_id + "?warnaid=" + id;

    axios.get("http://localhost:3001/detail/"+a)
    .then ((homeDetail) =>
      {
        // console.log(homeDetail.data);
        this.setState({product_detail: homeDetail.data.rows1, color: homeDetail.data.rows2, size: homeDetail.data.rows3})
        // console.log(this.state);
      }) 
  }

  postlogin = (data_login) => {
  
    axios.post('http://localhost:3001/login', 
      { 
        username : data_login.username.value,
        password : data_login.password.value,
        
      })
    .then((ambilDataLogin) => {
      console.log(ambilDataLogin.data);
      if (ambilDataLogin.data.status_login === true)
      {
        
        this.setState({user_name:ambilDataLogin.data.user_name, user_id:ambilDataLogin.data.user_id, status_login:ambilDataLogin.data.status_login});
        this.setState({redirect_home: true});
        // console.log(this.state);
      }
      else
      {
        this.setState({redirect_login: true});
      }
    })
  }

  postlogout = () => {
    
        this.setState({user_name:'', user_id:'', status_login:''});
        this.setState({redirect_home: true});
        // console.log(this.state);  
  }

  postregis = (data_register) => {
    axios.post('http://localhost:3001/register', 
      { 
        username : data_register.username.value,
        password : data_register.password.value,
        nama: data_register.nama.value,
        email: data_register.email.value,
        phonenumber: data_register.phonenumber.value,
        alamat: data_register.alamat.value
      })
      .then((ambilStatusRegister) => {
        
        if (ambilStatusRegister.data === 'masuk')
        {
          this.setState({redirect_login: true});
          this.setState({redirect_register: false});
        }
        else
        {
          this.setState({redirect_login: false});
          this.setState({redirect_register: true});
        }
      })
  }

  postproductsearch = (search) => {
   
    axios.get(`http://localhost:3001/productsearch/${search}`)
    .then ((res) => {
    
    this.setState({productstate: res.data});
    this.setState({redirect_search : true});
  })   
}


  addtocart = (cart_data) => {
    axios.post('http://localhost:3001/cart/'+this.state.user_id,
    { 
      id : cart_data.value,
      qtybeli : cart_data.qty,
      namacart : this.state.user_name,
      idcart : this.state.user_id
    })
    .then((ambilStatusCart) => {
     
      if (ambilStatusCart.data === "NOT_OK")
      {
        this.setState({redirect_login: true});
        this.setState({redirect_register: false});
      }
      else
      {
        this.setState({redirect_cart: true});
      }
    })
  }

  getcartid = (id) => {
    this.setState({tempCartId: id});
    return(
      <Redirect to = {`/edit_cart/${this.state.tempCartId}`} />
    )
  }

  postedit = (edit_qty) => {
    axios.post(`http://localhost:3001/edit_cart/${this.state.tempCartId}`,
    {
      qty: edit_qty.qty.value,
      cartid : this.state.tempCartId,
    })
    .then((redirect) => {
      if (redirect.data === "OK")
      {
        this.setState({redirect_cart: true});
      }
    })
  }

  deletecartid = (id) => {
      axios.get(`http://localhost:3001/delete_cart/${id}`)
      .then((redirect) => {
        if (redirect.data === "OK")
        {
          this.setState({redirect_cart: true});
        }
      })
  }

  checkout = (data) => {
    axios.post(`http://localhost:3001/checkout`,
    {
      id_cart : this.state.user_id,
      nama_penerima : data.nama_penerima.value,
      telp_penerima : data.telp_penerima.value,
      alamat_penerima : data.alamat_penerima.value,
      grand_total : data.grand_total.value,
    })
    .then((redirect) => {

      if (redirect.data.redirect_invoice === "OK")
      {
        this.setState({tempInvoiceId: redirect.data.kode_invoice})
        this.setState({redirect_inv : true});
      }
    })
  }

  getinvid = (id) => {
    this.setState({tempInvoiceId : id});
    return (
      <Redirect to = {`/invoice_history_user/${this.state.user_id}`} />
    )
  }


    render() {

      window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
        }

        // When the user clicks on the button, scroll to the top of the document
        function topFunction() {
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }

    const {redirect_login} = this.state;
    const {redirect_register} = this.state;
    const {redirect_home} = this.state;
    const {redirect_cart} = this.state;
    const {redirect_inv} = this.state;
    const {redirect_search} = this.state;


    if (redirect_home) {
      this.setState({redirect_home: false});
      return (
      <Redirect to='/seasons'/>
      )
    }

    if (redirect_login) {
      this.setState({redirect_login: false});
      return (
      <Redirect to='/login'/>
      )
    }

    if (redirect_register) {
      this.setState({redirect_register: false});
      return (
      <Redirect to='/userreg'/>
      )
    }

    if (redirect_cart) {
      this.setState({redirect_cart: false});
      return (
      <Redirect to = {`/cart/${this.state.user_id}`}/>
      )
    }

    if (redirect_inv) {
      this.setState({redirect_inv: false});
      return(
        <Redirect to = {`/invoice_user/${this.state.tempInvoiceId}`}/>
      )
    }

    if (redirect_search) {
      this.setState({redirect_search: false});
      return (
      <Redirect to={`/productsearch/${this.state.productstate}`}/>
      )
    }
    
    return(
      <div className = "konten">

      <button onClick={this.topFunction} id="myBtn" title="Go to top">Keatas</button>
          {/* <Navbar user_name={this.state.user_name} id_user={this.state.user_id} postLogout={this.postlogout} postProductSearch={this.postproductsearch}/> */}
          
          <Navbar user_name={this.state.user_name} id_user={this.state.user_id} postLogout={this.postlogout} postProductSearch={this.postproductsearch}/>
          
          <div className = 'isikonten'>
          {/* <Route path='/' render={() => <Redirect to='/seasons'/>}/> */}
          {/* <Route path = "/seasons" render = {() => <Main season={this.state.season} getSeasonID={this.getseasonid}/>}/> */}
          <Route path = "/seasons" render = {() => <Main getSeasonID={this.getseasonid}/>}/>

          <Route path = "/category" render = {() => <Category category2={this.state.category} getCategoryID={this.getcategoryid}/>}/>
          <Route path='/categorynnd/:id' render={({match}) => <Category2 idCategory={match.params.id} getCategoryID={this.getcategoryid} />}/> 

          <Route path = "/product" render = {() => <Product product2={this.state.product} getDetailID={this.getdetailid}/>}/>
          
          <Route path = {`/productsearch`} render = {() => <ProductSearch product2state={this.state.productstate} getDetailID={this.getdetailid}/>}/>
          
          <Route path = "/detail/:id" render = {() => <Detail product2={this.state.product_detail} color2={this.state.color} product_id2={this.state.product_id} size2={this.state.size} getColorID={this.getcolorid} id2={this.state.user_id} addToCart={this.addtocart}/>}/>
          
          <Route path ='/login' render = {() => <Login postLogin={this.postlogin}/>}/>
          <Route path ='/datadiri' render = {() => <Datadiri/>}/>
          <Route path ='/userreg' render = {() => <Userreg postRegis={this.postregis}/>}/>
          
         {/* yang kiri sama dengan di dalem komponen yang di kanan yang di state atas */}
          
          <Route path = {`/cart/${this.state.user_id}`} render ={() => <Cart user_id={this.state.user_id} getCartID={this.getcartid} deleteCartID={this.deletecartid} checkOut={this.checkout}/> }/>
          <Route path = "/edit_cart/:id" render = {() => <EditCart postEdit={this.postedit}/>}/>
          <Route path = {`/invoice_user/${this.state.tempInvoiceId}`} render ={() => <Invoice invoice_kode={this.state.tempInvoiceId}/>}/>
          <Route path = {`/invoice_history_user/${this.state.user_id}`} render = {() => <Invoice_history user_id = {this.state.user_id} getInvID = {this.getinvid}/>} />
          
          </div>
          <Footer/>
      </div>
    )
  }
}

export default App;