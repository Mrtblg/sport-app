import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../bricks/list-item';


/**
 * Display a representation of a team for a list
 * on click navigate to the team page
 */
const Team = ({ name, creationYear, id }) => {
  return (
    <ListItem
      labels={[ name, creationYear ]}
      link={`/team/${id}`}
    />
  );
};

Team.propTypes = {
  name: PropTypes.string, // Name of the team
  creationYear: PropTypes.number, // CreationYear of the team
  id: PropTypes.string.isRequired, // Uniq Id of the team
};

Team.defaultProps = {
  name: 'unknown',
  creationYear: 0,
};

export default Team;
