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
  rooms?: {
    livingRoom: number;
    kitchen: number;
    bedroom: number;
    bathroom: number;
    dining: number;
  };
  estimatedWeeks?: number;
  totalAmountFormatted: string;
  notes?: string;
}

export const generateQuotationPDF = (data: QuotationPrintData) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popup windows in your browser to view and download your Quotation PDF.');
    return;
  }

  const roomPills = data.rooms
    ? [
        data.rooms.livingRoom > 0 ? `${data.rooms.livingRoom} Living Room` : null,
        data.rooms.kitchen > 0 ? `${data.rooms.kitchen} Modular Kitchen` : null,
        data.rooms.bedroom > 0 ? `${data.rooms.bedroom} Bedroom(s)` : null,
        data.rooms.bathroom > 0 ? `${data.rooms.bathroom} Bathroom(s)` : null,
        data.rooms.dining > 0 ? `${data.rooms.dining} Dining Area` : null,
      ].filter(Boolean).join(' • ')
    : 'Complete Turnkey Residential Interior';

  const tierSpecs =
    data.packageTier === 'Luxury'
      ? {
          ply: 'CenturyPly Club Prime 710 BWP (100% Boiling Water Proof Marine Grade)',
          hardware: 'Hafele / Blum Austrian Soft-Close Tandem Drawers & Hinges',
          finish: 'PU Polish & 1.2mm Merino High-Gloss Acrylic Laminates',
          electrical: 'Schneider Electric / Legrand Arteor Modular Switches with Ambient LED Cove',
          countertop: 'KalingaStone Quartz / Nano-White Quartz 18mm with Beveled Edges',
          warranty: '10 Years Comprehensive Digital Warranty',
        }
      : data.packageTier === 'Premium'
      ? {
          ply: 'CenturyPly Sainik 710 BWP Marine Grade / Greenply Club Grade',
          hardware: 'Hettich Germany Soft-Close Hinges & Telescopic Channels',
          finish: '1mm Merino / Greenlam Suede & High-Gloss Laminate Finishes',
          electrical: 'Anchor Roma / Havells Crabtree Modular Switches & Concealed Wiring',
          countertop: 'Polished Black Galaxy / Jet Black Granite with Bullnose Edging',
          warranty: '10 Years Structural Warranty',
        }
      : {
          ply: 'ISI 710 Grade Hardwood BWP Plywood with Anti-Termite Treatment',
          hardware: 'Ebco / Godrej High-Durability Hydraulic Hardware',
          finish: '0.8mm - 1.0mm Anti-Scratch Decorative Laminates',
          electrical: 'Havells / Anchor Modular Switches with Fire-Retardant Conduit Wiring',
          countertop: 'Premium Polished Granite Slab',
          warranty: '5 Years Structural Warranty',
        };

  const html = `<!DOCTYPE html>
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
      font-size: 11px;
      line-height: 1.5;
    }

    .toolbar {
      position: sticky;
      top: 0;
      background: #13362B;
      color: #FFF;
      padding: 12px 20px;
      margin: -24px -24px 24px -24px;
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
      font-size: 12px;
      padding: 8px 18px;
      border-radius: 6px;
      cursor: pointer;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      transition: all 0.2s;
    }

    .toolbar button:hover {
      background: #E5C358;
      transform: translateY(-1px);
    }

    @media print {
      .toolbar { display: none !important; }
      body { padding: 0 !important; }
    }

    /* HEADER */
    .header-table {
      width: 100%;
      border-bottom: 2px solid #13362B;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }

    .brand-title {
      font-family: 'Cinzel', serif;
      font-size: 24px;
      font-weight: 700;
      color: #13362B;
      letter-spacing: 1.5px;
      margin: 0;
    }

    .brand-sub {
      font-size: 9.5px;
      color: #8C6D3B;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
      margin-top: 3px;
    }

    .company-meta {
      font-size: 10px;
      color: #5A5852;
      margin-top: 4px;
      line-height: 1.4;
    }

    .quote-badge {
      text-align: right;
    }

    .quote-title {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 700;
      color: #13362B;
      letter-spacing: 1px;
      margin: 0;
    }

    .quote-meta-pill {
      display: inline-block;
      background: #F4EFE6;
      border: 1px solid #D4AF37;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 600;
      color: #13362B;
      margin-top: 6px;
    }

    /* SECTION BOXES */
    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 12px;
      font-weight: 700;
      color: #13362B;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-bottom: 1px solid #E5DFD5;
      padding-bottom: 4px;
      margin: 16px 0 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .grid-2 {
      display: table;
      width: 100%;
      table-layout: fixed;
      margin-bottom: 12px;
    }

    .grid-col {
      display: table-cell;
      vertical-align: top;
      padding-right: 12px;
    }

    .grid-col:last-child {
      padding-right: 0;
      padding-left: 12px;
    }

    .card-box {
      background: #FAF8F5;
      border: 1px solid #EAE5DE;
      border-radius: 6px;
      padding: 10px 12px;
      height: 100%;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 3px 0;
      border-bottom: 1px dashed #EAE5DE;
      font-size: 10.5px;
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

    /* TABLE */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 14px 0;
      font-size: 10.5px;
    }

    table.data-table th {
      background: #13362B;
      color: #FFFFFF;
      text-align: left;
      padding: 7px 10px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-size: 9.5px;
    }

    table.data-table td {
      padding: 7px 10px;
      border-bottom: 1px solid #EAE5DE;
      vertical-align: middle;
    }

    table.data-table tr:nth-child(even) {
      background: #FAF8F5;
    }

    /* TOTAL BOX */
    .total-banner {
      background: #13362B;
      color: #FFF;
      border-radius: 8px;
      padding: 14px 18px;
      margin: 14px 0;
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
      margin: 0 0 3px 0;
      font-family: 'Cinzel', serif;
      font-size: 14px;
      color: #D4AF37;
      letter-spacing: 1px;
    }

    .total-banner p {
      margin: 0;
      font-size: 10px;
      color: #E2DDD6;
    }

    .total-price {
      font-size: 24px;
      font-weight: 700;
      color: #FFFFFF;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px;
    }

    /* PAYMENT SCHEDULE */
    .schedule-grid {
      display: flex;
      gap: 8px;
      margin-top: 6px;
    }

    .schedule-step {
      flex: 1;
      background: #FAF8F5;
      border: 1px solid #EAE5DE;
      border-radius: 6px;
      padding: 8px 6px;
      text-align: center;
    }

    .schedule-pct {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: #13362B;
    }

    .schedule-title {
      font-size: 9px;
      color: #6E6A63;
      margin-top: 2px;
      text-transform: uppercase;
      font-weight: 600;
    }

    /* SIGNATURE & FOOTER */
    .footer-section {
      margin-top: 18px;
      padding-top: 12px;
      border-top: 1px solid #EAE5DE;
      display: table;
      width: 100%;
    }

    .footer-col {
      display: table-cell;
      vertical-align: bottom;
      font-size: 9.5px;
      color: #6E6A63;
      line-height: 1.4;
    }

    .stamp-box {
      border: 1.5px dashed #D4AF37;
      border-radius: 6px;
      padding: 8px 14px;
      background: #FFFDF9;
      text-align: center;
      display: inline-block;
    }

    .stamp-text {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      font-weight: 700;
      color: #13362B;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>

  <div class="toolbar">
    <div style="font-weight: 600; font-size: 13px;">
      Deinterio Official Quotation Document (#${data.quotationId})
    </div>
    <div style="display: flex; gap: 10px;">
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
          <strong>Helpline:</strong> +91 98300 00000 / +91 98311 11111 • <strong>GSTIN:</strong> 19AAACA0000A1Z5<br />
          <strong>Web:</strong> www.deinterio.com • <strong>Email:</strong> consultation@deinterio.com
        </div>
      </td>
      <td style="vertical-align: top; text-align: right; width: 260px;">
        <h2 class="quote-title">ESTIMATED QUOTATION</h2>
        <div class="quote-meta-pill">QUOTE #${data.quotationId}</div>
        <div style="font-size: 10px; color: #5A5852; margin-top: 6px;">
          <strong>Issuance Date:</strong> ${data.date}<br />
          <strong>Validity:</strong> 30 Days from date of issuance<br />
          <strong>Est. Handover:</strong> ~${data.estimatedWeeks || 6} Weeks
        </div>
      </td>
    </tr>
  </table>

  <!-- CLIENT & PROJECT PARTICULARS -->
  <div class="grid-2">
    <div class="grid-col">
      <div class="card-box">
        <div style="font-weight: 700; color: #13362B; margin-bottom: 6px; font-size: 11px; text-transform: uppercase;">
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
        <div style="font-weight: 700; color: #13362B; margin-bottom: 6px; font-size: 11px; text-transform: uppercase;">
          Configuration & Scope
        </div>
        <div class="info-row">
          <span class="info-label">Apartment Configuration:</span>
          <span class="info-val">${data.bhkType} (${data.sizeVariant || 'Standard'})</span>
        </div>
        <div class="info-row">
          <span class="info-label">Estimated Carpet Area:</span>
          <span class="info-val">${data.carpetArea || 'As per floor plan'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Selected Finish Tier:</span>
          <span class="info-val" style="color: #8C6D3B; font-weight: 700;">${data.packageTier}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Warranty Assurance:</span>
          <span class="info-val" style="color: #13362B;">${tierSpecs.warranty}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- SCOPE OF WORK SUMMARY -->
  <div class="section-title">
    <span>Room Scope & Turnkey Deliverables</span>
    <span style="font-size: 9px; font-family: monospace; color: #8C6D3B;">TURNKEY ARCHITECTURE</span>
  </div>

  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 25%;">Area / Module</th>
        <th style="width: 50%;">Specifications & Materials Benchmark</th>
        <th style="width: 25%; text-align: right;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Modular Kitchen</strong></td>
        <td>BWP 710 marine plywood carcasses, anti-scratch acrylic shutters, ${tierSpecs.hardware}, cutlery organiser, spice pullout, under-sink drip tray.</td>
        <td style="text-align: right; font-weight: 600; color: #13362B;">Included in Scope</td>
      </tr>
      <tr>
        <td><strong>Master Bedroom</strong></td>
        <td>Floor-to-ceiling wardrobe with loft, headboard paneling, dual bedside floating tables, dressing mirror with concealed LED strip.</td>
        <td style="text-align: right; font-weight: 600; color: #13362B;">Included in Scope</td>
      </tr>
      <tr>
        <td><strong>Living & Dining</strong></td>
        <td>Suspended media entertainment unit, fluted panel feature wall, custom crockery unit with tinted glass shutters, false ceiling with ambient cove.</td>
        <td style="text-align: right; font-weight: 600; color: #13362B;">Included in Scope</td>
      </tr>
      <tr>
        <td><strong>Electrical & Lighting</strong></td>
        <td>Concealed wiring modifications, architectural spotlights, 3000K warm white LED coves, and ${tierSpecs.electrical}.</td>
        <td style="text-align: right; font-weight: 600; color: #13362B;">Included in Scope</td>
      </tr>
      <tr>
        <td><strong>Painting & Finishing</strong></td>
        <td>Asian Paints Royale Luxury Emulsion with 2 coats acrylic putty, 1 coat primer, and anti-fungal treatment for Kolkata humid conditions.</td>
        <td style="text-align: right; font-weight: 600; color: #13362B;">Included in Scope</td>
      </tr>
    </tbody>
  </table>

  <!-- MATERIAL QUALITY COMMITMENT -->
  <div class="section-title">
    <span>Certified Materials Benchmark</span>
    <span style="font-size: 9px; font-family: monospace; color: #13362B;">100% BRAND AUTHENTICITY</span>
  </div>

  <table class="data-table" style="margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 25%; background: #FAF8F5;"><strong>Primary Core Board</strong></td>
        <td>${tierSpecs.ply}</td>
      </tr>
      <tr>
        <td style="background: #FAF8F5;"><strong>Hardware & Fittings</strong></td>
        <td>${tierSpecs.hardware} (Bespoke tested for 200,000 cycles)</td>
      </tr>
      <tr>
        <td style="background: #FAF8F5;"><strong>Surface Laminates & Finishes</strong></td>
        <td>${tierSpecs.finish}</td>
      </tr>
      <tr>
        <td style="background: #FAF8F5;"><strong>Countertop / Stone</strong></td>
        <td>${tierSpecs.countertop}</td>
      </tr>
    </tbody>
  </table>

  <!-- TOTAL ESTIMATED INVESTMENT -->
  <div class="total-banner">
    <div class="total-left">
      <h3>TOTAL ESTIMATED TURNKEY INVESTMENT</h3>
      <p>Includes 3D spatial simulation, factory fabrication, logistics, civil alterations, and dedicated site engineer supervision.</p>
      <div style="font-size: 9.5px; color: #D4AF37; margin-top: 4px;">
        Rooms Covered: ${roomPills}
      </div>
    </div>
    <div class="total-right">
      <div class="total-price">${data.totalAmountFormatted}</div>
      <div style="font-size: 9.5px; color: #D4AF37; letter-spacing: 0.5px;">ESTIMATED ALL-INCLUSIVE</div>
    </div>
  </div>

  <!-- PAYMENT SCHEDULE PHASING -->
  <div class="section-title">
    <span>Turnkey Milestone Payment Plan</span>
    <span style="font-size: 9px; font-family: monospace; color: #8C6D3B;">TRANSPARENT BILLING</span>
  </div>

  <div class="schedule-grid">
    <div class="schedule-step">
      <div class="schedule-pct">10%</div>
      <div class="schedule-title">Booking & Design</div>
      <div style="font-size: 8.5px; color: #8C6D3B; margin-top: 2px;">Laser survey & 3D renders</div>
    </div>
    <div class="schedule-step">
      <div class="schedule-pct">40%</div>
      <div class="schedule-title">Factory Kickoff</div>
      <div style="font-size: 8.5px; color: #8C6D3B; margin-top: 2px;">Material sourcing & cutting</div>
    </div>
    <div class="schedule-step">
      <div class="schedule-pct">40%</div>
      <div class="schedule-title">Site Installation</div>
      <div style="font-size: 8.5px; color: #8C6D3B; margin-top: 2px;">Carcass assembly & finish</div>
    </div>
    <div class="schedule-step">
      <div class="schedule-pct">10%</div>
      <div class="schedule-title">Final Handover</div>
      <div style="font-size: 8.5px; color: #8C6D3B; margin-top: 2px;">Deep clean & warranty card</div>
    </div>
  </div>

  <!-- FOOTER & AUTHORIZED SIGNATURE -->
  <table class="footer-section">
    <tr>
      <td class="footer-col" style="width: 60%; padding-right: 20px;">
        <strong>TERMS & REGULATORY NOTICE:</strong><br />
        1. This quotation is an automated preliminary estimate based on inputted parameters. Final formal agreement pricing will be finalized post on-site 3D laser measurement and client material selection sign-off.<br />
        2. All woodwork fabricated at our high-precision Rajarhat factory with PUR edge-banding technology for water resistance.<br />
        3. 10-year warranty applies to structural woodwork integrity and manufacturing defects under normal domestic use.
      </td>
      <td class="footer-col" style="width: 40%; text-align: right;">
        <div class="stamp-box">
          <div class="stamp-text">DEINTERIO INTERIOR GROUP</div>
          <div style="font-size: 8.5px; color: #8C6D3B; font-family: monospace; margin: 2px 0;">DIGITAL ESTIMATE SEAL</div>
          <div style="font-size: 9px; color: #13362B; font-weight: 600;">Authorized Signatory</div>
        </div>
      </td>
    </tr>
  </table>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};
