package br.com.docpass;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.view.WindowManager;



public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Docpass";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.getWindow().
      addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
  }


// @Override
// public void onNewIntent(Intent intent) {
//     super.onNewIntent(intent);
//     setIntent(intent);
// }

}
