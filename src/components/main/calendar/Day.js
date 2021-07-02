import React from "react";
import moment from "moment";
import { Icon } from "react-icons-kit";
import {
  u1F604,
  u1F601,
  u1F606,
  u1F608,
  u1F60D,
  u1F60E,
} from "react-icons-kit/noto_emoji_regular";
import { sleepy } from "react-icons-kit/icomoon/sleepy";
import { cool } from "react-icons-kit/icomoon/cool";
import {
  DayWarpper,
  DaySpan,
  Emoji,
} from "../../../styles/main/calendar/Day.style";
const emoji = [
  { id: 1, emj: <Icon icon={u1F604} /> },
  { id: 2, emj: <Icon icon={u1F601} /> },
  {
    id: 3,
    emj: <Icon icon={sleepy} size="23" style={{ color: "gray" }} />,
  },
  { id: 4, emj: <Icon icon={u1F608} /> },
  { id: 5, emj: <Icon icon={u1F60D} /> },
  { id: 6, emj: <Icon icon={u1F60E} /> },
];

const Day = ({ value, day, modalHandle }) => {
  const dayEmoji = emoji.find((ele) => ele.id === 3).emj;
  const m = moment();

  return (
    <DayWarpper
      today={m.format("L") === day.format("L")}
      onClick={() => modalHandle(day)}
    >
      <DaySpan
        today={m.format("L") === day.format("L")}
        sunday={day.format("dddd") === "Sunday"}
        saturday={day.format("dddd") === "Saturday"}
        lastmonth={day.format("M") !== value.format("M")}
      >
        {day.format("D")}
      </DaySpan>
      <Emoji>{dayEmoji}</Emoji>
    </DayWarpper>
  );
};

export default Day;
