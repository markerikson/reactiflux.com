import React from 'react'
import Helmet from "react-helmet"
import { Container, SmallTitle, SideBar, MarkdownContainer, StyledLink } from '../../utils/components'


export default class Transcripts extends React.Component {

  render () {
    const articles = this.props.route.pages.filter((route) => {
        if(route.path !== '/transcripts/' && route.path.indexOf('/transcripts/') != -1)
          return route;
    });

    const { transcriptActive, closeTranscript, toggleTranscript } = this.props

    const items = articles.map((article) => {
      return <li key={article.data.title}><StyledLink onClick={closeTranscript} to={article.path} title={article.data.title}>{article.data.title}</StyledLink></li>
    });

    articles.sort((a, b) => {
      return new Date(a.data.date) < new Date(b.data.date)
    })

    const newestArticle = articles[0].data

    return (
      <Container>
        <Helmet
          title={'Reactiflux transcripts'}
        />
        <SmallTitle>{newestArticle.title}</SmallTitle>
        <SideBar children={items} sidebarActive={transcriptActive} toggle={toggleTranscript} />
        <MarkdownContainer transcript className="markdown"  dangerouslySetInnerHTML={{ __html: newestArticle.body }}/>
      </Container>
    )
  }
}
