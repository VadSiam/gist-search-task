import React from 'react';
import PropTypes from 'prop-types';

// import Ul from './Ul';
import Wrapper from './Wrapper';

const Tag = ({ tag }) => <Wrapper>{tag}</Wrapper>;

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Tag;
