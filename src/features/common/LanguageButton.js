import React, { Component } from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import Flag from 'react-world-flags'
import { AVAILABLE_LANGUAGES, changeLanguage, getCurrentLanguageConfig } from '../../common/i18n';

export default class LanguageButton extends Component {
  static propTypes = {
  };

  render() {
    const currentLangConfig = getCurrentLanguageConfig()
    const currentLangFlagCode = currentLangConfig.flagCode
    const options = AVAILABLE_LANGUAGES.map((config) =>
      <Dropdown.Item eventKey={config.languageCode} active={currentLangConfig.languageCode === config.languageCode}><Flag width="20" code={config.flagCode} /> {config.name}</Dropdown.Item>
    );
    return (
      <div className="common-language-button">
        <Dropdown as={ButtonGroup} onSelect={changeLanguage}>
          <Dropdown.Toggle id="dropdown-custom-1">
            <Flag code={currentLangFlagCode} height="12"/>
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight>
            {options}           
          </Dropdown.Menu>
        </Dropdown>   
      </div>
    );
  }
}
