var React           = require('react');

var nations = ['britain', 'ireland', 'norway', 'sweden', 'denmark', 'germany',
                'holland', 'belgium', 'france', 'spain', 'portugal', 'italy', 'switzerland'];
var Button = React.createClass({
    onClick: function(){
        this.props.handleClick(this.props.name);
    },
    render: function() {
        return (
            <button className="btn btn-xs btn-default" onClick={this.onClick}>
                {this.props.name}
            </button>
        );
    }
});

var Autosuggest = React.createClass({
    // React functions
    getInitialState: function() {
        return {
            input: ''
        };
    },
    handleChange: function() {
        var self = this;
        this.setState({
            input: self.refs.field.getDOMNode().value
        });
    },
    handleClick: function(nation) {
        var self = this;
        this.setState({
            input: nation
        });
    },
    matches: function(input) {
        var regex = new RegExp(input, "i");
        return nations.filter(function(nation){
            nation.match(regex) && nation != input;
        });
    },
    render: function() {
        var self = this;
        var results = nations.filter(function(nation){
            return nation.match(new RegExp(self.state.input, "i")) && nation != self.state.input;
        }).map(function(nation){
            return (
                <Button handleClick={self.handleClick} name={nation} />
            );
        });
        return (
            <div>
                <input type="text" ref="field" onChange={this.handleChange} value={this.state.input} />
                {results}
            </div>
        );
    }
});

module.exports = Autosuggest;