var ReactDOM = require('react-dom');
var React = require('react'); // dit is nodig omdat de compile van <PersonsContainer /> React.CreateClass maakt
var PersonsContainer = require('./components/personsContainer.jsx');

ReactDOM.render(<PersonsContainer />, document.getElementById('app'));
