import React from 'react';
import {Link} from 'react-router';
import CartTotal from './cartTotal.jsx';

var navbar = React.createClass({
    render: function () {
        return (
            <div>
                <ul className="nav nav-pills">
                    <li className="active"> <Link to="/">Webshop</Link> </li>
                    <CartTotal></CartTotal>
                </ul>
            </div>
        )
    }
});

module.exports = navbar;