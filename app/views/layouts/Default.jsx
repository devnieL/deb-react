var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
		<html lang="en">
			<head>
			    <meta charset="utf-8"/>
			    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
			    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
			    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700|Raleway:400,600,700,800' rel='stylesheet' type='text/css' />
			    <link rel="stylesheet" type="text/css" href="/css/style.css"/>
			    <link id="favicon" rel="shortcut icon" href="/favicon.png" />
			    <title>DEB REACT</title>
			</head>
			<body className='index'>

        <div id='index'>
				    {this.props.children}
        </div>

        <script src="/libs/jquery/dist/jquery.min.js"></script>

				<script src="/build/common.js"></script>
				<script src="/build/index.js"></script>
			</body>
		</html>
    );
  }
});

module.exports = DefaultLayout;
