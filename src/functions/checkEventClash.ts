import dayjs from 'dayjs';
import { Event } from "@/type/event";

const checkEventClash = (events: Event[]): void => {
    for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
            const event1 = events[i];
            const event2 = events[j];

            let isOverlap = false;

            // Case 1: Both events are non-all-day
            if (!event1.allDay && !event2.allDay) {
                const event1Start = dayjs(event1.start);
                const event1End = dayjs(event1.end);
                const event2Start = dayjs(event2.start);
                const event2End = dayjs(event2.end);

                // console.log("event1Start", event1Start.toDate())
                // console.log("event1End", event1End.toDate())
                // console.log("event2Start", event2Start.toDate())
                // console.log("event2End", event2End.toDate())


                isOverlap = !(event2End.isBefore(event1Start) || event2Start.isAfter(event1End));
            }

            // Case 2: One or both events are all-day
            if (event1.allDay || event2.allDay) {
                const event1Start = dayjs(event1.start).startOf('day');
                const event1End = event1.allDay ? event1Start.endOf('day') : dayjs(event1.end);
                const event2Start = dayjs(event2.start).startOf('day');
                const event2End = event2.allDay ? event2Start.endOf('day') : dayjs(event2.end);

                isOverlap = !(event2End.isBefore(event1Start) || event2Start.isAfter(event1End));
            }

            // Log the overlap result
            if (isOverlap) {
                console.log(`Overlap detected between "${event1.title}" and "${event2.title}"`);
            } else {
                console.log(`No overlap detected between "${event1.title}" and "${event2.title}"`);
            }
        }
    }
};

export default checkEventClash;
