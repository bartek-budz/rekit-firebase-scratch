import React, { Component } from 'react';
import { LanguageButton } from '../common';
import { Alert } from 'react-bootstrap';
import { Trans, withTranslation } from 'react-i18next';
import { ExamplesNavigation } from '.';

export class LanguageButtonExample extends Component {
  static propTypes = {

  };

  render() {
    const { t }  = this.props

    return (
      <div className="examples-language-button-example">
        <ExamplesNavigation active="LanguageButton"/>
        <Alert variant="info">
          <Alert.Heading>{ t('examples:languageButton.helloWorld') }</Alert.Heading>
          <p>
            <Trans ns="examples" i18nKey="languageButton.howTo">
              Use <a href="https://www.i18next.com/overview/api#t">t</a> with <a href="https://react.i18next.com/latest/withtranslation-hoc">withTranslation</a>, or <a href="https://react.i18next.com/latest/trans-component">Trans</a>
            </Trans>          
          </p>
          <hr />
          <LanguageButton variant="outline-info" />
        </Alert>                   
      </div>
    );
  }
}

export default withTranslation()(LanguageButtonExample)
