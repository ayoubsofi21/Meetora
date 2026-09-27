import React, { useEffect, useState } from "react";
import { patientApi } from "../../api/patientApi";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

function AcountSummary() {
  const [data, setData] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
      const user = await patientApi.acountSummary();
      const profileData = user.data.data;

      setData(profileData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Account Summary
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View your personal and account information.
          </p>
        </div>

        {data && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
                  <User className="h-7 w-7 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {data.name}
                  </h2>
                  <span className="mt-1 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700">
                    {data.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Personal Information
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">

                <InfoItem
                  icon={Mail}
                  label="Email Address"
                  value={data.email}
                />

                <InfoItem
                  icon={Phone}
                  label="Phone Number"
                  value={data.phone}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Date of Birth"
                  value={data.date_of_birth}
                />

                <InfoItem
                  icon={ShieldCheck}
                  label="Account Role"
                  value={data.role}
                />

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
        <Icon className="h-5 w-5 text-indigo-600" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold text-gray-900">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}
export default AcountSummary;