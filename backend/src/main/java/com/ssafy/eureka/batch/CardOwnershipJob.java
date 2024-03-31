package com.ssafy.eureka.batch;

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
public class CardOwnershipJob {

    private final StatisticService statisticService;

    @Bean
    public Job updateCardOwnershipJob(PlatformTransactionManager transactionManager, JobRepository jobRepository) {
        return new JobBuilder("cardOwnershipJob", jobRepository)
                .start(updateOverviewStep(transactionManager, jobRepository))
                .next(updateStaticStep(transactionManager, jobRepository))
                .build();
    }

    @Bean
    public Step updateOverviewStep(PlatformTransactionManager transactionManager, JobRepository jobRepository) {
        return new StepBuilder("Step 전체 보유 카드 정보", jobRepository)
                .tasklet(overviewTasklet(), transactionManager)
                .build();
    }

    public Tasklet overviewTasklet() {
        return (contribution, chunkContext) -> {
            statisticService.updateCardOwnershipOverview();
            log.info("cardOwnershipOverview");
            return RepeatStatus.FINISHED;
        };
    }

    @Bean
    public Step updateStaticStep(PlatformTransactionManager transactionManager, JobRepository jobRepository) {
        return new StepBuilder("Step 연령 & 성별 보유 카드 정보", jobRepository)
                .tasklet(staticTasklet(), transactionManager)
                .build();
    }

    public Tasklet staticTasklet() {
        return (contribution, chunkContext) -> {
            statisticService.updateCardOwnershipStatic();
            log.info("cardOwnershipStatic");
            return RepeatStatus.FINISHED;
        };
    }

}
