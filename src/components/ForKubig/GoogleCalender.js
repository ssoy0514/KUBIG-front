import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { styled } from "styled-components";
import ModalPortal from "../common/ModalPortal";
//import clock from "../../../clock.svg";
//import location from "../../../image/location.svg";

export default function GoogleCalendar() {
  const [eventInfo, setEventInfo] = useState(null);
  const [isEventShowing, setIsEventShowing] = useState(false);
  const apiKey = process.env.REACT_APP_CAL_API_KEY;
  const [time, setTime] = useState("");
  useEffect(() => {
    if (isEventShowing) {
      let start_date = eventInfo.event.start.getUTCDate();
      let start_hour = eventInfo.event.start.getHours();
      let start_minute = eventInfo.event.start.getMinutes();
      let end_hour = eventInfo.event.end.getHours();
      let end_minute = eventInfo.event.end.getMinutes();
      let start =
        start_hour + "시" + start_minute + " ~ " + end_hour + "시" + end_minute;
      setTime(start);
    }
  }, [eventInfo]);
  return (
    <>
      <CustomCalender>
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          locale={"ko"}
          initialView="dayGridMonth"
          googleCalendarApiKey={apiKey}
          eventSources={[
            {
              googleCalendarId: process.env.REACT_APP_CALENDER_ID,
              color: "#9E1F15",
              className: "kubig-calender",
            },
            {
              googleCalendarId: process.env.REACT_APP_KOREA_CAL_ID,
              color: "red",
              className: "ko-event",
              display: "auto",
            },
          ]}
          eventClick={function (info) {
            info.jsEvent.preventDefault(); // don't let the browser navigate
            info.jsEvent.stopPropagation();

            setIsEventShowing(true);
            setEventInfo(info);
          }}
          height={"660px"}
          Toolbar
        />
      </CustomCalender>
      {isEventShowing && (
        <ModalPortal
          isShowing={isEventShowing}
          setIsShowing={setIsEventShowing}
        >
          <ModalWrapper>
            <DetailWrapper>
              <h1>{eventInfo.event.title}</h1>
              <Info>
                <img
                  src={process.env.PUBLIC_URL + `/images/clock.svg`}
                  className="clock"
                  alt="time"
                />

                <h2>시간</h2>
              </Info>

              <h3>{time}</h3>

              <Info>
                <img
                  src={process.env.PUBLIC_URL + `/images/location.svg`}
                  className="location"
                  alt="location"
                />

                <h2>장소</h2>
              </Info>

              {eventInfo.event.extendedProps && (
                <h3>{eventInfo.event.extendedProps.location}</h3>
              )}
            </DetailWrapper>
          </ModalWrapper>
        </ModalPortal>
      )}
    </>
  );
}
const ModalWrapper = styled.div`
  width: 27.3125rem;
  min-height: 15rem;
  height: fit-content;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.7rem;
  overflow: auto;
  
`;

const DetailWrapper = styled.div`
  width: 27.3125rem;
  height: max-content;
  padding: 1rem;
  padding-left: 2rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 0.7rem;
  overflow: auto;
  h1 {
    font-size: 1.375rem;
    font-weight: 700;
    margin-top: 0rem;
    margin-bottom: 1.3rem;
  }
  h2 {
    color: #979797;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 18px;
  }

  h3 {
    color: #000;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.8rem;
    padding-left: 0.2rem;
  }
  img {
    width: 18px;
    height: 18px;
  }
`;
const Info = styled.div`
  display: flex;
  gap: 3px;
  margin-top: 0.6rem;
`;
const CustomCalender = styled.div`
  .fc-daygrid-day-top {
    text-align: center;
  }
  .fc-event-main {
    position: relative;
    z-index: 2;
    border-radius: 20px;
  }

  .fc-day-sun a {
    color: red;
  }

  .fc-day-sat a {
    color: blue;
  }

  .fc-button {
    background-color: #9e1f15;
  }
  .fc-button-primary {
    //color: grey;
    border: white 1px solid;
    background-color: transparent;
    color: grey;
    border: #f0f0f0 solid 2px;
    opacity: 0.9;
    border-radius: 10px;

    &:hover {
      background-color: #f1f1f1 !important;
      color: gray;
      border: #f0f0f0 solid 2px;
    }
  }
  .fc .fc-button-primary:disabled {
    background-color: transparent !important;
    opacity: 1 !important;
    color: gray;
    border: #f0f0f0 solid 2px;

    &:hover {
      background-color: #f1f1f1 !important;
    }
  }
  .fc-icon {
    color: grey !important;
  }
`;
