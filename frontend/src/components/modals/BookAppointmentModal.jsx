import { useEffect, useState } from 'react';
import { patientApi } from '../../api/patientApi';
import {
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function BookAppointmentModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const [doctors, setDoctors] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  /*
   * Fetch doctors when modal opens
   */
  useEffect(() => {
    if (!isOpen) return;

    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        setError('');

        const res = await patientApi.getPublicDoctors();

        const data = res.data?.data || res.data || [];

        setDoctors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Doctors error:', err);

        setError(
          err.response?.data?.message ||
            'Failed to load doctors.'
        );
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, [isOpen]);

  /*
   * Fetch selected doctor's availabilities
   */
  useEffect(() => {
    if (!selectedDoctor) {
      setAvailabilities([]);
      setSelectedSlot('');
      return;
    }

    const fetchAvailabilities = async () => {
      try {
        setLoadingSlots(true);
        setError('');
        setAvailabilities([]);
        setSelectedSlot('');

        const res =
          await patientApi.getDoctorAvailabilities(
            selectedDoctor
          );

        const data = res.data?.data || res.data || [];

        console.log('Selected doctor:', selectedDoctor);
        console.log('Doctor availabilities:', data);

        setAvailabilities(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error('Availability error:', err);

        setAvailabilities([]);

        setError(
          err.response?.data?.message ||
            'Failed to load doctor availability.'
        );
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailabilities();
  }, [selectedDoctor]);

  /*
   * Reset form when modal closes
   */
  useEffect(() => {
    if (!isOpen) {
      setSelectedDoctor('');
      setAppointmentDate('');
      setSelectedSlot('');
      setAvailabilities([]);
      setError('');
      setSuccessMsg('');
    }
  }, [isOpen]);

  /*
   * Get weekday from selected date.
   *
   * JavaScript:
   * 0 = Sunday
   * 1 = Monday
   * 2 = Tuesday
   * 3 = Wednesday
   * 4 = Thursday
   * 5 = Friday
   * 6 = Saturday
   *
   * This matches Carbon $date->dayOfWeek.
   */
  const selectedDay = appointmentDate
    ? new Date(
        `${appointmentDate}T00:00:00`
      ).getDay()
    : null;

  /*
   * Only show availability matching selected date.
   */
  const availableSlotsForDate =
    appointmentDate && selectedDoctor
      ? availabilities.filter((slot) => {
          return (
            Number(slot.day_of_week) ===
            Number(selectedDay)
          );
        })
      : [];

  /*
   * Doctor selection
   */
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;

    setSelectedDoctor(doctorId);

    // Reset date/slot because they belonged
    // to the previous doctor.
    setAppointmentDate('');
    setSelectedSlot('');
    setAvailabilities([]);
    setError('');
    setSuccessMsg('');
  };

  /*
   * Date selection
   */
  const handleDateChange = (e) => {
    setAppointmentDate(e.target.value);

    // Previous slot may not belong to new date.
    setSelectedSlot('');

    setError('');
    setSuccessMsg('');
  };

  /*
   * Submit appointment
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccessMsg('');

    if (!selectedDoctor) {
      setError('Please select a doctor.');
      return;
    }

    if (!appointmentDate) {
      setError('Please select an appointment date.');
      return;
    }

    if (!selectedSlot) {
      setError('Please select an available time slot.');
      return;
    }

    const selectedAvailability =
      availableSlotsForDate.find(
        (slot) =>
          String(slot.id) === String(selectedSlot)
      );

    if (!selectedAvailability) {
      setError(
        'The selected time slot is not valid for this date.'
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        doctor_id: Number(selectedDoctor),
        appointment_date: appointmentDate,
        start_time: selectedAvailability.start_time,
        end_time: selectedAvailability.end_time,
      };

      console.log('Appointment payload:', payload);

      await patientApi.createAppointment(payload);

      setSuccessMsg(
        'Appointment booked successfully!'
      );

      setTimeout(() => {
        setSelectedDoctor('');
        setAppointmentDate('');
        setSelectedSlot('');
        setAvailabilities([]);
        setSuccessMsg('');

        onSuccess?.();
        onClose();
      }, 1200);
    } catch (err) {
      console.error(
        'Appointment booking error:',
        err.response?.data || err
      );

      /*
       * Laravel ValidationException usually:
       *
       * {
       *   message: "...",
       *   errors: {
       *      start_time: ["..."]
       *   }
       * }
       */
      const validationErrors =
        err.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(
          validationErrors
        )?.[0]?.[0];

        setError(
          firstError ||
            err.response?.data?.message ||
            'Appointment booking failed.'
        );
      } else {
        setError(
          err.response?.data?.message ||
            'Booking failed. Slot may be unavailable.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-[#0F172A]/50
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          max-w-md
          w-full
          border border-[#E2E8F0]
          shadow-lg
          p-6
          space-y-4
          relative
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            border-b border-[#E2E8F0]
            pb-3
          "
        >
          <h2 className="text-lg font-bold text-[#0F172A]">
            Book Appointment
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="
              p-1
              text-[#94A3B8]
              hover:text-[#0F172A]
              rounded-lg
              disabled:opacity-50
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              p-3
              rounded-xl
              bg-[#FEE2E2]
              border border-[#FCA5A5]
              flex items-center gap-2
              text-[#DC2626]
              text-sm
            "
          >
            <AlertCircle className="w-5 h-5 shrink-0" />

            <span>{error}</span>
          </div>
        )}

        {/* Success */}
        {successMsg && (
          <div
            className="
              p-3
              rounded-xl
              bg-[#D1FAE5]
              border border-[#6EE7B7]
              flex items-center gap-2
              text-[#059669]
              text-sm
            "
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />

            <span>{successMsg}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Doctor */}
          <div>
            <label
              className="
                block
                text-xs
                font-semibold
                uppercase
                text-[#475569]
                mb-1
              "
            >
              Select Doctor *
            </label>

            {loadingDoctors ? (
              <div
                className="
                  flex items-center gap-2
                  text-sm text-[#94A3B8]
                "
              >
                <Loader2 className="w-4 h-4 animate-spin" />

                Loading doctors...
              </div>
            ) : (
              <select
                value={selectedDoctor}
                onChange={handleDoctorChange}
                disabled={isSubmitting}
                className="
                  w-full
                  h-11
                  px-4
                  bg-[#F8FAFC]
                  border border-[#E2E8F0]
                  rounded-xl
                  text-sm
                  focus:outline-none
                  focus:border-[#2563EB]
                  disabled:opacity-50
                "
                required
              >
                <option value="">
                  Choose a practitioner
                </option>

                {doctors.map((doc) => (
                  <option
                    key={doc.id}
                    value={doc.id}
                  >
                    {doc.name} (
                    {doc.specialty?.name ||
                      doc.doctor_profile
                        ?.specialty?.name ||
                      'General'}
                    )
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Date */}
          <div>
            <label
              className="
                block
                text-xs
                font-semibold
                uppercase
                text-[#475569]
                mb-1
              "
            >
              Appointment Date *
            </label>

            <input
              type="date"
              value={appointmentDate}
              min={
                new Date()
                  .toISOString()
                  .split('T')[0]
              }
              onChange={handleDateChange}
              disabled={
                !selectedDoctor ||
                loadingSlots ||
                isSubmitting
              }
              className="
                w-full
                h-11
                px-4
                bg-[#F8FAFC]
                border border-[#E2E8F0]
                rounded-xl
                text-sm
                focus:outline-none
                focus:border-[#2563EB]
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
              required
            />
          </div>

          {/* Slot */}
          {selectedDoctor && (
            <div>
              <label
                className="
                  block
                  text-xs
                  font-semibold
                  uppercase
                  text-[#475569]
                  mb-1
                "
              >
                Available Slot *
              </label>

              {loadingSlots ? (
                <div
                  className="
                    flex items-center gap-2
                    text-sm text-[#94A3B8]
                  "
                >
                  <Loader2 className="w-4 h-4 animate-spin" />

                  Loading availability...
                </div>
              ) : !appointmentDate ? (
                <p className="text-xs text-[#64748B]">
                  Select a date to see the doctor's
                  availability.
                </p>
              ) : availableSlotsForDate.length === 0 ? (
                <div
                  className="
                    p-3
                    bg-[#FEF2F2]
                    border border-[#FECACA]
                    rounded-xl
                  "
                >
                  <p className="text-xs font-medium text-[#DC2626]">
                    Doctor is not available on this date.
                  </p>

                  <p className="text-xs text-[#64748B] mt-1">
                    Please choose another date.
                  </p>
                </div>
              ) : (
                <select
                  value={selectedSlot}
                  onChange={(e) => {
                    setSelectedSlot(
                      e.target.value
                    );
                    setError('');
                  }}
                  disabled={isSubmitting}
                  className="
                    w-full
                    h-11
                    px-4
                    bg-[#F8FAFC]
                    border border-[#E2E8F0]
                    rounded-xl
                    text-sm
                    focus:outline-none
                    focus:border-[#2563EB]
                    disabled:opacity-50
                  "
                  required
                >
                  <option value="">
                    Choose a time slot
                  </option>

                  {availableSlotsForDate.map(
                    (slot) => (
                      <option
                        key={slot.id}
                        value={slot.id}
                      >
                        {slot.start_time} -{' '}
                        {slot.end_time}
                      </option>
                    )
                  )}
                </select>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                h-11
                px-4
                border border-[#E2E8F0]
                hover:bg-[#F8FAFC]
                text-[#0F172A]
                font-semibold
                rounded-xl
                text-sm
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                !selectedDoctor ||
                !appointmentDate ||
                !selectedSlot
              }
              className="
                h-11
                px-6
                bg-[#2563EB]
                hover:bg-[#1D4ED8]
                text-white
                font-semibold
                rounded-xl
                text-sm
                flex items-center gap-2
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Booking...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}