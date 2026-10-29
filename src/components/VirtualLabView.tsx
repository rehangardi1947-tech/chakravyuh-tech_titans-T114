import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  BookOpen
} from 'lucide-react';

export const VirtualLabView: React.FC = () => {
  const [activeCircuit, setActiveCircuit] = useState<'rc_filter' | '555_timer' | 'logic_gates' | 'led_ohms'>('rc_filter');
  const [isRunning, setIsRunning] = useState(true);

  // 1. RC Low Pass Filter States
  const [resistance, setResistance] = useState<number>(1000); // 1000 Ohms (1k)
  const [capacitance, setCapacitance] = useState<number>(10); // 10 uF
  const [frequency, setFrequency] = useState<number>(50); // 50 Hz
  const [showCh1, setShowCh1] = useState(true);
  const [showCh2, setShowCh2] = useState(true);

  // 2. 555 Timer States
  const [r1_555, setR1_555] = useState<number>(10); // 10 kOhms
  const [r2_555, setR2_555] = useState<number>(47); // 47 kOhms
  const [c_555, setC_555] = useState<number>(10); // 10 uF

  // 3. Logic Gate States
  const [logicGate, setLogicGate] = useState<'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'NOT'>('AND');
  const [inputA, setInputA] = useState<boolean>(true);
  const [inputB, setInputB] = useState<boolean>(false);

  // 4. LED & Ohm's Law States
  const [supplyVoltage, setSupplyVoltage] = useState<number>(5.0); // Volts
  const [ledResistor, setLedResistor] = useState<number>(220); // Ohms
  const ledVf = 2.0; // 2.0V forward drop for standard red/green LED

  // Canvas references for waveform rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // RC Filter Calculations
  const cFarads = capacitance * 1e-6;
  const cutoffFreq = 1 / (2 * Math.PI * resistance * cFarads);
  const freqRatio = frequency / cutoffFreq;
  const gainLinear = 1 / Math.sqrt(1 + Math.pow(freqRatio, 2));
  const gainDb = 20 * Math.log10(gainLinear);
  const phaseShiftDeg = -Math.atan(freqRatio) * (180 / Math.PI);

  // 555 Timer Calculations
  const r1_ohms = r1_555 * 1000;
  const r2_ohms = r2_555 * 1000;
  const c_farads = c_555 * 1e-6;
  const tHigh = 0.693 * (r1_ohms + r2_ohms) * c_farads;
  const tLow = 0.693 * r2_ohms * c_farads;
  const tPeriod = tHigh + tLow;
  const freq555 = tPeriod > 0 ? 1 / tPeriod : 0;
  const dutyCycle = tPeriod > 0 ? (tHigh / tPeriod) * 100 : 0;

  // Logic Gate Evaluation
  const logicOutput = (() => {
    switch (logicGate) {
      case 'AND': return inputA && inputB;
      case 'OR': return inputA || inputB;
      case 'NAND': return !(inputA && inputB);
      case 'NOR': return !(inputA || inputB);
      case 'XOR': return inputA !== inputB;
      case 'NOT': return !inputA;
    }
  })();

  // Ohm's Law LED Evaluation
  const ledCurrent_mA = supplyVoltage > ledVf 
    ? ((supplyVoltage - ledVf) / ledResistor) * 1000 
    : 0;
  const resistorPower_mW = Math.pow(ledCurrent_mA / 1000, 2) * ledResistor * 1000;

  // Waveform rendering loop for oscilloscope
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localRunning = isRunning;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Dark oscilloscope display background
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      // Grid lines (Graticule)
      ctx.strokeStyle = 'rgba(30, 58, 86, 0.4)';
      ctx.lineWidth = 1;

      // 8 vertical divisions, 8 horizontal divisions
      const gridX = width / 10;
      const gridY = height / 8;

      ctx.beginPath();
      for (let x = gridX; x < width; x += gridX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = gridY; y < height; y += gridY) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center crosshairs with ticks
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      if (localRunning) {
        timeRef.current += 0.05;
      }
      const t = timeRef.current;

      if (activeCircuit === 'rc_filter') {
        const amplitude = 65; // pixels
        const angularSpeed = Math.min(frequency * 0.15, 6);

        // Channel 1: Input Sine Wave (Cyan)
        if (showCh1) {
          ctx.strokeStyle = '#38bdf8'; // cyan-400
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (let x = 0; x < width; x++) {
            const angle = (x / width) * Math.PI * 4 * angularSpeed - t;
            const y = centerY - Math.sin(angle) * amplitude;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Channel 2: Filtered Output Sine Wave (Amber)
        if (showCh2) {
          const outAmplitude = amplitude * gainLinear;
          const phaseRad = phaseShiftDeg * (Math.PI / 180);

          ctx.strokeStyle = '#f59e0b'; // amber-500
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (let x = 0; x < width; x++) {
            const angle = (x / width) * Math.PI * 4 * angularSpeed - t + phaseRad;
            const y = centerY - Math.sin(angle) * outAmplitude;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (activeCircuit === '555_timer') {
        // Output Square Wave (Cyan) & Capacitor Ramp (Amber)
        const periodPx = Math.max(width / Math.max(freq555 * 4, 1), 50);
        const highWidth = periodPx * (dutyCycle / 100);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        const offset = (t * 50) % periodPx;

        for (let x = 0; x < width; x++) {
          const cyclePos = (x + offset) % periodPx;
          const isHigh = cyclePos < highWidth;
          const y = isHigh ? centerY - 60 : centerY + 60;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Capacitor exponential charge curve
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const cyclePos = (x + offset) % periodPx;
          let capY;
          if (cyclePos < highWidth) {
            // Charging from 1/3 Vcc to 2/3 Vcc
            const progress = cyclePos / highWidth;
            capY = centerY + 30 - progress * 60;
          } else {
            // Discharging from 2/3 Vcc to 1/3 Vcc
            const progress = (cyclePos - highWidth) / (periodPx - highWidth);
            capY = centerY - 30 + progress * 60;
          }
          if (x === 0) ctx.moveTo(x, capY);
          else ctx.lineTo(x, capY);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeCircuit, isRunning, frequency, gainLinear, phaseShiftDeg, showCh1, showCh2, freq555, dutyCycle]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-1">
            <Activity className="w-4 h-4" />
            <span>INTERACTIVE HARDWARE SIMULATION ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ENTC Virtual Electronics Laboratory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Test and visualize circuit behavior in real time before renting or powering physical equipment. Adjust component values, inspect cutoff responses, and observe live oscilloscope waveforms.
          </p>
        </div>

        {/* Circuit Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveCircuit('rc_filter')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCircuit === 'rc_filter'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            RC Filter Simulator
          </button>
          <button
            onClick={() => setActiveCircuit('555_timer')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCircuit === '555_timer'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            555 Timer Osc
          </button>
          <button
            onClick={() => setActiveCircuit('logic_gates')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCircuit === 'logic_gates'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Digital Logic Gates
          </button>
          <button
            onClick={() => setActiveCircuit('led_ohms')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCircuit === 'led_ohms'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ohm's Law & LED
          </button>
        </div>
      </div>

      {/* CIRCUIT 1: RC LOW PASS FILTER */}
      {activeCircuit === 'rc_filter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Left Zone: Live Digital Oscilloscope Screen */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-[#070b14] p-4 shadow-xl space-y-3">
              {/* Scope Top Header Bar */}
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-cyan-400 font-bold">VIRTUAL DSO 2-CH</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    ACQUISITION RUNNING
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    title={isRunning ? 'Pause Waveform' : 'Run Waveform'}
                  >
                    {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setResistance(1000);
                      setCapacitance(10);
                      setFrequency(50);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Reset to defaults"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Canvas Waveform Viewport */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 aspect-[16/9] flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={360}
                  className="w-full h-full object-contain"
                />

                {/* Oscilloscope Legend */}
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 rounded-lg p-2 text-[11px] font-mono space-y-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCh1(!showCh1)}
                      className={`flex items-center gap-1.5 font-bold cursor-pointer ${showCh1 ? 'text-cyan-400' : 'text-slate-600 line-through'}`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                      CH1: V_in (Sine)
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCh2(!showCh2)}
                      className={`flex items-center gap-1.5 font-bold cursor-pointer ${showCh2 ? 'text-amber-400' : 'text-slate-600 line-through'}`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                      CH2: V_out (Filtered)
                    </button>
                  </div>
                </div>

                {/* Real-time Measurements Overlay */}
                <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 rounded-lg px-3 py-1.5 text-[11px] font-mono space-y-0.5 text-right">
                  <div className="text-slate-400">Gain: <strong className="text-white font-bold">{gainDb.toFixed(2)} dB</strong></div>
                  <div className="text-slate-400">Phase: <strong className="text-cyan-300 font-bold">{phaseShiftDeg.toFixed(1)}°</strong></div>
                  <div className="text-slate-400">Linear Gain: <strong className="text-amber-300 font-bold">{(gainLinear * 100).toFixed(1)}%</strong></div>
                </div>
              </div>

              {/* Scope Bench Control Strip */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1">
                <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono">TIMEBASE</span>
                  <div className="text-xs font-bold text-white font-mono">10 ms / Div</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-cyan-400 font-mono">CH1 SCALE</span>
                  <div className="text-xs font-bold text-cyan-300 font-mono">1.0 V / Div</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-amber-400 font-mono">CH2 SCALE</span>
                  <div className="text-xs font-bold text-amber-300 font-mono">1.0 V / Div</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Zone: Interactive Parameter Controls & Circuit Physics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>RC Component Deck</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Adjust resistance, capacitance, and signal frequency to observe attenuation above cutoff.
                </p>
              </div>

              {/* Slider 1: Resistance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Series Resistor (R):</label>
                  <span className="font-mono text-cyan-400 font-bold">{resistance >= 1000 ? `${(resistance / 1000).toFixed(1)} kΩ` : `${resistance} Ω`}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={resistance}
                  onChange={(e) => setResistance(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100 Ω</span>
                  <span>10 kΩ</span>
                </div>
              </div>

              {/* Slider 2: Capacitance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Shunt Capacitor (C):</label>
                  <span className="font-mono text-cyan-400 font-bold">{capacitance} μF</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={capacitance}
                  onChange={(e) => setCapacitance(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 μF</span>
                  <span>100 μF</span>
                </div>
              </div>

              {/* Slider 3: Input Frequency */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Signal Generator Frequency (f):</label>
                  <span className="font-mono text-amber-400 font-bold">{frequency} Hz</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 Hz (Passband)</span>
                  <span>500 Hz (Stopband)</span>
                </div>
              </div>

              {/* Mathematical Proof Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Calculated Cutoff (-3dB):</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    {cutoffFreq.toFixed(1)} Hz
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-mono">
                  <div className="flex justify-between">
                    <span>Formula:</span>
                    <span className="text-slate-200">f_c = 1 / (2π × R × C)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Operating Mode:</span>
                    <span className={frequency < cutoffFreq ? 'text-emerald-400' : 'text-amber-400'}>
                      {frequency < cutoffFreq ? '● Passband (Signal Unattenuated)' : '▲ Stopband (Signal Filtered)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Lab Hardware Link */}
              <div className="pt-1 text-xs text-slate-400 flex items-center justify-between">
                <span>Want to test this on real hardware?</span>
                <span className="text-cyan-400 font-medium">Rent Rigol DSO for ₹290/day →</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CIRCUIT 2: 555 TIMER ASTABLE MULTIVIBRATOR */}
      {activeCircuit === '555_timer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-[#070b14] p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="font-mono text-cyan-400 font-bold">555 ASTABLE OSCILLOSCOPE TRACE</span>
                <span className="font-mono text-xs text-slate-300">
                  Duty: <strong className="text-cyan-300">{dutyCycle.toFixed(1)}%</strong> · Freq: <strong className="text-amber-300">{freq555.toFixed(2)} Hz</strong>
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9]">
                <canvas ref={canvasRef} width={640} height={360} className="w-full h-full object-contain" />
                <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-700/80 rounded-lg p-2 text-[11px] font-mono space-y-1">
                  <div className="text-cyan-400">■ Square Wave Output (Pin 3)</div>
                  <div className="text-amber-400">┅ Capacitor Charge Ramp (Pin 2/6)</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">T_HIGH (CHARGE)</span>
                  <div className="text-xs font-bold text-white font-mono">{(tHigh * 1000).toFixed(1)} ms</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">T_LOW (DISCHARGE)</span>
                  <div className="text-xs font-bold text-white font-mono">{(tLow * 1000).toFixed(1)} ms</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">TOTAL PERIOD T</span>
                  <div className="text-xs font-bold text-cyan-300 font-mono">{(tPeriod * 1000).toFixed(1)} ms</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>555 Timing Component Deck</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Adjust R1, R2, and C to modify oscillation frequency and duty cycle.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Resistor R1 (Vcc to Pin 7):</label>
                  <span className="font-mono text-cyan-400 font-bold">{r1_555} kΩ</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={r1_555}
                  onChange={(e) => setR1_555(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Resistor R2 (Pin 7 to Pin 2/6):</label>
                  <span className="font-mono text-cyan-400 font-bold">{r2_555} kΩ</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={r2_555}
                  onChange={(e) => setR2_555(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Timing Capacitor C:</label>
                  <span className="font-mono text-cyan-400 font-bold">{c_555} μF</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={c_555}
                  onChange={(e) => setC_555(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-2">
                <div className="font-semibold text-slate-300">555 Timer Astable Formula:</div>
                <div className="font-mono text-cyan-400 text-xs">f = 1.44 / ((R1 + 2×R2) × C)</div>
                <div className="font-mono text-slate-400 text-[11px]">Duty Cycle = (R1 + R2) / (R1 + 2×R2) × 100%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CIRCUIT 3: DIGITAL LOGIC GATES */}
      {activeCircuit === 'logic_gates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-[#070b14] p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>{logicGate} Gate Interactive Schematic</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">IC 74xx TTL Logic</span>
              </div>

              {/* Visual Schematic Diagram with Live Connections */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Inputs switches */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setInputA(!inputA)}
                      className={`w-14 py-2 px-3 rounded-lg font-mono font-bold text-sm transition-all cursor-pointer ${
                        inputA
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {inputA ? 'HIGH (1)' : 'LOW (0)'}
                    </button>
                    <span className="text-xs font-mono text-slate-300">Input A (Pin 1)</span>
                  </div>

                  {logicGate !== 'NOT' && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setInputB(!inputB)}
                        className={`w-14 py-2 px-3 rounded-lg font-mono font-bold text-sm transition-all cursor-pointer ${
                          inputB
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {inputB ? 'HIGH (1)' : 'LOW (0)'}
                      </button>
                      <span className="text-xs font-mono text-slate-300">Input B (Pin 2)</span>
                    </div>
                  )}
                </div>

                {/* Gate Symbol Representation */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-center min-w-[140px]">
                  <div className="text-2xl font-black text-cyan-300 font-mono">{logicGate}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">TTL LOGIC GATE</div>
                </div>

                {/* Output Indicator LED */}
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <span className="text-xs font-mono text-slate-300">Output Y (Pin 3)</span>
                    <div className="text-lg font-mono font-bold text-white">
                      {logicOutput ? '1 (HIGH)' : '0 (LOW)'}
                    </div>
                  </div>

                  {/* Glowing LED */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center font-bold text-xs ${
                      logicOutput
                        ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-lg shadow-emerald-500/50'
                        : 'bg-slate-800 text-slate-600 border-slate-700'
                    }`}>
                      LED
                    </div>
                    {logicOutput && (
                      <div className="absolute inset-0 rounded-full bg-emerald-400 blur-md opacity-40 animate-pulse pointer-events-none" />
                    )}
                  </div>
                </div>
              </div>

              {/* Live Interactive Truth Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Truth Table for {logicGate}
                </span>
                <div className="rounded-lg overflow-hidden border border-slate-800 text-xs font-mono">
                  <table className="w-full text-center">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-2">Input A</th>
                        {logicGate !== 'NOT' && <th className="py-2">Input B</th>}
                        <th className="py-2 text-cyan-400">Output Y</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                      {logicGate === 'NOT' ? (
                        <>
                          <tr className={!inputA ? 'bg-cyan-500/15 font-bold text-white' : 'text-slate-400'}>
                            <td className="py-2">0</td>
                            <td className="py-2 text-emerald-400">1</td>
                          </tr>
                          <tr className={inputA ? 'bg-cyan-500/15 font-bold text-white' : 'text-slate-400'}>
                            <td className="py-2">1</td>
                            <td className="py-2 text-emerald-400">0</td>
                          </tr>
                        </>
                      ) : (
                        [
                          { a: false, b: false },
                          { a: false, b: true },
                          { a: true, b: false },
                          { a: true, b: true }
                        ].map((row, idx) => {
                          const isCurrent = inputA === row.a && inputB === row.b;
                          let out = false;
                          if (logicGate === 'AND') out = row.a && row.b;
                          if (logicGate === 'OR') out = row.a || row.b;
                          if (logicGate === 'NAND') out = !(row.a && row.b);
                          if (logicGate === 'NOR') out = !(row.a || row.b);
                          if (logicGate === 'XOR') out = row.a !== row.b;

                          return (
                            <tr key={idx} className={isCurrent ? 'bg-cyan-500/20 font-bold text-white' : 'text-slate-400'}>
                              <td className="py-2">{row.a ? '1' : '0'}</td>
                              <td className="py-2">{row.b ? '1' : '0'}</td>
                              <td className="py-2 text-cyan-300">{out ? '1' : '0'}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Select Logic Gate Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['AND', 'OR', 'NAND', 'NOR', 'XOR', 'NOT'] as const).map((gate) => (
                  <button
                    key={gate}
                    onClick={() => setLogicGate(gate)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                      logicGate === gate
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {gate}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <span className="font-semibold text-slate-300">Equivalent Standard ICs:</span>
                <p className="text-slate-400">
                  {logicGate === 'AND' && '74LS08: Quad 2-Input AND Gate IC'}
                  {logicGate === 'OR' && '74LS32: Quad 2-Input OR Gate IC'}
                  {logicGate === 'NAND' && '74LS00: Quad 2-Input NAND Gate IC (Universal Gate)'}
                  {logicGate === 'NOR' && '74LS02: Quad 2-Input NOR Gate IC (Universal Gate)'}
                  {logicGate === 'XOR' && '74LS86: Quad 2-Input XOR Gate IC'}
                  {logicGate === 'NOT' && '74LS04: Hex Inverter Gate IC'}
                </p>
                <div className="pt-2 text-[11px] text-cyan-400">
                  Available in our Complete ENTC Practice Kit (600+ components).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CIRCUIT 4: OHM'S LAW & LED CURRENT LIMITER */}
      {activeCircuit === 'led_ohms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-[#070b14] p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Ohm's Law & LED Ballast Resistor Circuit</span>
                </h3>
                <span className="font-mono text-xs text-slate-400">I = (V_supply - V_f) / R</span>
              </div>

              {/* Dynamic Status Banner */}
              <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
                ledCurrent_mA > 30
                  ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                  : ledCurrent_mA >= 10 && ledCurrent_mA <= 25
                  ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                  : ledCurrent_mA < 2
                  ? 'bg-slate-900 border-slate-800 text-slate-400'
                  : 'bg-amber-950/60 border-amber-800 text-amber-300'
              }`}>
                {ledCurrent_mA > 30 ? (
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                )}
                <div>
                  <strong>
                    {ledCurrent_mA > 30 && 'OVERCURRENT RISK: LED burnout warning!'}
                    {ledCurrent_mA >= 10 && ledCurrent_mA <= 25 && 'NOMINAL OPERATION: Ideal LED brightness (10 - 25 mA).'}
                    {ledCurrent_mA < 2 && 'UNDERVOLTAGE: LED is unlit (current below 2mA threshold).'}
                    {ledCurrent_mA >= 2 && ledCurrent_mA < 10 && 'LOW BRIGHTNESS: Dim illumination (2 - 10 mA).'}
                    {ledCurrent_mA > 25 && ledCurrent_mA <= 30 && 'HIGH CURRENT: Operating near max thermal limit.'}
                  </strong>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    Standard 5mm LEDs are rated for 20mA continuous forward current.
                  </p>
                </div>
              </div>

              {/* Visual Circuit Simulation Box */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around">
                <div className="text-center">
                  <span className="text-[11px] text-slate-400 font-mono">SUPPLY VOLTAGE</span>
                  <div className="text-xl font-bold font-mono text-white">{supplyVoltage.toFixed(1)} V</div>
                </div>

                <span className="text-slate-600 font-mono">──[ R = {ledResistor}Ω ]──▶</span>

                <div className="text-center flex flex-col items-center">
                  {/* Glowing LED circle */}
                  <div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: ledCurrent_mA > 30 ? '#ef4444' : ledCurrent_mA >= 2 ? '#22c55e' : '#1e293b',
                      borderColor: ledCurrent_mA > 30 ? '#fca5a5' : ledCurrent_mA >= 2 ? '#86efac' : '#334155',
                      boxShadow: ledCurrent_mA >= 2 ? `0 0 ${Math.min(ledCurrent_mA * 1.5, 30)}px rgba(34, 197, 94, 0.6)` : 'none'
                    }}
                  >
                    <span className="text-[10px] font-bold text-slate-950 font-mono">LED</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono mt-2">V_f ≈ 2.0V</span>
                </div>

                <span className="text-slate-600 font-mono">──▶ GND</span>
              </div>

              {/* Electrical metrics */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">LOOP CURRENT</span>
                  <div className="text-base font-bold text-cyan-400 font-mono">{ledCurrent_mA.toFixed(1)} mA</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">RESISTOR POWER</span>
                  <div className="text-base font-bold text-amber-400 font-mono">{resistorPower_mW.toFixed(1)} mW</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono">RESISTOR RATING</span>
                  <div className="text-base font-bold text-white font-mono">
                    {resistorPower_mW > 250 ? 'Needs 0.5W' : 'Standard 1/4W OK'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white">Circuit Parameters</h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Supply Voltage (V_s):</label>
                  <span className="font-mono text-cyan-400 font-bold">{supplyVoltage.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={supplyVoltage}
                  onChange={(e) => setSupplyVoltage(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1.0 V</span>
                  <span>15.0 V</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-300 font-medium">Ballast Resistor (R):</label>
                  <span className="font-mono text-cyan-400 font-bold">{ledResistor} Ω</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="2000"
                  step="10"
                  value={ledResistor}
                  onChange={(e) => setLedResistor(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>10 Ω (Danger)</span>
                  <span>2,000 Ω</span>
                </div>
              </div>

              {/* Standard resistor values shortcut */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300">Quick Standard E12 Resistors:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[100, 220, 330, 470, 1000].map((r) => (
                    <button
                      key={r}
                      onClick={() => setLedResistor(r)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-colors cursor-pointer ${
                        ledResistor === r
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {r}Ω
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
