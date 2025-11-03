import React from "react";
import { Link, useSearchParams  } from "react-router";

function Main() {
    const [searchParams]= useSearchParams ();
    const queryParam = searchParams.get('paramName');
  return (
    <div>
        <p>{queryParam}</p>
      <div>
        <Link to={"/main"}>second</Link>
      </div>

      this is main section
    </div>
  );
}

export default Main;
