import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Cpu, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { LEARNING_GUIDES } from '../data/learningData';
import { LearningGuide } from '../types';

export const LearnView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'guides' | 'pinouts' | 'calculators'>('guides');
  const [selectedGuide, setSelectedGuide] = useState<LearningGuide>(LEARNING_GUIDES[0]);

  // Pinout Explorer state
  const [selectedMcu, setSelectedMcu] = useState<'ESP32' | 'Arduino'>('ESP32');
  const [inspectedPin, setInspectedPin] = useState<string | null>('GPIO 2');

  // Resistor Color Code Calculator State
  const [band1, setBand1] = useState<number>(4); // Yellow (4)
  const [band2, setBand2] = useState<number>(7); // Violet (7)
  const [multiplier, setMultiplier] = useState<number>(2); // Red (x100)
  const [tolerance, setTolerance] = useState<number>(5); // Gold (5%)

  // Resistor Color Bands Reference
  const colorBands = [
    { name: 'Black', value: 0, mult: 1, hex: '#000000', text: '#ffffff' },
    { name: 'Brown', value: 1, mult: 10, hex: '#8B4513', text: '#ffffff' },
    { name: 'Red', value: 2, mult: 100, hex: '#DC2626', text: '#ffffff' },
    { name: 'Orange', value: 3, mult: 1000, hex: '#EA580C', text: '#ffffff' },
    { name: 'Yellow', value: 4, mult: 10000, hex: '#CA8A04', text: '#000000' },
    { name: 'Green', value: 5, mult: 100000, hex: '#16A34A', text: '#ffffff' },
    { name: 'Blue', value: 6, mult: 1000000, hex: '#2563EB', text: '#ffffff' },
    { name: 'Violet', value: 7, mult: 10000000, hex: '#9333EA', text: '#ffffff' },
    { name: 'Grey', value: 8, mult: 100000000, hex: '#6B7280', text: '#ffffff' },
    { name: 'White', value: 9, mult: 1000000000, hex: '#F3F4F6', text: '#000000' },
  ];

  const calculatedResistance = (band1 * 10 + band2) * Math.pow(10, multiplier);
  const formattedResistance = calculatedResistance >= 1000000 
    ? `${(calculatedResistance / 1000000).toFixed(2)} MΩ` 
    : calculatedResistance >= 1000 
    ? `${(calculatedResistance / 1000).toFixed(1)} kΩ` 
    : `${calculatedResistance} Ω`;

  // ESP32 Pin Information Data
  const esp32Pins: Record<string, { role: string; voltage: string; notes: string; safe: boolean }> = {
    'GPIO 2': { role: 'General I/O & Onboard Blue LED', voltage: '3.3V Max', notes: 'Connected to internal pull-down; must be floating or low during flashing.', safe: true },
    'GPIO 4': { role: 'General I/O, ADC2_CH0, Touch 0', voltage: '3.3V Max', notes: 'General purpose pin, fully safe for external sensors.', safe: true },
    'GPIO 18': { role: 'VSPI CLK (Serial Clock)', voltage: '3.3V Max', notes: 'Standard hardware SPI clock line for SD cards and LoRa radios.', safe: true },
    'GPIO 19': { role: 'VSPI MISO (Master In Slave Out)', voltage: '3.3V Max', notes: 'Data receive line for SPI peripherals.', safe: true },
    'GPIO 21': { role: 'I2C SDA (Serial Data)', voltage: '3.3V Max', notes: 'Default hardware I2C data bus line. Connect 4.7k pull-up to 3.3V.', safe: true },
    'GPIO 22': { role: 'I2C SCL (Serial Clock)', voltage: '3.3V Max', notes: 'Default hardware I2C clock bus line.', safe: true },
    'GPIO 23': { role: 'VSPI MOSI (Master Out Slave In)', voltage: '3.3V Max', notes: 'Data transmit line for SPI peripherals.', safe: true },
    'GPIO 34': { role: 'Input Only (ADC1_CH6)', voltage: '3.3V Max', notes: 'Cannot output digital high/low! Ideal for analog sensor readings.', safe: true },
    'GPIO 36 (VP)': { role: 'Input Only (ADC1_CH0)', voltage: '3.3V Max', notes: 'Low noise pre-amplifier input. Input only; no internal pull-up.', safe: true },
    'VIN (5V)': { role: 'External Power Input', voltage: '5.0V Input', notes: 'Powers onboard AMS1117 3.3V LDO. Do not short to 3.3V pin!', safe: true },
    '3V3': { role: 'Regulated 3.3V Power Output', voltage: '3.3V (600mA)', notes: 'Main power supply rail for low-power sensors.', safe: true },
    'GND': { role: 'System Ground', voltage: '0V Reference', notes: 'Common ground reference for all connected circuits.', safe: true }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>ENTC LEARNING ACADEMY & LAB GUIDES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Learn Electronics & Telecommunication Practical Skills
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Step-by-step practical guides, pinout diagrams, and engineering calculators to help you master hardware before turning on the power supply.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveSection('guides')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSection === 'guides'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Practical Guides
          </button>
          <button
            onClick={() => setActiveSection('pinouts')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSection === 'pinouts'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Pinouts
          </button>
          <button
            onClick={() => setActiveSection('calculators')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeSection === 'calculators'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bench Calculators
          </button>
        </div>
      </div>

      {/* SECTION 1: PRACTICAL GUIDES */}
      {activeSection === 'guides' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Guide Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Lab Manual Topics
            </span>
            <div className="space-y-2">
              {LEARNING_GUIDES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGuide(g)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedGuide.id === g.id
                      ? 'bg-cyan-950/40 border-cyan-600/70 shadow-md text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="text-cyan-400 font-medium">{g.category}</span>
                    <span>{g.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{g.title}</h4>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{g.summary}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Guide Reader Content */}
          <div className="lg:col-span-8">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-cyan-400 font-medium">{selectedGuide.category}</span>
                  <span>·</span>
                  <span>Difficulty: {selectedGuide.difficulty}</span>
                  <span>·</span>
                  <span>{selectedGuide.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedGuide.title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedGuide.summary}</p>
              </div>

              {/* Key Principles Checklist */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Crucial Lab Invariants</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedGuide.keyPoints.map((kp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 shrink-0 font-bold">›</span>
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mathematical Formula Callout if applicable */}
              {selectedGuide.formula && (
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 space-y-1 text-xs">
                  <div className="text-cyan-300 font-semibold">{selectedGuide.formula.name}:</div>
                  <div className="text-lg font-mono font-bold text-white py-1">{selectedGuide.formula.expression}</div>
                  <div className="text-[11px] text-slate-400">{selectedGuide.formula.description}</div>
                </div>
              )}

              {/* Step-by-Step Practical Experiment Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Hands-On Lab Procedure
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  {selectedGuide.experimentSteps.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: INTERACTIVE PINOUT EXPLORER */}
      {activeSection === 'pinouts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>ESP32 NodeMCU-32S Pinout Matrix</span>
                </h3>
                <span className="text-xs text-cyan-400 font-mono">30-PIN DIL FOOTPRINT</span>
              </div>

              {/* Interactive Pin Grid */}
              <p className="text-xs text-slate-400">
                Click any pin header below to inspect its electrical ratings, internal pull-ups, and ADC channel mapping:
              </p>

              <div className="grid grid-cols-2 gap-3">
                {Object.keys(esp32Pins).map((pinName) => {
                  const isSelected = inspectedPin === pinName;
                  return (
                    <button
                      key={pinName}
                      onClick={() => setInspectedPin(pinName)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400">{pinName}</span>
                        <span className="text-[10px] text-slate-500">{esp32Pins[pinName].voltage}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {esp32Pins[pinName].role}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Inspected Pin Detail Box */}
          <div className="lg:col-span-5 space-y-4">
            {inspectedPin && esp32Pins[inspectedPin] ? (
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-900/60 space-y-4 shadow-xl">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-mono text-cyan-400">PIN SPECIFICATION</span>
                  <h3 className="text-xl font-bold font-mono text-white mt-0.5">{inspectedPin}</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400">Primary Function:</span>
                    <p className="text-white font-medium mt-0.5">{esp32Pins[inspectedPin].role}</p>
                  </div>

                  <div>
                    <span className="text-slate-400">Safe Operating Voltage:</span>
                    <p className="font-mono text-cyan-300 font-bold mt-0.5">{esp32Pins[inspectedPin].voltage}</p>
                  </div>

                  <div>
                    <span className="text-slate-400">Circuit Invariant Notes:</span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                      {esp32Pins[inspectedPin].notes}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>ESD-Protected Header on Rented Lab Kits</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* SECTION 3: RESISTOR COLOR CODE & BENCH CALCULATORS */}
      {activeSection === 'calculators' && (
        <div className="space-y-8 text-left">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <span>4-Band Resistor Color Code Calculator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Decode through-hole carbon film and metal film resistors by selecting their color rings.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Decoded Resistance:</span>
                <div className="text-2xl font-bold font-mono text-cyan-400">
                  {formattedResistance} <span className="text-xs text-slate-400">±{tolerance}%</span>
                </div>
              </div>
            </div>

            {/* Visual Resistor Graphic */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
              <div className="relative flex items-center">
                {/* Left wire */}
                <div className="w-16 h-1.5 bg-slate-500 rounded-l" />
                
                {/* Resistor body */}
                <div className="w-56 h-16 bg-[#e6c280] rounded-lg shadow-inner flex items-center justify-around px-4 border border-amber-900/40 relative">
                  {/* Band 1 */}
                  <div
                    className="w-4 h-full shadow"
                    style={{ backgroundColor: colorBands[band1].hex }}
                    title={`Band 1: ${colorBands[band1].name}`}
                  />
                  {/* Band 2 */}
                  <div
                    className="w-4 h-full shadow"
                    style={{ backgroundColor: colorBands[band2].hex }}
                    title={`Band 2: ${colorBands[band2].name}`}
                  />
                  {/* Multiplier Band */}
                  <div
                    className="w-4 h-full shadow"
                    style={{ backgroundColor: colorBands[multiplier].hex }}
                    title={`Multiplier: 10^${multiplier}`}
                  />
                  {/* Gap & Tolerance */}
                  <div className="w-2" />
                  <div
                    className="w-4 h-full shadow"
                    style={{ backgroundColor: tolerance === 5 ? '#d4af37' : '#c0c0c0' }}
                    title={`Tolerance: ±${tolerance}%`}
                  />
                </div>

                {/* Right wire */}
                <div className="w-16 h-1.5 bg-slate-500 rounded-r" />
              </div>
            </div>

            {/* Band Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              {/* Band 1 */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">1st Band (Digit 1):</label>
                <select
                  value={band1}
                  onChange={(e) => setBand1(Number(e.target.value))}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  {colorBands.slice(1).map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.value} - {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Band 2 */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">2nd Band (Digit 2):</label>
                <select
                  value={band2}
                  onChange={(e) => setBand2(Number(e.target.value))}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  {colorBands.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.value} - {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Multiplier */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Multiplier Band:</label>
                <select
                  value={multiplier}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  {colorBands.slice(0, 7).map((b) => (
                    <option key={b.value} value={b.value}>
                      × 10^{b.value} ({b.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tolerance */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Tolerance Band:</label>
                <select
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value={5}>Gold (±5%)</option>
                  <option value={10}>Silver (±10%)</option>
                  <option value={1}>Brown (±1% Precision)</option>
                  <option value={2}>Red (±2%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
