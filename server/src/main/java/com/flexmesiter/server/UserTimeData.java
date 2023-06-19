package com.flexmesiter.server;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

    // Sätter en lista med datum för användaren baserat på en inmatning av en array med datum
    public void setDates(LocalDate[] dates) {
        this.Dates = new ArrayList<LocalDate>(Arrays.asList(Arrays.copyOf(dates, dates.length)));
    }

    // Returnerar en array med flextider för användaren
    public Integer[] getTimes() {
        return Times.toArray(new Integer[0]);
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
}