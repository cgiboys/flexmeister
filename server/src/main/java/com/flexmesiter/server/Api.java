package com.flexmesiter.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import java.time.LocalDate;

@RestController
@RequestMapping("/api")
public class Api {
    @GetMapping("/alive")
    public Alive alive() {
        Alive data = new Alive();
        data.setAlive(true);
        return data;
    }

    @GetMapping("/get-alltime-of-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public UserTimeData userTimeData(@RequestParam String userId) {
        UserTimeData data = new UserTimeData();
        data.setUsername(userId);
        //System.out.println("user input: " + userId);

        // ---- remove ----
        if (userId.equals("100") ) {
            data.setUsername("Gustav");
            data.setTimes(new int[]{1, 2, 3, 4, -2});
            data.setDates(new LocalDate[]{LocalDate.of(2023, 6, 1), LocalDate.of(2023, 6, 2), LocalDate.of(2023, 6, 3), LocalDate.of(2023, 6, 4), LocalDate.of(2023, 6, 5)});
        } else {
            data.setUsername("No username");
            data.setTimes(new int[]{1, 2, 3, 4, 5});
            data.setDates(new LocalDate[]{LocalDate.of(2023, 6, 1), LocalDate.of(2023, 6, 2), LocalDate.of(2023, 6, 3), LocalDate.of(2023, 6, 4), LocalDate.of(2023, 6, 5)});
        }
        // ---- remove ----
        // gör förfrågan till databas här

        return data;
    }
}