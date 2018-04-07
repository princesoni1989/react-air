import React, {Component} from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript';

export default class Html extends Component {
  static propTypes = {
      title: PropTypes.string,
      scripts: PropTypes.arrayOf(PropTypes.string),
      markUp:  PropTypes.string,
      description: PropTypes.string,
      styles: PropTypes.arrayOf(PropTypes.string),
      initialState: PropTypes.object
  }

  static defaultProps = {
    scripts: [],
    styles: [],
    initialState: {}
  }
  render() {
    const {title, scripts, markUp, styles, description, initialState}  = this.props
    return (
      <html>
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <meta name="description" content={description} />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {styles && styles.map(style => <link key={style} href={style} rel="stylesheet"/>)}
      </head>
      <body>
      <div id="app" dangerouslySetInnerHTML={{__html: markUp}}></div>
      <script
        dangerouslySetInnerHTML={{ __html: `window.App=${serialize(initialState)}` }}
      />
      {scripts && scripts.map(script => <script key={script} src={script}></script>)}
      </body>
      </html>
    )
  }
}

