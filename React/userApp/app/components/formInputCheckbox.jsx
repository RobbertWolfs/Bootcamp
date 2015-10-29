var React = require('react');

var inputCheckbox = React.createClass({
   render : function() {
       return (
           <div className='form-group'>
               <label htmlFor={this.props.name}>{this.props.name}</label>

               <input type={this.props.type}
                      checked={this.props.checked}
                      className='form-control'
                      name={this.props.name}
                      onChange={this._onChange}/>
           </div>
       );
   },
    _onChange: function(e) {
        this.props.onChange(e.target.name, e.target.checked);
    }
});

module.exports = inputCheckbox;
