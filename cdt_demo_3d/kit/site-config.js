// site-config.js — the ONLY per-site knobs for the explorer.
// Everything else in the kit is generic. Edit this, not explorer.html.
window.SITE = {
  title: 'Campus Connection Explorer',

  // Camera presets: [label, target[x,y,z], framing radius, view direction[x,y,z]]
  viewpoints: [
    ['Data hall',  [3, 1.6, 0],     9,   [0.20, 0.55, 0.81]],
    ['Electrical', [-17, 1.4, -1],  7,   [0.35, 0.60, 0.72]],
    ['Cooling',    [-9.5, 1.2, -9], 6.5, [0.30, 0.58, 0.76]],
    ['MMR / NOC',  [-13, 1.5, 10],  7,   [0.25, 0.62, 0.74]],
  ],

  // Marker colour when "System" colouring is active. Keys are the system
  // prefixes you used in the model.
  systemColours: {
    PWR: 0xd8b23a, CHW: 0x1f6fd0, AIR: 0x9aa4ac, DATA: 0x35c2c9, OT: 0x8a4fd0,
    BMS: 0xe8e8e2, FA: 0xc8332a, SEC: 0xe07a26, IT: 0x9ba1a8,
  },

  // Long names shown in the asset list header.
  systemLabels: {
    PWR: 'Electrical', CHW: 'Cooling / fluid', AIR: 'HVAC', DATA: 'IT network',
    OT: 'OT network', BMS: 'Controls & monitoring', FA: 'Fire & life safety',
    SEC: 'Physical security', IT: 'Compute payload',
  },
};
