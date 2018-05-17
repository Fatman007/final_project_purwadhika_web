import React,{Component} from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';


class Navbar extends Component{

  postlogout = () => {
    this.props.postLogout();
  }

 
  render() {

    let status;

    let balik;

        if (this.props.user_name.length > 0)
        {
            balik  = <Link  to="/adminhome"><button className = "btn btn-header"><span className=" glyphicon glyphicon-home"></span> Balik ke halaman awal</button></Link>


            status = 
                      
                      (<div><center>
                        <div>Hai Admin</div>
                        <button className = "btn btn-header" onClick = {() => this.postlogout()}> &nbsp;&nbsp; Log Out</button>
                    </center></div>)
        }
        else
        {
            balik = <div>Welcome Admin</div>

            status = <div>Halaman Login Admin</div>
        }

    return (
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
        <li>
          {balik}
        </li>
        </ul>
        
        <ul className="nav navbar-nav navbar-right">
          <li>
          {status}      
          </li> 
        </ul>
      </nav>
    );
  }
}

     

export default Navbar;