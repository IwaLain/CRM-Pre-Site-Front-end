import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "reactstrap";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Dropzone from "react-dropzone";

const DropzoneComponent = () => {
  var dropzone = new Dropzone("#demo-upload", {
    parallelUploads: 2,
    thumbnailHeight: 120,
    thumbnailWidth: 120,
    maxFilesize: 3,
    filesizeBase: 1000,
    thumbnail: function (file, dataUrl) {
      if (file.previewElement) {
        file.previewElement.classList.remove("dz-file-preview");
        var images = file.previewElement.querySelectorAll(
          "[data-dz-thumbnail]"
        );
        for (var i = 0; i < images.length; i++) {
          var thumbnailElement = images[i];
          thumbnailElement.alt = file.name;
          thumbnailElement.src = dataUrl;
        }
        setTimeout(function () {
          file.previewElement.classList.add("dz-image-preview");
        }, 1);
      }
    },
  });

  // Now fake the file upload, since GitHub does not handle file uploads
  // and returns a 404

  var minSteps = 6,
    maxSteps = 60,
    timeBetweenSteps = 100,
    bytesPerStep = 100000;

  dropzone.uploadFiles = function (files) {
    var self = this;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var totalSteps = Math.round(
        Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep))
      );

      for (var step = 0; step < totalSteps; step++) {
        var duration = timeBetweenSteps * (step + 1);
        setTimeout(
          (function (file, totalSteps, step) {
            return function () {
              file.upload = {
                progress: (100 * (step + 1)) / totalSteps,
                total: file.size,
                bytesSent: ((step + 1) * file.size) / totalSteps,
              };

              self.emit(
                "uploadprogress",
                file,
                file.upload.progress,
                file.upload.bytesSent
              );
              if (file.upload.progress == 100) {
                file.status = Dropzone.SUCCESS;
                self.emit("success", file, "success", null);
                self.emit("complete", file);
                self.processQueue();
                //document.getElementsByClassName("dz-success-mark").style.opacity = "1";
              }
            };
          })(file, totalSteps, step),
          duration
        );
      }
    }
  };

  return (
    <>
      <h1>DropzoneJS File Upload Demo</h1>
      <section>
        <div id="dropzone">
          <form class="dropzone needsclick" id="demo-upload" action="/upload">
            <div class="dz-message needsclick">
              Drop files here or click to upload.
              <span class="note needsclick">
                (This is just a demo dropzone. Selected files are not actually
                uploaded.)
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default DropzoneComponent;
