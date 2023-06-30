package com.flexmesiter.server;

import java.time.LocalDate;
import java.time.YearMonth;

public class FlexYear {
    private int year = 2023;
    private int numberOfDays = 0;
    private FlexMonth[] months = new FlexMonth[12];

    public void FlexYear(int year, FlexMonth[] months) {
        this.year = year;
        this.months = months;
        for (int i = 0; i < 12; i++) {
            numberOfDays += this.months[i].getTotalDays();
        }
    }
}
