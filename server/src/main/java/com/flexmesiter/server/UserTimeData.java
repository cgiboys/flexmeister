package com.flexmesiter.server;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class UserTimeData {
    private String username;
    private int userId;
    private List<LocalDate> Dates = new ArrayList<>();
    private List<Integer> Times = new ArrayList<>();

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
        //return Dates;
        return Dates.toArray(new LocalDate[0]);
    }
    public void setDates(LocalDate[] dates) {
        //this.Dates = dates;
        //this.Dates = Arrays.asList(dates);
        this.Dates = new ArrayList<LocalDate>(Arrays.asList(Arrays.copyOf(dates, dates.length)));
    }
    public Integer[] getTimes() {
        //return Times;
        return Times.toArray(new Integer[0]);
    }
    public void setTimes(Integer[] times) {
        //this.Times = times;
        //this.Times = Arrays.asList(times);
        this.Times = new ArrayList<Integer>(Arrays.asList(Arrays.copyOf(times, times.length)));
    }
    public void add(int time, LocalDate date) {
        //int[] tempTimes = new int[this.Times.length + 1];
       // LocalDate[] tempDates = new LocalDate[this.Dates.length + 1];
        //for (int i = 0; i < this.Times.length; i++) {
            //tempTimes[i] = this.Times[i];
            //tempDates[i] = this.Dates[i];
            
        //}
        //tempTimes[tempTimes.length - 1] = time;
        //tempDates[tempTimes.length - 1] = date;

        //this.Dates = tempDates;
        //this.Times = tempTimes;
        this.Dates.add(date);
        this.Times.add(time);
    }

    public Integer del(int itemId) {
        if (itemId < 0 || itemId >= this.Times.size()) {
            return 2;
        } else {
            //this.Dates[itemId] = LocalDate.now();
            //this.Times[itemId] = 0;
            //System.out.println(this.Dates);
            //System.out.println(this.Times);
            this.Times.remove(itemId);
            this.Dates.remove(itemId);
            //System.out.println("Times-Removed " + itemId + "list size" + this.Times.size());
            //System.out.println("Dates-Removed " + itemId + "list size" + this.Dates.size());
            //System.out.println(this.Dates);
            //System.out.println(this.Times);
            return 0;
        }
    }

    public Integer getTotalFlexTime() {
        Integer returnValue = 0;
        for (int flexTime : this.Times) {
            returnValue += flexTime;
        }
        return returnValue;
    }

    public Integer editItemOfUser(int itemId, int newTime) {
        //System.out.println(this.Times);
        //System.out.println("itemId: " + itemId + " newTime: " + newTime);
        if (itemId >= 0 || itemId < this.Times.size()) {
            this.Times.set(itemId, newTime);
            //System.out.println(this.Times);
            return 0;
        } else {
            //System.out.println(this.Times);
            return 2;
        }
    }
}