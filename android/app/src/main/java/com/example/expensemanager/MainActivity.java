package com.example.expensemanager;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import android.Manifest;
import android.content.pm.PackageManager;
import androidx.core.app.ActivityCompat;
import com.getcapacitor.Plugin;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Link Bridge to Receiver
        SmsReceiver.bridge = this.getBridge();
        
        // Request Permissions on boot if needed (simplified)
        // Ideally this should be triggered by JS
    }
    
    @Override
    public void onStart() {
        super.onStart();
        SmsReceiver.bridge = this.getBridge();
    }
}
