package com.smaran.projectmanagementsystem.repo;

import com.smaran.projectmanagementsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepo extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
