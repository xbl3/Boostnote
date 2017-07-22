import React from 'react'
import CSSModules from 'browser/lib/CSSModules'
import styles from './InfoTab.styl'
import ConfigManager from 'browser/main/lib/ConfigManager'
import store from 'browser/main/store'
import AwsMobileAnalyticsConfig from 'browser/main/lib/AwsMobileAnalyticsConfig'

const electron = require('electron')
const { shell, remote } = electron
const appVersion = remote.app.getVersion()

class InfoTab extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      config: this.props.config
    }
  }

  handleLinkClick (e) {
    shell.openExternal(e.currentTarget.href)
    e.preventDefault()
  }

  handleConfigChange (e) {
    const newConfig = { amaEnabled: this.refs.amaEnabled.checked }

    this.setState({ config: newConfig })
  }

  handleSaveButtonClick (e) {
    let newConfig = {
      amaEnabled: this.state.config.amaEnabled
    }

    ConfigManager.set(newConfig)

    store.dispatch({
      type: 'SET_CONFIG',
      config: newConfig
    })
    if (newConfig.amaEnabled) {
      AwsMobileAnalyticsConfig.recordDynamitCustomEvent('DISABLE_AMA')
    }
  }

  render () {
    return (
      <div styleName='root'>
        <div styleName='header'>Info</div>

        <div styleName='top'>
          <div styleName='icon-space'>
            <img styleName='icon' src='../resources/app.png' width='92' height='92' />
            <div styleName='icon-right'>
              <div styleName='appId'>Boostnote {appVersion}</div>
              <div styleName='description'>
                An open source note-taking app made for programmers just like you.
              </div>
            </div>
          </div>
        </div>
        <ul styleName='list'>
          <li>
            <a href='https://boostnote.io'
              onClick={(e) => this.handleLinkClick(e)}
            >Website</a>
          </li>
          <li>
            <a href='https://boostnote.paintory.com/'
              onClick={(e) => this.handleLinkClick(e)}
            >Boostnote Shop</a> : Products are shipped to all over the world 🌏
          </li>
          <li>
            <a href='https://salt.bountysource.com/teams/boostnote'
              onClick={(e) => this.handleLinkClick(e)}
            >Donate via Bountysource</a> : Thank you for your support 🎉
          </li>
          <li>
            <a href='https://github.com/BoostIO/Boostnote/issues'
              onClick={(e) => this.handleLinkClick(e)}
            >GitHub Issues</a> : We'd love to hear your feedback 🙌
          </li>
          <li>
            <a href='https://github.com/BoostIO/Boostnote/blob/master/docs/build.md'
              onClick={(e) => this.handleLinkClick(e)}
            >Development</a> : Development configurations for Boostnote 🚀
          </li>
          <li styleName='cc'>
            Copyright (C) 2017 Maisin&Co.
          </li>
          <li styleName='cc'>
            License: GPL v3
          </li>
        </ul>
        <hr />
        <div styleName='policy'>Data collectiong policy</div>
        <p>We collect only the amount of users on Boostnote for DAU and any detail information
        <p>such as a note's content or title is not collected.</p>
        <p>You can see how it works on <a href='https://github.com/BoostIO/Boostnote'>GitHub</a></p>
        <input onChange={(e) => this.handleConfigChange(e)}
          checked={this.state.config.amaEnabled}
          ref='amaEnabled'
          type='checkbox'
        />
        Enable to send analytics to our servers<br />
        <button onClick={(e) => this.handleSaveButtonClick(e)}>Save</button>
      </div>
    )
  }
}

InfoTab.propTypes = {
}

export default CSSModules(InfoTab, styles)
