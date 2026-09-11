export interface RoomDimensionData {
  id: string;
  roomName: string;
  length: number;
  width: number;
  sqft: number;
  preset?: string;
}

export interface ServiceScopeData {
  furniture: boolean;
  painting: boolean;
  electrical: boolean;
  falseCeiling: boolean;
}

export interface ElectricalPointsPrintData {
  lights: number;
  fans: number;
  acPoints: number;
  geyserPoints: number;
  microwavePoints: number;
  fridgePoints: number;
  chimneyPoints: number;
  totalPoints?: number;
}

export interface TradeItemPrintData {
  trade: string;
  selection: string;
  rateInfo: string;
  cost: number;
}

export interface QuotationPrintData {
  quotationId: string;
  date: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  city?: string;
  bhkType: string;
  sizeVariant?: string;
  carpetArea?: string;
  packageTier: string;
  ratePerSqft?: number;
  totalAreaSqft?: number;
  falseCeilingSqft?: number;
  falseCeilingCost?: number;
  rooms?: {
    livingRoom?: number;
    kitchen?: number;
    bedroom?: number;
    bathroom?: number;
    dining?: number;
    roomCount?: number;
  };
  roomDimensions?: RoomDimensionData[];
  serviceScope?: ServiceScopeData;
  electricalPoints?: ElectricalPointsPrintData;
  tradeBreakdown?: TradeItemPrintData[];
  staircaseIncluded?: boolean;
  estimatedWeeks?: number;
  totalAmountFormatted: string;
  notes?: string;
}

export const generateQuotationHTML = (data: QuotationPrintData): string => {
  const roomPills = data.rooms
    ? [
        (data.rooms.roomCount && data.rooms.roomCount > 0) ? `${data.rooms.roomCount} Rooms` : null,
        (data.rooms.livingRoom && data.rooms.livingRoom > 0) ? `${data.rooms.livingRoom} Living & Hall` : null,
        (data.rooms.kitchen && data.rooms.kitchen > 0) ? `${data.rooms.kitchen} Modular Kitchen` : null,
        (data.rooms.bedroom && data.rooms.bedroom > 0 && !data.rooms.roomCount) ? `${data.rooms.bedroom} Bedroom(s)` : null,
        (data.rooms.bathroom && data.rooms.bathroom > 0) ? `${data.rooms.bathroom} Bathroom(s)` : null,
        (data.rooms.dining && data.rooms.dining > 0) ? `${data.rooms.dining} Dining Area` : null,
        data.staircaseIncluded ? 'Staircase / Internal Stairs' : null,
      ].filter(Boolean).join(' • ')
    : 'Complete Turnkey Residential Interior';

  const tierSpecs =
    data.packageTier === 'Premium'
      ? {
          name: 'Premium',
          rate: data.ratePerSqft || 1500,
          ply: 'CenturyPly Club Prime 710 BWP (100% Boiling Water Proof Marine Grade)',
          hardware: 'Hafele / Blum Austrian Soft-Close Tandem Drawers & Hinges',
          finish: 'PU Polish & 1.2mm Merino High-Gloss Acrylic Laminates',
          electrical: 'Schneider Electric / Legrand Arteor Modular Switches with Ambient LED Cove',
          countertop: 'KalingaStone Quartz / Nano-White Quartz 18mm with Beveled Edges',
          warranty: '10 Years Comprehensive Digital Warranty',
        }
      : data.packageTier === 'Luxury'
      ? {
          name: 'Luxury',
          rate: data.ratePerSqft || 1200,
          ply: 'CenturyPly Sainik 710 BWP Marine Grade / Greenply Club Grade',
          hardware: 'Hettich Germany Soft-Close Hinges & Telescopic Channels',
          finish: '1mm Merino / Greenlam Suede & High-Gloss Laminate Finishes',
          electrical: 'Anchor Roma / Havells Crabtree Modular Switches & Concealed Wiring',
          countertop: 'Polished Black Galaxy / Jet Black Granite with Bullnose Edging',
          warranty: '10 Years Structural Warranty',
        }
      : {
          name: 'Economy',
          rate: data.ratePerSqft || 1000,
          ply: 'ISI 710 Grade Hardwood BWP Plywood with Anti-Termite Treatment',
          hardware: 'Ebco / Godrej High-Durability Hydraulic Hardware',
          finish: '0.8mm - 1.0mm Anti-Scratch Decorative Laminates',
          electrical: 'Havells / Anchor Modular Switches with Fire-Retardant Conduit Wiring',
          countertop: 'Premium Polished Granite Slab',
          warranty: '5 Years Structural Warranty',
        };

  const scope = data.serviceScope || {
    furniture: true,
    painting: true,
    electrical: true,
    falseCeiling: true,
  };

  const dimRows = (data.roomDimensions && data.roomDimensions.length > 0)
    ? data.roomDimensions.map(d => `
        <tr>
          <td><strong>${d.roomName}</strong></td>
          <td>${d.length} ft × ${d.width} ft</td>
          <td style="text-align: right; font-family: monospace; font-weight: 600;">${d.sqft} sq.ft</td>
        </tr>
      `).join('')
    : `<tr><td colspan="3" style="text-align: center; color: #666;">Standard Floor Plan (${data.carpetArea || 'As measured'})</td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Deinterio Official Quotation #${data.quotationId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      margin: 0;
      padding: 24px;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1A1917;
      background: #FFFFFF;
      font-size: 10.5px;
      line-height: 1.45;
    }

    .toolbar {
      position: sticky;
      top: 0;
      background: #13362B;
      color: #FFF;
      padding: 12px 20px;
      margin: -24px -24px 20px -24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 100;
    }

    .toolbar button {
      background: #D4AF37;
      color: #13362B;
      border: none;
      font-weight: 700;
      font-size: 11px;
      padding: 7px 16px;
      border-radius: 6px;
      cursor: pointer;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      transition: all 0.2s;
    }

    @media print {
      .toolbar { display: none !important; }
      body { padding: 0 !important; }
    }

    .header-table {
      width: 100%;
      border-bottom: 2px solid #13362B;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }

    .brand-title {
      font-family: 'Cinzel', serif;
      font-size: 22px;
      font-weight: 700;
      color: #13362B;
      letter-spacing: 1.5px;
      margin: 0;
    }

    .brand-sub {
      font-size: 9px;
      color: #8C6D3B;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      margin-top: 2px;
    }

    .company-meta {
      font-size: 9.5px;
      color: #5A5852;
      margin-top: 4px;
      line-height: 1.35;
    }

    .quote-title {
      font-family: 'Cinzel', serif;
      font-size: 16px;
      font-weight: 700;
      color: #13362B;
      letter-spacing: 1px;
      margin: 0;
    }

    .quote-meta-pill {
      display: inline-block;
      background: #F4EFE6;
      border: 1px solid #D4AF37;
      padding: 2px 7px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      font-weight: 600;
      color: #13362B;
      margin-top: 4px;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      font-weight: 700;
      color: #13362B;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      border-bottom: 1px solid #E5DFD5;
      padding-bottom: 3px;
      margin: 12px 0 6px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .grid-2 {
      display: table;
      width: 100%;
      table-layout: fixed;
      margin-bottom: 10px;
    }

    .grid-col {
      display: table-cell;
      vertical-align: top;
      padding-right: 10px;
    }

    .grid-col:last-child {
      padding-right: 0;
      padding-left: 10px;
    }

    .card-box {
      background: #FAF8F5;
      border: 1px solid #EAE5DE;
      border-radius: 6px;
      padding: 8px 10px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 2.5px 0;
      border-bottom: 1px dashed #EAE5DE;
      font-size: 10px;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .info-label {
      color: #6E6A63;
      font-weight: 500;
    }

    .info-val {
      font-weight: 600;
      color: #1A1917;
      text-align: right;
    }

    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0 10px 0;
      font-size: 10px;
    }

    table.data-table th {
      background: #13362B;
      color: #FFFFFF;
      text-align: left;
      padding: 6px 8px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-size: 9px;
    }

    table.data-table td {
      padding: 5px 8px;
      border-bottom: 1px solid #EAE5DE;
      vertical-align: middle;
    }

    table.data-table tr:nth-child(even) {
      background: #FAF8F5;
    }

    .scope-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 6px 0 10px 0;
    }

    .scope-tag {
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      border: 1px solid #13362B;
      background: #EBF3F0;
      color: #13362B;
    }

    .scope-tag.inactive {
      border: 1px solid #DDD;
      background: #F5F5F5;
      color: #999;
      text-decoration: line-through;
    }

    .total-banner {
      background: #13362B;
      color: #FFF;
      border-radius: 8px;
      padding: 12px 16px;
      margin: 10px 0;
      display: table;
      width: 100%;
    }

    .total-left {
      display: table-cell;
      vertical-align: middle;
    }

    .total-right {
      display: table-cell;
      vertical-align: middle;
      text-align: right;
    }

    .total-banner h3 {
      margin: 0 0 2px 0;
      font-family: 'Cinzel', serif;
      font-size: 13px;
      color: #D4AF37;
      letter-spacing: 0.8px;
    }

    .total-banner p {
      margin: 0;
      font-size: 9.5px;
      color: #E2DDD6;
    }

    .total-price {
      font-size: 22px;
      font-weight: 700;
      color: #FFFFFF;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px;
    }

    .schedule-grid {
      display: flex;
      gap: 6px;
      margin-top: 4px;
    }

    .schedule-step {
      flex: 1;
      background: #FAF8F5;
      border: 1px solid #EAE5DE;
      border-radius: 6px;
      padding: 6px 4px;
      text-align: center;
    }

    .schedule-pct {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: #13362B;
    }

    .schedule-title {
      font-size: 8.5px;
      color: #6E6A63;
      margin-top: 1px;
      text-transform: uppercase;
      font-weight: 600;
    }

    .footer-section {
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid #EAE5DE;
      display: table;
      width: 100%;
    }

    .footer-col {
      display: table-cell;
      vertical-align: bottom;
      font-size: 9px;
      color: #6E6A63;
      line-height: 1.35;
    }

    .stamp-box {
      border: 1.5px dashed #D4AF37;
      border-radius: 6px;
      padding: 6px 12px;
      background: #FFFDF9;
      text-align: center;
      display: inline-block;
    }

    .stamp-text {
      font-family: 'Cinzel', serif;
      font-size: 10px;
      font-weight: 700;
      color: #13362B;
      letter-spacing: 0.8px;
    }
  </style>
</head>
<body>

  <div class="toolbar">
    <div style="font-weight: 600; font-size: 13px;">
      Deinterio Official Quotation Document (#${data.quotationId})
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button onclick="window.close()" style="background: transparent; color: #FFF; border: 1px solid rgba(255,255,255,0.4);">Close</button>
    </div>
  </div>

  <!-- HEADER -->
  <table class="header-table">
    <tr>
      <td style="vertical-align: top;">
        <h1 class="brand-title">DEINTERIO INTERIOR GROUP</h1>
        <div class="brand-sub">A Unit of All In One Contractual Services Pvt Ltd</div>
        <div class="company-meta">
          <strong>Kolkata Experience Studios:</strong> Prince Anwar Shah Road (South) • Rajarhat Factory • New Town<br />
          <strong>Helpline:</strong> +91 79802 02221 • <strong>GSTIN:</strong> 19AAACA0000A1Z5<br />
          <strong>Web:</strong> www.deinterio.com • <strong>Email:</strong> consultation@deinterio.com
        </div>
      </td>
      <td style="vertical-align: top; text-align: right; width: 240px;">
        <h2 class="quote-title">ESTIMATED QUOTATION</h2>
        <div class="quote-meta-pill">QUOTE #${data.quotationId}</div>
        <div style="font-size: 9.5px; color: #5A5852; margin-top: 4px;">
          <strong>Issuance Date:</strong> ${data.date}<br />
          <strong>Validity:</strong> 30 Days from issuance<br />
          <strong>Est. Handover:</strong> ~${data.estimatedWeeks || 6} Weeks
        </div>
      </td>
    </tr>
  </table>

  <!-- CLIENT & PROJECT PARTICULARS -->
  <div class="grid-2">
    <div class="grid-col">
      <div class="card-box">
        <div style="font-weight: 700; color: #13362B; margin-bottom: 4px; font-size: 10.5px; text-transform: uppercase;">
          Client Particulars
        </div>
        <div class="info-row">
          <span class="info-label">Client Name:</span>
          <span class="info-val">${data.clientName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Contact / WhatsApp:</span>
          <span class="info-val">${data.clientPhone}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email Address:</span>
          <span class="info-val">${data.clientEmail || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Site Location:</span>
          <span class="info-val">${data.city || 'Kolkata, WB'}</span>
        </div>
      </div>
    </div>

    <div class="grid-col">
      <div class="card-box">
        <div style="font-weight: 700; color: #13362B; margin-bottom: 4px; font-size: 10.5px; text-transform: uppercase;">
          Configuration & Pricing Tier
        </div>
        <div class="info-row">
          <span class="info-label">Apartment Configuration:</span>
          <span class="info-val">${data.bhkType} (${data.sizeVariant || 'Standard'})</span>
        </div>
        <div class="info-row">
          <span class="info-label">Measured Floor Area:</span>
          <span class="info-val">${data.totalAreaSqft ? `${data.totalAreaSqft} sq.ft` : (data.carpetArea || 'As calculated')}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Package Tier & Base Rate:</span>
          <span class="info-val" style="color: #8C6D3B; font-weight: 700;">${tierSpecs.name} (₹${tierSpecs.rate} / sq.ft)</span>
        </div>
        <div class="info-row">
          <span class="info-label">Warranty Assurance:</span>
          <span class="info-val" style="color: #13362B;">${tierSpecs.warranty}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SELECTED SERVICES SCOPE -->
  <div class="section-title">
    <span>Chosen Service Scope & Inclusions</span>
    <span style="font-size: 8.5px; font-family: monospace; color: #8C6D3B;">CUSTOM SCOPE</span>
  </div>
  <div class="scope-tags">
    <span class="scope-tag ${scope.furniture ? '' : 'inactive'}">${scope.furniture ? '✓' : '✗'} Modular Furniture & Storage</span>
    <span class="scope-tag ${scope.painting ? '' : 'inactive'}">${scope.painting ? '✓' : '✗'} Wall Painting (Royale Emulsion)</span>
    <span class="scope-tag ${scope.electrical ? '' : 'inactive'}">${scope.electrical ? '✓' : '✗'} Electrical Points & LED Lighting</span>
    <span class="scope-tag ${scope.falseCeiling ? '' : 'inactive'}">${scope.falseCeiling ? '✓' : '✗'} False Ceiling (@ ₹120/sq.ft)</span>
  </div>

  <!-- ROOM-WISE MEASUREMENT SPECIFICATION TABLE -->
  <div class="section-title">
    <span>Room Dimensions & Measurement Schedule</span>
    <span style="font-size: 8.5px; font-family: monospace; color: #13362B;">PRECISE SQUARE FOOT BREAKDOWN</span>
  </div>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 45%;">Room Name / Designation</th>
        <th style="width: 35%;">Dimensions (L × W)</th>
        <th style="width: 20%; text-align: right;">Area (Sq.Ft)</th>
      </tr>
    </thead>
    <tbody>
      ${dimRows}
      <tr style="background: #FAF8F5; font-weight: 700;">
        <td colspan="2"><strong>Total Measured Carpet Area</strong></td>
        <td style="text-align: right; font-family: monospace; color: #13362B;">${data.totalAreaSqft || data.carpetArea || '0'} sq.ft</td>
      </tr>
    </tbody>
  </table>

  <!-- RATE & COST BREAKDOWN TABLE -->
  <div class="section-title">
    <span>Cost Estimation Breakdown</span>
    <span style="font-size: 8.5px; font-family: monospace; color: #8C6D3B;">ITEMIZED RATES</span>
  </div>

  <table class="data-table">
    <thead>
      <tr>
        <th>Work Scope Item</th>
        <th>Calculated Base</th>
        <th>Applicable Unit Rate</th>
        <th style="text-align: right;">Estimated Subtotal</th>
      </tr>
    </thead>
    <tbody>
      ${(data.tradeBreakdown && data.tradeBreakdown.length > 0)
        ? data.tradeBreakdown.map(item => `
          <tr>
            <td>
              <strong>${item.trade}</strong><br />
              <span style="font-size: 8.5px; color: #666;">${item.selection}</span>
              ${item.trade === 'Electrical Work' && data.electricalPoints ? `
                <br /><span style="font-size: 8px; font-family: monospace; color: #8C6D3B;">
                  Points: Lights: ${data.electricalPoints.lights}, Fans: ${data.electricalPoints.fans}, AC: ${data.electricalPoints.acPoints}, Geyser: ${data.electricalPoints.geyserPoints}, Microwave: ${data.electricalPoints.microwavePoints}, Fridge: ${data.electricalPoints.fridgePoints}, Chimney: ${data.electricalPoints.chimneyPoints}
                </span>
              ` : ''}
            </td>
            <td>${item.rateInfo || 'Custom'}</td>
            <td>${item.trade}</td>
            <td style="text-align: right; font-weight: 600; font-family: monospace;">₹${item.cost.toLocaleString('en-IN')}</td>
          </tr>
        `).join('')
        : `
          <tr>
            <td><strong>Interior Execution (${tierSpecs.name} Tier)</strong><br /><span style="font-size: 8.5px; color: #666;">Furniture, woodwork, finishes & standard fittings</span></td>
            <td>${data.totalAreaSqft || 0} sq.ft</td>
            <td>₹${tierSpecs.rate} / sq.ft</td>
            <td style="text-align: right; font-weight: 600; font-family: monospace;">₹${((data.totalAreaSqft || 0) * tierSpecs.rate).toLocaleString('en-IN')}</td>
          </tr>
          ${scope.falseCeiling ? `
            <tr>
              <td><strong>Designer False Ceiling (Gyproc / Saint-Gobain)</strong><br /><span style="font-size: 8.5px; color: #666;">Cove lighting channels, perimeter design & primer finish</span></td>
              <td>${data.falseCeilingSqft || data.totalAreaSqft || 0} sq.ft</td>
              <td>₹120 / sq.ft</td>
              <td style="text-align: right; font-weight: 600; font-family: monospace;">₹${(data.falseCeilingCost || ((data.falseCeilingSqft || data.totalAreaSqft || 0) * 120)).toLocaleString('en-IN')}</td>
            </tr>
          ` : ''}
        `}
    </tbody>
  </table>

  <!-- TOTAL ESTIMATED INVESTMENT -->
  <div class="total-banner">
    <div class="total-left">
      <h3>TOTAL ESTIMATED TURNKEY INVESTMENT</h3>
      <p>Includes 3D simulation, factory PUR edge-banding, delivery, installation & site supervision.</p>
    </div>
    <div class="total-right">
      <div class="total-price">${data.totalAmountFormatted}</div>
      <div style="font-size: 9px; color: #D4AF37; letter-spacing: 0.5px;">ESTIMATED ALL-INCLUSIVE</div>
    </div>
  </div>

  <!-- PAYMENT SCHEDULE PHASING -->
  <div class="section-title">
    <span>Turnkey Milestone Payment Plan</span>
    <span style="font-size: 8.5px; font-family: monospace; color: #8C6D3B;">TRANSPARENT BILLING</span>
  </div>

  <div class="schedule-grid">
    <div class="schedule-step">
      <div class="schedule-pct">10%</div>
      <div class="schedule-title">Booking & Design</div>
      <div style="font-size: 8px; color: #8C6D3B; margin-top: 1px;">Laser survey & 3D renders</div>
    </div>
    <div class="schedule-step">
      <div class="schedule-pct">40%</div>
      <div class="schedule-title">Factory Kickoff</div>
      <div style="font-size: 8px; color: #8C6D3B; margin-top: 1px;">Material sourcing & cutting</div>
    </div>
    <div class="schedule-step">
      <div class="schedule-pct">40%</div>
      <div class="schedule-title">Site Installation</div>
      <div style="font-size: 8px; color: #8C6D3B; margin-top: 1px;">Carcass assembly & finish</div>
    </div>
    <div class="schedule-step">
      <div class="schedule-pct">10%</div>
      <div class="schedule-title">Final Handover</div>
      <div style="font-size: 8px; color: #8C6D3B; margin-top: 1px;">Deep clean & warranty card</div>
    </div>
  </div>

  <!-- FOOTER & AUTHORIZED SIGNATURE -->
  <table class="footer-section">
    <tr>
      <td class="footer-col" style="width: 60%; padding-right: 20px;">
        <strong>TERMS & REGULATORY NOTICE:</strong><br />
        1. This quotation is calculated from homeowner submitted dimensions and specifications. Final pricing is confirmed after on-site 3D laser measurement.<br />
        2. Woodwork fabricated at our high-precision Rajarhat factory with PUR edge-banding technology.<br />
        3. 10-year warranty applies to structural integrity and manufacturing defects under normal domestic use.
      </td>
      <td class="footer-col" style="width: 40%; text-align: right;">
        <div class="stamp-box">
          <div class="stamp-text">DEINTERIO INTERIOR GROUP</div>
          <div style="font-size: 8px; color: #8C6D3B; font-family: monospace; margin: 1px 0;">DIGITAL ESTIMATE SEAL</div>
          <div style="font-size: 8.5px; color: #13362B; font-weight: 600;">Authorized Signatory</div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const generateQuotationPDF = (data: QuotationPrintData) => {
  const htmlContent = generateQuotationHTML(data);

  // Method 1: window.open
  let printWindow: Window | null = null;
  try {
    printWindow = window.open('', '_blank');
  } catch (e) {
    printWindow = null;
  }

  if (printWindow && !printWindow.closed) {
    try {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        try {
          printWindow?.focus();
          printWindow?.print();
        } catch (err) {
          console.warn('Direct print failed, user can use toolbar print:', err);
        }
      }, 500);
      return;
    } catch (err) {
      console.warn('Error populating popup window:', err);
    }
  }

  // Method 2: Hidden iframe printing (bypasses popup blockers)
  try {
    const existingFrame = document.getElementById('deinterio-print-frame');
    if (existingFrame) existingFrame.remove();

    const iframe = document.createElement('iframe');
    iframe.id = 'deinterio-print-frame';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      }, 500);
      return;
    }
  } catch (frameErr) {
    console.warn('Iframe printing failed:', frameErr);
  }

  // Method 3: Direct HTML file download
  try {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Deinterio_Official_Quotation_${data.quotationId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (blobErr) {
    console.error('All print and download mechanisms failed:', blobErr);
  }
};
