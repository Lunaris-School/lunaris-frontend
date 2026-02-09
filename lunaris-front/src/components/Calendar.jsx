import React, { useMemo, useState } from "react";
import "./Calendar.css";

import defaultAvatar from "../assets/icone-perfil.png";

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function monthLabel(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function Calendar({
  userName = "Usuário",
  avatarSrc,
  studentGrade,
  selectedDate,
  onSelectDate,
  initialMonth,
}) {
  const [viewDate, setViewDate] = useState(() => {
    const base = initialMonth ? new Date(initialMonth) : new Date();
    return startOfMonth(base);
  });

  const effectiveSelected = selectedDate ? new Date(selectedDate) : null;

  const days = useMemo(() => {
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);

    const gridStart = new Date(start);
    gridStart.setDate(start.getDate() - start.getDay());

    const gridEnd = new Date(end);
    gridEnd.setDate(end.getDate() + (6 - end.getDay()));

    const result = [];
    const cursor = new Date(gridStart);
    while (cursor <= gridEnd) {
      result.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }

    return {
      start,
      end,
      gridStart,
      gridEnd,
      items: result,
    };
  }, [viewDate]);

  const todayLabel = useMemo(() => {
    const today = new Date();
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    }).format(today);
  }, []);

  function handlePrevMonth() {
    setViewDate((d) => startOfMonth(addMonths(d, -1)));
  }

  function handleNextMonth() {
    setViewDate((d) => startOfMonth(addMonths(d, 1)));
  }

  function handlePick(date) {
    if (typeof onSelectDate === "function") onSelectDate(date);
  }

  return (
    <aside className="right-calendar">
      <div className="right-calendar__profile">
        <div className="right-calendar__avatar-wrap">
          <img
            className="right-calendar__avatar"
            src={avatarSrc || defaultAvatar}
            alt={`Foto de ${userName}`}
          />
        </div>
        <div className="right-calendar__name" title={userName}>
          {userName}
        </div>
        {studentGrade ? (
          <div className="right-calendar__grade" title={studentGrade}>
            {studentGrade}
          </div>
        ) : null}
      </div>

      <div className="right-calendar__card" aria-label="Calendário">
        <div className="right-calendar__header">
          <button
            type="button"
            className="right-calendar__nav"
            aria-label="Mês anterior"
            onClick={handlePrevMonth}
          >
            <svg
              className="right-calendar__nav-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M14.5 5.5L8 12l6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="right-calendar__title">{monthLabel(viewDate)}</div>

          <button
            type="button"
            className="right-calendar__nav"
            aria-label="Próximo mês"
            onClick={handleNextMonth}
          >
            <svg
              className="right-calendar__nav-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M9.5 5.5L16 12l-6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="right-calendar__weekdays" aria-hidden="true">
          {WEEK_DAYS.map((d) => (
            <div key={d} className="right-calendar__weekday">
              {d}
            </div>
          ))}
        </div>

        <div className="right-calendar__grid" role="grid">
          {days.items.map((date) => {
            const inMonth = date.getMonth() === viewDate.getMonth();
            const isToday = isSameDay(date, new Date());
            const isSelected =
              effectiveSelected && isSameDay(date, effectiveSelected);

            const className = [
              "right-calendar__day",
              inMonth ? "" : "is-out",
              isToday ? "is-today" : "",
              isSelected ? "is-selected" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={date.toISOString()}
                type="button"
                role="gridcell"
                className={className}
                onClick={() => handlePick(date)}
                aria-label={new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "full",
                }).format(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
