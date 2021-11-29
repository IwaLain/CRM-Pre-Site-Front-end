import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "reactstrap";
import convertToBase64 from "../../js/helpers/convertImage";
import "./Previews.scss";

const AttachedFiles = ({
  type,
  title,
  onAddImage,
  attachedFiles,
  onRemoveImage,
}) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((oldFiles) => {
        acceptedFiles.map((file) => {
          onAddImage(file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });
        let newArr = oldFiles.concat(acceptedFiles);

        return newArr;
      });
    },
  });

  const thumbs = files.map((file) => (
    <div className="thumb" key={file.name}>
      <span
        className="attached--remove-img"
        onClick={() => onRemoveImage(file)}
      ></span>
      <div className="thumbInner">
        <img src={file.preview} className="attached--img" alt="..." />
      </div>
    </div>
  ));

  useEffect(() => {
    switch (type) {
      case "image":
        break;
      case "pdf":
        break;
      case "schema":
        break;
      default:
        break;
    }
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));

    setFiles([
      ...attachedFiles.map((file) => {
        return {
          name: file.img,
          preview: process.env.REACT_APP_SERVER_URL + "/" + file.img,
          id: file.id,
        };
      }),
    ]);
  }, [attachedFiles]);

  return (
    <div className="">
      {title && <h3>{title}</h3>}
      <div className="thumbsContainer">
        {thumbs}
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Button className="thumb" color="secondary">
            Add image
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AttachedFiles;
