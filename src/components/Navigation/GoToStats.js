import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const GoToStats = () => (
  <li>
    <Link className="nav-link" to={ROUTES.STATS}>Stats</Link>
  </li>
)

export default GoToStats;