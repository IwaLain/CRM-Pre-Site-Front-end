import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "reactstrap";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./Previews.scss";

const AttachedFiles = ({
  type,
  name,
  onAddFile,
  attachedFiles,
  onRemoveFile,
  accepted,
}) => {
  const [files, setFiles] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [removeFile, setRemoveFile] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: accepted,
    onDrop: async (acceptedFiles) => {
      const newAcceptedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      onAddFile(newAcceptedFiles, type);
    },
  });
  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));

    setFiles([
      ...attachedFiles.map((file) => {
        const fileExtension = file.img.substring(file.img.lastIndexOf("."));
        const imageTypes = [".jpeg", ".png", ".jpg"];
        const isImage = imageTypes.some((el) => fileExtension.includes(el));
        return {
          name: file.img,
          preview: process.env.REACT_APP_SERVER_URL + "/" + file.img,
          id: file.id,
          isImage: isImage,
        };
      }),
    ]);
  }, [attachedFiles]);

  return (
    <>
      <ConfirmModal
        modal={confirmModal}
        toggleModal={toggleConfirmModal}
        title="Remove image"
        handleSubmit={() => {
          onRemoveFile(removeFile, type);
        }}
        modalText={`Are you sure you want to DELETE file`}
      />
      <h2 className="page-subtitle">
        {name ? `Attached ${name}` : "Attached Files"}
      </h2>
      <div {...getRootProps({ className: "dropzone" })}>
        <Button
          className="upload-file--btn"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Upload {name}
        </Button>
        <input {...getInputProps()} />
        {/* Add {type && type} */}{" "}
        <div className="thumbsContainer">
          {files &&
            files.map((file) => (
              <div
                className="thumb"
                key={file.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <span
                  className="attached--remove-img"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setRemoveFile(file);
                    toggleConfirmModal();
                  }}
                ></span>
                <div className="thumbInner">
                  {file.isImage === true ? (
                    <img
                      src={file.preview}
                      className="attached--img"
                      alt="..."
                    />
                  ) : (
                    <i class="far fa-file  fa-4x"></i>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default AttachedFiles;
