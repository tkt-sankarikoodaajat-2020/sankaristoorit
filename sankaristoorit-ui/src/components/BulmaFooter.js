import React from 'react'
import { Footer, Container } from 'react-bulma-components'

const BulmaFooter = () => {

  return (
    <Footer backgroundColor="white">
      <Container>
        <div className="content has-text-centered" style={{ paddingTop:'20em' }}>
          <br></br>
          <p >Ohjelmistotuotanto 2020, Helsingin Yliopisto. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.</p>
          <br></br>
          <div style= {{ marginTop: '5em' }}>
            <span>
              <a style={{ marginRight:'10em' }} className="image is-128x128 is-inline-block" href="https://www.helsinki.fi/fi/tietojenkasittelytiede">
                <img src={process.env.PUBLIC_URL + '/hy.png'} alt="hy-logo" />
              </a>
              <a className="image is-128x128 is-inline-block" href="https://github.com/tkt-sankarikoodaajat-2020/sankaristoorit">
                <img src={process.env.PUBLIC_URL + '/github.png'} alt="hy-logo" />
              </a>
            </span>
          </div>
        </div>
      </Container>
    </Footer >
  )
}

export default BulmaFooter