import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import Flag from 'react-world-flags'
import { changeLanguage, getCurrentLanguage } from '../../common/i18n';

export default class LanguageButton extends Component {
  static propTypes = {
  };

  render() {
    // todo: make language list dynamic
    const currentLang = getCurrentLanguage()
    return (
      <div className="common-language-button">
        <Dropdown as={ButtonGroup} onSelect={changeLanguage}>
          <Dropdown.Toggle id="dropdown-custom-1">
            {(function() {
              switch (currentLang) {
                case 'pl':
                  return <Flag code="pl" height="12"/>;
                default:
                  return <Flag code="gb" height="12"/>;
              }
            })()}          
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight>
            { currentLang !== 'en' &&
            <Dropdown.Item eventKey="en" active={currentLang === 'en'}><Flag width="20" code="gb" /> English</Dropdown.Item>
            }          
            { currentLang !== 'pl' &&
            <Dropdown.Item eventKey="pl" active={currentLang === 'pl'}><Flag width="20" code="pl" /> Polski</Dropdown.Item>
            }            
          </Dropdown.Menu>
        </Dropdown>   
      </div>
    );
  }
}
