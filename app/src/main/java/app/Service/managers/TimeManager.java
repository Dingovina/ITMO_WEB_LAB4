package app.Service.managers;

import java.time.ZonedDateTime;

public class TimeManager {
    public static ZonedDateTime formatTime(ZonedDateTime time, String timezone) {
        return time.withZoneSameInstant(java.time.ZoneId.of(timezone));
    }

    public static ZonedDateTime now() {
        return ZonedDateTime.now();
    }
}
