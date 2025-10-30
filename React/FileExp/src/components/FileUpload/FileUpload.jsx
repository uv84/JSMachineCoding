import React from "react";
import { useState } from "react";
import "./fileupload.css";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setDragging] = useState(false);
  function handleChange(e) {
    console.log(e.target.files);
    const selectedFiles = e.target.files;
    setFiles([...files, ...selectedFiles]);
    console.log(files);
  }

  function handleDelete(name) {
    const updateFiles = files.filter((item) => item.name !== name);

    setFiles(updateFiles);
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    // setDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    // setDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files;
    setFiles([...files, ...droppedFile]);
    setDragging(false);
  };

  return (
    <div>
      <div className="App">
        <div className="main-container">
          <div
            className="file-container"
            //onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            // onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              className="inputTag"
              type="file"
              multiple
              id="file"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="file">Browse files</label>
          </div>

          <div>
            {files.map((item, index) => (
              <ul>
                <img
                  className="imag"
                  src={URL.createObjectURL(item)}
                  alt={item.name}
                />
                {item.name}{" "}
                <span onClick={() => handleDelete(item.name)}> X</span>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
