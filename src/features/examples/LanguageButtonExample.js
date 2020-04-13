import React, { Component } from 'react';
import { LanguageButton } from '../common';
import { Jumbotron } from 'react-bootstrap';
import { Trans, withTranslation } from 'react-i18next';

export class LanguageButtonExample extends Component {
  static propTypes = {

  };

  render() {
    const { t }  = this.props

    return (
      <div className="examples-language-button-example">
        <Jumbotron>
          <h1>{ t('examples:languageButton.helloWorld') }</h1>
          <p>
            <Trans ns="examples" i18nKey="languageButton.howTo">
              Use <a href="https://www.i18next.com/overview/api#t">t</a> with <a href="https://react.i18next.com/latest/withtranslation-hoc">withTranslation</a>, or <a href="https://react.i18next.com/latest/trans-component">Trans</a>
            </Trans>          
          </p>
          <p>
            <LanguageButton />
          </p>
        </Jumbotron>              
      </div>
    );
  }
}

export default withTranslation()(LanguageButtonExample)
