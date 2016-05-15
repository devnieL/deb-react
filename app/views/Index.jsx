var React = require('react');
var DefaultLayout = require('./layouts/Default.jsx');
var Global = require('react-global');

var Index = React.createClass({
  render: function() {
    return (
      <DefaultLayout>

          <h1 onClick={this.alert}>Hello World - 10</h1>

          <Global values={{
            USER : this.props.user
           }} />

      </DefaultLayout>
    );
  },

  alert : function(){
    alert("Yay!");
  }
});

module.exports = Index;
