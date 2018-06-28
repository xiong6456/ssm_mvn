package com.zero.quartz.test;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @Description 
 * @author Hevin*Xiong
 * @time 2018-3-20 下午5:02:38
 * @version 1.0.0
 */
@Component
public class TestQuartz {
	
	@Scheduled(cron="0/2 * * * * ?")
	public void hehe(){
		//System.out.println("=======打印定时任务=======");
	}
}
