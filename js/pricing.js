// ============================
// LAST BITE - Dynamic Pricing Engine
// ============================

const PricingEngine = {

  // Calculate current price based on time decay
  getCurrentPrice(originalPrice, expiryHours, elapsedHours) {
    const remainingRatio = Math.max(0, (expiryHours - elapsedHours) / expiryHours);
    const minRatio = 0.20; // never below 20% of original
    const ratio = Math.max(minRatio, remainingRatio);
    return Math.round(originalPrice * ratio);
  },

  // Get discount percentage based on time
  getDiscountByTime(expiryHours, elapsedHours) {
    const remaining = expiryHours - elapsedHours;
    if (remaining > 4) return 20;
    if (remaining > 3) return 30;
    if (remaining > 2) return 40;
    if (remaining > 1) return 55;
    if (remaining > 0.5) return 70;
    return 80;
  },

  // Get urgency color class
  getUrgencyClass(remaining) {
    if (remaining > 3) return 'green';
    if (remaining > 1.5) return 'orange';
    return 'red';
  },

  // Format price drop stages for display
  getPriceDropSchedule(item) {
    const stages = [];
    const basePrice = item.originalPrice;
    const checkpoints = [
      { label: 'Now', discount: 20 },
      { label: 'In 1 hr', discount: 40 },
      { label: 'In 2 hr', discount: 60 },
      { label: 'In 3 hr', discount: 70 },
      { label: 'Closing', discount: 85 },
    ];
    checkpoints.forEach(cp => {
      stages.push({
        label: cp.label,
        discount: cp.discount,
        price: Math.round(basePrice * (1 - cp.discount / 100))
      });
    });
    return stages;
  },

  // Check if NGO threshold hit (80%+ discount)
  shouldTriggerDonation(discount) { return discount >= 80; },

  // Render price drop schedule HTML
  renderPriceSchedule(item) {
    const stages = this.getPriceDropSchedule(item);
    return `
      <div style="display:flex;gap:8px;overflow-x:auto;padding:4px 0;">
        ${stages.map((s,i) => `
          <div style="text-align:center;min-width:72px;padding:10px 8px;
            background:${i===0?'rgba(249,115,22,0.15)':'rgba(255,255,255,0.04)'};
            border:1px solid ${i===0?'rgba(249,115,22,0.4)':'rgba(255,255,255,0.08)'};
            border-radius:10px;flex-shrink:0;">
            <div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">${s.label}</div>
            <div style="font-size:13px;font-weight:800;color:${i===0?'#f97316':'#f1f5f9'};">₹${s.price}</div>
            <div style="font-size:10px;color:#f97316;font-weight:600;">${s.discount}% off</div>
          </div>
        `).join('')}
      </div>
    `;
  }
};

// ── Live pricing updater ────────────────────
let pricingIntervals = {};

function startLivePricing(itemId, callback, intervalMs = 30000) {
  if (pricingIntervals[itemId]) clearInterval(pricingIntervals[itemId]);
  pricingIntervals[itemId] = setInterval(() => {
    const items = getFoodItems();
    const item = items.find(i => i.id === itemId);
    if (!item) { clearInterval(pricingIntervals[itemId]); return; }
    const elapsed = (Date.now() - item.entryTime) / 3600000;
    const newDiscount = PricingEngine.getDiscountByTime(item.expiryHours, elapsed);
    if (newDiscount !== item.discount) {
      item.discount = newDiscount;
      if (PricingEngine.shouldTriggerDonation(newDiscount) && item.status === 'FlashSale') {
        item.status = 'Donated';
        addNGOAlert(item);
        showToast('orange', '💝 Auto-Donated!', `${item.name} auto-sent to NGO (closing time approaching)`);
      }
      const idx = items.findIndex(i => i.id === itemId);
      items[idx] = item;
      saveFoodItems(items);
      if (callback) callback(item);
    }
  }, intervalMs);
}

// ── Countdown Timer ─────────────────────────
function startCountdown(elementId, expiryHours, entryTime) {
  function update() {
    const el = document.getElementById(elementId);
    if (!el) return;
    const elapsed = (Date.now() - entryTime) / 3600000;
    const remaining = Math.max(0, expiryHours - elapsed);
    const h = Math.floor(remaining);
    const m = Math.floor((remaining - h) * 60);
    const s = Math.floor(((remaining - h) * 60 - m) * 60);
    el.innerHTML = `
      <span class="countdown-num">${String(h).padStart(2,'0')}</span>
      <span class="countdown-sep">:</span>
      <span class="countdown-num">${String(m).padStart(2,'0')}</span>
      <span class="countdown-sep">:</span>
      <span class="countdown-num">${String(s).padStart(2,'0')}</span>
    `;
    if (remaining <= 0) { el.innerHTML = '<span style="color:#ef4444;font-weight:700;">EXPIRED</span>'; return; }
  }
  update();
  return setInterval(update, 1000);
}
