import React, { PureComponent } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withTranslation } from 'react-i18next';

export class PageNotFound extends PureComponent {
  render() {    
    const t = key => this.props.t('common:pageNotFound.'.concat(key))

    return (
      <div className="common-page-not-found">
        <Jumbotron>
          <h1>{t('title')}</h1>
          <p>{t('message')}
          </p>
          <p>
            <LinkContainer to="/" exact>
              <Button variant="primary">{t('button')}</Button>
            </LinkContainer>            
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default withTranslation()(PageNotFound);
