// main app logic

const STORAGE_KEYS = {
  FOOD_ITEMS: 'lb_food_items',
  NGOs: 'lb_NGOs',
  ORDERS: 'lb_orders',
  DONATIONS: 'lb_donations',
  NGO_ALERTS: 'lb_ngo_alerts',
  IMPACT: 'lb_impact',
  USERS: 'lb_users',
  CROPS: 'lb_crops',
  DELIVERY_PARTNERS: 'lb_delivery',
  EVENTS: 'lb_events',
  NOTIFICATIONS: 'lb_notifications'
};

// seed data
const SAMPLE_NGOs = [
  { id:'r1', name:'Spice Garden', area:'Connaught Place, Delhi', emoji:'🍛', lat:28.6292, lng:77.2182, greenStars:4.5, meals:312, score:680 },
  { id:'r2', name:'Bombay Bites', area:'Bandra, Mumbai', emoji:'🥘', lat:19.0596, lng:72.8295, greenStars:4.0, meals:210, score:540 },
  { id:'r3', name:'Chennai House', area:'Anna Nagar, Chennai', emoji:'🍱', lat:13.0827, lng:80.2707, greenStars:3.5, meals:178, score:420 },
  { id:'r4', name:'Royal Dine', area:'Park Street, Kolkata', emoji:'🍜', lat:22.5514, lng:88.3612, greenStars:5.0, meals:450, score:890 },
];

const SAMPLE_FOOD_ITEMS = [
  { id:'f1', name:'Butter Chicken', NGO:'Spice Garden', NGOId:'r1', emoji:'🍛', qty:8, originalPrice:280, category:'Fresh', expiryHours:3, entryTime: Date.now()-3600000, status:'FlashSale', discount:40, area:'Connaught Place' },
  { id:'f2', name:'Biryani (Hyderabadi)', NGO:'Bombay Bites', NGOId:'r2', emoji:'🍚', qty:5, originalPrice:320, category:'Fresh', expiryHours:2, entryTime:Date.now()-5400000, status:'FlashSale', discount:55, area:'Bandra' },
  { id:'f3', name:'Masala Dosa', NGO:'Chennai House', NGOId:'r3', emoji:'🫓', qty:12, originalPrice:120, category:'Perishable', expiryHours:1, entryTime:Date.now()-7200000, status:'Donated', discount:70, area:'Anna Nagar' },
  { id:'f4', name:'Dal Makhani + Rice', NGO:'Royal Dine', NGOId:'r4', emoji:'🍲', qty:6, originalPrice:240, category:'Fresh', expiryHours:4, entryTime:Date.now()-1800000, status:'FlashSale', discount:30, area:'Park Street' },
  { id:'f5', name:'Paneer Tikka', NGO:'Spice Garden', NGOId:'r1', emoji:'🧆', qty:3, originalPrice:350, category:'Fresh', expiryHours:2, entryTime:Date.now()-4000000, status:'FlashSale', discount:60, area:'Connaught Place' },
  { id:'f6', name:'Veg Thali', NGO:'Royal Dine', NGOId:'r4', emoji:'🍽️', qty:10, originalPrice:180, category:'Perishable', expiryHours:1, entryTime:Date.now()-6000000, status:'Donated', discount:80, area:'Park Street' },
];

const SAMPLE_IMPACT = {
  mealsSaved: 3847,
  kgSaved: 1923,
  co2Reduced: 4808,
  familiesFed: 962,
  NGOsOnboard: 48,
  ngoPartners: 12,
  revenueRecovered: 284600,
  agriWastePrevented: 3500,
  farmerIncome: 45000,
  villagesConnected: 15
};

const SAMPLE_NGO_ALERTS = [
  { id:'n1', itemName:'Masala Dosa', NGO:'Chennai House', qty:12, area:'Anna Nagar', time:Date.now()-600000, status:'Pending', emoji:'🫓' },
  { id:'n2', itemName:'Veg Thali', NGO:'Royal Dine', qty:10, area:'Park Street', time:Date.now()-1800000, status:'Accepted', emoji:'🍽️' },
  { id:'n3', itemName:'Roti Sabzi', NGO:'Spice Garden', qty:20, area:'Connaught Place', time:Date.now()-3200000, status:'Completed', emoji:'🫔' },
];

const SAMPLE_CROPS = [
  { id:'c1', name:'Tomatoes', farmer:'Ramesh Kumar', qty:500, price:15, area:'Sonipat, Haryana', time:Date.now()-86400000, status:'Available' },
  { id:'c2', name:'Onions', farmer:'Suresh Singh', qty:1000, price:20, area:'Nashik, Maharashtra', time:Date.now()-172800000, status:'Requested' },
  { id:'c3', name:'Potatoes', farmer:'Ramesh Kumar', qty:2000, price:10, area:'Sonipat, Haryana', time:Date.now()-3600000, status:'Available' },
];

const SAMPLE_DELIVERY_PARTNERS = [
  { id:'dp1', name:'Arjun Sharma', phone:'9876543210', vehicle:'Bike', vehicleEmoji:'🏍️', area:'Connaught Place', status:'Online', rating:4.8, deliveries:234, earnings:18500, currentOrder:null },
  { id:'dp2', name:'Rahul Singh', phone:'9876543211', vehicle:'Cycle', vehicleEmoji:'🚴', area:'Bandra', status:'Busy', rating:4.6, deliveries:189, earnings:14200, currentOrder:'ord_sample' },
  { id:'dp3', name:'Vikram Patel', phone:'9876543212', vehicle:'Bike', vehicleEmoji:'🏍️', area:'Anna Nagar', status:'Online', rating:4.9, deliveries:312, earnings:24600, currentOrder:null },
  { id:'dp4', name:'Sunil Kumar', phone:'9876543213', vehicle:'Scooter', vehicleEmoji:'🛵', area:'Park Street', status:'Offline', rating:4.4, deliveries:156, earnings:11800, currentOrder:null },
];

const SAMPLE_EVENTS = [
  { id:'ev1', title:'TechCorp Annual Meet', type:'Corporate', organizer:'Ankit Mehra', food:200, foodDesc:'Paneer dishes, Biryani, Sweets, Desserts', area:'Gurgaon Cyber City', hoursLeft:2, status:'Active', emoji:'🏢', contact:'9876543220', listingType:'Both', entryTime:Date.now() },
  { id:'ev2', title:'Sharma Wedding Reception', type:'Wedding', organizer:'Rajesh Sharma', food:500, foodDesc:'Full course meal, Sweets, Mithai, Cold drinks', area:'South Delhi', hoursLeft:3, status:'Active', emoji:'💒', contact:'9876543221', listingType:'Donate', entryTime:Date.now()-1800000 },
  { id:'ev3', title:'Birthday Party Surplus', type:'Birthday', organizer:'Priya Kapoor', food:50, foodDesc:'Cake, snacks, starters, juice', area:'Noida Sector 18', hoursLeft:1, status:'Active', emoji:'🎂', contact:'9876543222', listingType:'Flash', entryTime:Date.now()-3600000 },
];

// init
function initApp() {
  // 1. Seed fallback data SYNCHRONOUSLY so UI doesn't break on first load
  if (!getStorage(STORAGE_KEYS.NGOs)) saveStorage(STORAGE_KEYS.NGOs, SAMPLE_NGOs);
  if (!getStorage(STORAGE_KEYS.FOOD_ITEMS)) saveStorage(STORAGE_KEYS.FOOD_ITEMS, SAMPLE_FOOD_ITEMS);
  if (!getStorage(STORAGE_KEYS.IMPACT)) saveStorage(STORAGE_KEYS.IMPACT, SAMPLE_IMPACT);
  if (!getStorage(STORAGE_KEYS.NGO_ALERTS)) saveStorage(STORAGE_KEYS.NGO_ALERTS, SAMPLE_NGO_ALERTS);
  if (!getStorage(STORAGE_KEYS.ORDERS)) saveStorage(STORAGE_KEYS.ORDERS, []);
  if (!getStorage(STORAGE_KEYS.DONATIONS)) saveStorage(STORAGE_KEYS.DONATIONS, []);
  if (!getStorage(STORAGE_KEYS.CROPS)) saveStorage(STORAGE_KEYS.CROPS, SAMPLE_CROPS);
  if (!getStorage(STORAGE_KEYS.DELIVERY_PARTNERS)) saveStorage(STORAGE_KEYS.DELIVERY_PARTNERS, SAMPLE_DELIVERY_PARTNERS);
  if (!getStorage(STORAGE_KEYS.EVENTS)) saveStorage(STORAGE_KEYS.EVENTS, SAMPLE_EVENTS);
  if (!getStorage(STORAGE_KEYS.NOTIFICATIONS)) saveStorage(STORAGE_KEYS.NOTIFICATIONS, []);

  // 2. Fetch from backend asynchronously
  syncBackend();
}

async function syncBackend() {
  try {
    const [foodRes, ngoRes, orderRes, alertRes] = await Promise.all([
      fetch('http://localhost:5000/api/food').catch(()=>null),
      fetch('http://localhost:5000/api/ngos').catch(()=>null),
      fetch('http://localhost:5000/api/orders').catch(()=>null),
      fetch('http://localhost:5000/api/alerts').catch(()=>null)
    ]);

    let updated = false;
    if (foodRes && foodRes.ok) { saveStorage(STORAGE_KEYS.FOOD_ITEMS, await foodRes.json()); updated = true; }
    if (ngoRes && ngoRes.ok) { saveStorage(STORAGE_KEYS.NGOs, await ngoRes.json()); updated = true; }
    if (orderRes && orderRes.ok) { saveStorage(STORAGE_KEYS.ORDERS, await orderRes.json()); updated = true; }
    if (alertRes && alertRes.ok) { saveStorage(STORAGE_KEYS.NGO_ALERTS, await alertRes.json()); updated = true; }
    
    if (updated) {
      window.dispatchEvent(new Event('backendDataLoaded'));
      // Optional: uncomment below to auto-refresh if you want the user to see fresh data instantly
      // location.reload();
    }
  } catch (err) {
    console.log('Backend not available, using local cache');
  }
}

// localstorage
function saveStorage(key, data) { try { localStorage.setItem(key, JSON.stringify(data)); } catch(e) {} }
function getStorage(key) { try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : null; } catch(e) { return null; } }

// food items crud
function getFoodItems() { return getStorage(STORAGE_KEYS.FOOD_ITEMS) || []; }
function saveFoodItems(items) { saveStorage(STORAGE_KEYS.FOOD_ITEMS, items); }

function addFoodItem(item) {
  const items = getFoodItems();
  item.id = 'f' + Date.now();
  item.entryTime = Date.now();
  const decision = AIEngine.decide(item);
  item.status = decision.action === 'FLASH_SALE' ? 'FlashSale' : 'Donated';
  item.discount = decision.discount || 0;
  items.unshift(item);
  saveFoodItems(items);
  
  // POST to Backend
  fetch('http://localhost:5000/api/food', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  }).catch(e => console.error('Backend sync failed', e));

  // trigger NGO alert if donated
  if (item.status === 'Donated') addNGOAlert(item);
  // update impact
  updateImpact('add', item);
  showToast(decision.action === 'FLASH_SALE' ? 'green' : 'orange',
    decision.action === 'FLASH_SALE' ? '⚡ Flash Sale Started!' : '💝 NGO Alert Sent!',
    decision.action === 'FLASH_SALE' ? `${item.name} listed at ${decision.discount}% off` : `${item.name} — NGO pickup requested`
  );
  return item;
}

// ngo alerts
function getNGOAlerts() { return getStorage(STORAGE_KEYS.NGO_ALERTS) || []; }
function addNGOAlert(item) {
  const alerts = getNGOAlerts();
  const alert = { id:'n'+Date.now(), item_name:item.name, ngo_name:item.NGO, qty:item.qty, area:item.area||'Unknown', time:Date.now(), status:'Pending', emoji:item.emoji||'🍽️' };
  alerts.unshift(alert);
  saveStorage(STORAGE_KEYS.NGO_ALERTS, alerts);
  
  // POST to Backend
  fetch('http://localhost:5000/api/alerts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alert)
  }).catch(e => console.error('Backend sync failed', e));
}
function acceptNGOAlert(id) {
  const alerts = getNGOAlerts();
  const a = alerts.find(x=>x.id===id);
  if (a) { 
    a.status='Accepted'; 
    a.otp=generateOTP(); 
    saveStorage(STORAGE_KEYS.NGO_ALERTS, alerts); 
    
    // PUT to Backend
    fetch(`http://localhost:5000/api/alerts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Accepted' })
    }).catch(e => console.error('Backend sync failed', e));
  }
  return a;
}
function completeNGOAlert(id) {
  const alerts = getNGOAlerts();
  const a = alerts.find(x=>x.id===id);
  if (a) { 
    a.status='Completed'; 
    saveStorage(STORAGE_KEYS.NGO_ALERTS, alerts); 
    updateImpact('donate'); 
    
    // PUT to Backend
    fetch(`http://localhost:5000/api/alerts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed' })
    }).catch(e => console.error('Backend sync failed', e));
  }
}

// crops crud
function getCrops() { return getStorage(STORAGE_KEYS.CROPS) || []; }
function saveCrops(items) { saveStorage(STORAGE_KEYS.CROPS, items); }

function addCrop(crop) {
  const crops = getCrops();
  crop.id = 'c' + Date.now();
  crop.time = Date.now();
  crop.status = 'Available';
  crops.unshift(crop);
  saveCrops(crops);
  
  const impact = getImpact();
  impact.agriWastePrevented += (crop.qty || 0);
  saveStorage(STORAGE_KEYS.IMPACT, impact);
  
  showToast('green', '🌾 Crop Listed!', `${crop.name} has been listed for local buyers.`);
  return crop;
}

function requestCrop(id) {
  const crops = getCrops();
  const c = crops.find(x => x.id === id);
  if (c) { 
    c.status = 'Requested'; 
    saveCrops(crops); 
    const impact = getImpact();
    impact.farmerIncome += (c.qty * c.price);
    saveStorage(STORAGE_KEYS.IMPACT, impact);
    showToast('green', '✅ Request Sent!', `Farmer has been notified for ${c.qty}kg ${c.name}.`);
  }
}


// impact
function getImpact() { return getStorage(STORAGE_KEYS.IMPACT) || SAMPLE_IMPACT; }
function updateImpact(action, item) {
  const impact = getImpact();
  if (action === 'add') {
    const kg = (item.qty || 1) * 0.5;
    impact.kgSaved += kg;
    impact.co2Reduced += kg * 2.5;
    impact.mealsSaved += item.qty || 1;
  } else if (action === 'donate') {
    impact.familiesFed += 2;
  } else if (action === 'claim') {
    impact.revenueRecovered += 150;
  }
  saveStorage(STORAGE_KEYS.IMPACT, impact);
}

// orders
function getOrders() { return getStorage(STORAGE_KEYS.ORDERS) || []; }
function addOrder(foodItem) {
  const orders = getOrders();
  const otp = generateOTP();
  const order = { id:'ord'+Date.now(), food_id:foodItem.id, item_name:foodItem.name, ngo_name:foodItem.NGO, price:getCurrentPrice(foodItem), otp, status:'Confirmed', time:Date.now() };
  orders.unshift(order);
  saveStorage(STORAGE_KEYS.ORDERS, orders);
  
  // POST to Backend
  fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  }).catch(e => console.error('Backend sync failed', e));
  
  updateImpact('claim');
  return order;
}

// otp
function generateOTP() { return String(Math.floor(1000 + Math.random() * 9000)); }

// price
function getCurrentPrice(item) {
  return Math.round(item.originalPrice * (1 - item.discount / 100));
}

// time helpers
function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return Math.floor(diff/60) + ' min ago';
  if (diff < 86400) return Math.floor(diff/3600) + ' hr ago';
  return Math.floor(diff/86400) + ' days ago';
}
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true });
}
function getExpiryCountdown(item) {
  const elapsed = (Date.now() - item.entryTime) / 3600000;
  const remaining = Math.max(0, item.expiryHours - elapsed);
  const h = Math.floor(remaining);
  const m = Math.floor((remaining - h) * 60);
  return { h, m, total: remaining };
}

// green star rating
function getGreenStarRating(score) {
  if (score >= 800) return { stars: 5, label: 'Platinum Green', color: '#22c55e' };
  if (score >= 600) return { stars: 4, label: 'Gold Green', color: '#fbbf24' };
  if (score >= 400) return { stars: 3, label: 'Silver Green', color: '#94a3b8' };
  if (score >= 200) return { stars: 2, label: 'Bronze Green', color: '#f97316' };
  return { stars: 1, label: 'Starter', color: '#ef4444' };
}
function renderStars(count, max=5) {
  return '★'.repeat(count) + '☆'.repeat(max-count);
}

// toast notifications
function showToast(type, title, msg, duration=4000) {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  const icons = { green:'✅', orange:'🔔', red:'🚨', blue:'ℹ️' };
  toast.className = `toast ${type}`;
  toast.style.animation = 'slideInRight 0.4s ease';
  toast.innerHTML = `<div class="toast-icon">${icons[type]||'📢'}</div><div><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity 0.4s'; setTimeout(()=>toast.remove(), 400); }, duration);
}
function createToastContainer() {
  const el = document.createElement('div');
  el.id = 'toastContainer'; el.className = 'toast-container';
  document.body.appendChild(el); return el;
}

// number animation
function animateNumber(el, target, duration=1500, prefix='', suffix='') {
  const start = 0; const step = target / (duration/16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

// geo radius filter
function getItemsNearby(items, radius=3) {
  // Simulated: return all FlashSale items
  return items.filter(i => i.status === 'FlashSale');
}

// co2 formula
function calcCO2(kgFood) { return (kgFood * 2.5).toFixed(1); }

// delivery partners
function getDeliveryPartners() { return getStorage(STORAGE_KEYS.DELIVERY_PARTNERS) || []; }
function saveDeliveryPartners(data) { saveStorage(STORAGE_KEYS.DELIVERY_PARTNERS, data); }
function assignDeliveryPartner(orderId, area) {
  const partners = getDeliveryPartners();
  const available = partners.filter(p => p.status === 'Online');
  if (!available.length) return null;
  const areaKey = (area || '').split(',')[0].trim().toLowerCase();
  const matched = available.find(p => p.area.toLowerCase().includes(areaKey)) || available[0];
  matched.status = 'Busy'; matched.currentOrder = orderId;
  saveDeliveryPartners(partners);
  return matched;
}
function completeDelivery(partnerId) {
  const partners = getDeliveryPartners();
  const p = partners.find(x => x.id === partnerId);
  if (p) { p.status = 'Online'; p.currentOrder = null; p.deliveries++; p.earnings += 60; saveDeliveryPartners(partners); }
}

// events
function getEvents() { return getStorage(STORAGE_KEYS.EVENTS) || []; }
function saveEvents(data) { saveStorage(STORAGE_KEYS.EVENTS, data); }
function addEvent(ev) {
  const events = getEvents();
  ev.id = 'ev' + Date.now(); ev.status = 'Active'; ev.entryTime = Date.now();
  events.unshift(ev); saveEvents(events);
  showToast('green', '🎉 Event Food Listed!', 'AI is notifying nearby NGOs within 3 km');
  return ev;
}

// ai user matching
function getAIUserMatching() {
  return [
    { name:'Priya K.', match:94, reason:'Ordered similar 3x', distance:'0.8 km', avatar:'👩', notified:true },
    { name:'Rahul M.', match:87, reason:'Loves 40%+ discounts', distance:'1.2 km', avatar:'👨', notified:true },
    { name:'Sneha R.', match:81, reason:'Veg preference match', distance:'1.7 km', avatar:'👩', notified:true },
    { name:'Amit S.', match:73, reason:'Active in this area', distance:'2.1 km', avatar:'🧑', notified:true },
    { name:'Pooja D.', match:68, reason:'Ordered last week', distance:'2.6 km', avatar:'👩', notified:false },
    { name:'Ravi T.', match:61, reason:'New nearby NGO', distance:'2.9 km', avatar:'👨', notified:false },
  ];
}

// countdown timer
function startCountdown(elementId, expiryHours, entryTime) {
  function update() {
    const el = document.getElementById(elementId);
    if (!el) { clearInterval(timer); return; }
    const elapsed = (Date.now() - entryTime) / 3600000;
    const remaining = Math.max(0, expiryHours - elapsed);
    const h = Math.floor(remaining);
    const m = Math.floor((remaining - h) * 60);
    const s = Math.floor(((remaining - h) * 60 - m) * 60);
    el.innerHTML = `<span class="cd-unit">${String(h).padStart(2,'0')}<small>h</small></span><span class="cd-sep">:</span><span class="cd-unit">${String(m).padStart(2,'0')}<small>m</small></span><span class="cd-sep">:</span><span class="cd-unit">${String(s).padStart(2,'0')}<small>s</small></span>`;
  }
  update();
  const timer = setInterval(update, 1000);
}

// Init on load
document.addEventListener('DOMContentLoaded', initApp);
