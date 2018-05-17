import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
        <div className="kaki">
        <footer className="container-fluid text-center">
                <p>Website oleh Albert Hartanto</p>  
                <form className="form-inline">Kontak Info : 
                        <a href="http://instagram.com/mainplus_toys" aria-label="Instagram" target="_blank" className="md-icon-button clickable">Instagram
                            <i className="mdi mdi-instagram"></i>
                        </a><span>   </span>
                        <a href="https://www.facebook.com/Mainplustoys" aria-label="Facebook" target="_blank" className="md-icon-button clickable">Facebook
                            <i className="mdi mdi-facebook"></i>
                        </a>
                </form>
        </footer>
        </div>
        );
    }
}
export default Footer;