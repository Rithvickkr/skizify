"use client"

import { format } from "date-fns"
import * as React from "react"

import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { cn } from "../../../app/utils/cn"
import { CalendarIcon } from "lucide-react"

export default function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-black dark:bg-lightwhite dark:text-black dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]",
            !date && "text-muted-foreground ",                
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          autoFocus
          startMonth={new Date(1999, 11)}
          endMonth={new Date(2025, 2)}
        />
      </PopoverContent>
    </Popover>
  )
}
