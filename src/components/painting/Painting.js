import React, { useRef, useEffect, useState } from "react";
import uniqueId from "lodash/uniqueId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintBrush,
  faFillDrip,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faImage as farImage,
  faStickyNote as farStickyNote,
} from "@fortawesome/free-regular-svg-icons";
import {
  arr_Colors,
  CanvasWrapper,
  Canvas,
  ControlBtns,
  RefreshBtn,
  LoadBtn,
  PaintBtn,
  FillBtn,
  EraserBtn,
  RangeBtnWrapper,
  RangeBtn,
  ColorWrapper,
  Colors,
} from "../../styles/painting/Painting.style";

const Painting = ({
  canvasRef,
  selectedImage,
  isEditing,
  paintingChangeCheck,
}) => {
  const [filling, setFilling] = useState(false);
  const [painting, setPainting] = useState(false);
  const [eraser, setEraser] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [lineWeight, setLineWeight] = useState(2.5);

  const [buttonClicked, setButtonClicked] = useState("PaintBtn");

  const buttonClickHandler = (e) => {
    setButtonClicked(e.target.title);
  };

  const ctx = useRef();
  const fileRef = useRef();

  const BASE_COLOR = "2c2c2c";
  const CANVAS_WIDTH = 1000;
  const CANVAS_HEIGHT = 500;

  useEffect(() => {
    if (selectedImage !== "") {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = selectedImage;
      img.crossOrigin = "*";

      img.onload = function () {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      };
    }
  }, [isEditing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      ctx.current = canvas.getContext("2d");
      ctx.current.strokeStyle = BASE_COLOR;

      ctx.current.fillStyle = "white";
      ctx.current.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }, [isEditing]);

  function handleInsertImage(e) {
    e.preventDefault();
    if (isEditing) {
      paintingChangeCheck();
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    var reader = new FileReader();
    reader.onload = function (event) {
      var img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  const startPainting = () => {
    if (isEditing) {
      paintingChangeCheck();
    }
    if (eraser === true) {
      setPainting(false);
      setErasing(true);
      setFilling(false);
    } else {
      setPainting(true);
      setErasing(false);
    }
  };

  const stopPainting = () => {
    setPainting(false);
    setErasing(false);
  };

  const handlePaintClick = (e) => {
    ctx.current.lineWidth = lineWeight;
    setFilling(false);
    setEraser(false);
    setErasing(false);
  };

  const handleClearClick = () => {
    // ctx.current.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //???????????? ??? ???????????? ?????????????????? ?????? ????????? ????????? ?????? ???????????? ????????? ??????X
    ctx.current.fillStyle = "white"; // ?????? ???????????? ?????????.
    ctx.current.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //????????? ?????? ????????? ???????????? ????????????.
    ctx.current.fillStyle = ctx.current.strokeStyle; //?????? ?????? ???????????? ?????? ???????????????.
  };

  function handleFillClick() {
    setFilling(true);
    setPainting(false);
    setEraser(false);
    setErasing(false);
  }

  const onMouseMove = ({ nativeEvent }) => {
    //??????????????? ????????? ?????? ???????????? ??????
    //?????????.height, width ??? ??????
    //?????????.clientHeight ??? ????????? ????????? ??????
    const getMouesPosition = (nativeEvent) => {
      var mouseX = (nativeEvent.offsetX * canvas.width) / canvas.clientWidth;
      var mouseY = (nativeEvent.offsetY * canvas.height) / canvas.clientHeight;
      return { x: mouseX, y: mouseY };
    };
    const canvas = canvasRef.current;
    const coordX = getMouesPosition(nativeEvent).x;
    const coordY = getMouesPosition(nativeEvent).y;

    if (ctx.current && !painting && !erasing) {
      ctx.current.beginPath();
    } else if (painting) {
      ctx.current.globalCompositeOperation = "source-over";
      ctx.current.lineTo(coordX, coordY);
      ctx.current.lineCap = "round";
      ctx.current.stroke();
    } else if (erasing) {
      // ctx.current.globalCompositeOperation = "destination-out"; //?????? ?????? ??????????????? ????????? ?????? ???????????? ?????????
      ctx.current.globalCompositeOperation = "source-over";
      const colorExtra = ctx.current.strokeStyle; //?????? ?????? ????????? ?????? ?????????
      ctx.current.strokeStyle = "white"; // ???????????? ?????? ????????? ????????? ???????????? ?????? ????????? ??? ????????????
      ctx.current.fillStyle = "white"; // ?????? ???????????? ????????? ???????????? ???????????????

      ctx.current.lineWidth = 15;
      ctx.current.beginPath();
      ctx.current.arc(coordX, coordY, 10, 0, 4 * Math.PI);
      ctx.current.fill();
      ctx.current.moveTo(coordX, coordY);
      ctx.current.lineTo(coordX, coordY);
      ctx.current.stroke();

      ctx.current.strokeStyle = colorExtra; //????????? ?????? ?????? ?????? ??? ?????????
      ctx.current.fillStyle = colorExtra;
    }
  };
  const handleEraserClick = () => {
    setEraser(true);
  };

  const handleColorClick = (e) => {
    const color = e.target.style.backgroundColor;
    ctx.current.strokeStyle = color;
    ctx.current.fillStyle = color;
  };

  const handleRangeChange = (e) => {
    setLineWeight(e.target.value);
    ctx.current.lineWidth = lineWeight;
  };

  const handleCanvasClick = () => {
    if (filling) {
      // ctx.current.fillStyle = "black";
      ctx.current.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //????????? ?????? ??????
    }
  };

  const disableRightClick = (e) => {
    e.preventDefault(); //????????? ?????? ??????
  };

  const handleFileButtonClick = (e) => {
    //??????????????? ??????
    e.preventDefault();
    fileRef.current.click(); // file ???????????? ????????? ?????? ?????????
  };

  if (selectedImage !== undefined && isEditing === false) {
    return (
      <section style={{ position: "relative" }}>
        <Canvas
          ref={canvasRef}
          onContextMenu={disableRightClick}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        ></Canvas>
      </section>
    );
  } else {
    return (
      <div>
        <section>
          <ControlBtns>
            <RefreshBtn onClick={handleClearClick}>
              <FontAwesomeIcon icon={farStickyNote} />
            </RefreshBtn>

            <PaintBtn
              onClick={(e) => {
                handlePaintClick();
                buttonClickHandler(e);
              }}
              buttonClicked={buttonClicked}
              title={"PaintBtn"}
            >
              <FontAwesomeIcon icon={faPaintBrush} />
            </PaintBtn>

            <FillBtn
              onClick={(e) => {
                handleFillClick();
                buttonClickHandler(e);
              }}
              buttonClicked={buttonClicked}
              title={"FillBtn"}
            >
              <FontAwesomeIcon icon={faFillDrip} />
            </FillBtn>

            <EraserBtn
              onClick={(e) => {
                handleEraserClick();
                buttonClickHandler(e);
              }}
              buttonClicked={buttonClicked}
              title={"EraserBtn"}
            >
              <FontAwesomeIcon icon={faEraser} />
            </EraserBtn>

            <LoadBtn onClick={handleFileButtonClick}>
              <FontAwesomeIcon icon={farImage} />
            </LoadBtn>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden={true}
              onChange={handleInsertImage}
            />
            <RangeBtnWrapper>
              <RangeBtn
                type="range"
                min="0.1"
                max="15"
                defaultValue={"3"}
                step="0.1"
                onChange={handleRangeChange}
              />
            </RangeBtnWrapper>
          </ControlBtns>
        </section>
        <ColorWrapper>
          {arr_Colors.map((color) => (
            <Colors
              key={uniqueId()}
              style={{ backgroundColor: `${color}` }}
              onClick={handleColorClick}
            />
          ))}
        </ColorWrapper>

        <CanvasWrapper>
          <Canvas
            ref={canvasRef}
            onContextMenu={disableRightClick}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseMove={onMouseMove}
            onMouseDown={startPainting}
            onMouseUp={stopPainting}
            onMouseLeave={stopPainting}
            onClick={handleCanvasClick}
            onContextMenu={disableRightClick}
          ></Canvas>
        </CanvasWrapper>
      </div>
    );
  }
};

export default React.memo(Painting);
