package com.example.expensemanager;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.Bridge;

public class SmsReceiver extends BroadcastReceiver {
    // Static reference to Bridge to allow communication from static receiver
    public static Bridge bridge;

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")) {
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                Object[] pdus = (Object[]) bundle.get("pdus");
                if (pdus != null) {
                    for (Object pdu : pdus) {
                        try {
                            SmsMessage sms;
                            // Support for different Android versions
                            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                                String format = bundle.getString("format");
                                sms = SmsMessage.createFromPdu((byte[]) pdu, format);
                            } else {
                                sms = SmsMessage.createFromPdu((byte[]) pdu);
                            }

                            String sender = sms.getDisplayOriginatingAddress();
                            String messageBody = sms.getDisplayMessageBody();

                            Log.d("SmsReceiver", "SMS Received: " + messageBody);

                            // Send to standard WebView event
                            if (bridge != null) {
                                JSObject ret = new JSObject();
                                ret.put("sender", sender);
                                ret.put("text", messageBody);
                                bridge.triggerWindowJSEvent("smsReceived", ret.toString());
                            }
                        } catch (Exception e) {
                            Log.e("SmsReceiver", "Error parsing SMS", e);
                        }
                    }
                }
            }
        }
    }
}
