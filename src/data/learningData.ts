import { LearningGuide } from '../types';

export const LEARNING_GUIDES: LearningGuide[] = [
  {
    id: 'guide-dso-mastery',
    title: 'How to Operate a Digital Storage Oscilloscope (DSO)',
    category: 'Instrumentation & Measurements',
    difficulty: 'Beginner',
    readTime: '6 min read',
    summary: 'A step-by-step practical guide to probe attenuation (1X vs 10X), ground loops, vertical scale calibration, timebase selection, and stable edge triggering.',
    diagramTitle: '10X Probe Attenuation & Compensation Trimmer',
    keyPoints: [
      'Always switch probe to 10X mode to reduce probe tip capacitive loading on high-frequency signals.',
      'Calibrate probe compensation using the 1 kHz square wave reference pin on the front panel.',
      'Never connect the probe ground alligator clip to any potential other than circuit ground (earth).'
    ],
    experimentSteps: [
      '1. Connect power and switch on the DSO. Allow a 3-minute warm-up for ADC thermal stabilization.',
      '2. Attach BNC probe to Channel 1 and set probe slider to 10X. Ensure DSO channel menu is set to 10X attenuation.',
      '3. Clip the probe hook to the 1kHz CAL test terminal and alligator clip to GND.',
      '4. Press "AutoSet" or manually adjust Volts/Div to 1V and Time/Div to 500μs.',
      '5. Inspect square corners: use trimming ceramic screwdriver to flatten undershoot or overshoot on the probe trimmer.'
    ],
    formula: {
      name: 'Signal Period to Frequency Relation',
      expression: 'f = 1 / T',
      description: 'Where T is the time period in seconds measured across one complete cycle on the horizontal grid.'
    }
  },
  {
    id: 'guide-esp32-pinout',
    title: 'ESP32 GPIO Pinout & Safe 3.3V Logic Interfacing',
    category: 'Embedded Microcontrollers',
    difficulty: 'Beginner',
    readTime: '5 min read',
    summary: 'Understand input-only pins, strapping pins, capacitive touch sensors, ADC nonlinearities, and how to safely interface 5V modules without frying the silicon.',
    diagramTitle: 'ESP32 Safe GPIO Classification',
    keyPoints: [
      'GPIO 34, 35, 36 (VP), and 39 (VN) are INPUT ONLY pins without internal pull-up or pull-down resistors.',
      'GPIO 0, 2, 5, 12, 15 are Strapping Pins that dictate boot mode (flashing vs SPI flash boot) — avoid pulling them low during startup.',
      'ESP32 inputs are strictly 3.3V tolerant. When receiving signals from 5V Arduino or sensors, use a 2:1 resistive divider (1kΩ and 2kΩ) or bi-directional level shifter.'
    ],
    experimentSteps: [
      '1. Place ESP32 across the center divider of an 830-point breadboard.',
      '2. Connect 3.3V rail and GND to breadboard power rails.',
      '3. Connect an LED with a 220Ω resistor from GPIO 2 (onboard LED) to GND.',
      '4. Upload the blink sketch with 500ms delay to verify toolchain operation.'
    ],
    formula: {
      name: 'Resistive Voltage Divider Formula',
      expression: 'V_out = V_in × (R2 / (R1 + R2))',
      description: 'With V_in = 5V, choosing R1 = 1.8kΩ and R2 = 3.3kΩ yields V_out ≈ 3.23V, safe for ESP32 GPIO.'
    }
  },
  {
    id: 'guide-opamp-filters',
    title: 'Operational Amplifiers: Inverting & Active Low-Pass Filters',
    category: 'Analog Electronics',
    difficulty: 'Intermediate',
    readTime: '8 min read',
    summary: 'Design active first-order and second-order Sallen-Key low pass filters using LM741 / LM358 op-amps for noise suppression in audio and sensor signal paths.',
    diagramTitle: 'Inverting Active Filter Topology',
    keyPoints: [
      'The virtual ground concept holds because the open-loop gain is virtually infinite (A_OL > 100,000).',
      'Gain is determined entirely by passive feedback ratio: A_v = - (R_f / R_in).',
      'Adding feedback capacitor C_f in parallel with R_f rolls off high-frequency noise at -20 dB/decade.'
    ],
    experimentSteps: [
      '1. Connect dual ±12V or ±9V supply rails to pin 7 (V+) and pin 4 (V-) of LM741.',
      '2. Wire non-inverting terminal (pin 3) to analog ground reference.',
      '3. Place R_in = 10kΩ at pin 2, and R_f = 100kΩ between pin 2 and output pin 6 for Gain = -10.',
      '4. Connect function generator delivering 1 kHz 100mVpp sine wave.',
      '5. Observe 1.0 Vpp inverted (180° phase-shifted) output on the oscilloscope.'
    ],
    formula: {
      name: 'Filter Cutoff Frequency',
      expression: 'f_c = 1 / (2π × R_f × C_f)',
      description: 'The -3dB frequency threshold where signal amplitude drops to 70.7% of passband value.'
    }
  },
  {
    id: 'guide-soldering-mastery',
    title: 'High-Reliability Soldering & SMD Rework Protocol',
    category: 'Laboratory Skills',
    difficulty: 'Beginner',
    readTime: '7 min read',
    summary: 'Master thermal mass transfer, rosin-core solder selection, eutectic 63/37 temperature sweet spots, and clean solder joint inspection under magnification.',
    diagramTitle: 'Anatomy of an IPC-A-610 Concave Solder Fillet',
    keyPoints: [
      'Set iron temperature to 320°C - 350°C for lead-free solder; 280°C - 310°C for traditional leaded.',
      'Apply flux before heating to strip invisible copper oxide films immediately.',
      'Form a bright, concave meniscus fillet with a wetting contact angle < 45 degrees.'
    ],
    experimentSteps: [
      '1. Clean tip in brass wire sponge and apply a tiny dab of fresh solder to establish a heat bridge.',
      '2. Touch the iron tip simultaneously to the copper annular pad and the component lead.',
      '3. Wait 1.5 seconds, then feed solder wire to the opposite side of the joint (not onto the iron tip).',
      '4. Remove solder wire, then remove iron tip smoothly along the component lead.',
      '5. Allow joint to solidify undisturbed for 3 seconds without mechanical vibration.'
    ]
  }
];
