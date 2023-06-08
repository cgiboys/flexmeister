package com.flexmesiter.server;

import java.time.LocalDate;

class UserTimeData {
    private String username;
    private LocalDate[] Dates;
    private int[] Times;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public LocalDate[] getDates() {
        return Dates;
    }
    public void setDates(LocalDate[] dates) {
        this.Dates = dates;
    }
    public int[] getTimes() {
        return Times;
    }
    public void setTimes(int[] times) {
        this.Times = times;
    }
}