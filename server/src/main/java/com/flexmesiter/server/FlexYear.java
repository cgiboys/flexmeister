package com.flexmesiter.server;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Arrays;

public class FlexYear {
    private int year = 2023;
    private int numberOfDays = 0;
    private FlexMonth[] months = new FlexMonth[12];

    public FlexYear(int year, FlexMonth[] months) {
        this.year = year;
        this.months = months;
        for (int i = 0; i < 12; i++) {
            numberOfDays += this.months[i].getTotalDays();
        }
    }
    
    public int getYear() {
        return year;
    }
    
    public int getNumberOfDays() {
        return numberOfDays;
    }
    
    public FlexMonth[] getMonths() {
        return months;
    }
    
    @Override
    public String toString() {
        return "FlexYear [year=" + year + ", numberOfDays=" + numberOfDays + ", months=" + Arrays.toString(months) + "]";
    }
}
