// src/app/Boot.tsx
import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { EventItem, eventsAtom } from "../atoms/calendar";

export function Boot() {
    const events = useAtomValue(eventsAtom);
    const setEvents = useSetAtom(eventsAtom);

    useEffect(() => {
        // 저장된 값이 없거나 배열이 아니면 시드
        // if (!Array.isArray(events) || events.length === 0) {
        const raw: unknown = require("../../assets/events.json");
        const seed: EventItem[] = Array.isArray(raw)
            ? raw
            : raw
            ? [raw as EventItem]
            : []; //단일 객체여도 배열에 들어가도록
        setEvents(seed);
        // }
    }, [events, setEvents]);

    console.log(events);

    return null; // 화면에 렌더링되는 요소 없음
}
