import com.example.dateinvite.repository.AdminUserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AuthController {
    private final AdminUserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public AuthController(AdminUserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo=repo; this.encoder=encoder;
    }

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody Map<String,String> body, HttpSession session) {
        String username=body.getOrDefault("username","");
        String password=body.getOrDefault("password","");
        var user=repo.findByUsername(username);
        if(user.isPresent() && encoder.matches(password,user.get().getPasswordHash())) {
            session.setAttribute("ADMIN_AUTH", true);
            return Map.of("authenticated", true);
        }
        return Map.of("authenticated", false);
    }

    @PostMapping("/logout")
    public Map<String,Object> logout(HttpSession session) {
        session.invalidate();
        return Map.of("success", true);
    }

    public static boolean authenticated(HttpSession session) {
        return Boolean.TRUE.equals(session.getAttribute("ADMIN_AUTH"));
    }
}
