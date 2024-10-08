import Calendar from "@/components/Calendar";
import { FullCalendarType } from '@/type/fullCalendar';


export default function Home() {
  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar App</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Calendar />
      </main>
    </>
  );
}
