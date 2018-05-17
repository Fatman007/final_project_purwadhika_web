import React, {Component} from "react";

import axios from 'axios';

class Invoice extends Component {

    constructor() {
        super();
        this.state = {data1: [], data2: []};
    }

    componentWillMount()
    {
        axios.get("http://localhost:3001/invoice_user/"+this.props.invoice_kode)
        .then ((invData) =>
        {
    
            this.setState({data1: invData.data.rows1});
            this.setState({data2: invData.data.rows2});
          
        })
    }

    render() {

        const data = this.state.data2.map((x,index) => {
            return(
                <tr key ={index}>
                <td>{x.produk_detail}</td>
                <td className="text-center">{x.warna_produk}</td>
                <td className="text-center">{x.size}</td>
                <td className="text-center">{x.qty}</td>
                <td className="text-center">Rp {x.price}</td>
                <td className="text-right">Rp {x.qty * x.price}</td>
                </tr>
            )
        })

        const data_penerima = this.state.data1.map((x,index)=> {
            return(
                <tr key ={index}>
                <td>{x.nama}</td>
                <td className="text-center">{x.alamat}</td>
                <td className="text-center">{x.phonenumber}</td>
                </tr>
                
            )
        })

        var a = 0;

        for (var i = 0; i < this.state.data2.length; i++) {
            a = (this.state.data2[i].qty * this.state.data2[i].price) + a;
        }

        return(
            <div>
                <h2>Invoice {this.props.invoice_kode}</h2>

                <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="text-center"><strong>Data penerima</strong></h3>
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-condensed">
                                    <thead>
                                        <tr>
                                            <td><strong>Nama penerima</strong></td>
                                            <td className="text-center"><strong>Alamat penerima</strong></td>
                                            <td className="text-center"><strong>Telepon penerima</strong></td>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data_penerima}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
          
                <br/>

                <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="text-center"><strong>Invoice summary</strong></h3>
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-condensed">
                                    <thead>
                                        <tr>
                                            <td><strong>Item Name</strong></td>
                                            <td className="text-center"><strong>Color</strong></td>
                                            <td className="text-center"><strong>Size</strong></td>
                                            <td className="text-center"><strong>Item Quantity</strong></td>
                                            <td className="text-center"><strong>Item Price</strong></td>
                                            <td className="text-right"><strong>Total</strong></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data}
                                        <tr>
                                            <td className="emptyrow"><i className="fa fa-barcode iconbig"></i></td>
                                            <td className="emptyrow"></td>
                                            <td className="emptyrow"></td>
                                            <td className="emptyrow"></td>
                                            <td className="emptyrow text-center"><strong>Grand Total</strong></td>
                                            <td className="emptyrow text-right">Rp {a}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>


            </div>
        )
    }

}

export default Invoice;