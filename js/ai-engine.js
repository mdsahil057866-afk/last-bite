// ai decision engine

const AIEngine = {

  // Main decision function
  decide(item) {
    const { category, expiryHours, qty } = item;
    const timeRatio = expiryHours / 6; // normalized

    // Condition A: Fresh + enough time → Flash Sale
    if (category === 'Fresh' && expiryHours > 2 && qty > 0) {
      const discount = this.getDynamicDiscount(expiryHours);
      return {
        action: 'FLASH_SALE',
        discount,
        reason: `Fresh item with ${expiryHours}h left — listed at ${discount}% off`,
        confidence: Math.min(95, 60 + timeRatio * 35),
        badge: '⚡ Flash Sale'
      };
    }

    // Condition B: Perishable OR low time → Donate
    if (category === 'Perishable' || expiryHours <= 2) {
      return {
        action: 'DONATE',
        discount: 0,
        reason: `${category === 'Perishable' ? 'Perishable item' : `Only ${expiryHours}h left`} — NGO donation recommended`,
        confidence: 90,
        badge: '💝 Donate'
      };
    }

    // Fallback: Flash sale with high discount
    return {
      action: 'FLASH_SALE',
      discount: 50,
      reason: 'Default: listed at 50% off',
      confidence: 70,
      badge: '⚡ Flash Sale'
    };
  },

  // Dynamic discount based on time remaining
  getDynamicDiscount(hoursLeft) {
    if (hoursLeft > 4) return 25;
    if (hoursLeft > 3) return 35;
    if (hoursLeft > 2) return 50;
    if (hoursLeft > 1) return 65;
    return 80;
  },

  // Predict if item will sell in flash sale
  predictSellProbability(item) {
    let score = 0;
    if (item.category === 'Fresh') score += 40;
    if (item.discount >= 50) score += 30;
    if (item.qty <= 5) score += 20; // scarce = sells faster
    if (item.expiryHours >= 2) score += 10;
    return Math.min(score, 95);
  },

  // Geo fencing: filter users within radius
  geoFilter(items, userLat, userLng, radiusKm = 3) {
    return items.filter(item => {
      if (!item.lat || !item.lng) return true; // no location = include all
      const dist = this.haversine(userLat, userLng, item.lat, item.lng);
      return dist <= radiusKm;
    });
  },

  // Haversine distance formula (km)
  haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  },

  // Get AI insight cards for NGO Dashboard
  getInsights(items) {
    const flashItems = items.filter(i => i.status === 'FlashSale').length;
    const donateItems = items.filter(i => i.status === 'Donated').length;
    const totalQty = items.reduce((s, i) => s + (i.qty||0), 0);
    return [
      { icon:'⚡', label:'Flash Sale Active', value: flashItems + ' items', color:'orange' },
      { icon:'💝', label:'Donated Today', value: donateItems + ' items', color:'green' },
      { icon:'📦', label:'Total Portions Listed', value: totalQty, color:'blue' },
      { icon:'🌍', label:'CO₂ Saved', value: calcCO2(totalQty * 0.5) + ' kg', color:'green' }
    ];
  },

  // Generate recommendation message
  getRecommendationHTML(item) {
    const res = this.decide(item);
    const sell = this.predictSellProbability(item);
    const color = res.action === 'FLASH_SALE' ? 'orange' : 'green';
    return `
      <div class="ai-rec-box">
        <div class="ai-rec-icon">🤖</div>
        <div>
          <div class="ai-rec-label">AI Recommendation</div>
          <div class="ai-rec-value text-${color}">${res.badge} — ${res.discount > 0 ? res.discount+'% off' : 'Free Pickup'}</div>
          <div class="text-xs text-muted mt-8">${res.reason} (${sell}% sell probability)</div>
        </div>
      </div>
    `;
  }
};
