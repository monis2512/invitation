package com.example.dateinvite.config;

import com.example.dateinvite.model.AdminUser;
import com.example.dateinvite.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {
    private final AdminUserRepository repo;
    private final BCryptPasswordEncoder encoder;

    @Value("${ADMIN_USERNAME:admin}") private String username;
    @Value("${ADMIN_PASSWORD:change-me-now}") private String password;

    public AdminInitializer(AdminUserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo = repo; this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        AdminUser user = repo.findByUsername(username).orElseGet(AdminUser::new);
        user.setUsername(username);
        // Updates the stored hash on each startup, so changing the Render env password changes the password.
        user.setPasswordHash(encoder.encode(password));
        repo.save(user);
    }
}
