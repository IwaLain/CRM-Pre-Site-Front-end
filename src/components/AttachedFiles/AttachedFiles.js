import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";
import SliderModal from "../SliderModal/SliderModal";

const AttachedFiles = ({
  type,
  name,
  onAddFile,
  attachedFiles,
  onRemoveFile,
  accepted = ".jpg, .jpeg, .png",
  multiple = true,
  maxFiles = 0,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [removeFile, setRemoveFile] = useState();
  const [sliderModal, setSliderModal] = useState(false);
  const [sliderModalImage, setSliderModalImage] = useState({});
  const toggleSliderModal = () => {
    setSliderModal(!sliderModal);
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: accepted,
    noClick: files.length > 0 ? true : false,
    noKeyboard: true,
    multiple: multiple,
    maxFiles: maxFiles,
    onDrop: async (acceptedFiles) => {
      setIsLoading(true);
      if (files.length < 1 || maxFiles === 0) {
        const newAcceptedFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        await onAddFile(newAcceptedFiles, type);
      }
    },
  });
  const toggleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  useEffect(() => {
    setIsLoading(false);
    files.forEach((file) => URL.revokeObjectURL(file.preview));

    setFiles(
      attachedFiles.map((file) => {
        let fileName;
        const fileExtension = file.img.substring(file.img.lastIndexOf("."));
        if (!file.fileName) {
          fileName = file.img.substring(
            file.img.lastIndexOf("/") + 1,
            file.img.lastIndexOf("_")
          );
        } else {
          fileName = file.fileName;
        }
        const imageTypes = [".jpeg", ".png", ".jpg"];
        const isImage = imageTypes.some((el) => fileExtension.includes(el));
        return {
          ...file,
          isImage: isImage,
          fileName: fileName,
        };
      })
    );
  }, [attachedFiles]);

  const thumbs =
    files &&
    files.length > 0 &&
    files.map((file) => (
      <div className="thumb" key={file.id}>
        <span
          className="attached--remove-img"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setRemoveFile(file);
            toggleConfirmModal();
          }}
        ></span>
        <div className="thumbInner" title={file.fileName}>
          {file.isImage === true ? (
            <img
              onClick={() => {
                setSliderModalImage({ src: file.preview });
                toggleSliderModal();
              }}
              src={file.preview}
              className="attached--img"
              alt="..."
            />
          ) : (
            <i className="far fa-file  fa-4x"></i>
            // <div className="dropzone--filename">
            //   <span className="filename--text">{file.img}</span>
            //   <i className="far fa-file  fa-4x"></i>
            // </div>
          )}
        </div>
      </div>
    ));

  return (
    <>
      <SliderModal
        modal={sliderModal}
        toggleModal={toggleSliderModal}
        entityImages={sliderModalImage}
      />
      <ConfirmModal
        modal={confirmModal}
        toggleModal={toggleConfirmModal}
        title="Remove image"
        handleSubmit={() => {
          onRemoveFile(removeFile, type);
        }}
        modalText={`Are you sure you want to DELETE file`}
      />
      {name && <h3 className="page-subtitle fw-normal">{name}</h3>}
      <div
        {...getRootProps({
          className:
            "dropzone " +
            (files && files.length > 0 ? "" : "dropzone--placeholder"),
        })}
      >
        <input {...getInputProps()} />

        {thumbs ? (
          <div className="thumbsContainer">
            {thumbs}
            {isLoading ? (
              <>
                <div className="thumb">
                  <div className="thumbInner">
                    <Spinner />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {maxFiles === 0 && (
              <div
                className="thumb"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  open();
                }}
              >
                <button className="dropzone--add-file-btn btn ">
                  <i className="fas fa-plus fa-2x add-file-btn--icon"></i>
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="dropzone--placeholder-text">
            Drag 'n' drop some files here, or click to select files
          </span>
        )}
      </div>
    </>
  );
};
AttachedFiles.propTypes = {
  name: PropTypes.string,
  onAddFile: PropTypes.func,
  attachedFiles: PropTypes.array,
  onRemoveFile: PropTypes.func,
  accepted: PropTypes.string,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
};
export default AttachedFiles;
