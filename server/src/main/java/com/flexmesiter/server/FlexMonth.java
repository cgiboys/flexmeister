package com.flexmesiter.server;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.time.YearMonth;

public class FlexMonth {
    private int currentMonth = 0;
    private int currentYear = 2023;
    private int totalDays = 30;
    private int[] flexTimes = new int[totalDays];
    private LocalDate[] dates = new LocalDate[totalDays];
    private int[] nameOfDays = new int[totalDays];

    public FlexMonth(int inCurrentMonth, int inCurrentYear, int[] inFlexTimes) {
        this.flexTimes = inFlexTimes;
        this.totalDays = inFlexTimes.length;
        this.dates = new LocalDate[this.totalDays];
        this.nameOfDays = new int[this.totalDays];
        this.currentMonth = inCurrentMonth;
        this.currentYear = inCurrentYear;
        
        LocalDate startDate = LocalDate.of(2023, 6, 1);
        for (int i = 0; i < this.flexTimes.length; i++) {
            this.dates[i] = LocalDate.of(this.currentYear, this.currentMonth, i+1);
            this.nameOfDays[i] = LocalDate.of(this.currentYear, this.currentMonth, i+1).getDayOfWeek().getValue();
        }
    }

    public int getCurrentMonth() {
        return currentMonth;
    }

    public int getCurrentYear() {
        return currentYear;
    }

    public int getTotalDays() {
        return totalDays;
    }

    public int[] getFlexTimes() {
        return flexTimes;
    }

    public LocalDate[] getDates() {
        return dates;
    }

    public int[] getNameOfDays() {
        return nameOfDays;
    }
}
