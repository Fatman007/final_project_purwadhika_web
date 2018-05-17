import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


import logoa2 from '../images/180207_POSTER_pesawat-Recovered.jpg'
import logoa3 from '../images/180207_POSTER_F1.jpg'
import logoa4 from '../images/block_2x.jpg'
import logoa5 from '../images/logo_main_plus_opaque.png'


class Main extends Component {

    constructor() {
        super();
        this.state = {
          season: [],
          };
      }

    componentWillMount()
  {
    axios.get("http://localhost:3001/seasons")
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

    render() {

        const season = this.state.season.map((x) =>{
            return (
                <li key = {x.id}>
                    <Link to = {`/category/${x.id}`} onClick={() => this.getseasonid(x.id)} className="btn btn-default btn-lg btn-block text-uppercase inner"> {x.season} </Link>
                </li>
            )
        })

        return(
            <div>

                <div className='jeda container-fluid'>
                <center>
                        <img src={logoa5} width="50%" alt="LOGO"/>
                </center>
                </div>

                <center>
                <h1>-------------- SEASON --------------</h1>
                </center>
                <br/>
                <ul>
                    {season}
                </ul>

                <main className="main">

                <section className="jumbotron text-center">
                        <div className="container-fluid">
                        <center>
                        <h1>HOT ITEMS</h1>
                        </center>
                            <div className="carousel slide" id="iniCarousel" data-ride='carousel'>
                                    <div className="carousel-inner" role="listbox">
                                        <ol className='carousel-indicators'>
                                                <li data-target='#iniCarousel' data-slide-to='0' className="active"></li>
                                                <li data-target='#iniCarousel' data-slide-to='1'></li>
                                                <li data-target='#iniCarousel' data-slide-to='2'></li>
                                                
                                        </ol>
                                        <div className="item active">
                                            <img src={logoa2}/>
                                        </div>
                                        
                                        <div className="item">
                                            <img src={logoa3}/>
                                        </div>

                                        <div className="item">
                                            <img src={logoa4}/>
                                        </div>
                                    
                                    </div>
                                    
                        
                                </div>
                        </div>
                </section>

                </main>
            </div>
        )
    }
    
}

export default Main;
