package com.flexmesiter.server;

import java.time.LocalDate;

public class Sql {
    private UserTimeData userTimeDataArr[] = new UserTimeData[3];

    public Sql() {
        userTimeDataArr[0] = new UserTimeData();
        userTimeDataArr[1] = new UserTimeData();
        userTimeDataArr[2] = new UserTimeData();

        userTimeDataArr[0].setUsername("Gustav");
        userTimeDataArr[0].setUserId(100);
        userTimeDataArr[0].setTimes(new Integer[]{1, -2, 3, 4, -2});
        userTimeDataArr[0].setDates(new LocalDate[]{LocalDate.of(2023, 6, 1), LocalDate.of(2023, 6, 2), LocalDate.of(2023, 6, 3), LocalDate.of(2023, 6, 4), LocalDate.of(2023, 6, 5)});

        userTimeDataArr[1].setUsername("Bjorn");
        userTimeDataArr[1].setUserId(200);
        userTimeDataArr[1].setTimes(new Integer[]{1, 2, -2, -1, -2});
        userTimeDataArr[1].setDates(new LocalDate[]{LocalDate.of(2023, 6, 1), LocalDate.of(2023, 6, 2), LocalDate.of(2023, 6, 3), LocalDate.of(2023, 6, 4), LocalDate.of(2023, 6, 5)});
    }

    public UserTimeData getUserTimeDataByUserId(int userId) {
        UserTimeData returnValue = new UserTimeData();
        for (int i = 0; i < this.userTimeDataArr.length; i++) {
            if (userTimeDataArr[i].getUserId() == userId) {
                returnValue = userTimeDataArr[i];
            }
        }
        return returnValue;
    }

    public int getTotalFlexOfUser(int userId) {
        UserTimeData user = getUserTimeDataByUserId(userId);
        int returnValue = 0;
        for (int time : user.getTimes()){
            returnValue += time;
        }
        return returnValue;
    }

    public int addTimeToUser(int userId, int time , LocalDate date) {
        int returnValue = 0;
        UserTimeData user = getUserTimeDataByUserId(userId);
        if (user != null) {
            user.add(time, date);
        } else {
            returnValue = 1;
        }
        return returnValue;
    }
    public int delItemFromUser(int userId, int itemId) {
        int returnValue = 0;
        UserTimeData user = getUserTimeDataByUserId(userId);
        if (user != null) {
            returnValue = user.del(itemId);
        } else {
            returnValue = 1;
        }
        return returnValue;
    }
}
