package app.Controller;
import lombok.Data;

import java.io.Serializable;

import jakarta.inject.Named;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.SessionScoped;

@Data
@Named("timezoneBean")
@SessionScoped
@ManagedBean
public class TimezoneBean implements Serializable {
    private static final long serialVersionUID = 1L;

    private String timezone = "UTC";
}
