import React, {Component} from "react";
import { Link, Route, Router, Redirect } from "react-router-dom";
import axios from 'axios';

class Category2 extends Component {

    constructor(){
        super();
        this.state= {
            list: [], category:[], selectedCtg:0
        };
        
    }

    componentWillMount(){
        this.setState({selectedCtg:this.props.idCategory})
    }

    
    componentDidMount(){
        
        axios.get('http://localhost:3001/categorynnd/'+this.state.selectedCtg)
        
            .then((response) => {
                
                this.setState({list: response.data})
                
                
            })
            .catch((err) => {console.log(err);})
    }


    getcategoryid = (id) => {
        this.props.getCategoryID(id);
    }

    render() {

        // const category = this.props.category2.map((x) => {
        //     return (
        //         <li key = {x.id}>
        //             <Link className="btn btn-primary"to = {`/product/${x.id}`} onClick={() => this.getcategoryid(x.id)}> {x.kategori_produk} </Link>
        //             {/* setelah x itu yang diambil sesuai nama di database */}
        //         </li>
        //     )
        // })

        var category = this.state.list.map(x => {
            return (
                <div className="col-md-4" key={x.id}>
                    <div className="card mb-4 box-shadow productCard">
                    <Link className="btn btn-default"to = {`/product/${x.id}`} onClick={() => this.getcategoryid(x.id)}> {x.kategori_produk} </Link>
                        <p className="card-text"></p>
                    </div>
                </div>
            )
        });

        
        return(
            <div>
                <h2>My Category</h2>
                <br/>
                <ul>
                    {category}
                </ul>
            </div>
        )
    }
}

export default Category2;