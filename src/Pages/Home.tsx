import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useBeforeunload } from "react-beforeunload";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: auto;
`;

const Timer = styled.button`
  font-family: "Parisienne", cursive;
  font-size: 10vw;

  background-color: white;
  border: none;
`;

function Home() {
  const [second, setSecond] = useState(0);
  const [recordDate, setRecordDate] = useState("");
  const [goDataPage, setGoDataPage] = useState(false);

  const saveTimeToLocalStorage = () => {
    window.localStorage.setItem(
      "Today",
      JSON.stringify({ date: recordDate, time: second })
    );

    let studyRecord = JSON.parse(window.localStorage.getItem("Data") ?? `[]`);
    console.log(studyRecord);

    if (studyRecord.length >= 30) {
      if (studyRecord[studyRecord.length - 1].date == recordDate) {
        studyRecord.pop();
      } else {
        studyRecord.shift();
      }
    } else if (studyRecord.length != 0) {
      if (studyRecord[studyRecord.length - 1].date == recordDate) {
        studyRecord.pop();
      }
    }
    studyRecord.push({ date: recordDate, time: second });
    window.localStorage.setItem("Data", JSON.stringify(studyRecord));
  };

  useBeforeunload(saveTimeToLocalStorage);

  useEffect(() => {
    let baseTime = Date.now();
    let date = GetRecordDate();
    setRecordDate(date);

    let latestData = JSON.parse(window.localStorage.getItem("Today") ?? "null");
    if (latestData == null) {
      latestData = { date: GetRecordDate(), time: 0 };
    }

    if (date != latestData.date) {
      timerStart(baseTime, 0);
    } else {
      timerStart(baseTime, latestData.time);
    }
  }, []);

  const timerStart = (baseTime: number, initValue: number) => {
    setInterval(() => {
      setSecond(Math.floor((Date.now() - baseTime) / 1000) + initValue);
    }, 100);
  };

  const GetRecordDate = () => {
    let accessDate = new Date();
    let recordDate = "";
    if (accessDate.getHours() <= 5) {
      recordDate = `${accessDate.getFullYear()}/${accessDate.getMonth() + 1}/${
        accessDate.getDate() - 1
      }`;
    } else {
      recordDate = `${accessDate.getFullYear()}/${
        accessDate.getMonth() + 1
      }/${accessDate.getDate()}`;
    }

    return recordDate;
  };

  const GetTime = (sec: number) => {
    var hours = `${Math.floor(sec / 3600)}`;
    var minutes = `${Math.floor(sec / 60) - Math.floor(sec / 3600) * 60}`;
    var seconds = `${sec % 60}`;

    var twoDigitHours = hours.length == 1 ? "0" + hours : hours;
    var twoDigitMinutes = minutes.length == 1 ? "0" + minutes : minutes;
    var twoDigitSeconds = seconds.length == 1 ? "0" + seconds : seconds;

    return [twoDigitHours, twoDigitMinutes, twoDigitSeconds];
  };

  const goStats = () => {
    saveTimeToLocalStorage();
    setGoDataPage(true);
  };

  return (
    <>
      {goDataPage ? (
        <Navigate to="/data"></Navigate>
      ) : (
        <Wrapper>
          <Timer onClick={goStats}>
            {GetTime(second)[0]} : {GetTime(second)[1]} : {GetTime(second)[2]}
          </Timer>
        </Wrapper>
      )}
    </>
  );
}

export default Home;
