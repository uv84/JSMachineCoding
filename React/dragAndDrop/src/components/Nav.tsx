import React from "react";

function Nav() {
  return (
    <nav className="flex ">
      <div className="w-full flex justify-between p-4 shadow-md bg-cyan-200">
        <div className="flex cursor-pointer">logo</div>
        <ul className=" flex gap-4 list-none cursor-pointer ">
          <li>home</li>
          <li>about</li>
          <li>features</li>
          <li>testimonial</li>
        </ul>
        <div className="cursor-pointer">sign in</div>
      </div>
    </nav>
  );
}

export default Nav;
