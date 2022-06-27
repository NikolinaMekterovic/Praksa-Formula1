import React from "react";
import * as $ from "jquery";

export default class Teams extends React.Component {

    state= {
        teams:{}
    }

    componentDidMount(){
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        $.get(url, (data)=>{
            this.setState({
                teams: data
            })
        })
        console.log(this.state.teams)
    }
    render() {
        return(
            <div>
               
            </div>
        )
    }
}