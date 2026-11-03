import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle2, Clock, AlertCircle, BarChart2, 
  Settings, RefreshCw, Search, Filter, ChevronRight, Award, Flame 
} from 'lucide-react';

const initialPhysics = [
  { id: 'p1', name: 'Modern Physics & Atomic Structure', mainW: 'High (~10-12%)', mainFreq: '3-4', advW: 'High (~8-10%)', advDiff: 'Moderate', focus: 'Photoelectric effect, Bohr model, Nuclear physics, De Broglie', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p2', name: 'Current Electricity & Capacitance', mainW: 'High (~8-10%)', mainFreq: '2-3', advW: 'High (~8-10%)', advDiff: 'Moderate to High', focus: 'Kirchhoff laws, Potentiometer, RC circuits, Capacitors', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p3', name: 'Thermodynamics & KTG', mainW: 'High (~8-10%)', mainFreq: '2-3', advW: 'Moderate (~6-8%)', advDiff: 'Moderate', focus: 'First law, Isothermal/Adiabatic processes, KTG principles', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p4', name: 'Electrostatics', mainW: 'Moderate (~6-8%)', mainFreq: '1-2', advW: 'High (~8-10%)', advDiff: 'High', focus: 'Gauss Law, Potential energy, Continuous charge distributions', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p5', name: 'Magnetic Effects of Current & EMI', mainW: 'Moderate (~6-8%)', mainFreq: '2', advW: 'High (~8-10%)', advDiff: 'High', focus: 'Ampere Law, Faraday & Lenz Laws, Inductance, Motion in B-field', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p6', name: 'Ray & Wave Optics', mainW: 'Moderate (~6-7%)', mainFreq: '2', advW: 'High (~7-9%)', advDiff: 'High', focus: 'Lens formula, TIR, YDSE interference & diffraction', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p7', name: 'Units, Dimensions & Errors / Experimental', mainW: 'High (~6-8%)', mainFreq: '2', advW: 'Low-Mod (~3-4%)', advDiff: 'Low to Moderate', focus: 'Dimensional analysis, Screw gauge, Vernier caliper, Error propagation', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p8', name: 'Kinematics & Laws of Motion (NLM)', mainW: 'Moderate (~6-7%)', mainFreq: '2', advW: 'Moderate (~5-6%)', advDiff: 'Moderate', focus: '1D/2D motion, Projectile, FBDs, Friction, Circular motion', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p9', name: 'Work, Energy & Power / Mechanics', mainW: 'Moderate (~5-6%)', mainFreq: '1-2', advW: 'Mod-High (~6-8%)', advDiff: 'Moderate to High', focus: 'Work-Energy Theorem, Collisions, Momentum conservation', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p10', name: 'Rotational Motion', mainW: 'Low-Mod (~4-5%)', mainFreq: '1', advW: 'Very High (~8-10%)', advDiff: 'Very High', focus: 'Moment of inertia, Torque, Angular momentum, Rolling', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p11', name: 'Gravitation', mainW: 'Moderate (~4-5%)', mainFreq: '1', advW: 'Moderate (~4-5%)', advDiff: 'Moderate', focus: "Kepler's laws, Gravitational potential, Escape/Orbital speed", priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p12', name: 'Oscillations (SHM) & Waves', mainW: 'Moderate (~4-5%)', mainFreq: '1', advW: 'Moderate (~5-6%)', advDiff: 'Moderate to High', focus: 'Simple harmonic motion, Energy in SHM, Doppler effect, Beats', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p13', name: 'Semiconductor Electronics & Devices', mainW: 'High (~4-5%)', mainFreq: '1-2', advW: 'Low (~1-2%)', advDiff: 'Low to Moderate', focus: 'p-n junction, Diode rectifiers, LED, Zener diode, Logic gates', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p14', name: 'Electromagnetic Waves (EMW)', mainW: 'Moderate (~3-4%)', mainFreq: '1', advW: 'Low (~1-2%)', advDiff: 'Low', focus: "Displacement current, Maxwell's equations, EM spectrum properties", priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p15', name: 'Mechanical Properties of Solids & Fluids', mainW: 'Moderate (~3-4%)', mainFreq: '1', advW: 'Moderate (~4-5%)', advDiff: 'Moderate', focus: "Elasticity, Hooke's Law, Viscosity, Surface tension, Bernoulli's theorem", priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p16', name: 'Thermal Properties of Matter & Heat Transfer', mainW: 'Moderate (~3-4%)', mainFreq: '1', advW: 'Moderate (~4-5%)', advDiff: 'Moderate', focus: 'Thermal expansion, Calorimetry, Conduction, Radiation, Stefan-Boltzmann law', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p17', name: 'Magnetism & Matter', mainW: 'Low (~2-3%)', mainFreq: '0-1', advW: 'Low (~1-2%)', advDiff: 'Low', focus: 'Bar magnet, Magnetic susceptibility, Hysteresis curve, Dia/Para/Ferro magnetism', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'p18', name: 'Alternating Current (AC)', mainW: 'Moderate (~3-4%)', mainFreq: '1', advW: 'Moderate (~3-4%)', advDiff: 'Moderate', focus: 'LCR series circuits, Resonance, Power factor, Transformer ratio', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' }
];

const initialChemistry = [
  { id: 'c1', name: 'General Organic Chemistry (GOC) & Hydrocarbons', mainW: 'High (~10-12%)', mainFreq: '3-4', advW: 'High (~10-12%)', advDiff: 'High', focus: 'Inductive/Resonance effects, Reaction mechanisms, Acidic/Basic strength', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c2', name: 'Coordination Compounds', mainW: 'Very High (~8-10%)', mainFreq: '2-3', advW: 'High (~8-10%)', advDiff: 'Moderate to High', focus: 'IUPAC naming, CFT, Isomerism, Bonding theories', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c3', name: 'p-Block & d/f-Block Elements', mainW: 'High (~8-10%)', mainFreq: '2-3', advW: 'Mod-High (~6-8%)', advDiff: 'Moderate', focus: 'Periodic trends, Chemical properties, Oxoacids structures, Lanthanoid contraction', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c4', name: 'Chemical Bonding & Molecular Structure', mainW: 'High (~7-8%)', mainFreq: '2', advW: 'High (~7-8%)', advDiff: 'Moderate', focus: 'Hybridization, VSEPR theory, Molecular Orbital Theory (MOT)', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c5', name: 'Electrochemistry & Chemical Kinetics', mainW: 'High (~7-8%)', mainFreq: '2', advW: 'High (~8-10%)', advDiff: 'High', focus: 'Nernst equation, Conductance, 1st-order rate laws, Arrhenius equation', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c6', name: 'Aldehydes, Ketones & Carboxylic Acids', mainW: 'High (~6-8%)', mainFreq: '2', advW: 'Very High (~9-10%)', advDiff: 'High', focus: 'Aldol, Cannizzaro, Nucleophilic addition mechanisms, Grignard reagents', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c7', name: 'Thermodynamics & Thermochemistry', mainW: 'Moderate (~6-7%)', mainFreq: '1-2', advW: 'High (~7-8%)', advDiff: 'High', focus: "Enthalpy, Entropy, Gibbs free energy (ΔG), Hess's Law", priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c8', name: 'Chemical & Ionic Equilibrium', mainW: 'Moderate (~5-6%)', mainFreq: '1-2', advW: 'High (~7-8%)', advDiff: 'Very High', focus: "pH calculations, Solubility product (Ksp), Le Chatelier principle, Buffers", priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c9', name: 'Solutions & Colligative Properties', mainW: 'Moderate (~5-6%)', mainFreq: '1-2', advW: 'Moderate (~5-6%)', advDiff: 'Moderate', focus: "Raoult's Law, Osmotic pressure, Van 't Hoff factor, Boiling/Freezing elevation", priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c10', name: 'Some Basic Concepts (Mole Concept) & Atomic Structure', mainW: 'Moderate (~5-6%)', mainFreq: '1-2', advW: 'Moderate (~5-6%)', advDiff: 'Moderate', focus: 'Stoichiometry, Quantum numbers, De Broglie, Bohr model', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c11', name: 'Qualitative Inorganic Analysis (Salt Analysis)', mainW: 'Moderate (~4-5%)', mainFreq: '1-2', advW: 'Very High (~7-8%)', advDiff: 'High', focus: 'Cation & Anion group testing, Flame tests, Confirmatory reactions', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c12', name: 'Biomolecules & Polymers', mainW: 'Moderate (~4-5%)', mainFreq: '1-2', advW: 'Low (~2-3%)', advDiff: 'Low to Moderate', focus: 'Carbohydrates, Amino acids, DNA/RNA, Addition/Condensation polymers', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c13', name: 'Practical Chemistry & Purification Techniques', mainW: 'Moderate (~4-5%)', mainFreq: '1-2', advW: 'Low-Mod (~3-4%)', advDiff: 'Low', focus: 'Chromatography, Titrations, Functional group identification, Extra element test', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c14', name: 'Purification & Organic Quantitative Analysis', mainW: 'Low-Mod (~2-3%)', mainFreq: '1', advW: 'Low (~1-2%)', advDiff: 'Low', focus: 'Dumas/Kjeldahl method, Halogen estimation, Empirical formula determination', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c15', name: 'Redox Reactions', mainW: 'Low-Mod (~2-3%)', mainFreq: '1', advW: 'Low-Mod (~2-3%)', advDiff: 'Low', focus: 'Oxidation number balancing, Titrations (KMnO4, Mohr salt)', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c16', name: 'Classification of Elements & Periodicity', mainW: 'Low-Mod (~2-3%)', mainFreq: '1', advW: 'Low-Mod (~2-3%)', advDiff: 'Low', focus: 'IE, EA, Electronegativity trends, Atomic/Ionic radii', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c17', name: 'Surface Chemistry & States of Matter', mainW: 'Low (~1-2%)', mainFreq: '0-1', advW: 'Low-Mod (~2-3%)', advDiff: 'Moderate', focus: 'Adsorption isotherms, Colloids, Ideal/Real gas law, Van der Waals', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c18', name: 's-Block Elements & Hydrogen', mainW: 'Low (~1-2%)', mainFreq: '0-1', advW: 'Low (~2-3%)', advDiff: 'Low', focus: 'Alkali metals, Hydrides, Hardness of water, Hydrogen peroxide', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'c19', name: 'Metallurgy & Environmental Chemistry', mainW: 'Low (~1-2%)', mainFreq: '0-1', advW: 'Low (~1-2%)', advDiff: 'Low', focus: 'Ellingham diagram, Froth floatation, Ores extraction, Pollution', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' }
];

const initialMath = [
  { id: 'm1', name: '3D Geometry & Vectors', mainW: 'Very High (~10-12%)', mainFreq: '3-4', advW: 'High (~8-10%)', advDiff: 'Moderate to High', focus: 'Vector dot/cross products, Lines & planes, Distance formulas, Triple products', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm2', name: 'Coordinate Geometry (Conics & Circles)', mainW: 'High (~8-10%)', mainFreq: '2-3', advW: 'Very High (~10-12%)', advDiff: 'High', focus: 'Tangents, Normals, Parabola/Ellipse/Hyperbola forms', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm3', name: 'Matrices & Determinants', mainW: 'Very High (~8-10%)', mainFreq: '2-3', advW: 'High (~7-8%)', advDiff: 'Moderate', focus: "System of linear equations, Matrix properties, Adjoint & Inverse, Cramer's rule", priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm4', name: 'Definite Integration & Area Under Curves', mainW: 'High (~7-8%)', mainFreq: '2', advW: 'Very High (~9-10%)', advDiff: 'Very High', focus: 'Properties of integrals, Leibniz rule, Area between curves', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm5', name: 'Differential Equations & AOD', mainW: 'High (~7-8%)', mainFreq: '2', advW: 'High (~8-10%)', advDiff: 'High', focus: 'Variable separable, Linear DEs, Maxima/Minima, Monotonicity, Tangent-Normals', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm6', name: 'Functions, Limits, Continuity & Differentiability', mainW: 'High (~7-8%)', mainFreq: '2', advW: 'High (~8-10%)', advDiff: 'High', focus: "Domain/Range, Composite functions, L'Hopital rule, Continuity tests", priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm7', name: 'Sequence & Series / Binomial Theorem', mainW: 'High (~7-8%)', mainFreq: '2', advW: 'Mod-High (~6-7%)', advDiff: 'Moderate to High', focus: 'AP/GP/AGP, General term, Remainder problems, Coefficients', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm8', name: 'Probability & Statistics', mainW: 'High (~7-8%)', mainFreq: '2', advW: 'High (~7-8%)', advDiff: 'High', focus: 'Bayes theorem, Conditional probability, Mean & variance, Standard deviation', priority: 'High', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm9', name: 'Permutations & Combinations (P&C)', mainW: 'Moderate (~5-6%)', mainFreq: '1-2', advW: 'High (~6-7%)', advDiff: 'High', focus: 'Fundamental principles, Circular arrangement, Derangements, Selections', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm10', name: 'Complex Numbers & Quadratic Equations', mainW: 'Moderate (~5-6%)', mainFreq: '1-2', advW: 'High (~7-8%)', advDiff: 'Very High', focus: 'Geometry of complex numbers, De Moivre theorem, Roots of unity, Location of roots', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm11', name: 'Trigonometry (Ratio, Identities & Equations)', mainW: 'Moderate (~4-5%)', mainFreq: '1-2', advW: 'Moderate (~5-6%)', advDiff: 'Moderate', focus: 'Compound angles, General solution of trig equations, Inverse Trig Functions (ITF)', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm12', name: 'Straight Lines & Pair of Straight Lines', mainW: 'Moderate (~4-5%)', mainFreq: '1', advW: 'Moderate (~4-5%)', advDiff: 'Moderate', focus: 'Slope, Distance formula, Angle bisectors, Family of lines', priority: 'Medium', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm13', name: 'Sets, Relations & Functions (Set Theory)', mainW: 'Moderate (~3-4%)', mainFreq: '1', advW: 'Low-Mod (~2-3%)', advDiff: 'Low to Moderate', focus: 'Venn diagrams, Types of relations (Equivalence), Power set, Inverse functions', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' },
  { id: 'm14', name: 'Mathematical Reasoning & Mathematical Induction', mainW: 'Low (~2-3%)', mainFreq: '1', advW: 'Low (~0-1%)', advDiff: 'Low', focus: 'Truth tables, Logical connectives, Tautology/Contradiction, PMI proofs', priority: 'Low', theory: 'Not Started', practice: 'Not Started', pyqs: 'Not Started', target: '' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [physics, setPhysics] = useState(() => JSON.parse(localStorage.getItem('jee_physics')) || initialPhysics);
  const [chemistry, setChemistry] = useState(() => JSON.parse(localStorage.getItem('jee_chem')) || initialChemistry);
  const [math, setMath] = useState(() => JSON.parse(localStorage.getItem('jee_math')) || initialMath);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    localStorage.setItem('jee_physics', JSON.stringify(physics));
    localStorage.setItem('jee_chem', JSON.stringify(chemistry));
    localStorage.setItem('jee_math', JSON.stringify(math));
  }, [physics, chemistry, math]);

  const calcProgress = (item) => {
    const val = (status) => status === 'Completed' ? 1 : status === 'In Progress' ? 0.5 : 0;
    return Math.round(((val(item.theory) + val(item.practice) + val(item.pyqs)) / 3) * 100);
  };

  const getSubAvg = (arr) => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((acc, curr) => acc + calcProgress(curr), 0);
    return Math.round(sum / arr.length);
  };

  const phyAvg = getSubAvg(physics);
  const chemAvg = getSubAvg(chemistry);
  const mathAvg = getSubAvg(math);
  const overallAvg = Math.round((phyAvg + chemAvg + mathAvg) / 3);

  const updateItem = (sub, id, field, val) => {
    const updater = (list) => list.map(item => item.id === id ? { ...item, [field]: val } : item);
    if (sub === 'Physics') setPhysics(updater);
    if (sub === 'Chemistry') setChemistry(updater);
    if (sub === 'Mathematics') setMath(updater);
  };

  const resetAll = () => {
    if (window.confirm("Are you sure you want to reset all tracking progress?")) {
      setPhysics(initialPhysics);
      setChemistry(initialChemistry);
      setMath(initialMath);
    }
  };

  const renderTable = (subName, data, setData) => {
    const filtered = data.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.focus.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPriority = filterPriority === 'All' || item.priority === filterPriority;
      const prog = calcProgress(item);
      const matchStatus = filterStatus === 'All' || 
        (filterStatus === 'Completed' && prog === 100) ||
        (filterStatus === 'In Progress' && prog > 0 && prog < 100) ||
        (filterStatus === 'Not Started' && prog === 0);
      return matchSearch && matchPriority && matchStatus;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{subName} Syllabus Tracker</h2>
            <p className="text-sm text-slate-500">Showing {filtered.length} of {data.length} chapters</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search chapters or topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-3 font-semibold">Chapter Name & Focus</th>
                  <th className="p-3 font-semibold text-center">JEE Main Wt.</th>
                  <th className="p-3 font-semibold text-center">JEE Adv Wt.</th>
                  <th className="p-3 font-semibold text-center">Priority</th>
                  <th className="p-3 font-semibold text-center">Theory</th>
                  <th className="p-3 font-semibold text-center">Practice</th>
                  <th className="p-3 font-semibold text-center">PYQs</th>
                  <th className="p-3 font-semibold text-center">Progress</th>
                  <th className="p-3 font-semibold text-center">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const prog = calcProgress(item);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 max-w-xs">
                        <div className="font-semibold text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.focus}</div>
                      </td>
                      <td className="p-3 text-center text-xs">
                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">{item.mainW}</span>
                      </td>
                      <td className="p-3 text-center text-xs">
                        <span className="inline-block px-2 py-1 bg-purple-50 text-purple-700 rounded font-medium">{item.advW}</span>
                      </td>
                      <td className="p-3 text-center">
                        <select 
                          value={item.priority}
                          onChange={(e) => updateItem(subName, item.id, 'priority', e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded border ${ item.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' : item.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-700 border-slate-200' }`} > <option value="High">High</option> <option value="Medium">Medium</option> <option value="Low">Low</option> </select> </td> <td className="p-3 text-center"> <select value={item.theory} onChange={(e) => updateItem(subName, item.id, 'theory', e.target.value)} className="text-xs p-1 bg-slate-50 border border-slate-200 rounded" > <option value="Not Started">Not Started</option> <option value="In Progress">In Progress</option> <option value="Completed">Completed</option> <option value="Revision Needed">Revision</option> </select> </td> <td className="p-3 text-center"> <select value={item.practice} onChange={(e) => updateItem(subName, item.id, 'practice', e.target.value)} className="text-xs p-1 bg-slate-50 border border-slate-200 rounded" > <option value="Not Started">Not Started</option> <option value="In Progress">In Progress</option> <option value="Completed">Completed</option> <option value="Revision Needed">Revision</option> </select> </td> <td className="p-3 text-center"> <select value={item.pyqs} onChange={(e) => updateItem(subName, item.id, 'pyqs', e.target.value)} className="text-xs p-1 bg-slate-50 border border-slate-200 rounded" > <option value="Not Started">Not Started</option> <option value="In Progress">In Progress</option> <option value="Completed">Completed</option> <option value="Revision Needed">Revision</option> </select> </td> <td className="p-3 text-center"> <div className="flex items-center justify-center gap-2"> <div className="w-16 bg-slate-200 rounded-full h-2 overflow-hidden"> <div className={`h-full ${prog === 100 ? 'bg-emerald-500' : prog > 0 ? 'bg-blue-500' : 'bg-slate-300'}`} 
                              style={{ width: `${prog}\%` }} ></div> </div> <span className="text-xs font-bold text-slate-700">{prog}\%</span> </div> </td> <td className="p-3 text-center"> <input type="date" value={item.target} onChange={(e) => updateItem(subName, item.id, 'target', e.target.value)} className="text-xs p-1 bg-slate-50 border border-slate-200 rounded" /> </td> </tr> ); })} </tbody> </table> </div> </div> </div> ); };  return ( <div className="min-h-screen bg-slate-100 flex flex-col"> <header className="bg-slate-900 text-white shadow-md"> <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4"> <div className="flex items-center space-x-3"> <div className="p-2 bg-blue-600 rounded-xl"> <Award className="h-6 w-6 text-white" /> </div> <div> <h1 className="text-xl font-bold tracking-tight">JEE Main & Advanced Master Tracker</h1> <p className="text-xs text-slate-400">Complete 51-Chapter Syllabus & Progress Dashboard</p> </div> </div> <div className="flex items-center space-x-2"> <button onClick={resetAll} className="flex items-center space-x-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition" > <RefreshCw className="h-3.5 w-3.5" /> <span>Reset Data</span> </button> </div> </div> </header>  <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10"> <div className="max-w-7xl mx-auto px-4 flex space-x-1 sm:space-x-4 overflow-x-auto"> {[ { id: 'dashboard', label: 'Master Dashboard', icon: BarChart2 }, { id: 'Physics', label: `Physics (${physics.length})`, icon: BookOpen },
            { id: 'Chemistry', label: `Chemistry (${chemistry.length})`, icon: BookOpen }, { id: 'Mathematics', label: `Mathematics (${math.length})`, icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Overall Completion', val: `${overallAvg}\%`, color: 'bg-blue-600', icon: Award }, { title: 'Physics Progress', val: `${phyAvg}%`, color: 'bg-indigo-600', icon: BookOpen },
                { title: 'Chemistry Progress', val: `${chemAvg}\%`, color: 'bg-emerald-600', icon: BookOpen }, { title: 'Mathematics Progress', val: `${mathAvg}%`, color: 'bg-purple-600', icon: BookOpen },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.title}</p>
                      <h3 className="text-2xl font-black text-slate-800 mt-1">{kpi.val}</h3>
                    </div>
                    <div className={`p-3 rounded-xl text-white ${kpi.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span>High-Weightage Core Strategy</span>
                </h3>
                <p className="text-sm text-slate-600">
                  Your complete syllabus tracker organizes all 51 chapters in descending order of exam importance. Ensure high-priority core pillars are tackled first to maximize your scoring potential in both JEE Main and Advanced.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-sm">Physics Focus</h4>
                    <p className="text-xs text-slate-500 mt-1">Modern Physics, Current Electricity, Thermodynamics & Electrostatics.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-sm">Chemistry Focus</h4>
                    <p className="text-xs text-slate-500 mt-1">GOC, Coordination Compounds, p-Block, and Chemical Bonding.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-sm">Math Focus</h4>
                    <p className="text-xs text-slate-500 mt-1">3D Geometry & Vectors, Conics, Matrices, and Definite Integration.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-800">Workflow Guide</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Navigate to subject tabs to update individual chapter statuses.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Progress updates automatically as you complete Theory, Practice, and PYQs.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>All changes are saved automatically in your browser's local storage.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Physics' && renderTable('Physics', physics, setPhysics)}
        {activeTab === 'Chemistry' && renderTable('Chemistry', chemistry, setChemistry)}
        {activeTab === 'Mathematics' && renderTable('Mathematics', math, setMath)}
      </main>
    </div>
  );
}
