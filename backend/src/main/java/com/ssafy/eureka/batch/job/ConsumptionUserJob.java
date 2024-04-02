package com.ssafy.eureka.batch.job;

import com.ssafy.eureka.domain.statistics.service.StatisticService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class ConsumptionUserJob {

    private final StatisticService statisticService;

    @Bean
    public Job updateConsumptionUserJob(PlatformTransactionManager transactionManager, JobRepository jobRepository) {
        return new JobBuilder("consumptionUserJob", jobRepository)
                .start(updateConsumptionStaticStep(transactionManager, jobRepository))
                .build();
    }

    @Bean
    public Step updateConsumptionStaticStep(PlatformTransactionManager transactionManager, JobRepository jobRepository) {
        return new StepBuilder("카테고리별 소비 통계 유저 합산", jobRepository)
                .tasklet(consumptionTasklet(), transactionManager)
                .build();
    }

    @Bean
    public Tasklet consumptionTasklet() {
        return (contribution, chunkContext) -> {
            statisticService.updateConsumptionUserStatic();
            log.info("consumptionUserStatic");
            return RepeatStatus.FINISHED;
        };
    }
}
