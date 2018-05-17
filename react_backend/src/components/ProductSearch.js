import React, {Component} from "react";
import { Link } from "react-router-dom";

class ProductSearch extends Component {

    getdetailid = (id) => {
        this.props.getDetailID(id);
    }
    
    render() {

        const foldergambar = "http://localhost:3001/images/"

        const product = this.props.product2state.map((x,index) => {
            return (
                <div key = {x.id}>
                    <li>
                        <Link to = {`/detail/${x.id}`} onClick={() => this.getdetailid(x.id)}> {x.detail_produk} </Link>
                    </li>
                    <li>
                        {x.price}
                    </li>
                    <li>
                        {x.deskripsi}
                    </li>
                    <li>
                    <img src={`${foldergambar+x.gambar}`} className="img-responsive img-thumbnail center-block" height='100%' alt="mainplus"/>
                    </li>
                    <br/>
                </div>

            )
        })
        return(
            <div>
                <h2>My Product</h2>
                <br/>
                <ul>
                    {product}
                </ul>
            </div>
        )
    }
}

export default ProductSearch;