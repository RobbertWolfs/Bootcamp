var React = require('react');

var inputNumber = React.createClass({
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

               <div style={{'color' : 'red'}}>{this.props.errors[this.props.name]}</div>
           </div>
       );
   },

    _onChange: function(e) {
        this.props.onChange(e.target.name, e.target.value);
    },
    _addStyleOnError: function (elem) {
        return elem ? 'has-error form-group' : 'form-group';
    }
});

module.exports = inputNumber;