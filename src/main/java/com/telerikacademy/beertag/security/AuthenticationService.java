package com.telerikacademy.beertag.security;

import javax.servlet.http.HttpServletRequest;

public interface AuthenticationService {

    String getUsername(HttpServletRequest req);

}
