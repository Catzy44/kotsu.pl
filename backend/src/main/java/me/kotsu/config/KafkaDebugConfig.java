package me.kotsu.invester.master.config;

import lombok.RequiredArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import jakarta.annotation.PostConstruct;

@RequiredArgsConstructor
@Configuration
public class KafkaDebugConfig {
    private final ConsumerFactory<?, ?> consumerFactory;

    @PostConstruct
    public void logKafkaConsumerProps() {
        System.out.println("=== DEBUG KAFKA CONSUMER CONFIG ===");
        if (consumerFactory instanceof DefaultKafkaConsumerFactory<?, ?> factory) {
            System.out.println(factory.getConfigurationProperties());
        } else {
            System.out.println("Unexpected ConsumerFactory: " + consumerFactory.getClass());
        }
    }
}
