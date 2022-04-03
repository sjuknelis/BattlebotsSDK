public class Main {
  public static void main(String[] args) {
    LinearOpMode op;
    switch ( args[0] ) {
      case "AutoOpMode":
        op = new AutoOpMode();
        op.runOpMode();
        break;
      case "TeleOpMode":
        op = new TeleOpMode();
        op.runOpMode();
        break;
      default:
        System.out.println("Error: Invalid mode selection");
    }
  }
}

class LinearOpMode {
  //Pi4J pi4j;

  public LinearOpMode() {
    //pi4j = Pi4J.newAutoContext();
  }

  public void runOpMode() {}
}

class DcMotor {
  public DcMotor(LinearOpMode op,int pin) {

  }
}
