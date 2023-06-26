package com.flexmesiter.server;

import java.time.LocalDate;

public class FlexWeek {
    private int weekNumber;
    private FlexDay[] days;
    
    public FlexWeek(FlexDay[] days, int weekNumber) {
        this.days = days;
        this.weekNumber = weekNumber;
    }
    
    public FlexDay[] getDays() {
        return days;
    }
    
    public int getWeekNumber() {
        return weekNumber;
    }
}
