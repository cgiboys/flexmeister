package com.flexmesiter.server;

import java.time.LocalDate;

public class FlexDay {
    private int flexTime;
    private LocalDate date;
    private int dayNumber;

    public FlexDay(Integer flexTime, LocalDate date, int dayNumber) {
        this.flexTime = flexTime;
        this.date = date;
        this.dayNumber = dayNumber;
    }

    public int getFlexTime() {
        return flexTime;
    }

    public LocalDate getDate() {
        return date;
    }

    public int getDayNumber() {
        return dayNumber;
    }
}