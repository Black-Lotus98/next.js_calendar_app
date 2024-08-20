"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import { Event } from "@/type/event"
import checkEventClash from '@/functions/checkEventClash'
import DeleteEventModal from '../Modals/DeleteEventModal'
import AddEventModal from '../Modals/AddEventModal'
import dayjs from 'dayjs'
export default function Home() {
    const [events, setEvents] = useState([
        { title: 'event 1', id: '1' },
        { title: 'event 2', id: '2' },
        { title: 'event 3', id: '3' },
        { title: 'event 4', id: '4' },
        { title: 'event 5', id: '5' },
    ])
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteEventModal, setShowDeleteEventModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState<number | null>(null)
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: dayjs(new Date).toDate(),
        end: dayjs(new Date).add(2, 'hour').toDate(),
        allDay: false,
        id: 0,
    })

    useEffect(() => {
        const draggableEl = document.getElementById('draggable-el')
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    const title = eventEl.getAttribute("title")
                    const id = eventEl.getAttribute("data")
                    const start = dayjs(eventEl.getAttribute("start")).format('YYYY-MM-DDTHH:mm ')
                    const end = dayjs(eventEl.getAttribute("end")).format('YYYY-MM-DDTHH:mm')
                    return { title, id, start, end }
                },
            })
        }
    }, [])

    const handleDateClick = (arg: { date: Date, allDay: boolean }) => {
        countEventsOnDate(arg.date)

        // Optional: Set new event and open the modal to add a new event
        setNewEvent({ ...newEvent, start: arg.date.toISOString(), end: arg.date.toISOString(), allDay: arg.allDay, id: new Date().getTime() })
        setShowModal(true)
    }

    const handleDeleteEventModal = (data: { event: { id: string } }) => {
        setShowDeleteEventModal(true)
        setIdToDelete(Number(data.event.id))
    }

    const handleDelete = () => {
        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDeleteEventModal(false)
        setIdToDelete(null)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setShowDeleteEventModal(false)
        setNewEvent({
            title: '',
            start: '',
            end: '',
            allDay: false,
            id: 0,
        })
        setIdToDelete(null)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewEvent(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setNewEvent(prevState => ({
            ...prevState,
            [name]: checked,
            start: checked ? '' : prevState.start,
            end: checked ? '' : prevState.end,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const eventWithId = {
            ...newEvent,
            id: new Date().getTime(),
        }
        setAllEvents(prevEvents => [...prevEvents, eventWithId])
        handleCloseModal()
    }

    const handleDrop = (arg: DropArg) => {
        const newEvent = {
            title: arg.draggedEl.innerText,
            start: arg.date.toISOString(),
            end: arg.date.toISOString(),
            allDay: arg.allDay,
            id: new Date().getTime(),
        }

        setAllEvents(prevEvents => [...prevEvents, newEvent])

        // After adding the event, count the events on this day
        countEventsOnDate(arg.date)
    }

    const countEventsOnDate = (date: Date) => {
        const clickedDate = dayjs(date).startOf('day')

        const eventsOnThisDay = allEvents.filter(event =>
            dayjs(event.start).isSame(clickedDate, 'day')
        )
    }

    useEffect(() => {
        checkEventClash(allEvents)
    }, [allEvents])

    return (
        <>
            <div className="grid grid-cols-10">
                <div className="col-span-8">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'resourceTimelineWeek, dayGridMonth,timeGridWeek,dayGridDay',
                        }}
                        events={allEvents as EventSourceInput}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        selectMirror={true}
                        drop={handleDrop}
                        dateClick={handleDateClick}
                        eventClick={handleDeleteEventModal}
                    />
                </div>
                <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
                    <h1 className="font-bold text-lg text-center">Drag Event</h1>
                    {events.map(event => (
                        <div
                            className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                            title={event.title}
                            key={event.id}
                        >
                            {event.title}
                        </div>
                    ))}
                </div>
            </div>

            <DeleteEventModal
                show={showDeleteEventModal}
                onClose={handleCloseModal}
                onDelete={handleDelete}
            />
            <AddEventModal
                show={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                newEvent={newEvent}
                handleChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
            />
        </>
    )
}
