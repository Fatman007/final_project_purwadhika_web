import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';

import logomainplus from '../images/logo_main_plus_opaque.png'


class Navbar extends Component{

  constructor(){
    super();
    this.state = {
     search : [],
      }
  }  

  postlogout = () => {
    this.props.postLogout();
  }

  // postproductsearch = (detail_produk) => {

  //   axios.get("http://localhost:3001/productsearch/"+detail_produk)
  //   .then (res => this.setState({data: res.data}))
      
  // }

  postproductsearch = () => {

    this.props.postProductSearch(this.state.search);
    // console.log(search)
      
  }

  render() {

    let status;

        if (this.props.user_name.length > 0)
        {
            status = 
            
            // (<div>Welcome, {this.props.user_name}! <button className="btn btn-outline-warning my-2 my-sm-0" onClick={ ()=> this.postlogout()}>LOGOUT</button><Link to="/">Cart</Link></div>)
                      
                      (<ul className="nav navbar-nav navbar-right">
                        
                        <li><Link to = {`/invoice_history_user/${this.props.id_user}`}><button className = "btn btn-header"><span className = "glyphicon glyphicon-list"></span>  Invoice</button></Link></li>
                        <li><Link to = {`/cart/${this.props.id_user}`}><button className = "btn btn-header"><span className = "glyphicon glyphicon-shopping-cart"></span> Cart</button></Link></li>
                        <li><Link to = {"/seasons"} onClick = {() => this.postlogout()}><button className = "btn btn-header"><span className = "glyphicon glyphicon-log-out"></span>  Log Out, {this.props.user_name}</button></Link></li></ul>
                    )
        }
        else
        {
          status = 
          <ul className="nav navbar-nav navbar-right">
            <li><Link to = {"/login"}><button className = "btn btn-header"><span className = "glyphicon glyphicon-log-in"></span> Log In</button></Link></li>
          </ul>
        }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
        <div className="navbar-header">
        <img src={logomainplus} width="100px" alt="LOGO"/>
        </div>
        <ul className="nav navbar-nav">
          <li>
          <Link  to="/seasons"><button className = "btn btn-header"><span className=" glyphicon glyphicon-home"></span> Rumah</button></Link>
          </li>
          <li>
            <Link  to="/datadiri"><button className = "btn btn-header"><span className=" glyphicon glyphicon-user"></span> Tentang kami</button></Link>
          </li>
          <li className="navbar-form " id='cari'>
            <input type="text" className="form-control" placeholder="search" ref = "search" onChange={() => this.setState({search: this.refs.search.value})}/>
            <button className="btn btn-header" onClick={() => this.postproductsearch()}>SEARCH</button>
          </li>
        </ul>

        {/* <form className="navbar-form">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="search" ref = "search" onChange={() => this.setState({search: this.refs.search.value})}/>
            </div>
            <button type="submit" className="btn btn-default" onClick={() => this.postproductsearch(this.refs.search.value)}><Link to = {`/detail/${x.id}`}>Cari</Link></button>
        </form> */}

        {/* <form className="navbar-form">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="search" ref = "search" onChange={() => this.setState({search: this.refs.search.value})}/>
            </div>
            <Link to = {`/productsearch`} className="btn btn-default" onClick={() => this.postproductsearch(this.state)}>SEARCH</Link>
        </form> */}

          {status}      
          
        
      </div>
      </nav>
    );
  }
}

     

export default Navbar;