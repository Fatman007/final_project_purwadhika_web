import React, {Component} from "react";
import { Link } from "react-router-dom";

import axios from 'axios';


class Cart extends Component {

    constructor() {
        super()
        this.state = {isi_cart: []}
    }

    componentWillMount()
    {
        axios.get("http://localhost:3001/cart/"+this.props.user_id)
        .then ((cartData) =>
        {
        //   console.log(cartData.data);
          this.setState({isi_cart : cartData.data})
        })
    }

    getcartid = (id) => {
        this.props.getCartID(id);
    }

    deletecartid = (id) => {
        this.props.deleteCartID(id);
    }

    checkout = (data) => {
        this.props.checkOut(data);
    }

    render() {

        const data = this.state.isi_cart.map((x,index) => {
            return(
                <tr key ={index}>
                <td className="text-center">{x.product_name}</td>
                <td className="text-center">{x.warna_cart}</td>
                <td className="text-center">{x.size}</td>
                <td className="text-center">{x.qty}</td>
                <td className="text-center">{x.price_cart}</td>
                <td className="text-center">{x.qty * x.price_cart}</td>
                <td><Link to = {`/edit_cart/${x.id}`} onClick={() => this.getcartid(x.id)}> Edit </Link></td>
                <td><Link to = {`/delete_cart/${x.id}`} onClick={() => this.deletecartid(x.id)}>Delete </Link> </td>
                </tr>

            )
        })

        var a = 0;

        for (var i = 0; i < this.state.isi_cart.length; i++) {
            a = (this.state.isi_cart[i].qty * this.state.isi_cart[i].price_cart) + a;
        }

        return(
            <div>
                
                <label htmlFor="nama_penerima"><b>nama penerima</b></label><br/>
                <input type="text" ref="nama_penerima" placeholder="nama penerima"required/><br/>

                <label htmlFor="telp_penerima"><b>nomor telepon penerima</b></label><br/>
                <input type="text" ref="telp_penerima" placeholder="nomor telepon"required/><br/>

                <label htmlFor="alamat_penerima"><b>alamat penerima</b></label><br/>
                <input type="text" ref="alamat_penerima" placeholder="alamat penerima"required/><br/>

                Grand Total : Rp {a}
                <input type = "number" ref = "grand_total" value = {a} hidden/>

                <br/><br/>

                <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="text-center"><strong>Cart</strong></h3>
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-condensed">
                                    <thead>
                                        <tr>
                                            <td><strong>Nama Produk</strong></td>
                                            <td className="text-center"><strong>Warna produk</strong></td>
                                            <td className="text-center"><strong>Ukuran Produk</strong></td>
                                            <td className="text-center"><strong>Kuantitas pembelian</strong></td>
                                            <td className="text-center"><strong>Harga</strong></td>
                                            <td className="text-center"><strong>Total</strong></td>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <br/>

                <input type = "submit" onClick={() => this.checkout(this.refs)} className="btn btn-default btn-lg btn-block text-uppercase inner" value = "checkout"/>
                
            </div>
        )
    }
    
}

export default Cart;