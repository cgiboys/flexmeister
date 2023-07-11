package com.flexmesiter.server;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.time.YearMonth;
import java.time.Year;
import java.time.temporal.WeekFields;

class UserTimeData {
    private String username; // Användarens namn
    private int userId; // Användarens ID
    private List<LocalDate> Dates = new ArrayList<>(); // Lista med datum för användaren
    private List<Integer> Times = new ArrayList<>(); // Lista med flextider för användaren

    // Sätter värdet på användarens ID
    public void setUserId(int userId) {
        this.userId = userId;
    }

    // Returnerar användarens ID
    public int getUserId() {
        return this.userId;
    }

    // Returnerar användarens namn
    public String getUsername() {
        return username;
    }

    // Sätter användarens namn
    public void setUsername(String username) {
        this.username = username;
    }

    // Returnerar en array med datum för användaren
    public LocalDate[] getDates() {
        return Dates.toArray(new LocalDate[0]);
    }

    public LocalDate[] getNumberOfDates(int nr) {
        LocalDate[] newArray = new LocalDate[nr];
        int startIndex = this.Dates.size() - nr;
        int newArrayIndex = 0;

        for (int i = startIndex; i < this.Dates.size(); i++) {
            newArray[newArrayIndex] = this.Dates.get(i);
            newArrayIndex++;
        }
        return newArray;
    }

    // Sätter en lista med datum för användaren baserat på en inmatning av en array med datum
    public void setDates(LocalDate[] dates) {
        this.Dates = new ArrayList<LocalDate>(Arrays.asList(Arrays.copyOf(dates, dates.length)));
    }

    // Returnerar en array med flextider för användaren
    public Integer[] getTimes() {
        return Times.toArray(new Integer[0]);
    }

    public Integer[] getNumberOfTimes(int nr) {
        Integer[] newArray = new Integer[nr];
        int startIndex = this.Times.size() - nr;
        int newArrayIndex = 0;

        for (int i = startIndex; i < this.Times.size(); i++) {
            newArray[newArrayIndex] = this.Times.get(i);
            newArrayIndex++;
        }
        return newArray;
    }

    // Sätter en lista med flextider för användaren baserat på en inmatning av en array med flextider
    public void setTimes(Integer[] times) {
        this.Times = new ArrayList<Integer>(Arrays.asList(Arrays.copyOf(times, times.length)));
    }

    // Lägger till en tid och ett datum i listorna för användaren
    public void add(int time, LocalDate date) {
        if (this.Dates.contains(date)) {
            this.Times.set(this.Dates.indexOf(date), time);
        } else {
            this.Dates.add(date);
            this.Times.add(time);
        }
    }

    // Tar bort ett element från både listan med datum och listan med flextider
    public Integer del(int itemId) {
        if (itemId < 0 || itemId >= this.Times.size()) {
            return 2; // Returnerar 2 om itemId är ogiltigt (utanför gränserna).
        } else {
            this.Times.remove(itemId);
            this.Dates.remove(itemId);
            return 0; // Returnerar 0 om borttagningen lyckades.
        }
    }

    // Beräknar den totala flextiden för användaren
    public Integer getTotalFlexTime() {
        Integer returnValue = 0;
        for (int flexTime : this.Times) {
            returnValue += flexTime;
        }
        return returnValue;
    }

    // Redigerar tiden för ett element i listan med flextider för användaren
    public Integer editItemOfUser(int itemId, int newTime) {
        if (itemId >= 0 || itemId < this.Times.size()) {
            this.Times.set(itemId, newTime);
            return 0; // Returnerar 0 om redigeringen lyckades.
        } else {
            return 2; // Returnerar 2 om itemId är ogiltigt (utanför gränserna).
        }
    }
    public int getSize() {
        return this.Times.size();
    }

    public FlexYear getFlexYear(int inYear) {
        int nrOfMonth = 12;
        boolean isLeapYear = Year.isLeap(inYear);
        int currentYear = inYear;
        FlexMonth[] months = new FlexMonth[nrOfMonth];
        for (int monthNr = 1; monthNr <= nrOfMonth; monthNr++) {
            months[monthNr -1] = getFlexMonth(monthNr, inYear);
            //System.out.println();
            //System.out.println("månad " + monthNr + ": " + months[monthNr -1].toString());
        }
        return new FlexYear(currentYear, months);
    }

    public FlexMonth getFlexMonth(int inMonth, int inYear) {
        YearMonth today = YearMonth.of(inYear, inMonth);
        int currentMonth = inMonth;
        int currentYear = inYear;
        int nrOfDays = today.lengthOfMonth();
        int[] flexOfDays = new int[nrOfDays];
        int dataIndex = this.Dates.indexOf(LocalDate.of(inYear, inMonth, 1));

        
        for (int i = 0; i < nrOfDays; i++) {
            if (this.Dates.contains(LocalDate.of(inYear, inMonth, i +1))) {
                flexOfDays[i] = this.Times.get(dataIndex + i);
            } else {
                flexOfDays[i] = 0;
            }
        }
        return new FlexMonth(currentMonth, currentYear, flexOfDays);
    }

public FlexWeek getFlexWeek(int inWeek, int inYear) {
        LocalDate today = LocalDate.of(inYear, 1, 1).with(WeekFields.ISO.weekOfYear(), inWeek).minusDays(6);
        System.out.println(today.toString());
        int currentWeek = inWeek;
        int currentYear = inYear;
        FlexDay[] flexOfDays = new FlexDay[7];
        int dataIndex = this.Dates.indexOf(today);

        for (int i = 0; i < 7; i++) {
            if (this.Dates.contains(today.plusDays(i))) {
                flexOfDays[i] = new FlexDay(this.Times.get(dataIndex + i), today.plusDays(i), today.plusDays(i).getDayOfWeek().getValue());
            } else {
                flexOfDays[i] = new FlexDay(0, today.plusDays(i), today.plusDays(i).getDayOfWeek().getValue());
            }
        }
        return new FlexWeek(flexOfDays, currentWeek);
    }
}