package com.zero.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.lang.StringUtils;

public class DateUtil {
	/** 默认日期格式 yyyy-MM-dd*/
    public static final String DATE_DEFAULT_FORMAT = "yyyy-MM-dd";

    /** 默认时间格式 yyyy-MM-dd HH:mm:ss*/
    public static final String DATETIME_DEFAULT_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public static final String TIME_DEFAULT_FORMAT = "HH:mm:ss";

    /** 日期格式化*/
    private static DateFormat dateFormat = null;

    /** 时间格式化*/
    private static DateFormat dateTimeFormat = null;

    private static DateFormat timeFormat = null;

    private static Calendar gregorianCalendar = null;

    static {
        dateFormat = new SimpleDateFormat(DATE_DEFAULT_FORMAT);
        dateTimeFormat = new SimpleDateFormat(DATETIME_DEFAULT_FORMAT);
        timeFormat = new SimpleDateFormat(TIME_DEFAULT_FORMAT);
        gregorianCalendar = new GregorianCalendar();
    }

    /**
     * 日期格式化yyyy-MM-dd
     * 
     * @param date
     * @return
     */
    public static Date formatDate(String date, String format) {
        try {
            return new SimpleDateFormat(format).parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 日期格式化yyyy-MM-dd
     * 
     * @param date
     * @return
     */
    public static String getDateFormat(Date date) {
        return dateFormat.format(date);
    }

    /**
     * 日期格式化yyyy-MM-dd HH:mm:ss
     * 
     * @param date
     * @return
     */
    public static String getDateTimeFormat(Date date) {
        return dateTimeFormat.format(date);
    }

    /**
     * 时间格式化
     * 
     * @param date
     * @return HH:mm:ss
     */
    public static String getTimeFormat(Date date) {
        return timeFormat.format(date);
    }

    /**
     * 日期格式化
     * 
     * @param date
     * @param 格式类型
     * @return
     */
    public static String getDateFormat(Date date, String formatStr) {
        if (StringUtils.isNotBlank(formatStr)) {
            return new SimpleDateFormat(formatStr).format(date);
        }
        return null;
    }

    /**
     * 日期格式化
     * 
     * @param date
     * @return
     */
    public static Date getDateFormat(String date) {
        try {
            return dateFormat.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 时间格式化
     * 
     * @param date
     * @return
     */
    public static Date getDateTimeFormat(String date) {
        try {
            return dateTimeFormat.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 时间格式化
     * 
     * @param date
     * @return
     */
    public static String getCurrentDate() {
        try {
            return getDateFormat(new Date());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
