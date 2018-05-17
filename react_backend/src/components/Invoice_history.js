import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Invoice_history extends Component {

    constructor() {
        super();
        this.state = {history: []}
    }

    componentWillMount() {
        axios.get("http://localhost:3001/invoice_history_user/"+this.props.user_id)
        .then((getData) => {
            this.setState({history: getData.data})
        })
    }

    getinvid = (id) => {
        this.props.getInvID(id);
    }

    render() {

        const data = this.state.history.map((x,index) => {
            return(
                <tr key ={index}>
                <td> <Link to = {`/invoice_user/${x.kode_invoice}`} onClick={() => this.getinvid(x.kode_invoice)}> {x.kode_invoice} </Link> </td>
                <td className="text-center">{x.total_harga}</td>
                <td className="text-center">{x.tanggal}</td>
                </tr>
                
            )
        })

        return(
            <div>

                <h2>Invoice History</h2>

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
                                            <td><strong>Kode invoice</strong></td>
                                            <td className="text-center"><strong>Grand total</strong></td>
                                            <td className="text-center"><strong>Waktu pemesanan</strong></td>
                                            
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

    </div>
        )
    }
}

export default Invoice_history;