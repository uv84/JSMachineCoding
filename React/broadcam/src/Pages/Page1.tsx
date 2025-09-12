import { NavLink } from "react-router-dom";

const Page1 = () => {
    return (
        <>
        <h1> this is page 1. hahaha</h1>
        <h2> go to page 2</h2>
        <NavLink to="/page1/page2">page2d</NavLink>
        </>
    )
}
export default Page1;