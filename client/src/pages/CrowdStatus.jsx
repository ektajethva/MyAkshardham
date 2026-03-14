import { useState } from "react";
import { Users, CalendarIcon } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";

const crowdData = {
  "2026-03-01": "Low",
  "2026-03-02": "Medium",
  "2026-03-03": "High",
  "2026-03-04": "Low",
  "2026-03-05": "Medium",
  "2026-03-06": "High",
  "2026-03-07": "Low",
  "2026-03-08": "Medium",
  "2026-03-09": "Low",
  "2026-03-10": "High",
  "2026-03-14": "Medium",
  "2026-03-15": "High",
  "2026-03-20": "Low",
  "2026-03-25": "Medium",
};

const levelConfig = {
  Low: {
    color: "bg-green-500",
    bg: "bg-green-50 text-green-700 border-green-200",
    message: "Best time to visit the temple!",
    percentage: 25,
  },
  Medium: {
    color: "bg-amber-500",
    bg: "bg-amber-50 text-amber-700 border-amber-200",
    message: "Moderate crowd — plan accordingly.",
    percentage: 55,
  },
  High: {
    color: "bg-red-500",
    bg: "bg-red-50 text-red-700 border-red-200",
    message: "Temple is crowded. Consider visiting later.",
    percentage: 90,
  },
};

export default function CrowdStatusPage() {
  const [date, setDate] = useState(new Date());

  const key = format(date, "yyyy-MM-dd");
  const level = crowdData[key] || "Low";
  const config = levelConfig[level];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
        Live Crowd Status
      </h1>
      <p className="text-muted-foreground mb-8">
        Select a date to check temple occupancy
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendar */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-4">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
            <CalendarIcon className="h-4 w-4" /> Pick a Date
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            className="rounded-xl pointer-events-auto mx-auto"
          />
        </div>

        {/* Status display */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-6 flex flex-col items-center justify-center text-center gap-4">
          <Users className="h-10 w-10 text-primary" />

          <div>
            <p className="text-xs text-muted-foreground mb-1">Status for</p>
            <p className="font-semibold text-foreground">
              {format(date, "MMMM d, yyyy")}
            </p>
          </div>

          {/* Meter */}
          <div className="w-full">
            <div className="w-full bg-muted rounded-full h-3 mb-2">
              <div
                className={`${config.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${config.percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold ${config.bg}`}
          >
            <div
              className={`h-2.5 w-2.5 rounded-full ${config.color} animate-pulse`}
            />
            {level} Crowd
          </div>

          <p className="text-muted-foreground text-sm">{config.message}</p>
        </div>
      </div>
    </div>
  );
}