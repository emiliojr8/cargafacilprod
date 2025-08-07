// src/components/Auth/OtpInput.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const OTPInput = ({ phone, onVerify }: { phone: string, onVerify: (code: string) => void }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState(60);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }

    // Submit if all fields are filled
    if (newOtp.every(num => num) && newOtp.length === 6) {
      onVerify(newOtp.join(''));
    }
  };

  const resendOtp = async () => {
    setCountdown(60);
    // TODO: Reenviar SMS
    Alert.alert('Código reenviado', `Novo código enviado para ${phone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificação OTP</Text>
      <Text style={styles.subtitle}>Enviado para {phone}</Text>
      
      <View style={styles.otpContainer}>
        {Array(6).fill(0).map((_, index) => (
          <TextInput
            key={index}
            ref={ref => inputs.current[index] = ref!}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => handleChange(text, index)}
            value={otp[index]}
          />
        ))}
      </View>

      {countdown > 0 ? (
        <Text style={styles.countdown}>Reenviar código em {countdown}s</Text>
      ) : (
        <TouchableOpacity onPress={resendOtp}>
          <Text style={styles.resendLink}>Reenviar código</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { marginBottom: 20, color: '#666' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  otpBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5
  },
  countdown: { color: '#999' },
  resendLink: { color: '#1E90FF', fontWeight: 'bold' }
});

export default OTPInput;