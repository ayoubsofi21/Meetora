import { useState, useEffect } from 'react';
import { doctorApi } from '../../api/doctorApi';
import { Calendar, Clock, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
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
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await doctorApi.getAvailabilities();
      setAvailabilities(response.data.data || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load schedule.');
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

      fetchSchedule();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving slot.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this working slot?')) return;
    try {
      await doctorApi.deleteAvailability(id);
      setAvailabilities((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error removing slot.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Weekly Working Hours</h1>
        <p className="text-sm text-[#475569]">Set your weekly availability slots for patient bookings</p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Slot Form */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#2563EB]" />
            Add Time Slot
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                Day of the Week
              </label>
              <select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
              >
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full h-11 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full h-11 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Save Slot</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Active Schedule</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
            </div>
          ) : availabilities.length === 0 ? (
            <p className="text-sm text-[#94A3B8] text-center py-8">No availability slots set yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availabilities.map((slot) => (
                <div
                  key={slot.id}
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm">{slot.day_of_week}</p>
                      <p className="text-xs text-[#475569]">
                        {slot.start_time} - {slot.end_time}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="p-2 text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
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