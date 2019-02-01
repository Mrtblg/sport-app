import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, withStyles } from '../../skeleton/ressources/with-styles';
import thesportdbQueryService from '../../skeleton/services/thesportdb-query.service';
import Team from './team';
import ListItem from '../../bricks/list-item';
import Title from '../../bricks/title';

/**
 * Display all the teams of the Premier Ligue (hardcoded)
 * The ranking is based on the year of creation of the team
 */
class Teams extends Component {
  /**
   * Parse the answer from API and extract the data we need
   * sort the teams based on the year of creation of the team
   * @param {Object} data answer from the API
   * @returns {Array} the array of teams sorted
   */
  static parseAPIData(data) {
    const teams = data.teams.map(team => ({
      name: team.strTeam,
      creationYear: parseInt(team.intFormedYear, 10),
      uniqId: team.idTeam,
    }));
    teams.sort((teamA, teamB) => (teamA.creationYear > teamB.creationYear ? 1 : -1));
    return teams;
  }

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };
  }

  /** Fetch team list by interrogating the API on the Premier League (hardcoded) */
  componentWillMount() {
    thesportdbQueryService.query({
      url: 'search_all_teams.php?l=English%20Premier%20League',
    }).then((response) => {
      this.setState({ teams: Teams.parseAPIData(response) });
    });
  }

  render() {
    const { teams } = this.state;
    const { styles } = this.props;

    // display a not found message if the list of teams is empty
    if (teams === undefined || teams.length === 0) {
      return (
        <div>
          No team found
        </div>
      );
    }

    const teamsVue = teams.map(team => (
      <Team
        key={team.uniqId}
        name={team.name}
        creationYear={team.creationYear}
        id={team.uniqId}
      />
    ));
    return (
      <div {...css(styles.container)}>
        <Title label="Liste des équipes" />
        <ListItem
          labels={['Nom de l\'équipe', 'Date de création']}
          type="header"
        />
        {teamsVue}
      </div>
    );
  }
}

Teams.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default withStyles(() => ({
  container: {
    width: '50%',
  },
}))(Teams);
