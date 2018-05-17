import React, {Component} from "react";

class EditCart extends Component {

    postedit = (edit_qty) => {
        this.props.postEdit(edit_qty);
    }

    render() {
        return(
            <div>

            <label htmlFor="username"><b>banyak pembelian</b></label><br/>
            <input type="text" ref="qty" placeholder="banyak pembelian" required/><br/>
                
                <br/><br/>

                <input type = "submit" onClick={() => this.postedit(this.refs)} value = "EDIT"/>
            </div>
        )
    }
}

export default EditCart;