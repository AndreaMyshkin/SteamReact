import React from 'react'
// import { componentFromProp } from 'recompose';

class Forum extends React.Component{
fileSelectedHandler = event =>{
console.log(event)
}
  render () {
    return (

<div><input type='file' onChange={this.fileSelectedHandler}/></div>

)


}





}

export default Forum;

