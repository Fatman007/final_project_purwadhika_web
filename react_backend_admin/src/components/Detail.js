import React, {Component} from "react";
import { Link } from "react-router-dom";

class Detail extends Component {

    getwarnaid = (id) => {
        this.props.getWarnaID(id);
    }

    ambilidwarna = (id) => {
        this.props.ambilidWarna(id);
    }

    getwarnaiddelete = (id) => {
        this.props.getwarnaidDelete(id);
    }

    render() {
        

        const warna = this.props.productwarna.filter(x => x.id_produk !== null).map((x,index) => {
            return (

                <tbody key ={index}>
                <tr>
                    <td>{x.warna_produk}</td>
                    <td><Link to = {`/admin_product_stock/${x.id}`} onClick={() => this.getwarnaid(x.id)}> lihat Size&Stock </Link></td>
                    <td><Link to = {`/admin_product_colour_edit/${x.id}`} onClick={() => this.ambilidwarna(x.id)} > edit </Link></td>
                    <td><button onClick={() => this.getwarnaiddelete(x.id)} > delete </button></td>
                </tr>
                </tbody>
            )
        })

        
        return(
            <div>
            <table>
                <thead>
                    <tr>
                        <th> Nama warna </th>
                        <th> Stock&Size </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                {warna}
            </table>
            <br/>
            <br/>
            <p><Link to = {`/admin_product_colour_register/${this.props.idrefproduct}`} > add warna</Link></p>
            </div>
        )
    }
}



export default Detail;