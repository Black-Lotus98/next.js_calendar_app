import { ChangeEvent, FormEvent } from "react";

export interface Event {
    title: string;
    start: Date | string;
    end: Date | string;
    allDay: boolean;
    id: number;
}


export interface AddEventModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    newEvent: Event
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
