import { NavLink } from "react-router-dom";

 const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <NavLink to="/about">go to about section to see what i developed, u will be amaged</NavLink>
            <br />
            <NavLink to="/page1">Go to Page 1</NavLink>
        </div>
    )
 }

 export default Home;  