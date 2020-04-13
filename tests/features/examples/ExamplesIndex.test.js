import React from 'react';
import { shallow } from 'enzyme';
import { ExamplesIndex } from '../../../src/features/examples/ExamplesIndex';

describe('examples/ExamplesIndex', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ExamplesIndex {...props} />
    );

    expect(
      renderedComponent.find('.examples-examples-index').length
    ).toBe(1);
  });
});
