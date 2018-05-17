import React, {Component} from "react";
import { Link } from "react-router-dom";

class Product extends Component {

    getdetailid = (id) => {
        this.props.getDetailID(id);
    }
    
    render() {

        const foldergambar = "http://localhost:3001/images/"

        const product = this.props.product2.map((x) => {
            return (
                <div key = {x.id}>
                    <li><h2>
                        <Link to = {`/detail/${x.id}`} onClick={() => this.getdetailid(x.id)}> {x.detail_produk} </Link>
                    </h2></li>
                    <li>
                    <img src={`${foldergambar+x.gambar}`} className="img-responsive img-thumbnail center-block" height='90%' alt="mainplus"/>
                    </li>
                    <br/>
                </div>

            )
        })
        return(
            <div>
                <center><h1> -------------- PRODUCT -------------- </h1></center>
                <br/>
                <ul><center>
                    {product}
                </center></ul>
            </div>
        )
    }
}

export default Product;