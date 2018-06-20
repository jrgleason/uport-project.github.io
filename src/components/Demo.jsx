import React, {Component} from 'react'
import styled from 'styled-components'
import {Connect, SimpleSigner} from 'uport-connect'
import "../layouts/css/demo.css"

const QRCode = require('qrcode.react');

const Container = styled.section`
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: column;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;

   h1 {
    padding-top: 80px;
    position: relative;
   }

   p {
    width: 52vw;
    margin: auto;
    position: relative;
   }

`

const connect = new Connect('uPort Demo', {
  clientId: '2osnfJ4Wy7LBAm2nPBXire1WfQn75RrV6Ts',
  signer: SimpleSigner('fa09a3ff0d486be2eb69545c393e2cf47cb53feb44a3550199346bdfa6f53245'),
  network: 'rinkeby'
})

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = { uri: {},
                   profile: {},
                   showImage: false,
                   showResult: false,
                   showExample: false};
    this.loginRequest = this.loginRequest.bind(this)
    this.resetDemo = this.resetDemo.bind(this)
  }

  componentDidMount() {
    this.DemoUport();
  }

  loginRequest(e) {
    connect.requestCredentials({ requested: ['name', 'avatar', 'phone', 'country'],
                                 notifications: true },
                               (uri) => { this.setState({ uri, showImage: true, showResult: false});}
    ).then((userProfile) => {
      this.setState({showImage: false, showResult: true, profile: userProfile})
    })
    e.preventDefault();
  };

  showSample(e) {
    this.setState( { showExample: true } );
    e.preventDefault();
  };

  resetDemo(e, force) {
    if(this.state.showResult || force){
      this.setState( { uri: {},
                     profile: {},
                     showImage: false,
                     showResult: false,
                     showExample: false} );
      e.preventDefault();
    }
    else{
      this.loginRequest(e);
    }
  }



  // eslint-disable-next-line class-methods-use-this
  DemoUport() {
    /* $.getJSON('uport api')
     *  .then(({ results }) => this.setState({ person: results })); */
  }

  render() {
    return (
      <Container className='demo'>
        <h1>A Focus On Developers</h1>
        <div className="demo-container">
          <div className="demo-wrapper Grid Grid--gutters">
            <div className="left-demo Grid-cell">
              <div className="demo-code">
                {(this.state.showImage === false && this.state.showResult === false && this.state.showExample === false) && (
                <div>
                  <pre>
                    <code style={{background: "#FFFFFF"}} className="language-javascript">
                      {`
    // basic code to "log in" a user by requesting a name

    // 1...  construct a link or QR with the URI
    // 2...  use the payload for authentication

    connect.requestCredentials({ requested: ['name']}, (uri) => {
      //1...
    }).then((payload) => {
      //2...
    })
                      `}
                    </code>
                  </pre>
                </div>
                )}
                {/* {this.state.showResult && (
                    <pre style={{background: "#FFFFFF"}} className={`language-javascript demo`}>
                    <code style={{background: "#FFFFFF"}} className={`language-javascript demo demo-code`}>{`
                    // the resulting payload can be used by
                    // traditional web apps (or dapps) for auth`}
                    </code>
                    </pre>
                    )} */}
                {(this.state.showImage && this.state.showResult === false && this.state.showExample === false) && (
                <pre>
                  <code style={{background: "#FFFFFF"}} className="language-javascript">
                    {`

    // 1...
    // here we use the qrcode.react library to generate
    // a QR from the URI string

    // scanning with the uport app opens a dialogue requesting
    // information that is shared when approved

    <QRCode value = uri
            size = 260
            bgColor = rgba(230, 224, 248)
            fgColor = #5c50ca />


                    `}
                  </code>
                </pre>
                )}
              </div>
              <div className="demo-results-wrapper">
                <div className="demo-results">
                  {(this.state.showExample && this.state.showResult === false) && (
                  <pre className="demo-json">
                    <code style={{background: "#FFFFFF"}} className="language-json">{`



 {

   "@context": "http://schema.org",
   "@type": "Person",
   "publicKey": "0x044c31ed1499dce76ee7711c72388fda86e6c1d4f9ecc105c4abe2f63cfe79638822dcf21b7c29b3d208fc01d4e0506d4e8f6234a912727a36cf347e61956d5f2f",
   "publicEncKey": "Py+NXzHgacNMTzj9Ufe4S2KPuzR39dDMd1o+rWBJnmM=",
   "name": "First Last"

 }

`}
                      <br />
                    </code>
                  </pre>
            )}
                  {this.state.showResult && (
                  <pre className="demo-json">
                    <code style={{background: "#FFFFFF"}} className="language-json">
                      {`
 // 2...
 // this is your data returned by the credential request,
 // which some dApps may find useful for authentication

${JSON.stringify(this.state.profile, null, 2)}
`}
                    </code>
                  </pre>
            )}
                </div>
              </div>
            </div>
            <div className="right-demo Grid-cell">
              {(this.state.showImage && this.state.showResult === false) && (
              <div className="demo-qr-container">
                <h4>Scan to provide credentials</h4>
                <a href={this.state.uri}>
                  <QRCode
                    className="demo-qr"
                    value={this.state.uri}
                    size="230"
                    bgColor="#f9f9fa"
                    fgColor="#5c50ca"
                  />
                </a>
                <div
                  className="demo-button"
                  tabIndex="0"
                  onClick={(e) => {this.resetDemo(e, true)}}
                  onKeyPress={(e) => {this.resetDemo(e, true)}}
                  role="button"
                >
                   Reset
                </div>
              </div>
          )}
              {(this.state.showImage === false) && (
              <div className="demo-button-container">
                {this.state.showResult === false && (<h2>Test The uPort Login</h2>)}
                <div className="demo-step-wrap">
                  <div className="demo-button">
                    <div
                      href=''
                      className="demo-banner-link left-btn"
                      tabIndex="0"
                      onClick={(e) => { this.resetDemo(e) }}
                      onKeyPress={(e) => { this.resetDemo(e) }}
                      role="button"
                    >
                      {this.state.showResult === false && (`Connect with uPort`)}
                      {this.state.showResult && (`Reset`)}
                    </div>
                  </div>
                  <div className="demo-button">
                    <div
                      tabIndex="0"
                      className="demo-banner-link right-btn"
                      onClick={(e) => {this.showSample(e)}}
                      onKeyPress={(e) => {this.showSample(e)}}
                      role="button"
                    >
                     See Sample Login
                    </div>
                  </div>
                </div>
              </div>
          )}
            </div>
          </div>
        </div>
      </Container>
    )
 }
}

export default Demo
