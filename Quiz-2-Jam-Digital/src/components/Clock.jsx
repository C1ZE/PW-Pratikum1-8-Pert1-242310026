import React, { useState, useEffect } from 'react';

function Clock() {
  // State untuk menyimpan objek waktu saat ini
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Jalankan interval untuk memperbarui state setiap 1 detik
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function untuk membersihkan interval saat komponen tidak digunakan
    return () => clearInterval(timerId);
  }, []);

  // Format jam, menit, dan detik agar selalu 2 digit (HH:MM:SS)
  const formatTime = () => {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Format tanggal untuk mempercantik tampilan utama
  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return time.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="clock-display">
      <p className="clock-date">{formatDate()}</p>
      <h1 className="clock-time">{formatTime()}</h1>
    </div>
  );
}

export default Clock;