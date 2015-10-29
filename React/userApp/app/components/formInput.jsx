var React = require('react');

var inputType = React.createClass({
   render : function() {
       return (
           <div className={this._addStyleOnError(this.props.errors)}>
               <label htmlFor={this.props.name}>{this.props.name}</label>
               <input type={this.props.type}
                      className="form-control"
                      value={this.props.value}
                      name={this.props.name}
                      onChange={this._onChange}
                      placeholder={this.props.placeholder}/>

               <div style={{'color' : 'red'}}>{this.props.errors}</div>
           </div>
       );
   },
    _addStyleOnError: function (elem) {
        return elem ? 'has-error form-group' : 'form-group';
    },
    _onChange: function(e) {
        this.props.onChange(e.target.name, e.target.value);
    }
});

module.exports = inputType;