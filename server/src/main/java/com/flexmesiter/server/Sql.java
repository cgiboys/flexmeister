package com.flexmesiter.server;

import java.time.LocalDate;
import java.util.Random;

public class Sql {
    private UserTimeData userTimeDataArr[] = new UserTimeData[3];
    private Random random = new Random();

    public Sql() {
        userTimeDataArr[0] = new UserTimeData();
        userTimeDataArr[1] = new UserTimeData();
        userTimeDataArr[2] = new UserTimeData();

        userTimeDataArr[0].setUsername("Gustav");
        userTimeDataArr[0].setUserId(100);
        generateRandomData(userTimeDataArr[0]);
        //userTimeDataArr[0].setTimes(new Integer[]{1, -2, 3, 4, -2});
        //userTimeDataArr[0].setDates(new LocalDate[]{LocalDate.of(2023, 6, 1), LocalDate.of(2023, 6, 2), LocalDate.of(2023, 6, 3), LocalDate.of(2023, 6, 4), LocalDate.of(2023, 6, 5)});

        userTimeDataArr[1].setUsername("Bjorn");
        userTimeDataArr[1].setUserId(200);
        generateRandomData(userTimeDataArr[1]);
        //userTimeDataArr[1].setTimes(new Integer[]{1, 2, -2, -1, -2});
        //userTimeDataArr[1].setDates(new LocalDate[]{LocalDate.of(2023, 6, 1), LocalDate.of(2023, 6, 2), LocalDate.of(2023, 6, 3), LocalDate.of(2023, 6, 4), LocalDate.of(2023, 6, 5)});
    }

    private void generateRandomData(UserTimeData userTimeData) {
        LocalDate startDate = LocalDate.now().minusYears(1); // Startdatum för det slumpmässiga året

        for (int i = 0; i < 365; i++) {
            int randomTime = random.nextInt(9) - 4; // Slumpmässig tid (-4 till 4)
            LocalDate randomDate = startDate.plusDays(i); // Öka datumet för varje iteration

            userTimeData.add(randomTime, randomDate);
        }
    }

    public UserTimeData getUserTimeDataByUserId(int userId) {
        UserTimeData returnValue = new UserTimeData();
        for (int i = 0; i < this.userTimeDataArr.length; i++) {
            if (userTimeDataArr[i].getUserId() == userId) {
                returnValue.setDates(userTimeDataArr[i].getNumberOfDates(7));
                returnValue.setTimes(userTimeDataArr[i].getNumberOfTimes(7));
            }
        }

        return returnValue;
    }

    public UserTimeData getVUserTimeDataByUserId(int userId) {
        UserTimeData returnValue = new UserTimeData();
        for (int i = 0; i < this.userTimeDataArr.length; i++) {
            if (userTimeDataArr[i].getUserId() == userId) {
                returnValue.setDates(userTimeDataArr[i].getNumberOfDates(7));
                returnValue.setTimes(userTimeDataArr[i].getNumberOfTimes(7));
            }
        }
        return returnValue;
    }

    public UserTimeData getMUserTimeDataByUserId(int userId) {
        UserTimeData returnValue = new UserTimeData();
        for (int i = 0; i < this.userTimeDataArr.length; i++) {
            if (userTimeDataArr[i].getUserId() == userId) {
                returnValue.setDates(userTimeDataArr[i].getNumberOfDates(30));
                returnValue.setTimes(userTimeDataArr[i].getNumberOfTimes(30));
            }
        }
        return returnValue;
    }

    public UserTimeData getYUserTimeDataByUserId(int userId) {
        UserTimeData returnValue = new UserTimeData();
        for (int i = 0; i < this.userTimeDataArr.length; i++) {
            if (userTimeDataArr[i].getUserId() == userId) {
                returnValue.setDates(userTimeDataArr[i].getNumberOfDates(365));
                returnValue.setTimes(userTimeDataArr[i].getNumberOfTimes(365));
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
    public int editItemFromUser(int userId, int itemId, int newTime) {
        int returnValue = 0;
        UserTimeData user = getUserTimeDataByUserId(userId);
        if (user != null) {
            returnValue = user.editItemOfUser(itemId, newTime);
        } else {
            returnValue = 1;
        }
        return returnValue;
    }
}
