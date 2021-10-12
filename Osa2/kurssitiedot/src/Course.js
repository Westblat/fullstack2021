import React from "react";

const Header = ({course}) => {
    return(<h2>{course.name}</h2>)
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
    return (<p><b>Total of {totalAmount} exercises</b></p>)
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content content={course}/>
            <Total total={course}/>
        </div>
    )

}
export default Course;