import React, {Component} from 'react'
import _ from 'lodash'
import cleanDoubleByteChars from '../../../helpers/cleanDoubleByteChars'

class SecondaryTitle extends Component {
  render () {
    let h2Text = ''
    switch (this.props.children[1].type) {
      case 'strong':
        [ h2Text ] = this.props.children[1].props.children
        break
      case 'em':
        [ h2Text ] = this.props.children[1].props.children[0].props.children
        break
      case 'a':
        [,,h2Text] = this.props.children
        break
      default:
        [,h2Text] = this.props.children
    }
    const svgAnchor = this.props.children[0].props.children[0]
    return (
      <h2 id={cleanDoubleByteChars(_.kebabCase(h2Text))}>
        <a
          // eslint-disable-next-line prefer-template
          href={'#' + cleanDoubleByteChars(_.kebabCase(h2Text))}
          aria-hidden='true'
          className='anchor'
        >
          {svgAnchor}
        </a>
        {h2Text}
      </h2>
    )
  }
}

export default SecondaryTitle
