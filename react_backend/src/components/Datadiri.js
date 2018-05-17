import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom';
import logokita from '../images/xxx.png'


class Datadiri extends Component {

  render() {
    
      return (
        <div>
        
        <header className="business-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="tagline">Profil Main+ Toys </h1>
                    </div>
                </div>
            </div>
        </header>

    
        <div className="container">

        <hr/>

        <div className="row">
            <div className="col-sm-8">
                <h2>Apakah yang kami lakukan?</h2>
                <p>Mengenalkan jenis permainan puzzle 3d dengan material yang ramah lingkungan dan bentuk interaktif</p>
                <p>Visi kami adalah dapat memberikan suatu inovasi dalam produk yang dapat meningkatkan daya berpikir serta motorik, yang dibantu dengan penggunaan alat fabrikasi digital</p>
            </div>
            <div className="col-sm-4">
                <h2>Kontak kami</h2>
                <address>
                    <strong>Main+ Toys</strong>
                    <br/>Jakarta & Tangerang
                    <br/>
                </address>
                <address>
                    <abbr title="Phone">P:</abbr>085714903579
                    <br/>
                    <abbr title="Email">E:</abbr> <a href="mailto:#">alberthartanto94@yahoo.com</a>
                </address>
            </div>
        </div>
        
        <hr/>

        <div className="row">
            <div className="col-sm-4">
                <img className="img-circle img-responsive img-center" src={logokita} alt=""/>
                <h2>Albert Hartanto</h2>
                <p>Bersama dengan Steven dan Samuel mengembangkan Main+ Toys</p>
            </div>
            <div className="col-sm-4">
                <img className="img-circle img-responsive img-center" src={logokita} alt=""/>
                <h2>Steven Septian</h2>
                <p>Bersama dengan Samuel dan Albert mengembangkan Main+ Toys</p>
            </div>
            <div className="col-sm-4">
                <img className="img-circle img-responsive img-center" src={logokita} alt=""/>
                <h2>Samuel Grady</h2>
                <p>Bersama dengan Steven dan Albert mengembangkan Main+ Toys</p>
            </div>
        </div>
   
        <hr/>

    </div>
    </div>
        
      
      );

    };

};

export default Datadiri;
