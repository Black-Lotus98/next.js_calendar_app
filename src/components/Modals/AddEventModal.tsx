import { ChangeEvent, FC, FormEvent, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import dayjs from 'dayjs';
import { AddEventModalProps } from '../../type/event';

const AddEventModal: FC<AddEventModalProps> = ({ show, onClose, onSubmit, newEvent, handleChange, handleCheckboxChange, }) => {

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Add Event
                                        </Dialog.Title>
                                        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
                                            <label htmlFor="allDay" className="col-span-2 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="allDay"
                                                    id="allDay"
                                                    checked={newEvent.allDay}
                                                    onChange={handleCheckboxChange}
                                                    className="mr-2"
                                                />
                                                <span>All Day</span>
                                            </label>
                                            <label htmlFor="title" className="col-span-2">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    placeholder="Event Title"
                                                    value={newEvent.title}
                                                    onChange={handleChange}
                                                    className="w-full border-2 p-2 rounded-md"
                                                />
                                            </label>
                                            <label htmlFor="start" className="col-span-2">
                                                <input
                                                    type="datetime-local"
                                                    name="start"
                                                    id="start"
                                                    value={dayjs(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                                                    onChange={handleChange}
                                                    disabled={newEvent.allDay}
                                                    className="w-full border-2 p-2 rounded-md"
                                                />
                                            </label>
                                            <label htmlFor="end" className="col-span-2">
                                                <input
                                                    type="datetime-local"
                                                    name="end"
                                                    id="end"
                                                    value={dayjs(newEvent.end).add(2, 'hour').format('YYYY-MM-DDTHH:mm')}
                                                    onChange={handleChange}
                                                    disabled={newEvent.allDay}
                                                    className="w-full border-2 p-2 rounded-md"
                                                />
                                            </label>

                                            <div className="col-span-2 sm:flex sm:justify-end">
                                                <button
                                                    type="submit"
                                                    className="w-full sm:w-auto rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                                >
                                                    Add Event
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AddEventModal;
