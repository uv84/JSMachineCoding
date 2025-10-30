import "./Nav.css";
import { VscAccount } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

function Nav() {
    const [isHovering, setIsHovering] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const NavLinks = [
    {
      icon: <VscAccount />,
      type: "Login",
      tooltip: "Login",
    },
    {
      icon: <IoCartOutline />,
      type: "Cart",
      tooltip: "Cart",
    },
    {
      icon: <CiShop />,
      type: "Become Seller",
      tooltip: "Become a Seller",
    },
  ];
  return (
    <nav className="nav-main">
      <div>
        <div className="nav-con">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
            alt="flipkart"
          />
          <input
            type="text"
            className="input-st"
            placeholder="Search for Products, Brands and More"
          />
          <ul className="navCon">
            {NavLinks.map((item) => (
              <div
                className="nav-links"
                onMouseEnter={() => {
                  if (item.type === "Login") {
                    setIsHovering(true);
                  } else {
                    setHoveredItem(item.type);
                  }
                }}
                onMouseLeave={() => {
                  if (item.type === "Login") {
                    setIsHovering(false);
                  } else {
                    setHoveredItem(null);
                  }
                }}
                key={item.type}
              >
                {item.icon}
                <li>{item.type}</li>
                {item.type === "Login" && isHovering && <LoginHover />}
                {item.type !== "Login" && hoveredItem === item.type && (
                  <Tooltip text={item.tooltip} />
                )}
              </div>
            ))}
          </ul>
          <BsThreeDotsVertical />
        </div>
      </div>
    </nav>
  );
}

function Tooltip({ text }: { text: string }) {
  return (
    <div className="tooltip">
      {text}
    </div>
  );
}

function LoginHover() {
  const list = ["My Profile", "Orders", "Wishlist", "Rewards", "Gift Cards"];
  return (
    <div className="login-hover">
      <div className="login-card">
        <span>
          New Customer? <a href="#">Sign Up</a>
        </span>
        <br />
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Nav;
