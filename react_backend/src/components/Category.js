import React, {Component} from "react";
import { Link } from "react-router-dom";

class Category extends Component {

    getcategoryid = (id) => {
        this.props.getCategoryID(id);
    }

    render() {
        const foldergambar = "http://localhost:3001/images/"

        const category = this.props.category2.map((x) => {
            return (
              
                         <div className="col-sm-6" key = {x.id}>
                             <div className="panel panel-default text-center">
                             <div className="panel-heading"><strong>{x.kategori_produk}</strong></div>
                             <div className="panel-body gambarklik"><Link to = {`/product/${x.id}`} onClick={() => this.getcategoryid(x.id)}><img src={`${foldergambar+x.gambar_kategori}`} className="img-responsive" width="70%" alt="Image"/></Link></div>
                             </div>
                         </div>
                         
              
            )
        })

        
        return(
            <div>
                <center>
                <h1>-------------- CATEGORY --------------</h1>
                </center>
                <br/>
                <br/>

                <div className="kategori1">
                    <div className="container-fluid">    
                         <div className="row">
                
                         {category}

                         </div>
                     </div>
                 </div>
             
 
            </div>
        )
    }
}

export default Category;