<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>
        Prescription #{{ $prescription->id }}
    </title>

    <style>

        body {
            font-family: DejaVu Sans, sans-serif;
            color: #0f172a;
            font-size: 13px;
            margin: 35px;
        }

        .header {
            border-bottom: 3px solid #3f38ca;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }

        .brand {
            font-size: 28px;
            font-weight: bold;
            color: #3f38ca;
        }

        .subtitle {
            color: #64748b;
            margin-top: 4px;
        }

        .info {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        .info td {
            width: 50%;
            padding: 12px;
            border: 1px solid #e2e8f0;
            background: #f8fafc;
        }

        .label {
            font-size: 10px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: bold;
        }

        .value {
            margin-top: 5px;
            font-weight: bold;
        }

        h2 {
            font-size: 17px;
        }

        .medications {
            width: 100%;
            border-collapse: collapse;
        }

        .medications th {
            padding: 10px;
            background: #3f38ca;
            color: white;
            text-align: left;
            font-size: 10px;
        }

        .medications td {
            padding: 10px;
            border: 1px solid #e2e8f0;
            vertical-align: top;
        }

        .notes {
            margin-top: 25px;
            padding: 15px;
            background: #f8fafc;
            border-left: 4px solid #3f38ca;
        }

        .signature {
            margin-top: 60px;
            text-align: right;
        }

        .signature-line {
            width: 180px;
            margin-left: auto;
            border-top: 1px solid #0f172a;
            padding-top: 8px;
        }

        .footer {
            position: fixed;
            bottom: 10px;
            left: 35px;
            right: 35px;
            border-top: 1px solid #e2e8f0;
            padding-top: 8px;
            text-align: center;
            font-size: 10px;
            color: #94a3b8;
        }

    </style>

</head>

<body>

    <div class="header">

        <div class="brand">
            Meetora
        </div>

        <div class="subtitle">
            Medical Prescription
        </div>

    </div>


    <table class="info">

        <tr>

            <td>

                <div class="label">
                    Patient
                </div>

                <div class="value">
                    {{ $prescription->patient?->user?->name ?? 'Patient' }}
                </div>

            </td>

            <td>

                <div class="label">
                    Doctor
                </div>

                <div class="value">
                    {{ $prescription->doctor?->user?->name ?? 'Doctor' }}
                </div>

                @if($prescription->doctor?->specialty)

                    <div>
                        {{ $prescription->doctor->specialty->name }}
                    </div>

                @endif

            </td>

        </tr>

        <tr>

            <td>

                <div class="label">
                    Prescription Date
                </div>

                <div class="value">
                    {{ $prescription->prescribed_at?->format('d/m/Y') }}
                </div>

            </td>

            <td>

                <div class="label">
                    Prescription Number
                </div>

                <div class="value">
                    #{{ $prescription->id }}
                </div>

            </td>

        </tr>

    </table>


    <h2>
        Medications
    </h2>


    <table class="medications">

        <thead>

            <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
                <th>Instructions</th>
            </tr>

        </thead>


        <tbody>

            @forelse($prescription->items as $item)

                <tr>

                    <td>
                        <strong>
                            {{ $item->medication_name }}
                        </strong>
                    </td>

                    <td>
                        {{ $item->dosage ?? '-' }}
                    </td>

                    <td>
                        {{ $item->frequency ?? '-' }}
                    </td>

                    <td>
                        {{ $item->duration ?? '-' }}
                    </td>

                    <td>
                        {{ $item->instructions ?? '-' }}
                    </td>

                </tr>

            @empty

                <tr>

                    <td colspan="5">
                        No medications found.
                    </td>

                </tr>

            @endforelse

        </tbody>

    </table>


    @if($prescription->notes)

        <div class="notes">

            <strong>
                Doctor Notes
            </strong>

            <br><br>

            {{ $prescription->notes }}

        </div>

    @endif


    <div class="signature">

        <div class="signature-line">

            {{ $prescription->doctor?->user?->name ?? 'Doctor' }}

            <br>

            Doctor Signature

        </div>

    </div>


    <div class="footer">
        Meetora — Healthcare made simple
    </div>

</body>

</html>