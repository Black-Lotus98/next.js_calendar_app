export type EventInputType = {
    title: string;
    start: string;
    end: string;
}

export type FullCalendarType = {
    events: EventInputType[];
    plugins: string[];
    initialView: string;
    headerToolbar: {
        left: string;
        center: string;
        right: string;
    };
    editable: boolean;
    selectable: boolean;
}