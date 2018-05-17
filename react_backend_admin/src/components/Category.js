import React, {Component} from "react";
import { Link } from "react-router-dom";

class Category extends Component {

    getcategoryid = (id) => {
        this.props.getCategoryID(id);
    }

    ambilidcategory = (id) => {
        this.props.ambilidCategory(id);
    }

    getcategoryiddelete = (id) => {
        this.props.getcategoryidDelete(id);
    }

    render() {
        const foldergambar = "http://localhost:3001/images/"

        const category = this.props.category2.map((x,index) => {
            return (

                <tbody key ={index}>
                <tr>
                    <td>{x.kategori_produk}</td>
                    <td>{x.gambar_kategori}</td>
                    <td className="thumbnail"><img src={`${foldergambar+x.gambar_kategori}`} className="img-responsive img-thumbnail center-block" width='100px' alt="mainplus"/></td>
                    <td><Link to = {`/product/${x.id}`} onClick={() => this.getcategoryid(x.id)}> lihat produk </Link></td>
                    <td><Link to = {`/admin_category_edit/${x.id}`} onClick={() => this.ambilidcategory(x.id)} > edit </Link></td>
                    <td><button onClick={() => this.getcategoryiddelete(x.id)} > delete </button></td>
                </tr>
                </tbody>
            )
        })

        
        return(
            <div>
            <table>
                <thead>
                    <tr>
                        <th> Nama kategori </th>
                        <th> file gambar </th>
                        <th> gambar </th>
                        <th> Isi produk </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                {category}
            </table>
            <br/>
            <br/>
            <p><Link to = {`/admin_category_register/${this.props.idrefseason}`} > add category </Link></p>
            </div>
        )
    }
}

export default Category;