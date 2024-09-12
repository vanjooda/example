import React, { useState, useEffect } from "react";
import "../../Calendar.css"; // CSS 파일 import

function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [reservations, setReservations] = useState([]);

  // 해당 월의 총 일수를 계산하는 함수
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate(); // 0번째 일은 해당 월의 마지막 날
  };

  // 해당 월의 첫 번째 날의 요일을 반환하는 함수 (0: 일요일, 6: 토요일)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay(); // 1일의 요일 반환
  };

  // 전월의 날짜들을 생성하는 함수
  const generatePrevMonthDays = (year, month, firstDayOfMonth) => {
    if (firstDayOfMonth === 0) return []; // 만약 해당 월이 일요일부터 시작하면 전월 날짜는 필요 없음

    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const totalDaysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    const daysArray = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = totalDaysInPrevMonth - i;
      daysArray.push({
        dayNumber: day,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
      });
    }

    return daysArray;
  };

  // 익월의 날짜들을 생성하는 함수
  const generateNextMonthDays = (daysInCurrentMonth, firstDayOfMonth) => {
    const totalDaysInCalendar = 35; // 6주(7일 * 6주)로 표현되는 달력 기준
    const daysDisplayed = daysInCurrentMonth + firstDayOfMonth;
    const nextMonthDaysCount = totalDaysInCalendar - daysDisplayed;

    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    const daysArray = [];
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      daysArray.push({
        dayNumber: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
      });
    }

    return daysArray;
  };

  // 해당 월의 모든 날짜를 배열로 반환하는 함수
  const generateCalendarDays = (year, month) => {
    const totalDaysInCurrentMonth = getDaysInMonth(year, month); // 해당 월의 총 일수 계산
    const firstDayOfMonth = getFirstDayOfMonth(year, month); // 해당 월의 첫 날의 요일

    const prevMonthDays = generatePrevMonthDays(year, month, firstDayOfMonth); // 전월의 날짜들
    const currentMonthDays = [];
    for (let day = 1; day <= totalDaysInCurrentMonth; day++) {
      currentMonthDays.push({
        dayNumber: day,
        month,
        year,
        isCurrentMonth: true,
      }); // 현재 월의 날짜들
    }
    const nextMonthDays = generateNextMonthDays(
      totalDaysInCurrentMonth,
      firstDayOfMonth
    ); // 익월의 날짜들

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]; // 전월, 현재 월, 익월의 날짜들 합치기
  };

  // 예약 데이터를 실제로 사용하는 대신, 가상의 데이터를 설정
  useEffect(() => {
    const testReservations = [
      {
        date: `${year}-${month < 10 ? "0" : ""}${month}-03`,
        isAvailable: true,
      },
      {
        date: `${year}-${month < 10 ? "0" : ""}${month}-05`,
        isAvailable: true,
      },
      {
        date: `${year}-${month < 10 ? "0" : ""}${month}-15`,
        isAvailable: true,
      },
    ];

    const calendarDays = generateCalendarDays(year, month); // 달력에 필요한 모든 날짜 생성

    // 각 날짜에 대해 예약 데이터 적용
    const updatedDays = calendarDays.map((day) => {
      const formattedDate = `${day.year}-${day.month < 10 ? "0" : ""}${
        day.month
      }-${day.dayNumber < 10 ? "0" : ""}${day.dayNumber}`;
      const reservation = testReservations.find(
        (r) => r.date === formattedDate
      );
      return {
        ...day,
        isAvailable: reservation ? reservation.isAvailable : false,
      };
    });

    setReservations(updatedDays); // 업데이트된 달력 데이터 설정
  }, [year, month]); // year와 month가 변경될 때마다 실행

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  // 달력의 날짜를 렌더링하는 함수
  const renderCalendar = () => {
    return reservations.map((day, index) => (
      <div
        key={index}
        className={`calendar-day ${
          day.isCurrentMonth ? "" : "not-current-month"
        }`}
      >
        <a
          href={`/reservation?date=${day.year}-${day.month < 10 ? "0" : ""}${
            day.month
          }-${day.dayNumber < 10 ? "0" : ""}${day.dayNumber}`}
        >
          {day.dayNumber}일
          <br />
          {day.isCurrentMonth && (day.isAvailable ? "예약 가능" : "예약 불가")}
        </a>
      </div>
    ));
  };

  return (
    <div className="calendar">
      {/* 달력 상단의 이전/다음 버튼과 현재 연도/월 */}
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>이전 달</button>
        <h2>
          {year}년 {month}월
        </h2>
        <button onClick={handleNextMonth}>다음 달</button>
      </div>

      {/* 달력 본문 (각 날짜를 렌더링) */}
      <div className="calendar-body">{renderCalendar()}</div>
    </div>
  );
}

export default Calendar;
