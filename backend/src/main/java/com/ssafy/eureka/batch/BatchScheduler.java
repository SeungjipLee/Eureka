package com.ssafy.eureka.batch;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.YearMonth;

@Slf4j
@Component
public class BatchScheduler {

    private final JobLauncher jobLauncher;
    private final Job updateCardOwnershipJob;
    private final Job updateConsumptionUserJob;

    public BatchScheduler(JobLauncher jobLauncher, Job updateCardOwnershipJob,  Job updateConsumptionUserJob) {
        this.jobLauncher = jobLauncher;
        this.updateCardOwnershipJob = updateCardOwnershipJob;
        this.updateConsumptionUserJob = updateConsumptionUserJob;
    }

    @Scheduled(cron = "0 50 5 * * *", zone = "Asia/Seoul")
    public void runCardOwnershipJob() {
        try {
            JobParameters jobParameters = new JobParametersBuilder()
                    .addLocalDate("date", LocalDate.now())
                    .toJobParameters();
            jobLauncher.run(updateCardOwnershipJob, jobParameters);
            log.info("Job Finished, " + jobParameters);
        } catch (Exception e) {
            log.error("CardOwnershipJob Already Finished");
        }
    }

    @Scheduled(cron = "0 0 6 1 * *", zone = "Asia/Seoul")
    public void runConsumptionUserJob() {
        try {
            YearMonth yearMonth = YearMonth.now();
            JobParameters jobParameters = new JobParametersBuilder()
                    .addString("date", yearMonth.toString())
                    .toJobParameters();
            jobLauncher.run(updateConsumptionUserJob, jobParameters);
            log.info("Job Finished, " + jobParameters);
        } catch (Exception e) {
            log.error("ConsumptionUserJob Already Finished");
        }
    }
}
