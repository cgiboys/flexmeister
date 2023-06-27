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

    @GetMapping("/get-v-time-of-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public FlexWeek getVuserTimeData(@RequestParam String userId, @RequestParam String week, @RequestParam String year) {
        return mocks.getVUserTimeDataByUserId(Integer.parseInt(userId), Integer.parseInt(week), Integer.parseInt(year));
    }

    @GetMapping("/get-m-time-of-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public FlexMonth getMuserTimeData(@RequestParam String userId, @RequestParam String month, @RequestParam String year) {
        return mocks.getMUserTimeDataByUserId(Integer.parseInt(userId), Integer.parseInt(month), Integer.parseInt(year));
    }

    @GetMapping("/get-y-time-of-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public UserTimeData getYuserTimeData(@RequestParam String userId) {
        return mocks.getYUserTimeDataByUserId(Integer.parseInt(userId));
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

    @GetMapping("/edit-item-with-id-from-user")
    // set usernam för att sedan sicka in data till en funktion för att fylla data.times[] och data.date[] med information 
    public Integer editItemFromUser(@RequestParam String userId,@RequestParam String itemId, @RequestParam String newTime) {
        return mocks.editItemFromUser(Integer.parseInt(userId), Integer.parseInt(itemId), Integer.parseInt(newTime));
    }
}