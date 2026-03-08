import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-white rounded-lg shadow-md", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "flex justify-center items-center relative",
        caption_label: "text-sm font-semibold",
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 p-0 flex items-center justify-center"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7",
        head_cell:
          "text-center text-xs font-medium text-gray-500 w-9 h-9 flex items-center justify-center",
        row: "grid grid-cols-7 mt-1",
        cell:
          "w-9 h-9 flex items-center justify-center text-sm rounded-md hover:bg-gray-100",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal"
        ),
        day_selected:
          "bg-orange-500 text-white hover:bg-orange-500",
        day_today:
          "border border-orange-500",
        day_outside:
          "text-gray-400 opacity-50",
        day_disabled:
          "text-gray-300",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };