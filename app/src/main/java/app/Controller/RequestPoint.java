package app.Controller;
import lombok.Data;

import java.io.Serializable;

import jakarta.inject.Named;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.RequestScoped;

@Data
@Named("requestPoint")
@RequestScoped
@ManagedBean
public class RequestPoint implements Serializable {
    private static final long serialVersionUID = 1L;

    private double x=0;
    private double y=0;
    private double r=1;
    private boolean drawn=false;
}
