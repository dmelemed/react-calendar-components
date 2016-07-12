import React from 'react'
import {Route, Router, IndexRoute} from 'react-router'
import App from './App'
import {Calendar} from './Calendar'
import {HeatMap} from './HeatMap'
import ConceptPage from './ConceptPage'
import Home from './Home'


// <IndexRoute component={App}/>

module.exports = (
    <Router>
        <Route path="/">
            <Route path="/concept" component={ConceptPage}/>
            <Route path="/home" component={Home}/>
            <Route path="/calendar" component={Calendar}/>
            <Route path="/heatmap-cal" component={HeatMap}/>
        </Route>
    </Router>
)
