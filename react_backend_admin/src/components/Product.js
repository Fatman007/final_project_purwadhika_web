import React, {Component} from "react";
import { Link } from "react-router-dom";

class Product extends Component {

    getdetailid = (id) => {
        this.props.getDetailID(id);
    }

    ambilidproduct = (id) => {
        this.props.ambilidProduct(id);
    }

    getproductiddelete = (id) => {
        this.props.getproductidDelete(id);
    }
    
    render() {

        const foldergambar = "http://localhost:3001/images/"

        const product = this.props.product2.map((x,index) => {
            return (
                <tbody key ={index}>
                    <tr>
                        <td>{x.kategori_produk}</td>
                        <td>{x.detail_produk}</td>
                        <td>{x.price}</td>
                        <td>{x.deskripsi}</td>
                        <td>{x.gambar}</td>
                        <td className="thumbnail"><img src={`${foldergambar+x.gambar}`} className="img-responsive img-thumbnail center-block" width='100px' alt="mainplus"/></td>
                        <td><Link to = {`/admin_product_colour/${x.id}`} onClick={() => this.getdetailid(x.id)}> lihat warna </Link></td>
                        <td><Link to = {`/admin_product_edit/${x.id}`} onClick={() => this.ambilidproduct(x.id)} > edit </Link></td>
                        <td><button onClick={() => this.getproductiddelete(x.id)} > delete </button></td>
                    </tr>
                </tbody>


            )
        })
        return(
            <div>
            <h1>list produk</h1>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th> produk kategori </th>
                        <th> nama produk </th>
                        <th> price </th>
                        <th> deskripsi </th>
                        <th> file gambar </th>
                        <th> gambar </th>
                        <th> lihat warna </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                {product}
            </table>
            <br/>
            <br/>
            <p><Link to = {`/admin_product_register/${this.props.idrefcategory}`} > add product </Link></p>
            </div>
        )
    }
}

export default Product;
