import { StudentProject } from '../types';

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'proj-lora-agri',
    title: 'Solar-Powered Long Range Soil Telemetry Node',
    author: 'Aarav Sharma & Priya Nair',
    college: 'COEP Technological University, Pune',
    category: 'Telecommunication',
    summary: 'A sub-gigahertz LoRa wireless node broadcasting soil moisture, NPK estimates, and ambient humidity across a 3.8 km agricultural canopy with battery life > 18 months.',
    description: 'Built as an end-semester ENTC capstone project. Leveraged our rented SX1276 LoRa transceiver and Rigol DS1054Z oscilloscope to inspect SPI packet timing and tune the matching antenna network. Features sleep-mode power dissipation under 15 microamps.',
    componentsUsed: ['SX1276 LoRa 868MHz Transceiver', 'ESP32 Microcontroller', 'Capacitive Soil Moisture Sensor v1.2', 'TP4056 Solar Charger Module', '18650 LiFePO4 Cell'],
    schematicSummary: 'ESP32 SPI Bus (GPIO 18, 19, 23) connected to LoRa module with RF ground plane isolation. Analog capacitive sensor wired to ADC1_CH0 with 100nF filter capacitor.',
    githubUrl: 'https://github.com/entcverse-student-showcase/lora-telemetry-node',
    likes: 142
  },
  {
    id: 'proj-quad-flight',
    title: 'Autonomous Flight Controller with Kalman Filter',
    author: 'Rohan Deshmukh & Sneha Patil',
    college: 'MIT World Peace University',
    category: 'Robotics',
    summary: 'Custom STM32 flight controller implementing a 6-state quaternion Extended Kalman Filter (EKF) with 500Hz attitude stabilization loop and fail-safe return-to-home.',
    description: 'Developed using rented logic analyzers and hot air rework stations from ENTCverse Hub. The team soldered fine-pitch QFN IMU chips and verified I2C clock stretch times using the digital storage oscilloscope.',
    componentsUsed: ['STM32F405 ARM Cortex-M4', 'MPU6000 6-Axis SPI IMU', 'BMP280 Barometric Altimeter', '4x 30A BLHeli_S ESCs', 'FrSky SBUS Receiver'],
    schematicSummary: 'Hardware SPI bus at 10 MHz connecting STM32 to MPU6000 with low-ESR ceramic bypass capacitors. Dedicated 5V low-noise LDO regulator for analog IMU power rail.',
    githubUrl: 'https://github.com/entcverse-student-showcase/stm32-quad-ekf',
    likes: 189
  },
  {
    id: 'proj-substation-iot',
    title: 'Smart 3-Phase Grid Telemetry & Arc-Fault Detector',
    author: 'Vikram Joshi & Ananya Roy',
    college: 'Pune Institute of Computer Technology (PICT)',
    category: 'IoT',
    summary: 'Real-time electrical grid monitoring system measuring True-RMS current, harmonic distortion (THD), and optical high-speed arc-flash detection for transformer safety.',
    description: 'Rented precision Fluke True-RMS multimeters and Korad bench power supplies to calibrate split-core current transformers across 0 to 50 Amps with 0.5% measurement accuracy.',
    componentsUsed: ['ESP32 Dual-Core DevKit', 'SCT-013-000 Non-Invasive CT Sensors', 'ADS1115 16-Bit I2C ADC', 'Opto-Isolated Triac Driver', 'OLED Telemetry Display'],
    schematicSummary: 'AC current transformer burden resistor bias circuit centered at 1.65V DC. ADS1115 differential inputs reading continuous waveform with FFT harmonic calculation in firmware.',
    githubUrl: 'https://github.com/entcverse-student-showcase/smart-grid-telemetry',
    likes: 116
  },
  {
    id: 'proj-dsp-synth',
    title: 'Polyphonic FM Synthesizer with Real-Time I2S Audio',
    author: 'Kunal Verma',
    college: 'Vishwakarma Institute of Technology (VIT)',
    category: 'DSP',
    summary: '8-voice polyphonic frequency modulation audio synthesizer running on a 240MHz microcontroller with custom wavetable synthesis and analog resonant low-pass filter.',
    description: 'Simulated the digital filter poles in ENTCverse Virtual Lab before deploying the firmware to physical hardware rented from our showroom.',
    componentsUsed: ['Teensy 4.0 / ESP32', 'PCM5102A 32-Bit I2S Stereo DAC', '4x Rotary Optical Encoders', 'LM358 Active Output Buffer', 'MIDI DIN-5 Interface'],
    schematicSummary: 'Bit-clock, word-select, and serial data lines connected via matched 33Ω damping resistors to eliminate digital overshoot ringing on high-speed audio DAC.',
    githubUrl: 'https://github.com/entcverse-student-showcase/polyphonic-fm-synth',
    likes: 98
  }
];
