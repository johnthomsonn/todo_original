import React from 'react'
import CreateTodo from '../main/CreateTodo'
import NavBar from "../main/NavBar/NavBar"
import './ListPage.css'

const ListPage = props => {


  return (<>
    <NavBar history={props.history} />
    <div className="list-page-top">
        <CreateTodo />
    </div>

    <hr  style={{marginTop:"5%"}}/>

    <div className="list-page-bottom">


    </div>

  </>)
}


export default ListPage;
