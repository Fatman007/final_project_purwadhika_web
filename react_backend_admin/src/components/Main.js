import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


class Main extends Component {

    constructor() {
        super();
        this.state = {
          season: [],
      }
    }

    componentWillMount()
    {
        axios.get("http://localhost:3001/adminseasons")
        //seasons ini dari node.js
        .then ((homeData) =>
        {
          this.setState({season: homeData.data});
          // console.log(homeData.data);
        })
    } 

    getseasonid = (id) => {
        this.props.getSeasonID(id);
    }

    ambilidseason = (id) => {
        this.props.ambilidSeason(id);
    }

    getseasoniddelete = (id) => {
        this.props.getseasonidDelete(id);
    }

    render() {

        const season = this.state.season.map((x,index) =>{
            return (
                <tbody key ={index}>
                <tr>
                    <td>{x.season}</td>
                    <td><Link to = {`/category/${x.id}`} onClick={() => this.getseasonid(x.id)}> lihat kategori </Link></td>
                    <td><Link to = {`/admin_season_edit/${x.id}`} onClick={() => this.ambilidseason(x.id)} > edit </Link></td>
                    <td><button onClick={() => this.getseasoniddelete(x.id)} > delete </button></td>
                </tr>
                </tbody>
            )
        })

        return(
            <div>
            <table>
                <thead>
                    <tr>
                        <th> Nama Season </th>
                        <th> Isi Kategori </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                {season}
            </table>
            <br/>
            <br/>
            <p><Link to = {`/admin_season_register`} > add season </Link></p>
            <p><Link to = {`/invoice_history_user`} > Invoice </Link></p>
            </div>

        )
    }
    
}

export default Main;
