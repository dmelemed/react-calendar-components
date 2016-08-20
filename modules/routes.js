import React from 'react'
import {Route, Router, IndexRoute} from 'react-router'
import App from './App'
import {Calendar} from './Calendar'
import {HeatMap} from './HeatMap'
import ConceptPage from './ConceptPage'
import Home from './Home'
import Clock from './Clock'
import Hypnosis from './Hypnosis'
import PieChart from './PieChart'
import Modal from './Modal'
import Recipes from './cooking/Recipes'

// <IndexRoute component={App}/>

module.exports = (
    <Router>
        <Route path="/">
            <Route path="/concept" component={ConceptPage}/>
            <Route path="/home" component={Home}/>
            <Route path="/calendar" component={Calendar}/>
            <Route path="/heatmap-cal" component={HeatMap}/>
            <Route path="/clock" component={Clock}/>
            <Route path="/hypno" component={Hypnosis}/>
            <Route path="/pie" component={PieChart}/>
            <Route path="/modal" component={Modal}/>
            <Route path="/recipes" component={Recipes}/>
        </Route>
    </Router>
)
