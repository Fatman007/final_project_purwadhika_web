import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import logo1 from '../images/logo_main_plus-01.png'

class Detail extends Component {

    constructor() {
        super();
        this.state = {value: [], qty: [], carouselimg: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeQty = this.handleChangeQty.bind(this);
      }

        componentWillMount()
    {
        axios.get(`http://localhost:3001/carousel/${this.props.product_id2}`)
        //seasons ini dari node.js
        .then ((homeData) =>
        {
        this.setState({carouselimg: homeData.data});
        console.log(this.state.carouselimg);
        })
    }

    getcolorid = (id, name_id) => {
        this.props.getColorID(id, name_id);
    }

    addtocart = (cart_data) => {
        this.props.addToCart(cart_data);
        // console.log(cart_data)
    }

    handleChange(e) {
        this.setState({value : e.target.value})
    }
    handleChangeQty(e) {
        this.setState({qty: e.target.value})
    }

    render() {

        const foldergambar = "http://localhost:3001/images/"

        const indicator_carousel = this.state.carouselimg.map((x,index) => {
            var y = 0;
            return (
                
                    <li key = {x.id} data-target='#iniCarousel' data-slide-to= {(y+=1)}></li>
               
            )
        })

        const image_carousel = this.state.carouselimg.map((x,index) => {
            return (
                
                    <div className="item" key = {x.id}>
                    <img src={`${foldergambar+x.gambar_carousel}`} className="img-responsive img-thumbnail center-block" height='100%' alt="Image"/>
                    </div>

            )
        })
        
        const color = this.props.color2.map((x) => {
            return (
                <div key = {x.id}>
                    <li>
                        <Link to = {`/detail/${x.id_produk}?warnaid=${x.id}`} onClick={() => this.getcolorid(x.id, x.id_produk)}> {x.warna_produk} </Link>
                    </li>
                </div>
            )
        })

        let size;
        if (this.props.size2.length > 0)
        {
            size = this.props.size2.map((x) => {
                return (
                    <div key = {x.id}>
                        <li>
                        <input type="radio" name='size'  value={x.id}/> <label htmlFor = "size">Size {x.size} banyak stock {x.stock}</label>
                        </li>
                    </div>
                )
            })
        }
        else
        {
            size = null;
        }

        let name;
        let price;
        let description;
        if (this.props.product2.length > 0)
        {
            name = this.props.product2[0].detail_produk;
            price = this.props.product2[0].price;
            description = this.props.product2[0].deskripsi;
        }
        else
        {
            name = "tidak dapat ditemukan";
            price = "tidak dapat ditemukan";
            description = "tidak dapat ditemukan";
        }

        return(
            
            <div>
                <center><h1> -------------- DETAIL -------------- </h1></center>
                <br/>
                
                <div className="kategori1">
                <br/>
                <div className="container-fluid gaya">    
                        <div className="row">
                        <div className="col-sm-6">
                                <div className="container-fluid">
                                        <div className="carousel slide" id="iniCarousel" data-ride='carousel'>
                                                <div className="carousel-inner">
                                                <ol className='carousel-indicators'>
                                                        <li data-target='#iniCarousel' data-slide-to='0' className="active"></li>
                                                        {indicator_carousel}
                                                </ol>
                                                    <div className="item active">
                                                    <img src={process.env.PUBLIC_URL + logo1} className="img-responsive img-thumbnail center-block" height='60%' alt="Image"/>
                                                    </div>
                                                        {image_carousel}
                                
                                                </div>
                                    
                                            </div>
                                    </div>
                        </div>
                        <div className="col-sm-6 kolom_deskripsi"> 
                            <div className="container-fluid">
                                    <h2>{name}</h2>
                                    <h4>{price}</h4><hr/>
                                    <div width = '300px' word-wrap = 'break-word'>{description}</div>
                           
                                    <div>
                        
                                    <div>
                                    <br/>
                                    <h3>Pilih warna: </h3>
                                        <ul>
                                            {color}
                                        </ul>
                                    </div>
                                    <div>
                                        <ul onChange = {this.handleChange}>
                                            {size}
                                        </ul>   
                                    </div>
                                    <br/>
                                    <div>
                                        <input type = "number" placeholder = "beli berapa?" onInput = {this.handleChangeQty}/>
                                    </div>

                                    <br/>
                                    <input type = "submit" onClick={() => this.addtocart(this.state)} value = "CART" />

                                    </div>
                                    </div>

                            </div>
                        </div>
                </div>
                </div>

                <br/>
                <br/>

                <div className="col-12" id="reviews">
                <div className="card border-light mb-3">
                    <div className="card-header text-white text-uppercase kotakreview"><i className="fa fa-comment"></i> Reviews</div>
                    <br/>
                    <br/>
                    <div className="card-body">
                        <div className="review">
                            <span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <meta itemProp="datePublished" content="01-01-2016"/>May 01, 2018
    
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            by A
                            <p className="blockquote">
                               sampai cepat dan sehat
                            </p>
                            <hr/>
                        </div>
                        <div className="review">
                            <span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <meta itemProp="datePublished" content="01-01-2016"/>May 05, 2018
    
                            <span className="fa fa-star" aria-hidden="true"></span>
                            <span className="fa fa-star" aria-hidden="true"></span>
                            <span className="fa fa-star" aria-hidden="true"></span>
                            <span className="fa fa-star" aria-hidden="true"></span>
                            <span className="fa fa-star" aria-hidden="true"></span>
                            by Bo
                            <p className="blockquote">
                                Mainan yang luar biasa
                            </p>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        )
    }
}


export default Detail;