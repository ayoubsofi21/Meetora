import { Card, ProgressBar } from '@/components/ui';

/**
 * Blue "Wellness Snapshot" widget: steps + sleep quality progress bars.
 * @param {{ wellness?: { stepsToday: number, stepsGoal: number, sleepHours: number, sleepMinutes: number, sleepGoalLabel: string } }} props
 */
export default function WellnessSnapshot({ wellness }) {
  if (!wellness) return null;

  const { stepsToday, stepsGoal, sleepHours, sleepMinutes, sleepGoalLabel } = wellness;
  const sleepLabel = `${sleepHours}h ${sleepMinutes}m`;
  // Rough proportion of sleep vs goal for the bar fill, purely visual.
  const sleepGoalMinutes = parseInt(sleepGoalLabel) * 60 || 480;
  const sleepMinutesTotal = sleepHours * 60 + sleepMinutes;

  return (
    <Card variant="primary" padding="lg">
      <h3 className="text-lg font-bold text-white">Wellness Snapshot</h3>

      <div className="mt-5 space-y-5">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-medium text-white/80">Steps Today</span>
            <span className="text-sm font-semibold text-white">
              {stepsToday.toLocaleString()} / {stepsGoal.toLocaleString()}
            </span>
          </div>
          <ProgressBar value={stepsToday} max={stepsGoal} onDark />
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-medium text-white/80">Sleep Quality</span>
            <span className="text-sm font-semibold text-white">{sleepLabel}</span>
          </div>
          <ProgressBar value={sleepMinutesTotal} max={sleepGoalMinutes} onDark />
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-white/90"
      >
        Open Health App
      </button>
    </Card>
  );
}