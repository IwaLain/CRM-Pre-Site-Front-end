import placeholder from "../../assets/img/company.png";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SliderModal from "../SliderModal/SliderModal";

const InfoCard = ({
  data,
  type,
  toggleModal,
  toggleConfirmModal,
  chooseMode,
  dispatch,
  currentSubEntityName,
  setCurrentSubEntityName,
  hideRecordView,
}) => {
  const [toggleEntityModal, setToggleEntityModal] = useState(false);
  const [subEntity, setSubEntity] = useState("");
  const [progress, setProgress] = useState(0);
  const [mainImage, setMainImage] = useState();
  const [sliderModal, setSliderModal] = useState(false);
  const [entityImages, setEntityImages] = useState([]);
  const [singleAlias, setSingleAlias] = useState("");

  const toggleSliderModal = () => {
    setSliderModal(!sliderModal);
  };

  const onSetMainImage = (images) => {
    if (images && images.length > 0) {
      let image = images.find((el) => el["main_image"] === "1");
      if (image) {
        setMainImage(image.img);
      }
    }
  };

  useEffect(() => {
    let totalProgress = 0;
    let alias = "";
    if (type) {
      switch (type) {
        case "customers":
          if (data.name) totalProgress += 33.333333;
          if (data.facilities && data.facilities.length > 0)
            totalProgress += 33.333333;
          if (data.equipments && data.equipments.length > 0)
            totalProgress += 33.333333;
          setSubEntity("Facilities");
          onSetMainImage(data["customerImages"]);
          alias = "customer";
          break;
        case "facilities":
          if (data.name) totalProgress += 33.333333;
          if (data.locations && data.locations.length > 0)
            totalProgress += 33.333333;
          if (data.equipments && data.equipments.length > 0)
            totalProgress += 33.333333;
          setSubEntity("Locations");
          onSetMainImage(data["facilityImages"]);
          alias = "facility";
          break;
        case "locations":
          setSubEntity("Equipment");
          onSetMainImage(data["locationImages"]);
          alias = "location";
          break;
        case "equipment":
          setSubEntity(["Sensors", "Mote"]);
          onSetMainImage(data["equipmentImages"]);
          alias = "equipment";
          break;
        default:
          setSubEntity("");
          break;
      }
    }

    setSingleAlias(alias);
    setProgress(totalProgress);
  }, [type]);

  useEffect(() => {
    if (
      currentSubEntityName &&
      currentSubEntityName.name &&
      toggleEntityModal
    ) {
      dispatch({ mode: "edit" });
      dispatch({ modalDataID: data.id });
      toggleModal();
      setToggleEntityModal(!toggleEntityModal);
    }
  }, [toggleEntityModal]);

  return (
    <>
      <SliderModal
        modal={sliderModal}
        toggleModal={toggleSliderModal}
        entityImages={entityImages}
      />
      <div className="info-card">
        <button
          className="info-card__edit ui-btn ui-btn-danger"
          onClick={() => {
            if (dispatch) {
              dispatch({ mode: "edit" });
            }
            if (data) {
              dispatch({ recordToDelete: data.id });
            }
            if (toggleConfirmModal) {
              toggleConfirmModal();
            }
          }}
        >
          <i className="far fa-trash-alt"></i>
        </button>
        <div className="info-card__body">
          <div>
            <img
              src={
                mainImage
                  ? process.env.REACT_APP_SERVER_URL + "/" + mainImage
                  : placeholder
              }
              alt="card error"
            />
          </div>
          <div className="info-card__info">
            <h4 title={data && data.name} className="info-card__name">
              {data && data.name}
            </h4>
            <div
              className="info-card__entities"
              style={!subEntity ? { visibility: "hidden" } : {}}
            >
              {type !== "equipment" ? (
                <>
                  {data && data["facilities"] && (
                    <div>
                      <i className="fas fa-industry me-1"></i>
                      {data["facilities"].length}
                    </div>
                  )}
                  {data["locations"] && (
                    <div>
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {data["locations"].length}
                    </div>
                  )}
                  {data["equipments"] && (
                    <div>
                      <i className="fas fa-tools me-1"></i>
                      {data["equipments"].length}
                    </div>
                  )}
                  {data["equipment"] && (
                    <div>
                      <i className="fas fa-tools me-1"></i>
                      {data["equipment"].length}
                    </div>
                  )}
                </>
              ) : (
                subEntity && (
                  <div>
                    <i class="fas fa-network-wired me-1"></i>
                    {data[subEntity[0].toLowerCase()].length +
                      data[subEntity[1].toLowerCase()].length}
                  </div>
                )
              )}
              {data[singleAlias + "Images"] && (
                <div
                  className={
                    data[singleAlias + "Images"].length > 0
                      ? "table-images"
                      : "table-images disabled"
                  }
                  onClick={() => {
                    if (data[singleAlias + "Images"].length > 0) {
                      dispatch({ modalDataID: data.id });
                      setEntityImages(data[singleAlias + "Images"]);
                      toggleSliderModal();
                    }
                  }}
                >
                  <i className="fas fa-images me-1"></i>
                  {
                    data[singleAlias + "Images"].filter(
                      (el) => el.type_id === "1"
                    ).length
                  }
                </div>
              )}
            </div>
            <div
              className={
                chooseMode
                  ? "info-card__btns"
                  : "info-card__btns info-card__btns-one"
              }
            >
              <Link
                className="ui-btn ui-btn-info"
                to={`/${type}/${data && data.id}`}
                style={data && hideRecordView ? { visibility: "hidden" } : {}}
              >
                <i class="fas fa-eye"></i>
                View
              </Link>
              <button
                className="ui-btn ui-btn-secondary"
                onClick={() => {
                  if (setCurrentSubEntityName) {
                    setToggleEntityModal(!toggleEntityModal);
                    setCurrentSubEntityName({ name: type });
                  } else {
                    if (dispatch) {
                      dispatch({ mode: "edit" });
                    }
                    if (data) {
                      dispatch({ modalDataID: data.id });
                    }
                    if (toggleModal) {
                      toggleModal();
                    }
                  }
                }}
              >
                <span>
                  <i class="fas fa-pencil-alt"></i>Edit
                </span>
              </button>
            </div>
          </div>
        </div>
        {progress > 0 && (
          <div
            className={
              progress < 34
                ? `progress-33`
                : progress < 67
                ? "progress-66"
                : "progress-100"
            }
          >
            <Progress value={progress} />
          </div>
        )}
      </div>
    </>
  );
};

export default InfoCard;
