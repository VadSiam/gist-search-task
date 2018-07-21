/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
/* eslint-disable import/no-unresolved */
import Tag from 'components/Tag';
import Img from './Img';
import IssueLink from './IssueLink';
import RepoLink from './RepoLink';
import TagsList from './TagsList';
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

  renderAvatars = arr =>
    arr.map(
      (elem, idx) =>
        idx < 3 ? (
          <IssueLink key={elem.id} href={`${elem.html_url}`} target="_blank">
            <Img src={elem.owner.avatar_url} alt="avatar" />
          </IssueLink>
        ) : null,
    );

  render() {
    const { item } = this.props;
    const tags = this.getTags(item.files);
    const nameprefix = `${item.owner.login}`;

    const content = (
      <Wrapper>
        <RepoLink href={item.html_url} target="_blank">
          {nameprefix}
        </RepoLink>
        <TagsList>{tags}</TagsList>
        {item.forks.length ? this.renderAvatars(item.forks) : <div />}
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={`repo-list-item-${item.full_name}`} item={content} />;
  }
}

RepoListItem.propTypes = {
  item: PropTypes.object,
};

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
  }),
)(RepoListItem);
