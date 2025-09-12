import { NavLink } from "react-router";

 const About = () => {
    return (
        <div>
            <h2>About Page</h2>
            <p>This is the about page of our application.</p>
            <p>Here you can find information about the app and its features.</p>

            <NavLink to="/page1">ab page 1</NavLink>
        </div>
    )
 }

 export default About;  