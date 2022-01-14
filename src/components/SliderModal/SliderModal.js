import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  button,
  Carousel,
  CarouselIndicators,
  CarouselItem,
  CarouselCaption,
  CarouselControl,
  UncontrolledCarousel,
} from "reactstrap";
import "./slider-modal.scss";

const SliderModal = ({
  modal,
  toggleModal,

  title,

  entityImages,
}) => {
  const [itemLength, setItemLength] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (modal) {
      const imageArr = entityImages;
      if (imageArr) {
        setItemLength(imageArr.filter((el) => el.type_id === "1").length);
        setItems(
          imageArr
            .filter((el) => el.type_id === "1")
            .map((item, i) => {
              return {
                altText: `Slide 1 ${i + 1}`,

                key: i + 1,
                src: process.env.REACT_APP_SERVER_URL + "/" + item.img,
              };
            })
        );
      }
    }
  }, [modal]);
  // const items = [
  //   {
  //     altText: "Slide 1",
  //     caption: "Slide 1",
  //     key: 1,
  //     src: "https://picsum.photos/id/123/1200/600",
  //   },
  //   {
  //     altText: "Slide 2",
  //     caption: "Slide 2",
  //     key: 2,
  //     src: "https://picsum.photos/id/456/1200/600",
  //   },
  //   {
  //     altText: "Slide 3",
  //     caption: "Slide 3",
  //     key: 3,
  //     src: "https://picsum.photos/id/678/1200/600",
  //   },
  // ];
  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Next button for Carousel
  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem key={item.src}>
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });

  return (
    <>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader>{title && title}</ModalHeader>
        <ModalBody>
          {/* <Carousel
            interval={false}
            previous={previousButton}
            next={nextButton}
            activeIndex={activeIndex}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={(newIndex) => {
                if (animating) return;
                setActiveIndex(newIndex);
              }}
            />
            {slides}
            {itemLength > 0 && (
              <>
                <CarouselControl
                  directionText="Prev"
                  direction="prev"
                  onClickHandler={previousButton}
                />
                <CarouselControl
                  directionText="Next"
                  direction="next"
                  onClickHandler={nextButton}
                />
              </>
            )}
          </Carousel> */}
          <UncontrolledCarousel items={items} interval={false} />
        </ModalBody>
        <ModalFooter>
          {/* <button className="ui-btn ui-btn-secondary" onClick={toggleModal}>Cancel</button>
          <button className="ui-btn ui-btn-primary" onClick={handleConfirmModalFormSubmit}>
            Submit
          </button> */}
        </ModalFooter>
      </Modal>
    </>
  );
};
export default SliderModal;
