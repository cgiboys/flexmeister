package com.flexmesiter.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api")
public class Api {
    Sql mocks = new Sql();

    @GetMapping("/alive")
    public Alive alive() {
        Alive data = new Alive();
        data.setAlive(true);
        return data;
    }

    @GetMapping("/get-alltime-of-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public UserTimeData userTimeData(@RequestParam String userId) {
        return mocks.getUserTimeDataByUserId(Integer.parseInt(userId));
    }

    @GetMapping("/add-time-to-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public Integer addTimeToUser(@RequestParam String userId,@RequestParam String time) {
        int returnValue = 0;
        //System.out.println("FlexTime: " + time);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        mocks.addTimeToUser(Integer.parseInt(userId), Integer.parseInt(time), LocalDate.now());
        return returnValue;
    }

    @GetMapping("/get-total-flex-time-of-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public Integer getTotalFlexTime(@RequestParam String userId) {
        return mocks.getTotalFlexOfUser(Integer.parseInt(userId));
    }

    @GetMapping("/del-item-with-id-from-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public Integer delItemFromUser(@RequestParam String userId,@RequestParam String itemId) {
        return mocks.delItemFromUser(Integer.parseInt(userId), Integer.parseInt(itemId));
    }
}