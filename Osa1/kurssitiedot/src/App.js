import React from 'react'
const Header = ({course}) => {
  return(<h1>{course.name}</h1>)
}
const Content = ({content}) => {
    return(
        content.parts.map((p, i) => {
            return(
                <Part part={p} key={i}/>
            )
        })
    )
}
const Part = ({part}) => {
    return(<p>{part.name} {part.exercises}</p>)
}
const Total = ({total}) => {
    const totalAmount = total.parts.reduce((total, parts)=> total + parts.exercises, 0)
    return (<p>Number of exercises {totalAmount}</p>)
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {name:'Fundamentals of React', exercises: 10 },
            {name: 'Using props to pass data', exercises: 7},
            {name: 'State of a component', exercises: 14},
        ]
    }

    return (
      <div>
        <Header course={course}/>
        <Content content={course}/>
        <Total total={course}/>
      </div>
    )
}

export default App