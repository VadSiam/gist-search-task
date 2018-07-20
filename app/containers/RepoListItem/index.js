/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import Tag from 'components/Tag';
import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';

export class RepoListItem extends React.PureComponent {
  getTags = files => {
    const filesArr = Object.keys(files).reduce((arr, key) => {
      const currentFile = key.split('.')[1];
      const checkArr = arr.find(elem => elem === currentFile);
      if (currentFile && !checkArr) arr.push(currentFile);
      return arr;
    }, []);
    const arrTags = filesArr.map(tag => <Tag key={`item-${tag}`} tag={tag} />);
    return arrTags;
  };

  render() {
    const { item } = this.props;
    console.log('item', item);
    const tags = this.getTags(item.files);
    const nameprefix = `${item.owner.login}/`;

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    // if (item.owner.login !== this.props.currentUser) {
    //   nameprefix = `${item.owner.login}/`;
    // }

    // Put together the content of the repository
    const content = (
      <Wrapper>
        <RepoLink href={item.html_url} target="_blank">
          {nameprefix}
        </RepoLink>
        {tags}
        <IssueLink href={`${item.html_url}/issues`} target="_blank">
          <IssueIcon />
          {/* <FormattedNumber value={item.open_issues_count} /> */}
        </IssueLink>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={`repo-list-item-${item.full_name}`} item={content} />;
  }
}

RepoListItem.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
  }),
)(RepoListItem);
