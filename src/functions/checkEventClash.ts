import dayjs from 'dayjs';
import { Event } from "@/type/event";

const checkEventClash = (events: Event[]): void => {
    // Iterate over each event
    for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
            const event1 = events[i];
            const event2 = events[j];

            let isOverlap = false;

            // Check for overlap if neither event is all-day
            if (!event1.allDay && !event2.allDay) {
                isOverlap = !(dayjs(event2.end).isBefore(dayjs(event1.start)) || dayjs(event2.start).isAfter(dayjs(event1.end)));
            }

            // Check for overlap if one of the events is all-day
            if (event1.allDay || event2.allDay) {
                const event1Start = dayjs(event1.start).startOf('day');
                const event1End = event1.allDay ? event1Start.endOf('day') : dayjs(event1.end);
                const event2Start = dayjs(event2.start).startOf('day');
                const event2End = event2.allDay ? event2Start.endOf('day') : dayjs(event2.end);

                isOverlap = !(event2End.isBefore(event1Start) || event2Start.isAfter(event1End));
            }

            if (isOverlap) {
                console.log(`Overlap detected between "${event1.title}" and "${event2.title}"`);
            }
            else {
                console.log('No overlap detected');
            }
        }
    }
}

export default checkEventClash;
