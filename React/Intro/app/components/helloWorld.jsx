var HelloWorld = React.createClass({ // alles met een hoofdletter is van react zoals <HelloWorld />
    //getInitialState: function () { // hier geraak je aan via this.state
    //    return {
    //        name: 'Euricom bootcamp #3'
    //    }
    //},
    render: function () {
        return (
            <div>

                {/* indien je comments wilt in de render function moet je gebruik maken van {} */}
                {/* indien je meerdere elems hebt moet je ze in een div parent div steken */}

                {/*<h1>{this.state.name}</h1> dit is als je met de getInitialState werkt*/} {/* alles in kleine letters is html zoals <h1></h1> */}
                {/* dit wordt gecompiled naar */}
                {/* React.createElement('h1', null, 'Hello World') // (elem, attr, value) */}
                {/*<input type = "text" value={this.state.name} onChange={this._changeHandler} />*/} {/* geen quotes bij de value anders ziet hij het als een string */}

                <h1>{this.props.name}</h1> {/* je gebruikt props als je ze mee in de render functie geeft */}
            </div>
        )
    },

    //_changeHandler : function(e) { // custom fn best prefixen met een _
    //    //console.log(e.target.value);
    //    this.setState({
    //        name : e.target.value
    //    });
    //}
});

ReactDOM.render(<HelloWorld name='Euricom bootcamp'/>, document.getElementById('app'));  // alles met een hoofdletter is van react zoals <HelloWorld />