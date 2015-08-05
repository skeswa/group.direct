/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Header          = require('./header'),
    Actions         = require('../../actions');

// React-router variables
var Link            = Router.Link;

var Splash2 = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle();
        //skrollr.init();
    },
    render: function() {
      return (
        <div id="splash" className="page">
            <Header />
            {/*<PictureShow className='image-slideshow' ratio={[4,3]} slideBuffer={1} infinite={false}>
              <img src='../static/img/about_us.jpg' width={600} height={400}/>
              <img src='../static/img/splash-bg.jpg'width={600} height={400}/>
              <img src='../static/img/about_us.jpg' width={600} height={400}/>
              <img src='../static/img/splash-bg.jpg'width={600} height={400}/>
            </PictureShow>*/}
            <div className="container">
                <div id="slides">
                      <img src='../static/img/about_us.jpg' width={940} height={300} />
                      <img src='../static/img/splash-bg.jpg' width={940} height={300} />
                      <img src='../static/img/about_us.jpg' width={940} height={300} />
                      <img src='../static/img/splash-bg.jpg' width={940} height={300} />                      
                  </div>
            </div>
        </div>
        );
    }
});


module.exports = Splash2;