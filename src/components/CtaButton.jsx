import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

class ctaButton extends Component {
  render() {
    const { children, to } = this.props
    return(
      <Link style={{border: 'none'}} to={to}>
        <ButtonContainer>
          {children}
        </ButtonContainer>
      </Link>
    )
  }
}

export default ctaButton

const ButtonContainer = styled.div`
  border: 1px solid ${({theme}) => theme.brand};
  border-radius: 3px;
  padding: 25px;
  font-size: 2rem;
  color: ${({theme}) => theme.brand};
  display: inline-block;
  transition: all .3s ease;
  
  &:hover {
    color: white;
    background: ${({theme}) => theme.brand};
  }
`