import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../bricks/list-item';

/**
 * Display a representation of a player for a list
 * on a click navigate to the player page
 */
const Player = ({
  name,
  height,
  id,
  teamId,
  selectedPlayerId,
}) => {
  const displayedHeight = (Number.isNaN(height) || height === 0) ? 'xxx' : height;
  return (
    <ListItem
      labels={[name, displayedHeight]}
      link={`/team/${teamId}/${id}`}
      type={id === selectedPlayerId ? 'selected' : 'std'}
    />
  );
};

Player.propTypes = {
  name: PropTypes.string, // Name of the player
  height: PropTypes.number, // height of the player
  id: PropTypes.string.isRequired, // Uniq id of the player
  teamId: PropTypes.string.isRequired, // Uniq id of the player's team
  selectedPlayerId: PropTypes.string, // usefull to display differently if selected
};

Player.defaultProps = {
  name: 'unknown',
  height: 0,
  selectedPlayerId: undefined,
};

export default Player;
