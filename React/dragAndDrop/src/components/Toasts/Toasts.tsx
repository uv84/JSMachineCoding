import { useState } from "react";
import "./Toasts.css";
import { Divide } from "lucide-react";
function Toasts() {
  const [valueS, setValueS] = useState(false);
  function handleSuccess() {
    setValueS(true);
    setTimeout(handle, 5000);
    function handle(){
        setValueS(false)
    }
  }

  return (
    <div>
      <div>
        <button onClick={handleSuccess}>Succes Toast</button>
        <button>Failure Toast</button>
        <button>Warning Toast</button>
      </div>
      <div>
        {valueS && 
            <div className="toast">Succcessfully added</div>
        }
      </div>
    </div>
  );
}

export default Toasts;
