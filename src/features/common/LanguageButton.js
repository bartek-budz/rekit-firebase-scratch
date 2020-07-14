import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import Flag from 'react-world-flags'
import { AVAILABLE_LANGUAGES } from '../../common/i18n';

export class LanguageButton extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    variant: PropTypes.string       
  };

  render() {
    const variant = this.props.variant || "primary"
    const currentLangConfig = this.props.common.langConfig
    const currentLangFlagCode = currentLangConfig.flagCode
    const options = AVAILABLE_LANGUAGES.map((config) =>
      <Dropdown.Item key={config.languageCode} eventKey={config.languageCode} active={currentLangConfig.languageCode === config.languageCode}><Flag width="20" code={config.flagCode} /> {config.name}</Dropdown.Item>
    );
    const onLanguageSelect = event => {      
      this.props.actions.changeLanguage(event)
    }
    return (
      <div className="common-language-button">
        <Dropdown as={ButtonGroup} onSelect={onLanguageSelect}>
          <Dropdown.Toggle id="dropdown-custom-1" variant={variant}>
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

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageButton);
