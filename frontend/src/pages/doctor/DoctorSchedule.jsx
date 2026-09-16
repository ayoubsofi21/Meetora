import { useState, useEffect } from 'react';
import { doctorApi } from '../../api/doctorApi';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const DAYS_OF_WEEK = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
];

export default function DoctorSchedule() {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form State
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await doctorApi.getAvailabilities();

      setAvailabilities(
        response.data.data || response.data || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to load schedule.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError('');

    try {
      await doctorApi.createAvailability({
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
      });

      await fetchSchedule();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Error saving slot.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this working slot?')) {
      return;
    }

    try {
      await doctorApi.deleteAvailability(id);

      setAvailabilities((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Error removing slot.'
      );
    }
  };

  const getDayLabel = (dayValue) => {
    const day = DAYS_OF_WEEK.find(
      (item) =>
        String(item.value) === String(dayValue)
    );

    return day?.label || dayValue;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Weekly Working Hours
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Set your weekly availability slots for patient bookings.
        </p>
      </div>
      {error && (
        <div
          className="p-4 rounded-xl bg-[#FEE2E2]
            border border-[#FCA5A5]
            flex items-center gap-3
            text-[#DC2626] text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="bg-white rounded-2xl
            border border-[#E2E8F0]
            p-6 shadow-sm h-fit"
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl
                bg-[#EEF2FF]
                flex items-center justify-center"
            >
              <Clock className="w-5 h-5 text-[#3F38CA]" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                Add Time Slot
              </h2>

              <p className="text-xs text-[#94A3B8] mt-0.5">
                Define your working hours
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-semibold text-[#475569] mb-2">
                Day of the Week
              </label>
              <select
                value={dayOfWeek}
                onChange={(e) =>
                  setDayOfWeek(Number(e.target.value))
                }
                className="w-full h-12 px-4
                  bg-[#F8FAFC]
                  border border-[#E2E8F0]
                  rounded-xl text-sm text-[#0F172A]
                  focus:outline-none
                  focus:border-[#3F38CA]
                  focus:ring-2
                  focus:ring-[#3F38CA]/10
                  transition-all"
              >
                {DAYS_OF_WEEK.map((day) => (
                  <option
                    key={day.value}
                    value={day.value}
                  >
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#475569] mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) =>
                    setStartTime(e.target.value)
                  }
                  className="w-full h-12 px-4
                    bg-[#F8FAFC]
                    border border-[#E2E8F0]
                    rounded-xl text-sm text-[#0F172A]
                    focus:outline-none
                    focus:border-[#3F38CA]
                    focus:ring-2
                    focus:ring-[#3F38CA]/10
                    transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#475569] mb-2">
                  End Time
                </label>

                <input
                  type="time"
                  value={endTime}
                  onChange={(e) =>
                    setEndTime(e.target.value)
                  }
                  className="w-full h-12 px-4
                    bg-[#F8FAFC]
                    border border-[#E2E8F0]
                    rounded-xl text-sm text-[#0F172A]
                    focus:outline-none
                    focus:border-[#3F38CA]
                    focus:ring-2
                    focus:ring-[#3F38CA]/10
                    transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12
                bg-[#3F38CA]
                hover:bg-[#312E81]
                text-white font-semibold
                rounded-xl text-sm
                transition-all
                flex items-center
                justify-center gap-2.5
                disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}

              <span>Save Slot</span>
            </button>
          </form>
        </div>
        <div
          className="lg:col-span-2
            bg-white rounded-2xl
            border border-[#E2E8F0]
            p-6 shadow-sm"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#0F172A]">
              Active Schedule
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Your current weekly availability for patient appointments.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-9 h-9 text-[#3F38CA] animate-spin" />
            </div>
          ) : availabilities.length === 0 ? (
            <div className="text-center py-12">
              <div
                className="w-12 h-12 mx-auto
                  rounded-xl bg-[#EEF2FF]
                  flex items-center
                  justify-center mb-4"
              >
                <Calendar className="w-6 h-6 text-[#3F38CA]" />
              </div>

              <p className="text-sm font-semibold text-[#475569]">
                No availability slots yet
              </p>

              <p className="text-sm text-[#94A3B8] mt-1">
                Add your first working slot to start receiving bookings.
              </p>
            </div>

          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availabilities.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 rounded-xl
                    bg-[#F8FAFC]
                    border border-[#E2E8F0]
                    hover:border-[#CBD5E1]
                    hover:bg-white
                    transition-all
                    flex items-center
                    justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-11 h-11 rounded-xl
                        bg-[#EEF2FF]
                        text-[#3F38CA]
                        flex items-center
                        justify-center shrink-0"
                    >
                      <Calendar className="w-6 h-6" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-[#0F172A] text-sm">
                        {getDayLabel(slot.day_of_week)}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock className="w-4 h-4 text-[#94A3B8]" />

                        <p className="text-sm text-[#64748B]">
                          {slot.start_time} - {slot.end_time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(slot.id)
                    }
                    className="w-10 h-10
                      flex items-center
                      justify-center shrink-0
                      text-[#EF4444]
                      hover:text-[#DC2626]
                      hover:bg-[#FEE2E2]
                      rounded-xl
                      transition-all"
                    title="Delete availability"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}