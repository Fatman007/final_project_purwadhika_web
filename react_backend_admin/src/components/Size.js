import React, {Component} from "react";
import { Link } from "react-router-dom";

class Size extends Component {

    ambilidsize = (id) => {
        this.props.ambilidSize(id);
    }

    getsizeiddelete = (id) => {
        this.props.getsizeidDelete(id);
    }

    render() {
        

        const size = this.props.sizeku.filter(x => x.id_warna !== null).map((x,index) => {
            return (

                <tbody key ={index}>
                <tr>
                    <td>{x.size}</td>
                    <td>{x.stock}</td>
                    <td><Link to = {`/admin_product_stock_edit/${x.id}`} onClick={() => this.ambilidsize(x.id)} > edit </Link></td>
                    <td><button onClick={() => this.getsizeiddelete(x.id)} > delete </button></td>
                </tr>
                </tbody>
            )
        })

        
        return(
            <div>
            <table>
                <thead>
                    <tr>
                        <th> Size </th>
                        <th> Stock </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                {size}
            </table>
            <br/>
            <br/>
            <p><Link to = {`/admin_product_stock_register/${this.props.idrefwarna}`} > add size</Link></p>
            </div>
        )
    }
}



export default Size;