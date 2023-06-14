package com.flexmesiter.server;

import java.time.LocalDate;

class UserTimeData {
    private String username;
    private int userId;
    private LocalDate[] Dates;
    private int[] Times;

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return this.userId;
    }

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
    public void add(int time, LocalDate date) {
        int[] tempTimes = new int[this.Times.length + 1];
        LocalDate[] tempDates = new LocalDate[this.Dates.length + 1];
        for (int i = 0; i < this.Times.length; i++) {
            tempTimes[i] = this.Times[i];
            tempDates[i] = this.Dates[i];
        }
        tempTimes[tempTimes.length - 1] = time;
        tempDates[tempTimes.length - 1] = date;

        this.Dates = tempDates;
        this.Times = tempTimes;
    }
}