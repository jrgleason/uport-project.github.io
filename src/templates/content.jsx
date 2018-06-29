import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import RehypeReact from 'rehype-react'

import SEO from '../components/SEO/SEO'
import SiteHeader from '../components/Layout/Header'
import config from '../../data/SiteConfig'
import TableOfContents from '../components/Layout/TableOfContents'
import SecondaryTitle from '../components/Layout/html/SecondaryTitle'

export default class ContentTemplate extends React.Component {
  render () {
    const renderAst = new RehypeReact({
      createElement: React.createElement,
      components: {
        'h2': SecondaryTitle
      }
    }).Compiler
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug
    const post = postNode.frontmatter
    const { category } = post
    const categories = []
    this.props.data.postByCategory.edges.forEach(cat => {
      if (cat.node.frontmatter.category === category) {
        categories.push(cat)
      }
    })
    const chapterTitles = []
    categories.forEach(cat => {
      chapterTitles.push(cat.node.frontmatter.title)
    })
    if (!post.id) {
      post.id = slug
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID
    }
    return (
      <div>
        <Helmet>
          <title>
            {`${post.title} | ${config.siteTitle}`}
          </title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader
              activeCategory={category}
              location={this.props.location}
              categories={this.props.data.navCategories}
            />
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents
              contentsType={post.type}
              chapterTitles={chapterTitles}
              categories={categories}
              category={category}
            />
          </ToCContainer>
          <BodyContainer>
            <div className="docSearch-content">
              { renderAst(postNode.htmlAst) }
            </div>
          </BodyContainer>
        </BodyGrid>
      </div>
    )
  }
}

const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 300px 1fr;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin-left: ${props => props.theme.bobbysLeftMarginPreference};
    margin-top: auto;
    margin-right: auto;
    margin-bottom: auto;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
`

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
   @media screen and (max-width: 600px) {
    order: 1;
  }
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  overflow: scroll;

  ::-webkit-scrollbar-track
  {
    background: ${props => props.theme.lightGrey};
  }

  ::-webkit-scrollbar
  {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb
  {
    background: ${props => props.theme.tocAccent};
  }

   @media screen and (max-width: 600px) {
    order: 3;
    overflow: inherit;
  }
`

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ContentBySlug($slug: String!) {
    allPostTitles: allMarkdownRemark(
      filter: { frontmatter: { index: { ne: null } } }
    ){
      edges {
        node {
          frontmatter {
            title
            index
            type
          }
          fields {
            slug
          }
        }
      }
    }
    navCategories: allMarkdownRemark (
      filter: { frontmatter: { category: { ne: null } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          headings {
            value
            depth
          }
          frontmatter {
            category
            index
          }
        }
      }
    }
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      timeToRead
      excerpt
      headings  {
        value
        depth
      }
      frontmatter {
        title
        category
        type
      }
      fields {
        slug
      }
    }
    postByCategory:  allMarkdownRemark(
      filter: { frontmatter: { category: { ne: null }, index: { ne: null } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          headings {
            value
            depth
          }
          excerpt
          timeToRead
          frontmatter {
            title
            category
            index
            type
          }
        }
      }
    }
  }
`;
