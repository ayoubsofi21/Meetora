import { useState, useEffect } from 'react';
import { patientApi } from '../../api/patientApi';
import { X, Calendar, Clock, Stethoscope, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BookAppointmentModal({ isOpen, onClose, onSuccess }) {
  const [doctors, setDoctors] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch public doctors list on modal open
  useEffect(() => {
    if (isOpen) {
      const fetchDoctors = async () => {
        try {
          setLoadingDoctors(true);
          setError('');
          const res = await patientApi.getPublicDoctors();
          setDoctors(res.data.data || res.data || []);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to load doctors.');
        } finally {
          setLoadingDoctors(false);
        }
      };
      fetchDoctors();
    }
  }, [isOpen]);

  // Fetch availabilities when doctor selection changes
  useEffect(() => {
    if (selectedDoctor) {
      const fetchAvailabilities = async () => {
        try {
          setLoadingSlots(true);
          setAvailabilities([]);
          setSelectedSlot('');
          const res = await patientApi.getDoctorAvailabilities(selectedDoctor);
          setAvailabilities(res.data.data || res.data || []);
        } catch (err) {
          setError('Failed to load doctor available slots.');
        } finally {
          setLoadingSlots(false);
        }
      };
      fetchAvailabilities();
    }
  }, [selectedDoctor]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedSlot || !appointmentDate) {
      setError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await patientApi.createAppointment({
        doctor_id: selectedDoctor,
        availability_id: selectedSlot,
        appointment_date: appointmentDate,
      });

      setSuccessMsg('Appointment booked successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        onSuccess?.();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Slot may be unavailable.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#E2E8F0] shadow-lg p-6 space-y-4 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <h2 className="text-lg font-bold text-[#0F172A]">Book Appointment</h2>
          <button onClick={onClose} className="p-1 text-[#94A3B8] hover:text-[#0F172A] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-center gap-2 text-[#DC2626] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-[#D1FAE5] border border-[#6EE7B7] flex items-center gap-2 text-[#059669] text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Doctor */}
          <div>
            <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">Select Doctor *</label>
            {loadingDoctors ? (
              <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading doctors...
              </div>
            ) : (
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                required
              >
                <option value="">Choose a practitioner</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} ({doc.specialty?.name || doc.doctor_profile?.specialty?.name || 'General'})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Select Date */}
          <div>
            <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">Appointment Date *</label>
            <input
              type="date"
              value={appointmentDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
              required
            />
          </div>

          {/* Select Slot */}
          {selectedDoctor && (
            <div>
              <label className="block text-xs font-semibold uppercase text-[#475569] mb-1">Available Slot *</label>
              {loadingSlots ? (
                <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading available slots...
                </div>
              ) : availabilities.length === 0 ? (
                <p className="text-xs text-[#DC2626]">No available slots found for this doctor.</p>
              ) : (
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB]"
                  required
                >
                  <option value="">Choose a time slot</option>
                  {availabilities.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.day_of_week}: {slot.start_time} - {slot.end_time}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 px-4 border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-semibold rounded-xl text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}